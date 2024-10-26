import { AccountModel } from '@/domain/models';

export type RegisterParams = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
};
export interface Register {
  add: (params: RegisterParams) => Promise<AccountModel>
}