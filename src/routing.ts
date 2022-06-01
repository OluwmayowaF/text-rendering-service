import config from 'config';
import errorHandler from './middleware/error';
import Q from 'q';
import { Express, Request, Response, NextFunction } from 'express';



import AppError from './utils/app-error';
import { NOT_FOUND } from './utils/codes';

const prefix = config.get('api.prefix');

/**
 * The routes will add all the application defined routes
 * @param {app} app The app is an instance of an express application
 * @return {Promise<void>}
 * */
export default async (app: any | Express) => {
 

  app.use((req: Request, res: Response, next: NextFunction) => {
    const err: any = new AppError('Not Found', NOT_FOUND);
    err.status = 404;
    next(err);
  });
  app.use('*', (req: Request, res: Response, next: NextFunction) => {
    return next(new AppError('Not found', NOT_FOUND));
  });
  app.use(errorHandler);
  return Q.resolve(app);
};
