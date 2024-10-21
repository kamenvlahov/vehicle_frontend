import React, { useEffect, useState } from 'react'; // Импортирай useEffect и useState
import { observer } from 'mobx-react'; // Импортирай observer от mobx-react
import { useNavigate } from 'react-router-dom'; // Импортирай useNavigate
import {
    Box,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    IconButton,
    Pagination,
    Button,
    Snackbar,
    Alert // Импортирай всички MUI компоненти
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import vehicleStore from '../stores/VehicleStore';
import authStore from '../utils/AuthStore';

function handleFollowList() {

}

const Dashboard = observer(() => {
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        vehicleStore.fetchVehicles(vehicleStore.page);
    }, []);

    const handleCardClick = (id) => {
        navigate(`/vehicle/${id}`); // Навигирай към страницата с детайли за превозното средство
    };

    const handleFollowClick = async (vehicleId, e) => {
        e.stopPropagation();
        try {
            await vehicleStore.followVehicle(vehicleId); // Call the followVehicle method
        } catch (error) {
            console.error("Error following vehicle:", error); // Handle any errors
        }
    };


    const handlePageChange = (event, value) => {
        vehicleStore.setPage(value); // Обнови страницата и вземи новите данни
    };

    const handleCreateClick = () => {
        if (authStore.roles.includes("ROLE_ADMIN")) {
            navigate('/create-vehicle');
        } else {
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (vehicleStore.loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 5 }}>
            <Typography variant="h4" gutterBottom>
                Vehicle List
            </Typography>
            <Box mb={3}>

                {authStore.roles.includes("ROLE_ADMIN") && (
                    <Button variant="contained" color="primary" onClick={handleCreateClick}>
                        Create Vehicle
                    </Button>
                )}

                <Button variant="contained" onClick={() => navigate('/followed')} sx={{ ml: 3 }}>
                    Followed vehicles
                </Button>
            </Box>

            {vehicleStore.error && (
                <Box mb={3}>
                    <Alert severity="error" onClose={() => (vehicleStore.error = null)}>
                        {vehicleStore.error} — <strong>please try again!</strong>
                    </Alert>
                </Box>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
                    You do not have permission to create a vehicle.
                </Alert>
            </Snackbar>

            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                {vehicleStore.vehicles.length > 0 ? (
                    vehicleStore.vehicles.map((vehicle) => (
                        <Box key={vehicle.id} sx={{ width: { xs: '100%', sm: '48%', md: '30%' }, mb: 3 }}>
                            <Card
                                sx={{ position: 'relative', cursor: 'pointer', height: '100%' }}
                                onClick={() => handleCardClick(vehicle.id)}
                            >
                                <CardContent>
                                    <IconButton
                                        sx={{ position: 'absolute', top: 8, right: 8, color: 'red' }}
                                        color="secondary"
                                        onClick={(e) => handleFollowClick(vehicle.id, e)}
                                    >
                                        <FavoriteIcon />
                                    </IconButton>
                                    <Typography variant="h6">{vehicle.brand} {vehicle.model}</Typography>
                                    <Typography color="text.primary" sx={{ fontWeight: 'bold' }}>
                                        Price: ${vehicle.price}
                                    </Typography>
                                    <Typography color="text.secondary">Quantity: {vehicle.quantity}</Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))
                ) : (
                    <Typography variant="h6" align="center" color="textSecondary">
                        No vehicles available
                    </Typography>
                )}
            </Box>

            {/* Pagination Controls */}
            <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                    count={vehicleStore.totalPages}
                    page={parseInt(vehicleStore.page, 10)}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                />
            </Box>
        </Box>
    );
});

export default Dashboard;
