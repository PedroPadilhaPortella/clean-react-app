import { EmailValidation } from './email.validation';
import { InvalidFieldError } from '@/validation/errors';
import faker from 'faker';

const createSut = (field: string): EmailValidation => {
  return new EmailValidation(field);
};

describe('EmailValidation', () => {

  it('Should return an error when email is invalid', () => {
    const field = faker.database.column();
    const sut = createSut(field);
    const error = sut.validate({ [field]: faker.random.word() });
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return false when email is valid', () => {
    const field = faker.database.column();
    const sut = createSut(field);
    const error = sut.validate({ [field]: faker.internet.email() });
    expect(error).toBeFalsy();
  });

  test('Should return false when email is empty', () => {
    const field = faker.database.column();
    const sut = createSut(field);
    const error = sut.validate({ [field]: '' });
    expect(error).toBeFalsy();
  });
});
