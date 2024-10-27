import faker from 'faker';

import { EmailValidation, RequiredFieldValidation, MinLengthValidation, CompareFieldsValidation } from '@/validation/validators';
import { ValidationBuilder as sut } from './validation.builder';

describe('ValidationBuilder', () => {

  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column();
    const validations = sut.field(field).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  test('Should return EmailValidation', () => {
    const field = faker.database.column();
    const validations = sut.field(field).email().build();
    expect(validations).toEqual([new EmailValidation(field)]);
  });

  test('Should return MinLengthValidation', () => {
    const field = faker.database.column();
    const length = faker.random.number();
    const validations = sut.field(field).minLength(length).build();
    expect(validations).toEqual([new MinLengthValidation(field, length)]);
  });

  test('Should return CompareFieldsValidation', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const validations = sut.field(field).compareTo(fieldToCompare).build();
    expect(validations).toEqual([new CompareFieldsValidation(field, fieldToCompare)]);
  });

  test('Should return a list of validations', () => {
    const field = faker.database.column();
    const length = faker.random.number();
    const validations = sut.field(field).required().email().minLength(length).build();
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new EmailValidation(field),
      new MinLengthValidation(field, length)
    ]);
  });
});