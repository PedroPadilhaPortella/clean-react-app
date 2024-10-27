import faker from 'faker';

import { MinLengthValidation } from './min-length.validation';
import { InvalidFieldError } from '@/validation/errors';

const createSut = (field: string): MinLengthValidation => {
  return new MinLengthValidation(field, 5);
};

describe('MinLengthValidation', () => {

  it('Should return an error when the field is lesser than the minimum length', () => {
    const field = faker.database.column();
    const sut = createSut(field);
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) });
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return false when the field is greater than the minimum length', () => {
    const field = faker.database.column();
    const sut = createSut(field);
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) });
    expect(error).toBeFalsy();
  });

  test('Should return false when the field does not exist in the schema', () => {
    const sut = createSut(faker.database.column());
    const error = sut.validate({ [faker.database.column()]: faker.random.alphaNumeric(4) });
    expect(error).toBeFalsy();
  });
});
