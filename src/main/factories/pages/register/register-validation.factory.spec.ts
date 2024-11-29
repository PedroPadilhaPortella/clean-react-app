import { CompareFieldsValidation, EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators';
import { registerValidationFactory } from './register-validation.factory';

describe('RegisterValidationFactory', () => {
  test('Should create ValidationComposite with correct validations', () => {
    const composite = registerValidationFactory();
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('name'),
      new MinLengthValidation('name', 5),
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 5),
      new RequiredFieldValidation('passwordConfirm'),
      new CompareFieldsValidation('passwordConfirm', 'password')
    ]));
  });
});