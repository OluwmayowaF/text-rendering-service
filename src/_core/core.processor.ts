import { CoreModel } from './core.model';

/**
 * The app processor class
 * */
export default class CoreProcessor {
  protected _model: any | CoreModel;

  /**
   * @param {Model} model The default model object
   * for the controller. Will be required to create
   * an instance of the controller
   * */
  constructor(model: any | CoreModel) {
    this._model = model;
  }

  /**
   * @param {Object} req The request object
   * @return {Promise<Object| Any>}
   **/
  async prepareBodyObject(req: any | Request): Promise<any> {
    const obj: any = Object.assign({}, req.params, req.query, req.body);
    return obj;
  }
}
