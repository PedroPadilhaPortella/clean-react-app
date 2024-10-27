import { ValidationComposite } from '@/validation/validators';
import { ValidationBuilder } from '@/validation/validators/builder/validation.builder';

export const registerValidationFactory = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('name').required().minLength(5).build(),
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().minLength(5).build(),
    ...ValidationBuilder.field('passwordConfirm').required().compareTo('password').build()
  ]);
};