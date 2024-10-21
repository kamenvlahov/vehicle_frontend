// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import PrivateRoute from './components/PrivateRoute';
import VehicleShow from "./components/VehicleShow";
import Header from "./components/Header";
import VehicleCreate from "./components/VehicleCreate";
import FollowedVehicles from "./components/FollowedVehicles";

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/dashboard"
                        element={<PrivateRoute element={<Dashboard />} roles={['ROLE_USER', 'ROLE_ADMIN']} />}
                    />
                    <Route
                        path="/vehicle/:id"
                        element={<PrivateRoute element={<VehicleShow />} />}
                    />
                    <Route
                        path="/create-vehicle"
                        element={<PrivateRoute element={<VehicleCreate />} roles={['ROLE_ADMIN']} />}
                    />
                    <Route
                        path="/followed"
                        element={<PrivateRoute element={<FollowedVehicles />} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
