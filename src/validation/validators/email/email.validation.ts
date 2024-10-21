import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols';

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) { }

  emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  validate(value: string): Error {
    return (!value || this.emailRegex.test(value)) ? null : new InvalidFieldError();
  }
}