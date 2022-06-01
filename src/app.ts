import config from 'config';
import http from 'http';

import express, { Express, Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import cors from 'cors';
import Q from 'q';
import loadRoutes from './routing';

const app: Express = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));
app.set('port', config.get('app.port'));

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    name: `${config.get('app.appName')} - (${config.get('app.environment')})`,
    status: 'UP',
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Expose-Headers', 'x-auth-token');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'x-auth-token,X-AUTH-TOKEN,Origin,Accept,X-Requested-With,Content-Type,Authorization',
  );
  next();
});
const httpServer = http.createServer(app);

const startServer = (app: Express) => {
  loadRoutes(app);
  const server = httpServer.listen(config.get('app.port'));
  console.log(`\n
\tApplication listening on ${config.get('app.baseUrl')}:${config.get('app.port')}\n
\tEnvironment => ${config.util.getEnv('NODE_ENV')}: ${server}\n
\tDate: ${new Date()}`);
  return Q.all([app]);
};

startServer(app);