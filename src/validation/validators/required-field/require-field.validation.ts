import { RequiredFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols';

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) { }

  validate(input: object): Error {
    return input[this.field] ? null : new RequiredFieldError();
  }

}