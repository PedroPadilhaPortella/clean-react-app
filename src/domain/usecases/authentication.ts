import { AccountModel } from '../models/account.model';
import { AuthenticationParams } from './authentication.types';

export interface Authentication {
  auth(params: AuthenticationParams): Promise<AccountModel>
}
