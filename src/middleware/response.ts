import { Request, Response } from 'express';
import AppResponse from '../utils/app-response';

export default async (req: Request | any | object, res: any | Response) => {
  const obj = req.response;
  const meta = AppResponse.getSuccessMeta();
  const response = AppResponse.format(meta, obj);
  return res.status(obj?.code).json(response);
};
