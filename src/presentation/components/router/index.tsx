import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

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
      </Switch>
    </BrowserRouter>
  );
};

export default Router;