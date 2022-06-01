
import { CoreModel } from './core.model';
import lang from '../lang/index';

/**
 * The app controller class
 * */
export default class CoreController {
  protected model: CoreModel;
  protected lang: any | object;

  constructor(model: CoreModel) {
    if (new.target === CoreController) {
      throw new TypeError('Cannot construct Abstract instances directly');
    }
    if (model) {
      this.model = model;
      this.lang = lang.get(model.collectionName);
    }
  }
}
