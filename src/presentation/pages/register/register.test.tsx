import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import faker from 'faker';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import { Register } from '@/presentation/pages';
import { RegisterAccountSpy, ValidationStub } from '@/presentation/test';

const history = createMemoryHistory({ initialEntries: ['/login'] });

type SutTypes = {
  sut: RenderResult
  registerAccountSpy: RegisterAccountSpy
};

type SutParams = {
  validationError: string
};

const createSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const registerAccountSpy = new RegisterAccountSpy();
  validationStub.errorMessage = params?.validationError;

  const sut = render(
    <Router history={history}>
      <Register
        validation={validationStub}
        registerAccount={registerAccountSpy}
      />
    </Router>
  );

  return { sut, registerAccountSpy };
};

describe('Register Component', () => {

  afterEach(cleanup);

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = createSut({ validationError });

    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);

    const nameStatus = sut.getByTestId('name-status');
    expect(nameStatus.title).toBe(validationError);
    expect(nameStatus.textContent).toBe('🔴');

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('🔴');

    const passwordConfirmStatus = sut.getByTestId('passwordConfirm-status');
    expect(passwordConfirmStatus.title).toBe(validationError);
    expect(passwordConfirmStatus.textContent).toBe('🔴');

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = createSut({ validationError });

    const nameInput = sut.getByTestId('name');
    fireEvent.input(nameInput, { target: { value: faker.name.firstName() } });

    const nameStatus = sut.getByTestId('name-status');
    expect(nameStatus.title).toBe(validationError);
    expect(nameStatus.textContent).toBe('🔴');
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = createSut({ validationError });

    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('🔴');
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = createSut({ validationError });

    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should show confirm password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = createSut({ validationError });

    const passwordConfirmInput = sut.getByTestId('passwordConfirm');
    fireEvent.input(passwordConfirmInput, { target: { value: faker.internet.password() } });

    const passwordConfirmStatus = sut.getByTestId('passwordConfirm-status');
    expect(passwordConfirmStatus.title).toBe(validationError);
    expect(passwordConfirmStatus.textContent).toBe('🔴');
  });

  test('Should show valid name if validation succeeds', () => {
    const { sut } = createSut();

    const nameInput = sut.getByTestId('name');
    fireEvent.input(nameInput, { target: { value: faker.name.firstName() } });

    const nameStatus = sut.getByTestId('name-status');
    expect(nameStatus.title).toBe('Tudo certo!');
    expect(nameStatus.textContent).toBe('🟢');
  });

  test('Should show valid email if validation succeeds', () => {
    const { sut } = createSut();

    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Tudo certo!');
    expect(emailStatus.textContent).toBe('🟢');
  });

  test('Should show valid password if validation succeeds', () => {
    const { sut } = createSut();

    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Tudo certo!');
    expect(passwordStatus.textContent).toBe('🟢');
  });

  test('Should show valid confirm password if validation succeeds', () => {
    const { sut } = createSut();

    const passwordConfirmInput = sut.getByTestId('passwordConfirm');
    fireEvent.input(passwordConfirmInput, { target: { value: faker.internet.password() } });

    const passwordConfirmStatus = sut.getByTestId('passwordConfirm-status');
    expect(passwordConfirmStatus.title).toBe('Tudo certo!');
    expect(passwordConfirmStatus.textContent).toBe('🟢');
  });

  test('Should enable submit button when form is valid', () => {
    const { sut } = createSut();

    const nameInput = sut.getByTestId('name');
    fireEvent.input(nameInput, { target: { value: faker.name.firstName() } });

    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const passwordConfirmInput = sut.getByTestId('passwordConfirm');
    fireEvent.input(passwordConfirmInput, { target: { value: faker.internet.password() } });

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test('Should show spinner on submit', () => {
    const { sut } = createSut();

    const nameInput = sut.getByTestId('name');
    fireEvent.input(nameInput, { target: { value: faker.name.firstName() } });

    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const passwordConfirmInput = sut.getByTestId('passwordConfirm');
    fireEvent.input(passwordConfirmInput, { target: { value: faker.internet.password() } });

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);

    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('Should call RegisterAccount with correct values', () => {
    const { sut, registerAccountSpy } = createSut();

    const name = faker.name.firstName();
    const nameInput = sut.getByTestId('name');
    fireEvent.input(nameInput, { target: { value: name } });

    const email = faker.internet.email();
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });

    const password = faker.internet.password();
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: password } });

    const passwordConfirmInput = sut.getByTestId('passwordConfirm');
    fireEvent.input(passwordConfirmInput, { target: { value: password } });

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);

    expect(registerAccountSpy.params).toEqual({ name, email, password, passwordConfirmation: password });
  });
});