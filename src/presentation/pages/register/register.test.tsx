import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import faker from 'faker';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import { Register } from '@/presentation/pages';
import { AccessTokenMock, RegisterAccountSpy, ValidationStub } from '@/presentation/test';
import { InvalidCredentialsError } from '@/domain/errors';

const history = createMemoryHistory({ initialEntries: ['/register'] });

type SutTypes = {
  sut: RenderResult
  accessTokenMock: AccessTokenMock
  registerAccountSpy: RegisterAccountSpy
};

type SutParams = {
  validationError: string
};

const createSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const accessTokenMock = new AccessTokenMock();
  const registerAccountSpy = new RegisterAccountSpy();
  validationStub.errorMessage = params?.validationError;

  const sut = render(
    <Router history={history}>
      <Register
        validation={validationStub}
        registerAccount={registerAccountSpy}
        accessToken={accessTokenMock}
      />
    </Router>
  );

  return { sut, registerAccountSpy, accessTokenMock };
};

describe('Register Component', () => {

  afterEach(cleanup);

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = createSut({ validationError });

    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);

    expect(sut.getByTestId('name').title).toBe(validationError);
    expect(sut.getByTestId('name-label').title).toBe(validationError);
    expect(sut.getByTestId('name-wrap').getAttribute('data-status')).toBe('invalid');

    expect(sut.getByTestId('email').title).toBe(validationError);
    expect(sut.getByTestId('email-label').title).toBe(validationError);
    expect(sut.getByTestId('email-wrap').getAttribute('data-status')).toBe('invalid');

    expect(sut.getByTestId('password').title).toBe(validationError);
    expect(sut.getByTestId('password-label').title).toBe(validationError);
    expect(sut.getByTestId('password-wrap').getAttribute('data-status')).toBe('invalid');

    expect(sut.getByTestId('passwordConfirm').title).toBe(validationError);
    expect(sut.getByTestId('passwordConfirm-label').title).toBe(validationError);
    expect(sut.getByTestId('passwordConfirm-wrap').getAttribute('data-status')).toBe('invalid');

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  test('Should focus name input on name label click', () => {
    const { sut } = createSut();
    const emailInput = sut.getByTestId('email');
    const emailLabel = sut.getByTestId('email-label');
    fireEvent.click(emailLabel);
    expect(document.activeElement).toBe(emailInput);
  });

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = createSut({ validationError });

    const nameInput = sut.getByTestId('name');
    fireEvent.input(nameInput, { target: { value: faker.name.firstName() } });

    expect(sut.getByTestId('name').title).toBe(validationError);
    expect(sut.getByTestId('name-label').title).toBe(validationError);
    expect(sut.getByTestId('name-wrap').getAttribute('data-status')).toBe('invalid');
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = createSut({ validationError });

    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    expect(sut.getByTestId('email').title).toBe(validationError);
    expect(sut.getByTestId('email-label').title).toBe(validationError);
    expect(sut.getByTestId('email-wrap').getAttribute('data-status')).toBe('invalid');
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = createSut({ validationError });

    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    expect(sut.getByTestId('password').title).toBe(validationError);
    expect(sut.getByTestId('password-label').title).toBe(validationError);
    expect(sut.getByTestId('password-wrap').getAttribute('data-status')).toBe('invalid');
  });

  test('Should show confirm password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = createSut({ validationError });

    const passwordConfirmInput = sut.getByTestId('passwordConfirm');
    fireEvent.input(passwordConfirmInput, { target: { value: faker.internet.password() } });

    expect(sut.getByTestId('passwordConfirm').title).toBe(validationError);
    expect(sut.getByTestId('passwordConfirm-label').title).toBe(validationError);
    expect(sut.getByTestId('passwordConfirm-wrap').getAttribute('data-status')).toBe('invalid');
  });

  test('Should show valid name if validation succeeds', () => {
    const { sut } = createSut();

    const nameInput = sut.getByTestId('name');
    fireEvent.input(nameInput, { target: { value: faker.name.firstName() } });

    expect(nameInput.title).toBe('');
    expect(sut.getByTestId('name-label').title).toBe('');
    expect(sut.getByTestId('name-wrap').getAttribute('data-status')).toBe('valid');
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

  test('Should show valid confirm password if validation succeeds', () => {
    const { sut } = createSut();

    const passwordConfirmInput = sut.getByTestId('passwordConfirm');
    fireEvent.input(passwordConfirmInput, { target: { value: faker.internet.password() } });

    expect(passwordConfirmInput.title).toBe('');
    expect(sut.getByTestId('passwordConfirm-label').title).toBe('');
    expect(sut.getByTestId('passwordConfirm-wrap').getAttribute('data-status')).toBe('valid');
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

  test('Should call RegisterAccount only once', () => {
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
    fireEvent.click(submitButton);

    expect(registerAccountSpy.callsCount).toBe(1);
  });

  test('Should not call RegisterAccount if form is invalid', () => {
    const validationError = faker.random.words();
    const { sut, registerAccountSpy } = createSut({ validationError });

    const email = faker.internet.email();
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });

    const formElement = sut.getByTestId('form');
    fireEvent.submit(formElement);

    expect(registerAccountSpy.callsCount).toBe(0);
  });

  test('Should present error if RegisterAccount fails', async () => {
    const error = new InvalidCredentialsError();
    const { sut, registerAccountSpy } = createSut();

    jest.spyOn(registerAccountSpy, 'register').mockReturnValueOnce(Promise.reject(error));

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

    const errorWrap = sut.getByTestId('error-wrap');
    await waitFor(() => errorWrap);

    const mainError = sut.getByTestId('main-error');

    expect(mainError.textContent).toEqual(error.message);
    expect(errorWrap.childElementCount).toBe(1);
  });

  test('Should save AccessToken and navigate to home on success', async () => {
    const { sut, registerAccountSpy, accessTokenMock } = createSut();

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

    const formElement = sut.getByTestId('form');
    await waitFor(() => formElement);

    expect(accessTokenMock.accessToken).toBe(registerAccountSpy.account.accessToken);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  test('Should present error if save AccessToken fails', async () => {
    const { sut, accessTokenMock } = createSut();
    const error = new InvalidCredentialsError();

    jest.spyOn(accessTokenMock, 'save').mockReturnValueOnce(Promise.reject(error));

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

    const errorWrap = sut.getByTestId('error-wrap');
    await waitFor(() => errorWrap);

    const mainError = sut.getByTestId('main-error');

    expect(mainError.textContent).toEqual(error.message);
    expect(errorWrap.childElementCount).toBe(1);
  });

  test('Should navigate to login page', () => {
    const { sut } = createSut();

    const loginLink = sut.getByTestId('login');
    fireEvent.click(loginLink);

    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/login');
  });
});