import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters/current-account.adapter';
import { loginFactory, registerFactory, surveyListFactory, surveyResultFactory } from '@/main/factories/pages';
import { currentAccountState, PrivateRoute } from '@/presentation/components';

const Router: React.FC = () => {
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter
  };

  return (
    <RecoilRoot initializeState={(snapshot) => snapshot.set(currentAccountState, state)}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={loginFactory} />
          <Route path="/register" exact component={registerFactory} />
          <PrivateRoute path="/" exact component={surveyListFactory} />
          <PrivateRoute path="/surveys/:id" component={surveyResultFactory} />
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default Router;