import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@/presentation/components';
import '@/presentation/styles/global.scss';
import { loginFactory, registerFactory } from './factories/pages';

ReactDOM.render(
  <Router loginFactory={loginFactory} registerFactory={registerFactory} />,
  document.getElementById('main')
);