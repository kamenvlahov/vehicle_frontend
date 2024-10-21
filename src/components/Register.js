import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { TextField, Button, Container, Typography, Box, CircularProgress } from "@mui/material";
import authStore from "../utils/AuthStore";
import { useNavigate } from "react-router-dom";

const Register = observer(() => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        await authStore.register(form);
        setLoading(false);

        if (authStore.isAuthenticated) {
            setForm({ email: "", password: "" });
            navigate("/dashboard");
        } else {
            setError(typeof authStore.errors === 'string' ? authStore.errors : 'Registration failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5} mb={2}>
                <Typography variant="h4" component="h2" align="center">
                    Register
                </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </Box>
                {error && (
                    <Typography color="error" mb={2}>{error}</Typography>
                )}
                <Box mt={2}>
                    <Button fullWidth type="submit" variant="contained" color="primary" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : "Register"} {/* Show loading indicator */}
                    </Button>
                </Box>
            </form>
        </Container>
    );
});

export default Register;
