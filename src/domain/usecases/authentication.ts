import { AccountModel } from '../models';
import { AuthenticationParams } from './authentication.types';

export interface Authentication {
  auth(params: AuthenticationParams): Promise<AccountModel>
}
