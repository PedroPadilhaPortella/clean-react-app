import React from 'react';

import Logo from '../logo';

import styles from './header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logout}>
          <span>Pedro Portella</span>
          <a href="#">Sair</a>
        </div>
      </div>
    </header>
  );
};

export default Header;