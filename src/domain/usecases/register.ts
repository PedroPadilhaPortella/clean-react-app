import { AccountModel } from '@/domain/models';

export type RegisterParams = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
};
export interface Register {
  register: (params: RegisterParams) => Promise<AccountModel>
}