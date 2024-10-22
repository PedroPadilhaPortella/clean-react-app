import faker from 'faker';

import { RequiredFieldValidation } from './require-field.validation';
import { RequiredFieldError } from '@/validation/errors';

const createSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(faker.database.column());
};

describe('RequiredFieldValidation', () => {

  it('Should return an error when the field is empty', () => {
    const sut = createSut();
    const error = sut.validate('');
    expect(error).toEqual(new RequiredFieldError());
  });

  test('Should return false when the field is not empty', () => {
    const sut = createSut();
    const error = sut.validate(faker.random.word());
    expect(error).toBeFalsy();
  });
});
