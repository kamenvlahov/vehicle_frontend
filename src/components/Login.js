
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import authStore from '../utils/AuthStore';
import { useNavigate } from 'react-router-dom';

const Login = observer(() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        await authStore.login({ email, password });

        if (authStore.isAuthenticated) {
            navigate('/dashboard');
        } else {
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
                        label="Email"
                        type="email"
                        value={email}
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
