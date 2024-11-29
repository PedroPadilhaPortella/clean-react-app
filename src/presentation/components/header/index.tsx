import React, { useContext } from 'react';

import { Logo } from '@/presentation/components';
import { ApiContext } from '@/presentation/contexts';

import { useLogout } from '@/presentation/hooks';
import styles from './header.module.scss';

const Header: React.FC = () => {
  const logout = useLogout();
  const { getCurrentAccount } = useContext(ApiContext);

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