import { AccountModel } from '@/domain/models';

export namespace RegisterAccount {
  export type Params = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  };

  export type Model = AccountModel;
}

export interface RegisterAccount {
  register: (params: RegisterAccount.Params) => Promise<RegisterAccount.Model>
}