import faker from 'faker';

import { CompareFieldsValidation } from './compare-fields.validation';
import { InvalidFieldError } from '@/validation/errors';

const createSut = (valueToCompare: string): CompareFieldsValidation => {
  return new CompareFieldsValidation(faker.database.column(), valueToCompare);
};

describe('CompareFieldsValidation', () => {

  it('Should return an error when the fields are different', () => {
    const sut = createSut(faker.random.word());
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return false when the fields are equal', () => {
    const valueToCompare = faker.random.word();
    const sut = createSut(valueToCompare);
    const error = sut.validate(valueToCompare);
    expect(error).toBeFalsy();
  });
});
