import { EmailValidation } from './email.validation';
import { InvalidFieldError } from '@/validation/errors';
import faker from 'faker';

const createSut = (): EmailValidation => {
  return new EmailValidation(faker.database.column());
};

describe('EmailValidation', () => {

  it('Should return an error when email is invalid', () => {
    const sut = createSut();
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return false when email is valid', () => {
    const sut = createSut();
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });
});
