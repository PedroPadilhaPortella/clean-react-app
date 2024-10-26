import { AccountModel } from '@/domain/models';

export type RegisterAccountParams = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
};
export interface RegisterAccount {
  register: (params: RegisterAccountParams) => Promise<AccountModel>
}