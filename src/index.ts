import http from 'http';
import log from './config/logs';
import config from './config';
import express, { Application, Request, Response, NextFunction } from 'express';
import scrapperRouter from './routes/scrapperRouter';
import versionRouter from './routes/verifyRouter';

const app: Application = express();

const NAMESPACE = 'Server';

/** Parse the request */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/** Logging the request */
app.use((req: Request, res: Response, next: NextFunction) => {
  log.info(
    NAMESPACE,
    `METHOD - [${req.method}], URL - [${req.url}], IP [${req.socket.remoteAddress}]`
  );

  res.on('finish', () => {
    log.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP [${req.socket.remoteAddress}], STATUS [${req.statusCode}]`
    );
  });

  next();
});

/** Rules of our API */
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET');
    return res.status(200).json({});
  }

  next();
});

/** App Routes */
app.use('/api/scrap', scrapperRouter);
// app.use('/api/verify', versionRouter);

/** Error handling */
app.use((_req, res: Response) => {
  const error = new Error('Not found');

  res.status(404).json({
    message: error.message
  });
});

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () =>
  log.info(NAMESPACE, `Server is running at http://${config.server.hostname}:${config.server.port}`)
);
