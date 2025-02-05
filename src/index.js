import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { UserProvider } from "./context/UserContext";
import { AdminProvider } from "./context/AdminContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <GoogleOAuthProvider clientId='1009282809407-sh8h2kgmot2q295a503sl5530pldnaj9.apps.googleusercontent.com'>
    <React.StrictMode>
      <AdminProvider>
        <UserProvider>
          <Router>
            <App />
          </Router>
        </UserProvider>
      </AdminProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
