import http from 'http';
import log from './config/logs';
import express, { Application, Request, Response, NextFunction } from 'express';
import scrapperRouter from './routes/scrapperRouter';
import verifyRouter from './routes/verifyRouter';

const app: Application = express();

/** Parse the request */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/** Logging the request */
app.use((req, res, next) => {
  log.info(
    `
      METHOD - [${req.method}] 
      URL - [${req.url}]
    `
  );

  res.on('finish', () => {
    if (req.method === 'GET') {
      log.success(
        `
          METHOD - [${req.method}]
          URL - [${req.originalUrl}]
          STATUS - [${res.statusCode}]
        `
      );
    } else {
      log.error(
        `
          METHOD - [${req.method}]
          URL - [${req.originalUrl}]
          STATUS - [${res.statusCode}]
        `
      );
    }
  });

  next();
});

/** App Routes */
app.use('/api/scrap', scrapperRouter);
app.use('/api/verify', verifyRouter);

/** Error handling */
app.use((req, res) => {
  const error = new Error('Error completing request.');

  if (req.method !== 'GET') {
    return res.status(405).json({
      message: 'Method not allowed',
      method: req.method,
      status: 405,
    });
  }
  return res.status(500).json({
    message: error.message,
  });
});

// server
const httpServer = http.createServer(app);

const port = process.env.PORT || 5000;
httpServer.listen(port, () =>
  log.success(`Server is running at http://localhost:${port}`)
);
