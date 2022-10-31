import React, { useContext, useEffect } from 'react';
import { OktaContext } from '../OktaContext';
import OktaJwtVerifier from '@okta/jwt-verifier';
import { oktaAuthConfig } from '../../config';

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: oktaAuthConfig.issuer, // issuer required
});
export default function Home() {
  const { oktaAuth, authState } = useContext(OktaContext);

  useEffect(() => {
    const handleClearAuthState = () => {
      oktaAuth.tokenManager.clear();
      oktaAuth.authStateManager.updateAuthState({
        accessToken: undefined,
        idToken: undefined,
        isAuthenticated: false,
        refreshToken: undefined,
      });
    };

    (async () => {
      console.log('==========', authState);
      if (!authState) {
        console.log('Empty authState');
        return;
      } else {
        try {
          const accessToken = authState?.accessToken?.accessToken;
          await oktaJwtVerifier.verifyAccessToken(accessToken, 'api://default');
          console.log('Token is valid');
        } catch (err) {
          handleClearAuthState();
          console.error('Token failed validation', err);
        }
      }
    })();
  }, [authState, oktaAuth]);

  if (!authState || !authState.isAuthenticated)
    return (
      <div className='container text-center'>
        <p>Please login.</p>
        {/* <Link to='/login'>
          <button className='btn btn-primary shadow-none'>Login</button>
        </Link> */}
      </div>
    );

  return (
    <div className='container' style={{ wordBreak: 'break-word' }}>
      <p>accessToken: {authState.accessToken.accessToken}</p>
      <button
        className='btn btn-secondary shadow-none'
        onClick={async () => oktaAuth.signOut()}
      >
        Logout
      </button>
    </div>
  );
}
