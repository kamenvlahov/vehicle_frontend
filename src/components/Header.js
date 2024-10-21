import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import authStore from "../utils/AuthStore";

const Header = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleRegisterClick = () => {
        navigate("/register");
    };

    const handleLogoutClick = () => {
        authStore.logout();
        navigate("/login");
    };

    const getUsernameFromToken = () => {
        if (authStore.token) {
            const payload = JSON.parse(atob(authStore.token.split('.')[1]));
            return payload.username || "User";
        }
        return "User";
    };

    return (
        <AppBar position="sticky" color="primary">
            <Container>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Vehicle Dashboard
                    </Typography>

                    {authStore.isAuthenticated ? (
                        <Box display="flex" alignItems="center">
                            <Typography variant="body1" sx={{ marginRight: 2 }}>
                                Hello, {getUsernameFromToken()}
                            </Typography>
                            <Button color="inherit" onClick={handleLogoutClick}>
                                Logout
                            </Button>
                        </Box>
                    ) : (
                        <Box>
                            <Button color="inherit" onClick={handleLoginClick}>
                                Login
                            </Button>
                            <Button color="inherit" onClick={handleRegisterClick}>
                                Register
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
