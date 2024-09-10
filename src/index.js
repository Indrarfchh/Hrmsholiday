import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import Navbar from './Navbar';
// import Indra from './Indra';
// import Laxman from './laxman';
// import Vikram from './vikram';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar />
    <App/>
  </BrowserRouter>
);

