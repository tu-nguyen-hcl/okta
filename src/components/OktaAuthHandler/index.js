import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import { Home, Login } from '../../apps/index';
import Protected from '../ProtectedPage';
import { oktaAuthConfig } from '../../config';
import OktaProvider from '../OktaContext';
import { routes } from '../../routes';
import AuthorizeWrapper from '../AuthorizeWrapper';

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
          {routes.map(({ Component, path, exact, redirectTo, roles }) => {
            return (
              <Route
                path={path}
                key={path}
                exact={exact}
                render={() => (
                  <AuthorizeWrapper redirectTo={redirectTo} roles={roles}>
                    <Component />
                  </AuthorizeWrapper>
                )}
              />
            );
          })}
          <SecureRoute path='/protected' component={Protected} />
          <Route path='/login/callback' component={LoginCallback} />s
        </Switch>
      </OktaProvider>
    </Security>
  );
};

export default OktaAuthHandler;
