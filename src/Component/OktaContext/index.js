import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import Nav from '../Nav';

export const OktaContext = createContext(null);

function OktaProvider({ children }) {
  const { oktaAuth, authState } = useOktaAuth();
  const history = useHistory();
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    oktaAuth.start();
    return () => oktaAuth.stop();
  }, [oktaAuth]);

  const handleTransaction = async (transaction) => {
    setTransaction(transaction);
    setError(null);
    const { status, sessionToken } = transaction;
    switch (status) {
      case 'SUCCESS': {
        const { tokens } = await oktaAuth.token.getWithoutPrompt({
          sessionToken,
        });
        oktaAuth.tokenManager.setTokens(tokens);
        history.push('/');
        break;
      }
      default:
        throw new Error(`Something went wrong: ${status}`);
    }
  };

  return (
    <OktaContext.Provider
      value={{
        oktaAuth,
        authState,
        transaction,
        handleTransaction,
        setError,
      }}
    >
      <Nav />
      {error && (
        <div style={{ color: 'red' }}>
          <div>Error: {error.errorSummary}</div>
          {error?.errorCauses?.map((cause) => (
            <div key={cause.errorSummary}>{cause.errorSummary}</div>
          ))}
        </div>
      )}
      {children}
    </OktaContext.Provider>
  );
}

export default OktaProvider;
