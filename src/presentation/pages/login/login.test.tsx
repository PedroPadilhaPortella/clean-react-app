import React from 'react';
import faker from 'faker';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import { AuthenticationSpy, ValidationStub } from '@/presentation/test';
import { InvalidCredentialsError } from '@/domain/errors';
import { Login } from '@/presentation/pages';
import { AccountModel } from '@/domain/models';
import { ApiContext } from '@/presentation/contexts';

const history = createMemoryHistory({ initialEntries: ['/login'] });

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AccountModel) => Promise<void>
};

type SutParams = {
  validationError: string
};

const createSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const setCurrentAccountMock = jest.fn();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;

  const sut = render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Login
          validation={validationStub}
          authentication={authenticationSpy}
        />
      </Router>
    </ApiContext.Provider>
  );

  return { sut, validationStub, authenticationSpy, setCurrentAccountMock };
};

describe('Login Component', () => {

  afterEach(cleanup);

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut, validationStub } = createSut({ validationError });

    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);

    expect(sut.getByTestId('email').title).toBe(validationStub.errorMessage);
    expect(sut.getByTestId('email-label').title).toBe(validationStub.errorMessage);
    expect(sut.getByTestId('email-wrap').getAttribute('data-status')).toBe('invalid');

    expect(sut.getByTestId('password').title).toBe(validationStub.errorMessage);
    expect(sut.getByTestId('password-label').title).toBe(validationStub.errorMessage);
    expect(sut.getByTestId('password-wrap').getAttribute('data-status')).toBe('invalid');

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  test('Should focus email input on email label click', () => {
    const { sut } = createSut();
    const emailInput = sut.getByTestId('email');
    const emailLabel = sut.getByTestId('email-label');
    fireEvent.click(emailLabel);
    expect(document.activeElement).toBe(emailInput);
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = createSut({ validationError });

    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    expect(emailInput.title).toBe(validationError);
    expect(sut.getByTestId('email-label').title).toBe(validationError);
    expect(sut.getByTestId('email-wrap').getAttribute('data-status')).toBe('invalid');
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = createSut({ validationError });

    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    expect(passwordInput.title).toBe(validationError);
    expect(sut.getByTestId('password-label').title).toBe(validationError);
    expect(sut.getByTestId('password-wrap').getAttribute('data-status')).toBe('invalid');
  });

  test('Should show valid email if validation succeeds', () => {
    const { sut } = createSut();

    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    expect(emailInput.title).toBe('');
    expect(sut.getByTestId('email-label').title).toBe('');
    expect(sut.getByTestId('email-wrap').getAttribute('data-status')).toBe('valid');
  });

  test('Should show valid password if validation succeeds', () => {
    const { sut } = createSut();

    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    expect(passwordInput.title).toBe('');
    expect(sut.getByTestId('password-label').title).toBe('');
    expect(sut.getByTestId('password-wrap').getAttribute('data-status')).toBe('valid');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = createSut();

    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test('Should show spinner on submit', () => {
    const { sut } = createSut();

    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);

    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = createSut();

    const email = faker.internet.email();
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });

    const password = faker.internet.password();
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: password } });

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);

    expect(authenticationSpy.params).toEqual({ email, password });
  });

  test('Should call Authentication only once', () => {
    const { sut, authenticationSpy } = createSut();

    const email = faker.internet.email();
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });

    const password = faker.internet.password();
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: password } });

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = createSut({ validationError });

    const email = faker.internet.email();
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });

    const formElement = sut.getByTestId('form');
    fireEvent.submit(formElement);

    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should present error if Authentication fails', async () => {
    const error = new InvalidCredentialsError();
    const { sut, authenticationSpy } = createSut();

    jest.spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error));

    const email = faker.internet.email();
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });

    const password = faker.internet.password();
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: password } });

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);

    const errorWrap = sut.getByTestId('error-wrap');
    await waitFor(() => errorWrap);

    const mainError = sut.getByTestId('main-error');

    expect(mainError.textContent).toEqual(error.message);
    expect(errorWrap.childElementCount).toBe(1);
  });

  test('Should update currentAccount and navigate to home on success', async () => {
    const { sut, authenticationSpy, setCurrentAccountMock } = createSut();

    const email = faker.internet.email();
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });

    const password = faker.internet.password();
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: password } });

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);

    const formElement = sut.getByTestId('form');
    await waitFor(() => formElement);

    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  test('Should navigate to register page', () => {
    const { sut } = createSut();

    const registerLink = sut.getByTestId('register');
    fireEvent.click(registerLink);

    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/register');
  });
});