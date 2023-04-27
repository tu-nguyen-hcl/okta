import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from '../../components/Login';
import { OktaContext } from '../../components/OktaContext';

const redirectTo = [
  { role: 'Admin', path: '/admin' },
  { role: 'User', path: '/worker' },
];

const Login = () => {
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
    //
    const { group: userRoles } = authState.accessToken.claims;
    const path =
      redirectTo.find(({ role }) => userRoles.includes(role))?.path || '/';
    return <Redirect to={{ pathname: path }} />;
  }

  return <LoginForm onSuccess={onSuccess} onError={onError} />;
};

export default Login;
