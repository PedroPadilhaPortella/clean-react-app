import { createContext } from 'react';

import { AccountModel } from '@/domain/models';

type Props = {
  setCurrentAccount?: (account: AccountModel) => Promise<void>
};

export default createContext<Props>(null);