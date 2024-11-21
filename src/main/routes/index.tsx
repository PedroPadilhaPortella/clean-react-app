import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { SurveyList } from '@/presentation/pages';
import { loginFactory, registerFactory } from '../factories/pages';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={loginFactory} />
        <Route path="/register" exact component={registerFactory} />
        <Route path="/" exact component={SurveyList} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;