import CoreValidation from './core.validation';
import CoreProcessor from './core.processor';

export interface CoreModel {
  collectionName: string;

  getValidator(): any | CoreValidation;

  getProcessor(model?: any): CoreProcessor;
}
