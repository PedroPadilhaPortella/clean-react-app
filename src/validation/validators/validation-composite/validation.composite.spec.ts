import { FieldValidationSpy } from '@/validation/test';
import { ValidationComposite } from './validation.composite';
import faker from 'faker';

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
};

const createSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ];
  const sut = ValidationComposite.build(fieldValidationsSpy);
  return { sut, fieldValidationsSpy };
};

describe('ValidationComposite', () => {

  test('Should return an error when any validation fails', () => {
    const fieldName = faker.database.column();
    const { sut, fieldValidationsSpy } = createSut(fieldName);

    const errorMessage = faker.random.words();

    fieldValidationsSpy[0].error = new Error(errorMessage);
    fieldValidationsSpy[1].error = new Error(faker.random.words());

    const error = sut.validate(fieldName, faker.random.word());
    expect(error).toBe(errorMessage);
  });

  test('Should return false when there is no error', () => {
    const fieldName = faker.database.column();
    const { sut } = createSut(fieldName);

    const error = sut.validate(fieldName, faker.random.word());
    expect(error).toBeFalsy();
  });
});