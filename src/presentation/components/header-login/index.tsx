import React, { memo } from 'react';
import styles from './header-login.module.scss';
import Logo from '../logo';

const HeaderLogin: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  );
};

export default memo(HeaderLogin);