// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import authStore from '../utils/AuthStore';

const PrivateRoute = ({ element, roles }) => {
    const isAuthorized = roles ? roles.some(role => authStore.hasRole(role)) : true;

    console.log("AuthStore:", authStore);
    console.log("User Roles:", Array.from(authStore.roles));
    console.log("PrivateRoute Props:", { element, roles });

    // Проверка дали потребителят е аутентифициран
    if (!authStore.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Проверка дали потребителят има необходимите роли
    if (roles && !isAuthorized) {
        return <Navigate to="/dashboard" />;
    }

    // Връщаме предадения компонент, ако всичко е наред
    return element;
};

export default PrivateRoute;
