import React, { useContext } from 'react';
import OktaJwtVerifier from '@okta/jwt-verifier';
import { Redirect } from 'react-router-dom';
import { oktaAuthConfig } from '../../config';
import { OktaContext } from '../OktaContext';

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: oktaAuthConfig.issuer, // issuer required
});

export default function AuthorizeWrapper({ roles, redirectTo, children }) {
  const { oktaAuth, authState } = useContext(OktaContext);
  console.count('render');
  (async () => {
    try {
      const accessToken = authState?.accessToken?.accessToken;
      // verify tokens
      await oktaJwtVerifier.verifyAccessToken(accessToken, 'api://default');
      console.log('Token is valid');
      return true;
      // verify role
    } catch (err) {
      // clear auth state
      // clear storage
      oktaAuth.tokenManager.clear();
      // reset authState
      oktaAuth.authStateManager.updateAuthState({
        accessToken: undefined,
        idToken: undefined,
        isAuthenticated: false,
        refreshToken: undefined,
      });
      console.error('Token failed validation', err);
      return false;
    }
  })();

  // invalid token > push to login page
  // if (!verifyToken) {
  //   return <Redirect to={{ pathname: '/login' }} />;
  // }

  // ==========================
  // verify roles
  if (!roles || (Array.isArray(roles) && !roles.length)) {
    return children;
  }

  const { group: userRole } = authState.accessToken.claims;
  const verifyRole = roles.some((role) => userRole.includes(role));

  if (!verifyRole) {
    // invalid role -> redirect to href redirectTo or render error text
    if (redirectTo) return <Redirect to={{ pathname: redirectTo }} />;
    return (
      <p style={{ textAlign: 'center', color: 'red', fontWeight: 700 }}>
        You are not allowed to access this view
      </p>
    );
  }

  return children;
}
