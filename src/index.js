import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { UserProvider } from "./context/UserContext"; 
import { AdminProvider } from "./context/AdminContext"; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AdminProvider>
    <UserProvider>
    <Router>
      <App />
    </Router>
    </UserProvider>
    </AdminProvider>
  </React.StrictMode>
);
