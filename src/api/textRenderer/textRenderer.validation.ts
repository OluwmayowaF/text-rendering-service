import Validator from '../../utils/validate';

export default class TextRendererValidator {
  async render(body: any | object) {
    const rules: Validator.Rules = {
      text: 'required',
      fontFile: 'required',
      width: 'required| number',
      height: 'required | number',
    };
    return Validator(body, rules);
  }
}
