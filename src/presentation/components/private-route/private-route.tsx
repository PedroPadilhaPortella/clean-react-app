import apiContext from '@/presentation/contexts/api/api.context';
import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { getCurrentAccount } = useContext(apiContext);

  return getCurrentAccount()?.accessToken
    ? <Route {...props} />
    : <Route {...props} component={() => <Redirect to="/login" />} />;
};

export default PrivateRoute;