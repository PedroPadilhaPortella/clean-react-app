import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters/current-account.adapter';
import { loginFactory, registerFactory, surveyListFactory, surveyResultFactory } from '@/main/factories/pages';
import { ApiContext } from '@/presentation/contexts';
import { PrivateRoute } from '@/presentation/components';

const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter
    }}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={loginFactory} />
          <Route path="/register" exact component={registerFactory} />
          <PrivateRoute path="/" exact component={surveyListFactory} />
          <PrivateRoute path="/surveys/:id" component={surveyResultFactory} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;