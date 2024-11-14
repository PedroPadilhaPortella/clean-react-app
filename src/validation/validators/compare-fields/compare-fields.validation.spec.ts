import faker from 'faker';

import { CompareFieldsValidation } from './compare-fields.validation';
import { InvalidFieldError } from '@/validation/errors';

const createSut = (field: string, fieldToCompare: string): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare);
};

describe('CompareFieldsValidation', () => {

  it('Should return an error when the fields are different', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const sut = createSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: faker.random.alphaNumeric(5),
      [fieldToCompare]: faker.random.word()
    });
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return false when the fields are equal', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const value = faker.random.word();
    const sut = createSut(field, fieldToCompare);
    const error = sut.validate({ [field]: value, [fieldToCompare]: value });
    expect(error).toBeFalsy();
  });
});
