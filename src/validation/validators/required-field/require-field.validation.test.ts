import faker from 'faker';

import { RequiredFieldValidation } from './require-field.validation';
import { RequiredFieldError } from '@/validation/errors';

const createSut = (field: string): RequiredFieldValidation => {
  return new RequiredFieldValidation(field);
};

describe('RequiredFieldValidation', () => {

  it('Should return an error when the field is empty', () => {
    const field = faker.database.column();
    const sut = createSut(field);
    const error = sut.validate({ [field]: '' });
    expect(error).toEqual(new RequiredFieldError());
  });

  test('Should return false when the field is not empty', () => {
    const field = faker.database.column();
    const sut = createSut(field);
    const error = sut.validate({ [field]: faker.random.word() });
    expect(error).toBeFalsy();
  });
});
