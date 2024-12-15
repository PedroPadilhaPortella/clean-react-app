import { fireEvent, screen, waitFor } from '@testing-library/react';
import faker from 'faker';
import { createMemoryHistory } from 'history';

import { InvalidCredentialsError } from '@/domain/errors';
import { AuthenticationSpy } from '@/domain/test';
import { Authentication } from '@/domain/usecases';
import { Login } from '@/presentation/pages';
import { renderWithHistory, ValidationStub } from '@/presentation/test';

const history = createMemoryHistory({ initialEntries: ['/login'] });

type SutTypes = {
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: Authentication.Model) => void
};

type SutParams = {
  validationError: string
};

const createSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;

  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () => Login({ validation: validationStub, authentication: authenticationSpy })
  });

  return { validationStub, authenticationSpy, setCurrentAccountMock };
};

describe('Login Component', () => {

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    createSut({ validationError });

    expect(screen.getByTestId('error-wrap').children).toHaveLength(0);

    expect(screen.getByTestId('email')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('email-label')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('email-wrap')).toHaveAttribute('data-status', 'invalid');

    expect(screen.getByTestId('password')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('password-label')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('password-wrap')).toHaveAttribute('data-status', 'invalid');

    expect(screen.getByTestId('submit')).toBeDisabled();
  });

  test('Should focus email input on email label click', () => {
    createSut();
    const emailInput = screen.getByTestId('email');
    const emailLabel = screen.getByTestId('email-label');
    fireEvent.click(emailLabel);
    expect(document.activeElement).toBe(emailInput);
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    createSut({ validationError });

    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    expect(emailInput).toHaveProperty('title', validationError);
    expect(screen.getByTestId('email-label')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('email-wrap')).toHaveAttribute('data-status', 'invalid');
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    createSut({ validationError });

    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    expect(passwordInput).toHaveProperty('title', validationError);
    expect(screen.getByTestId('password-label')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('password-wrap')).toHaveAttribute('data-status', 'invalid');
  });

  test('Should show valid email if validation succeeds', () => {
    createSut();

    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    expect(emailInput).toHaveProperty('title', '');
    expect(screen.getByTestId('email-label')).toHaveProperty('title', '');
    expect(screen.getByTestId('email-wrap')).toHaveAttribute('data-status', 'valid');
  });

  test('Should show valid password if validation succeeds', () => {
    createSut();

    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    expect(passwordInput).toHaveProperty('title', '');
    expect(screen.getByTestId('password-label')).toHaveProperty('title', '');
    expect(screen.getByTestId('password-wrap')).toHaveAttribute('data-status', 'valid');
  });

  test('Should enable submit button if form is valid', () => {
    createSut();

    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    expect(screen.getByTestId('submit')).toBeEnabled();
  });

  test('Should show spinner on submit', () => {
    createSut();

    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const submitButton = screen.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);

    const spinner = screen.queryByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  test('Should call Authentication with correct values', () => {
    const { authenticationSpy } = createSut();

    const email = faker.internet.email();
    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });

    const password = faker.internet.password();
    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: password } });

    const submitButton = screen.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);

    expect(authenticationSpy.params).toEqual({ email, password });
  });

  test('Should call Authentication only once', () => {
    const { authenticationSpy } = createSut();

    const email = faker.internet.email();
    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });

    const password = faker.internet.password();
    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: password } });

    const submitButton = screen.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words();
    const { authenticationSpy } = createSut({ validationError });

    const email = faker.internet.email();
    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });

    const formElement = screen.getByTestId('form');
    fireEvent.submit(formElement);

    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should present error if Authentication fails', async () => {
    const error = new InvalidCredentialsError();
    const { authenticationSpy } = createSut();

    jest.spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error));

    const email = faker.internet.email();
    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });

    const password = faker.internet.password();
    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: password } });

    const submitButton = screen.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);

    const errorWrap = screen.getByTestId('error-wrap');
    await waitFor(() => errorWrap);

    const mainError = screen.getByTestId('main-error');
    expect(mainError).toHaveTextContent(error.message);
    expect(errorWrap.children).toHaveLength(1);
  });

  test('Should update currentAccount and navigate to home on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = createSut();

    const email = faker.internet.email();
    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });

    const password = faker.internet.password();
    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: password } });

    const submitButton = screen.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);

    const formElement = screen.getByTestId('form');
    await waitFor(() => formElement);

    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  test('Should navigate to register page', () => {
    createSut();

    const registerLink = screen.getByTestId('register');
    fireEvent.click(registerLink);

    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/register');
  });
});