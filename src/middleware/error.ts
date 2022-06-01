import { Request, Response, NextFunction } from 'express';
import { INTERNAL_SERVER_ERROR } from '../utils/codes';
import AppError from '../utils/app-error';
import config from 'config';
import AppResponse from '../utils/app-response';

export default (error: any | object, req: any | Request, res: any | Response, next: NextFunction) => {
  const meta: any = {};
  if (error instanceof AppError) {
    const err = error.format();
    const code = err.code;
    meta.statusCode = code;
    meta.error = { code, message: err.message };
    if (err.messages) {
      meta.error.messages = err.messages;
    }
  } else if (error instanceof Error) {
    meta.statusCode = 500;
    meta.error = { code: INTERNAL_SERVER_ERROR, message: error.message };
    meta.developerMessage = error;
  } else {
    const code = 500;
    meta.statusCode = code;
    meta.error = {
      code: code,
      message: 'A problem with our server, please try again later. Thank you',
    };
    meta.developerMessage = error;
  }
  if (`${config.util.getEnv('NODE_ENV')}` !== 'production') {
    console.log('error ====>>>>>>>>', error);
  }
  return res.status(meta.statusCode).json(AppResponse.format(meta));
};
