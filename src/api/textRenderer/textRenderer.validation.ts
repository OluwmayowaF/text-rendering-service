import Validator from '../../utils/validate';

export default class TextRendererValidator {
  async render(body: any | object) {
    const rules: Validator.Rules = {
      text: 'required',
      fontFamily: 'required',
      maxWidth: 'required',
      maxHeight: 'required',
    };
    return Validator(body, rules);
  }
}
