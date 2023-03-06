import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Auth_State_Provider } from './Global_Context/User_Auth';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Auth_State_Provider>
    <Router>
    <App />
    </Router>
    </Auth_State_Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
