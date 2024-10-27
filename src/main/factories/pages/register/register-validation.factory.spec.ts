import { ValidationBuilder } from '@/validation/validators/builder/validation.builder';
import { registerValidationFactory } from './register-validation.factory';
import { ValidationComposite } from '@/validation/validators';

describe('RegisterValidationFactory', () => {
  test('Should create ValidationComposite with correct validations', () => {
    const composite = registerValidationFactory();
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('name').required().minLength(5).build(),
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().minLength(5).build(),
      ...ValidationBuilder.field('passwordConfirm').required().compareTo('password').build()
    ]));
  });
});