import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Notes from './pages/Notes';
import Otp from './otp'


const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}<Route path="/" element={<Otp />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
           <Route
            path="/notes"
            element={
              <PrivateRoute>
                <Notes />
              </PrivateRoute>
            }
          />
        
         
          
       
      </Routes>
    </AuthProvider>
  );
};

export default App;


