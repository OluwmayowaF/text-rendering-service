import Validator from 'validatorjs';
import config from 'config';

const validator = (body: any, rules: Validator.Rules, customMessages?: Validator.ErrorMessages, callback?: any) => {
  const validation = new Validator(body, rules, customMessages);
  return {
    errors: validation.errors.all(),
    passed: validation.passes(),
  };
};

export default validator;
