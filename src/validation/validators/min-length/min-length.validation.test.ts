import faker from 'faker';

import { MinLengthValidation } from './min-length.validation';
import { InvalidFieldError } from '@/validation/errors';

const createSut = (): MinLengthValidation => {
  return new MinLengthValidation(faker.database.column(), 5);
};

describe('MinLengthValidation', () => {

  it('Should return an error when the field is lesser than the minimum length', () => {
    const sut = createSut();
    const error = sut.validate(faker.random.alphaNumeric(4));
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return false when the field is greater than the minimum length', () => {
    const sut = createSut();
    const error = sut.validate(faker.random.alphaNumeric(5));
    expect(error).toBeFalsy();
  });
});
