import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const ButtonSubmit = () => {
  const history = useHistory();
  const { oktaAuth, authState } = useOktaAuth();

  const handleLogout = async () => {
    await oktaAuth.signOut();
    localStorage.clear();
  };

  if (authState.isAuthenticated)
    return (
      <button
        className='btn btn-danger me-2 shadow-none'
        onClick={handleLogout}
      >
        Logout
      </button>
    );

  const handleLogin = () => history.push('/login');
  return (
    <button className='btn btn-primary me-2 shadow-none' onClick={handleLogin}>
      Login
    </button>
  );
};

const LoginHandler = () => {
  const { authState } = useOktaAuth();
  if (!authState) return null;
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/'>
            <img
              src='img.png'
              alt=''
              width='30'
              height='24'
              className='d-inline-block align-text-top'
            />
            Okta Auth
          </a>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link style={{ textDecoration: 'none', color: 'white' }} to='/'>
                  <button className='btn btn-primary me-2 shadow-none'>
                    Home
                  </button>
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  style={{ textDecoration: 'none', color: 'white' }}
                  to='/protected'
                >
                  <button className='btn btn-primary me-2 shadow-none'>
                    Protected
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <span className='navbar-text'>
          <ButtonSubmit />
        </span>
      </nav>
    </div>
  );
};

export default LoginHandler;
