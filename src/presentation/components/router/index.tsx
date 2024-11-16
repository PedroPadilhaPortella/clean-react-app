import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { SurveyList } from '@/presentation/pages';

type Factory = {
  loginFactory: React.FC
  registerFactory: React.FC
};

const Router: React.FC<Factory> = (factory: Factory) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={factory.loginFactory} />
        <Route path="/register" exact component={factory.registerFactory} />
        <Route path="/" exact component={SurveyList} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;