import TextRendererValidation from './textRenderer.validation';
import TextRendererProcessor from './textRenderer.processor';

export interface TextRendererModel {
  getValidator(): TextRendererValidation;

  getProcessor(model?: any): TextRendererProcessor;
}

export const TextRendererModel: TextRendererModel = {
  getValidator() {
    return new TextRendererValidation();
  },

  getProcessor(model: TextRendererModel) {
    return new TextRendererProcessor(model);
  },
};
