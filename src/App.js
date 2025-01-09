import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

// User components
import LoginOptionsPage from './pages/LoginOptionsPage';
import Login from './pages/user/Login';
import UserRegisterPage from './pages/user/UserRegister';
import ForgotPassword from './pages/user/Forgotpassword';
import UserDashboard from './pages/user/UserDashboard';
import UserHallList from './pages/user/UserHallList';
import BookingFormPage from './pages/user/BookingFormPage';

// Admin components
import AdminLoginPage from './pages/admin/AdminLogin';
import AdminRegisterPage from './pages/admin/AdminRegister';
import AdminDashboard from './pages/admin/AdminDashboard';
import HallRegister from './pages/admin/HallRegister';
import HallList from './pages/admin/HallList';
import BookingList from './pages/admin/BookingList';
import InvoiceSendPage from './pages/admin/Invoice';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* User routes */}
      <Route path="/user-login" element={<Login />} />
      <Route path="/login-options" element={<LoginOptionsPage />} />
      <Route path="/user-signup" element={<UserRegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/user-hall-list" element={<UserHallList />} />
      <Route path="/booking-form" element={<BookingFormPage />} />

      {/* Admin routes */}
      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route path="/admin-signup" element={<AdminRegisterPage />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/post-hall" element={<HallRegister />} />
      <Route path="/update-hall-list" element={<HallList />} />
      <Route path="/booked-halls" element={<BookingList />} />
      <Route path="/invoices" element={<InvoiceSendPage />} />
    </Routes>
  );
};

export default App;