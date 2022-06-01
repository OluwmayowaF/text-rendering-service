import { TextToImageOptions } from 'textToImage';
import { TextRendererModel } from './textRenderer.model';
const { generate } = require('text-to-image');

/**
 * The TextRenderer Processor class
 * */
class TextRendererProcessor {
  protected _model: TextRendererModel;

  /**
   * @param {Model} model The default model object
   * for the controller. Will be required to create
   * an instance of the controller
   * */
  constructor(model: TextRendererModel) {
    this._model = model;
  }
  /*
   @param {Object} req The request object
   * @return {Promise<Object| Any>}
   **/
  async prepareBodyObject(req: any | Request): Promise<any> {
    const obj: any = Object.assign({}, req.params, req.query, req.body);
    return obj;
  }
  /**
   *
   * @returns
   */
  async render(obj: any) {
    const options: TextToImageOptions = {
      fontFamily: obj.fontFamily,
      fontPath: obj.fontPath,
      maxWidth: Number(obj.maxWidth),
      textAlign: 'center',
      verticalAlign: 'center',
      lineHeight: Number(obj.maxHeight),
      margin: 1,
    };

    console.log(options)

    const dataUri = await generate(obj.text, options);
    return dataUri;
  }
}

export default TextRendererProcessor;
