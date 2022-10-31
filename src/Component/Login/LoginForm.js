import React, { useContext, useState } from 'react';
import { OktaContext } from '../OktaContext';

export default function LoginForm({ onSuccess, onError }) {
  const { oktaAuth, handleTransaction } = useContext(OktaContext);

  const [values, setValues] = useState({
    username: 'tu.nguyen@hcl.com',
    password: '101318aA@',
  });
  //   const oktaAuth = new OktaAuth(config);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const transaction = await oktaAuth.signIn({
        username: values.username,
        password: values.password,
      });
      handleTransaction(transaction);
      onSuccess(transaction);
    } catch (err) {
      onError(err);
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor='username'>Username</label>
        <input
          value={values.username}
          id='username'
          name='username'
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          value={values.password}
          id='password'
          name='password'
          onChange={onChange}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  );
}
