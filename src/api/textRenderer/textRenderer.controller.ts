import { TextRendererModel } from './textRenderer.model';
import TextRendererProcessor from './textRenderer.processor';
import AppError from '../../utils/app-error';
import lang from '../../lang';
import { BAD_REQUEST, OK } from '../../utils/codes';
import { NextFunction } from 'express';

export default class TextRendererController {
  protected model: TextRendererModel;

  constructor(model: TextRendererModel) {
    if (model) {
      this.model = model;
    }
    this.renderer = this.renderer.bind(this);
  }

  /**
   * @param {Any| Request} req The request object
   * @param {Any | Response} res The response object
   * @param {NextFunction} next The callback to the next program handler
   * @param {String} id The id from the url parameter
   * @return {Object} res The response object
   */
  async renderer(req: any | object | Request, res: any | object | Response, next: NextFunction) {
    try {
      const processor: any | TextRendererProcessor = this.model.getProcessor(this.model);
      const obj = await processor.prepareBodyObject(req);
      const file = req.files[0];
      if (!file || file.mimetype != 'font/ttf') {
        const appError = new AppError(lang.get('error').inputs, BAD_REQUEST, 'invalid file type provided');
        return next(appError);
      }
      obj.fontPath = file.path;
      const validate: any = await this.model.getValidator().render(obj);
      if (!validate.passed) {
        const appError = new AppError(lang.get('error').inputs, BAD_REQUEST, validate.errors);
        return next(appError);
      }
      const image: any = await processor.render(obj);
      req.response = {
        message: lang.get('rendered').success,
        model: this.model,
        code: OK,
        value: image,
      };
      return next()
    } catch (e) {
      return next(e);
    }
  }
}
