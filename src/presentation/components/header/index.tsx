import React from 'react';

import { currentAccountState, Logo } from '@/presentation/components';

import { useLogout } from '@/presentation/hooks';
import styles from './header.module.scss';
import { useRecoilValue } from 'recoil';

const Header: React.FC = () => {
  const logout = useLogout();
  const { getCurrentAccount } = useRecoilValue(currentAccountState);

  const onLogout = (event: React.MouseEvent): void => {
    event.preventDefault();
    logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logout}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" href="#" onClick={onLogout}>Sair</a>
        </div>
      </div>
    </header>
  );
};

export default Header;