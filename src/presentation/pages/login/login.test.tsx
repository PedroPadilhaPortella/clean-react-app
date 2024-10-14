import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';
import faker from 'faker';
import Login from './login';
import { ValidationStub } from '@/presentation/test';

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
};

const createSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = faker.random.words();
  const sut = render(<Login validation={validationStub} />);
  return { sut, validationStub };
};

describe('Login Component', () => {

  afterEach(cleanup);

  test('Should start with initial state', () => {
    const { sut, validationStub } = createSut();

    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationStub.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = sut.getByTestId('password-status');
    expect(emailStatus.title).toBe(validationStub.errorMessage);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should show email error if Validation fails', () => {
    const { sut, validationStub } = createSut();

    const errorMessage = faker.random.words();
    validationStub.errorMessage = errorMessage;

    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(errorMessage);
    expect(emailStatus.textContent).toBe('🔴');
  });

  test('Should show password error if Validation fails', () => {
    const { sut, validationStub } = createSut();

    const errorMessage = faker.random.words();
    validationStub.errorMessage = errorMessage;

    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(errorMessage);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should show valid email if validation succeeds', () => {
    const { sut, validationStub } = createSut();
    validationStub.errorMessage = null;

    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Tudo certo!');
    expect(emailStatus.textContent).toBe('🟢');
  });

  test('Should show valid password if validation succeeds', () => {
    const { sut, validationStub } = createSut();
    validationStub.errorMessage = null;

    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Tudo certo!');
    expect(passwordStatus.textContent).toBe('🟢');
  });
});