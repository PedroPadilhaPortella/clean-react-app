import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';
import faker from 'faker';
import Login from './login';
import { ValidationSpy } from '@/presentation/test';

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
};

const createSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />);
  return { sut, validationSpy };
};

describe('Login Component', () => {

  afterEach(cleanup);

  test('Should start with initial state', () => {
    const { sut } = createSut();

    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Campo obrigatório');
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Campo obrigatório');
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should call validation with correct email', () => {
    const { sut, validationSpy } = createSut();
    const emailInput = sut.getByTestId('email');
    const fakeEmail = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: fakeEmail } });
    expect(validationSpy.fieldName).toEqual('email');
    expect(validationSpy.fieldValue).toEqual(fakeEmail);
  });

  test('Should call validation with correct password', () => {
    const { sut, validationSpy } = createSut();
    const passwordInput = sut.getByTestId('password');
    const fakePassword = faker.internet.password();
    fireEvent.input(passwordInput, { target: { value: fakePassword } });
    expect(validationSpy.fieldName).toEqual('password');
    expect(validationSpy.fieldValue).toEqual(fakePassword);
  });
});