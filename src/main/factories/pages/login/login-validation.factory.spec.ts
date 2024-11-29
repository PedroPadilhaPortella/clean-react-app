import { EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators';
import { loginValidationFactory } from './login-validation.factory';

describe('LoginValidationFactory', () => {
  test('Should create ValidationComposite with correct validations', () => {
    const composite = loginValidationFactory();
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 5)
    ]));
  });
});