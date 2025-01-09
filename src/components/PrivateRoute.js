import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAdminContext } from '../context/AdminContext';

const PrivateRoute = ({ children }) => {
    const { authState } = useAdminContext();

    return authState ? children : <Navigate to="/" />;
};

export default PrivateRoute;
