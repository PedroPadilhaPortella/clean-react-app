import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { ApiContext } from '@/presentation/contexts';
import { Logo } from '@/presentation/components';

import styles from './header.module.scss';

const Header: React.FC = () => {
  const history = useHistory();
  const { setCurrentAccount } = useContext(ApiContext);

  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault();
    setCurrentAccount(undefined);
    history.replace('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logout}>
          <span>Pedro Portella</span>
          <a data-testid="logout" href="#" onClick={logout}>Sair</a>
        </div>
      </div>
    </header>
  );
};

export default Header;