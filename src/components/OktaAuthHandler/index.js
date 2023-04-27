import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
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
          {routes.map(
            ({
              component: Component,
              path,
              exact,
              redirectTo,
              roles,
              loginRequired,
            }) => {
              if (loginRequired || (Array.isArray(roles) && roles.length))
                return (
                  <SecureRoute
                    render={() => (
                      <AuthorizeWrapper redirectTo={redirectTo} roles={roles}>
                        <Component />
                      </AuthorizeWrapper>
                    )}
                    key={path}
                    exact={exact}
                    path={path}
                  />
                );
              return (
                <Route
                  path={path}
                  key={path}
                  exact={exact}
                  component={Component}
                  // render={() => <Component />}
                />
              );
            }
          )}
          <Route path='/login/callback' component={LoginCallback} />s
        </Switch>
      </OktaProvider>
    </Security>
  );
};

export default OktaAuthHandler;
