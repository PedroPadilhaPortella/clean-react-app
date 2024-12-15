import { fireEvent, screen, waitFor } from '@testing-library/react';
import faker from 'faker';
import { createMemoryHistory } from 'history';

import { InvalidCredentialsError } from '@/domain/errors';
import { RegisterAccountSpy } from '@/domain/test';
import { RegisterAccount } from '@/domain/usecases';
import { Register } from '@/presentation/pages';
import { renderWithHistory, ValidationStub } from '@/presentation/test';

const history = createMemoryHistory({ initialEntries: ['/register'] });

type SutTypes = {
  registerAccountSpy: RegisterAccountSpy
  setCurrentAccountMock: (account: RegisterAccount.Model) => void
};

type SutParams = {
  validationError: string
};

const createSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const registerAccountSpy = new RegisterAccountSpy();
  validationStub.errorMessage = params?.validationError;

  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () => Register({ validation: validationStub, registerAccount: registerAccountSpy })
  });

  return { registerAccountSpy, setCurrentAccountMock };
};

describe('Register Component', () => {

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    createSut({ validationError });

    expect(screen.getByTestId('error-wrap').children).toHaveLength(0);

    expect(screen.getByTestId('name')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('name-label')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('name-wrap')).toHaveAttribute('data-status', 'invalid');

    expect(screen.getByTestId('email')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('email-label')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('email-wrap')).toHaveAttribute('data-status', 'invalid');

    expect(screen.getByTestId('password')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('password-label')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('password-wrap')).toHaveAttribute('data-status', 'invalid');

    expect(screen.getByTestId('passwordConfirm')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('passwordConfirm-label')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('passwordConfirm-wrap')).toHaveAttribute('data-status', 'invalid');

    expect(screen.getByTestId('submit')).toBeDisabled();
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

    expect(screen.getByTestId('name')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('name-label')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('name-wrap')).toHaveAttribute('data-status', 'invalid');
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    createSut({ validationError });

    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    expect(screen.getByTestId('email')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('email-label')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('email-wrap')).toHaveAttribute('data-status', 'invalid');
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    createSut({ validationError });

    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    expect(screen.getByTestId('password')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('password-label')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('password-wrap')).toHaveAttribute('data-status', 'invalid');
  });

  test('Should show confirm password error if Validation fails', () => {
    const validationError = faker.random.words();
    createSut({ validationError });

    const passwordConfirmInput = screen.getByTestId('passwordConfirm');
    fireEvent.input(passwordConfirmInput, { target: { value: faker.internet.password() } });

    expect(screen.getByTestId('passwordConfirm')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('passwordConfirm-label')).toHaveProperty('title', validationError);
    expect(screen.getByTestId('passwordConfirm-wrap')).toHaveAttribute('data-status', 'invalid');
  });

  test('Should show valid name if validation succeeds', () => {
    createSut();

    const nameInput = screen.getByTestId('name');
    fireEvent.input(nameInput, { target: { value: faker.name.firstName() } });

    expect(nameInput.title).toBe('');
    expect(screen.getByTestId('name-label')).toHaveProperty('title', '');
    expect(screen.getByTestId('name-wrap')).toHaveAttribute('data-status', 'valid');
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

  test('Should show valid confirm password if validation succeeds', () => {
    createSut();

    const passwordConfirmInput = screen.getByTestId('passwordConfirm');
    fireEvent.input(passwordConfirmInput, { target: { value: faker.internet.password() } });

    expect(passwordConfirmInput).toHaveProperty('title', '');
    expect(screen.getByTestId('passwordConfirm-label')).toHaveProperty('title', '');
    expect(screen.getByTestId('passwordConfirm-wrap')).toHaveAttribute('data-status', 'valid');
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

    expect(screen.getByTestId('submit')).toBeEnabled();
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

    const spinner = screen.queryByTestId('spinner');
    expect(spinner).toBeInTheDocument();
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
    expect(mainError).toHaveTextContent(error.message);
    expect(errorWrap.children).toHaveLength(1);
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