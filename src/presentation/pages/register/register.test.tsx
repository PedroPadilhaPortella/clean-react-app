import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import faker from 'faker';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import { Register } from '@/presentation/pages';
import { RegisterAccountSpy, ValidationStub } from '@/presentation/test';
import { InvalidCredentialsError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { ApiContext } from '@/presentation/contexts';

const history = createMemoryHistory({ initialEntries: ['/register'] });

type SutTypes = {
  registerAccountSpy: RegisterAccountSpy
  setCurrentAccountMock: (account: AccountModel) => Promise<void>
};

type SutParams = {
  validationError: string
};

const createSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const registerAccountSpy = new RegisterAccountSpy();
  const setCurrentAccountMock = jest.fn();
  validationStub.errorMessage = params?.validationError;

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Register
          validation={validationStub}
          registerAccount={registerAccountSpy}
        />
      </Router>
    </ApiContext.Provider>
  );

  return { registerAccountSpy, setCurrentAccountMock };
};

describe('Register Component', () => {

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    createSut({ validationError });

    const errorWrap = screen.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);

    expect(screen.getByTestId('name').title).toBe(validationError);
    expect(screen.getByTestId('name-label').title).toBe(validationError);
    expect(screen.getByTestId('name-wrap').getAttribute('data-status')).toBe('invalid');

    expect(screen.getByTestId('email').title).toBe(validationError);
    expect(screen.getByTestId('email-label').title).toBe(validationError);
    expect(screen.getByTestId('email-wrap').getAttribute('data-status')).toBe('invalid');

    expect(screen.getByTestId('password').title).toBe(validationError);
    expect(screen.getByTestId('password-label').title).toBe(validationError);
    expect(screen.getByTestId('password-wrap').getAttribute('data-status')).toBe('invalid');

    expect(screen.getByTestId('passwordConfirm').title).toBe(validationError);
    expect(screen.getByTestId('passwordConfirm-label').title).toBe(validationError);
    expect(screen.getByTestId('passwordConfirm-wrap').getAttribute('data-status')).toBe('invalid');

    const submitButton = screen.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  test('Should focus name input on name label click', () => {
    createSut();
    const emailInput = screen.getByTestId('email');
    const emailLabel = screen.getByTestId('email-label');
    fireEvent.click(emailLabel);
    expect(document.activeElement).toBe(emailInput);
  });

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    createSut({ validationError });

    const nameInput = screen.getByTestId('name');
    fireEvent.input(nameInput, { target: { value: faker.name.firstName() } });

    expect(screen.getByTestId('name').title).toBe(validationError);
    expect(screen.getByTestId('name-label').title).toBe(validationError);
    expect(screen.getByTestId('name-wrap').getAttribute('data-status')).toBe('invalid');
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    createSut({ validationError });

    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    expect(screen.getByTestId('email').title).toBe(validationError);
    expect(screen.getByTestId('email-label').title).toBe(validationError);
    expect(screen.getByTestId('email-wrap').getAttribute('data-status')).toBe('invalid');
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    createSut({ validationError });

    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    expect(screen.getByTestId('password').title).toBe(validationError);
    expect(screen.getByTestId('password-label').title).toBe(validationError);
    expect(screen.getByTestId('password-wrap').getAttribute('data-status')).toBe('invalid');
  });

  test('Should show confirm password error if Validation fails', () => {
    const validationError = faker.random.words();
    createSut({ validationError });

    const passwordConfirmInput = screen.getByTestId('passwordConfirm');
    fireEvent.input(passwordConfirmInput, { target: { value: faker.internet.password() } });

    expect(screen.getByTestId('passwordConfirm').title).toBe(validationError);
    expect(screen.getByTestId('passwordConfirm-label').title).toBe(validationError);
    expect(screen.getByTestId('passwordConfirm-wrap').getAttribute('data-status')).toBe('invalid');
  });

  test('Should show valid name if validation succeeds', () => {
    createSut();

    const nameInput = screen.getByTestId('name');
    fireEvent.input(nameInput, { target: { value: faker.name.firstName() } });

    expect(nameInput.title).toBe('');
    expect(screen.getByTestId('name-label').title).toBe('');
    expect(screen.getByTestId('name-wrap').getAttribute('data-status')).toBe('valid');
  });

  test('Should show valid email if validation succeeds', () => {
    createSut();

    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    expect(emailInput.title).toBe('');
    expect(screen.getByTestId('email-label').title).toBe('');
    expect(screen.getByTestId('email-wrap').getAttribute('data-status')).toBe('valid');
  });

  test('Should show valid password if validation succeeds', () => {
    createSut();

    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    expect(passwordInput.title).toBe('');
    expect(screen.getByTestId('password-label').title).toBe('');
    expect(screen.getByTestId('password-wrap').getAttribute('data-status')).toBe('valid');
  });

  test('Should show valid confirm password if validation succeeds', () => {
    createSut();

    const passwordConfirmInput = screen.getByTestId('passwordConfirm');
    fireEvent.input(passwordConfirmInput, { target: { value: faker.internet.password() } });

    expect(passwordConfirmInput.title).toBe('');
    expect(screen.getByTestId('passwordConfirm-label').title).toBe('');
    expect(screen.getByTestId('passwordConfirm-wrap').getAttribute('data-status')).toBe('valid');
  });

  test('Should enable submit button when form is valid', () => {
    createSut();

    const nameInput = screen.getByTestId('name');
    fireEvent.input(nameInput, { target: { value: faker.name.firstName() } });

    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const passwordConfirmInput = screen.getByTestId('passwordConfirm');
    fireEvent.input(passwordConfirmInput, { target: { value: faker.internet.password() } });

    const submitButton = screen.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test('Should show spinner on submit', () => {
    createSut();

    const nameInput = screen.getByTestId('name');
    fireEvent.input(nameInput, { target: { value: faker.name.firstName() } });

    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const passwordConfirmInput = screen.getByTestId('passwordConfirm');
    fireEvent.input(passwordConfirmInput, { target: { value: faker.internet.password() } });

    const submitButton = screen.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('Should call RegisterAccount with correct values', () => {
    const { registerAccountSpy } = createSut();

    const name = faker.name.firstName();
    const nameInput = screen.getByTestId('name');
    fireEvent.input(nameInput, { target: { value: name } });

    const email = faker.internet.email();
    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });

    const password = faker.internet.password();
    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: password } });

    const passwordConfirmInput = screen.getByTestId('passwordConfirm');
    fireEvent.input(passwordConfirmInput, { target: { value: password } });

    const submitButton = screen.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);

    expect(registerAccountSpy.params).toEqual({ name, email, password, passwordConfirmation: password });
  });

  test('Should call RegisterAccount only once', () => {
    const { registerAccountSpy } = createSut();

    const name = faker.name.firstName();
    const nameInput = screen.getByTestId('name');
    fireEvent.input(nameInput, { target: { value: name } });

    const email = faker.internet.email();
    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });

    const password = faker.internet.password();
    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: password } });

    const passwordConfirmInput = screen.getByTestId('passwordConfirm');
    fireEvent.input(passwordConfirmInput, { target: { value: password } });

    const submitButton = screen.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    expect(registerAccountSpy.callsCount).toBe(1);
  });

  test('Should not call RegisterAccount if form is invalid', () => {
    const validationError = faker.random.words();
    const { registerAccountSpy } = createSut({ validationError });

    const email = faker.internet.email();
    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });

    const formElement = screen.getByTestId('form');
    fireEvent.submit(formElement);

    expect(registerAccountSpy.callsCount).toBe(0);
  });

  test('Should present error if RegisterAccount fails', async () => {
    const error = new InvalidCredentialsError();
    const { registerAccountSpy } = createSut();

    jest.spyOn(registerAccountSpy, 'register').mockReturnValueOnce(Promise.reject(error));

    const name = faker.name.firstName();
    const nameInput = screen.getByTestId('name');
    fireEvent.input(nameInput, { target: { value: name } });

    const email = faker.internet.email();
    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });

    const password = faker.internet.password();
    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: password } });

    const passwordConfirmInput = screen.getByTestId('passwordConfirm');
    fireEvent.input(passwordConfirmInput, { target: { value: password } });

    const submitButton = screen.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);

    const errorWrap = screen.getByTestId('error-wrap');
    await waitFor(() => errorWrap);

    const mainError = screen.getByTestId('main-error');

    expect(mainError.textContent).toEqual(error.message);
    expect(errorWrap.childElementCount).toBe(1);
  });

  test('Should update currentAccount and navigate to home on success', async () => {
    const { registerAccountSpy, setCurrentAccountMock } = createSut();

    const name = faker.name.firstName();
    const nameInput = screen.getByTestId('name');
    fireEvent.input(nameInput, { target: { value: name } });

    const email = faker.internet.email();
    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });

    const password = faker.internet.password();
    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: password } });

    const passwordConfirmInput = screen.getByTestId('passwordConfirm');
    fireEvent.input(passwordConfirmInput, { target: { value: password } });

    const submitButton = screen.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);

    const formElement = screen.getByTestId('form');
    await waitFor(() => formElement);

    expect(setCurrentAccountMock).toHaveBeenCalledWith(registerAccountSpy.account);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  test('Should navigate to login page', () => {
    createSut();

    const loginLink = screen.getByTestId('login');
    fireEvent.click(loginLink);

    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/login');
  });
});