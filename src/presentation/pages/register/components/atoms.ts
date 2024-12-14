import { atom } from 'recoil';

export const registerState = atom({
  key: 'registerState',
  default: {
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmError: '',
    mainError: ''
  }
});