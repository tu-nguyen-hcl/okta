import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import { OktaContext } from '../OktaContext';

const Login = ({ config }) => {
  const { oktaAuth, authState, setError } = useContext(OktaContext);

  const onSuccess = async (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    setError(err);
    console.error('Logging failed', err);
  };

  if (!authState) return null;
  if (authState.isAuthenticated) {
    console.log('authState', authState);
    return <Redirect to={{ pathname: '/' }} />;
  }

  return <LoginForm config={config} onSuccess={onSuccess} onError={onError} />;
  // return <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />;
};

export default Login;
