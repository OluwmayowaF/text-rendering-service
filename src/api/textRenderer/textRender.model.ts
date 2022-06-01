import Validation from './textRenderer.validation';
import Processor from './textRenderer.processor';

export interface CoreModel {
  getValidator(): Validation;

  getProcessor(model?: any): Processor;
}
