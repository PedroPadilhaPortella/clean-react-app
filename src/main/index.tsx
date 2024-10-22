import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@/presentation/components';
import '@/presentation/styles/global.scss';
import { loginFactory } from './factories/pages/login/login.factory';

ReactDOM.render(
  <Router loginFactory={loginFactory} />,
  document.getElementById('main')
);