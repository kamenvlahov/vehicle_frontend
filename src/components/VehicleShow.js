// src/components/ShowVehicle.js
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import vehicleViewStore from '../stores/VehicleViewStore'; // Import the store
import { observer } from 'mobx-react-lite'; // Import observer
import { Box, Typography, CircularProgress, Card, CardContent, Button } from '@mui/material';

const ShowVehicle = observer(() => { // Wrap the component with observer
    const { id } = useParams(); // To get the vehicle ID from the URL
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch vehicle details when component mounts
        vehicleViewStore.fetchVehicle(id);
    }, [id]);

    const { vehicle, loading, error } = vehicleViewStore; // Destructure from store

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    // Check if vehicle is null before accessing its properties
    if (!vehicle) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography color="error">Vehicle not found</Typography>
            </Box>
        );
    }

    // Render vehicle details based on the type
    const renderVehicleDetails = () => {
        switch (vehicle.type) {
            case 'VehicleMotorcycleParams':
                return (
                    <Card>
                        <CardContent>
                            <Typography variant="h5">{vehicle.data.brand} {vehicle.data.model}</Typography>
                            <Typography>Engine Capacity: {vehicle.data.engineCapacity}cc</Typography>
                            <Typography>Color: {vehicle.data.color}</Typography>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography>Quantity: {vehicle.data.quantity}</Typography>
                                <Typography variant="h6" fontWeight="bold">Price: ${vehicle.data.price}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                );
            case 'VehicleCarParams':
                return (
                    <Card>
                        <CardContent>
                            <Typography variant="h5">{vehicle.data.brand} {vehicle.data.model}</Typography>
                            <Typography>Engine Capacity: {vehicle.data.engineCapacity}cc</Typography>
                            <Typography>Color: {vehicle.data.color}</Typography>
                            <Typography>Number of Doors: {vehicle.data.numberOfDoors}</Typography>
                            <Typography>Car Category: {vehicle.data.carCategory}</Typography>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography>Quantity: {vehicle.data.quantity}</Typography>
                                <Typography variant="h6" fontWeight="bold">Price: ${vehicle.data.price}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                );
            case 'VehicleTruckParams':
                return (
                    <Card>
                        <CardContent>
                            <Typography variant="h5">{vehicle.data.brand} {vehicle.data.model}</Typography>
                            <Typography>Engine Capacity: {vehicle.data.engineCapacity}cc</Typography>
                            <Typography>Color: {vehicle.data.color}</Typography>
                            <Typography>Number of Beds: {vehicle.data.numberOfBeds}</Typography>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography>Quantity: {vehicle.data.quantity}</Typography>
                                <Typography variant="h6" fontWeight="bold">Price: ${vehicle.data.price}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                );
            case 'VehicleTrailerParams':
                return (
                    <Card>
                        <CardContent>
                            <Typography variant="h5">{vehicle.data.brand} {vehicle.data.model}</Typography>
                            <Typography>Load Capacity: {vehicle.data.loadCapacity}kg</Typography>
                            <Typography>Number of Axles: {vehicle.data.numberOfAxles}</Typography>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography>Quantity: {vehicle.data.quantity}</Typography>
                                <Typography variant="h6" fontWeight="bold">Price: ${vehicle.data.price}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                );
            default:
                return (
                    <Typography variant="h6" color="error">Unknown vehicle type</Typography>
                );
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Button variant="outlined" onClick={() => navigate('/dashboard')} sx={{ mb: 3 }}>
                Back to Dashboard
            </Button>
            <Typography variant="h4" gutterBottom>
                Vehicle Details
            </Typography>
            {renderVehicleDetails()}
        </Box>
    );
});

export default ShowVehicle;
