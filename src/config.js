export const oktaAuthConfig = {
  baseUrl: process.env.REACT_APP_BASE_URL,
  issuer: process.env.REACT_APP_ISSUER,
  clientId: process.env.REACT_APP_CLIENT_ID,
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'email', 'profile', 'groups'],
};
