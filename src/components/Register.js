import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { TextField, Button, Container, Typography, Box } from "@mui/material"; // MUI components
import authStore from "../utils/AuthStore"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";

const Register = observer(() => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await authStore.register(form);
        // Check if the user is authenticated after registration
        if (authStore.isAuthenticated) {
            navigate("/dashboard"); // Redirect after registration
        } else {
            // Optionally provide user feedback if registration fails
            console.error("Registration failed:", authStore.errors); // Log errors to console
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
                {authStore.errors && (
                    <Typography color="error">{authStore.errors}</Typography> // Adjust based on your error structure
                )}
                <Box mt={2}>
                    <Button fullWidth type="submit" variant="contained" color="primary">
                        Register
                    </Button>
                </Box>
            </form>
        </Container>
    );
});

export default Register;
