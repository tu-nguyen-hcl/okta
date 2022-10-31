import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import Home from '../Home';
import Login from '../Login/Login';
import Protected from '../ProtectedPage';
import { oktaAuthConfig, oktaSignInConfig } from '../../config';
import OktaProvider from '../OktaContext';

const oktaAuth = new OktaAuth(oktaAuthConfig);

const OktaAuthHandler = () => {
  const history = useHistory();
  const customAuthHandler = () => history.push('/login');
  const restoreOriginalUri = () => history.push('/');

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      <OktaProvider>
        <Switch>
          <Route path='/' exact={true} component={Home} />
          <SecureRoute path='/protected' component={Protected} />
          <Route
            path='/login'
            render={() => <Login config={oktaSignInConfig} />}
          />
          <Route path='/login/callback' component={LoginCallback} />s
        </Switch>
      </OktaProvider>
    </Security>
  );
};

export default OktaAuthHandler;
