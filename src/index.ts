import http from 'http';
import * as log from './config/logs';
import config from './config';
import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();

const NAMESPACE = 'Server';

/** Logging the request */
app.use((req: Request, _res) => {
  log.info(
    NAMESPACE,
    `METHOD - [${req.method}], URL - [${req.url}], IP [${req.socket.remoteAddress}]`
  );

  req.on('finish', () => {
    log.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP [${req.socket.remoteAddress}], STATUS [${req.statusCode}]`
    );
  });
});

/** Parse the request */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/** Rules of our API */
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

/** App Routes */
// app.use('/api/sample', scrapperRoute);

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
