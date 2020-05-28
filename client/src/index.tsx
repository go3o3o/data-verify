import './css/style.css';
// import "bootstrap/dist/css/bootstrap.css";
import 'moment/locale/ko';

import React from 'react';
import ReactDOM from 'react-dom';

import StoreProvider from './providers/StoreProvider';
import App from './App';

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root'),
);
