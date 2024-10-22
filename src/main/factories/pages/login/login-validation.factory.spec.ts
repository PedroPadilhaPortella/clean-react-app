import { ValidationBuilder } from '@/validation/validators/builder/validation.builder';
import { loginValidationFactory } from './login-validation.factory';
import { ValidationComposite } from '@/validation/validators';

describe('LoginValidationFactory', () => {
  test('Should create ValidationComposite with correct validations', () => {
    const composite = loginValidationFactory();
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().minLength(5).build()
    ]));
  });
});