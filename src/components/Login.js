// src/components/Login.js
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { TextField, Button, Container, Typography, Box } from "@mui/material"; // MUI components
import authStore from '../utils/AuthStore'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

const Login = observer(() => {
    const [email, setEmail] = useState(''); // Changed from username to email
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State for error messages
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state before attempting login

        // Attempt to log in the user
        await authStore.login({ email, password }); // Use email instead of username

        // Check if the login was successful
        if (authStore.isAuthenticated) {
            navigate('/dashboard'); // Navigate to dashboard after successful login
        } else {
            // Check if authStore.errors is an object and extract the message
            const errorMessage = typeof authStore.errors === 'object'
                ? authStore.errors.message || 'Login failed. Please try again.'
                : authStore.errors || 'Login failed. Please try again.';

            setError(errorMessage); // Set error message if login fails
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5} mb={2}>
                <Typography variant="h4" component="h2" align="center">
                    Login
                </Typography>
            </Box>
            <form onSubmit={handleLogin}>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Email" // Updated label
                        type="email" // Ensure type is set to email
                        value={email} // Changed from username to email
                        onChange={(e) => setEmail(e.target.value)} // Changed from username to email
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Box>
                {error && (
                    <Typography color="error" align="center">
                        {error} {/* Render error message */}
                    </Typography>
                )}
                <Box mt={2}>
                    <Button fullWidth type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                </Box>
            </form>
        </Container>
    );
});

export default Login;
