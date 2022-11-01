import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import OktaAuthHandler from './components/OktaAuthHandler';

const App = () => (
  <BrowserRouter>
    <OktaAuthHandler />
  </BrowserRouter>
);

export default App;
