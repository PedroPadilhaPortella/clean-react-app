import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { setCurrentAccountAdapter } from '@/main/adapters/current-account.adapter';
import { loginFactory, registerFactory } from '@/main/factories/pages';
import { SurveyList } from '@/presentation/pages';
import { ApiContext } from '@/presentation/contexts';

const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountAdapter }}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={loginFactory} />
          <Route path="/register" exact component={registerFactory} />
          <Route path="/" exact component={SurveyList} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;