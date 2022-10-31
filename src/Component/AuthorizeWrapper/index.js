import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function AuthorizeWrapper({ roles = [], redirectTo, children }) {
  const history = useHistory();
  const userRole = 'admin';
  const hasValidRole = Array.isArray(roles) && roles.includes(userRole);
  useEffect(() => {
    if (!hasValidRole && redirectTo) {
      history.push(redirectTo);
    }
  }, [hasValidRole, history, redirectTo]);

  if (!hasValidRole && !redirectTo)
    return <p>You are not allowed to access this view</p>;

  return children;
}
