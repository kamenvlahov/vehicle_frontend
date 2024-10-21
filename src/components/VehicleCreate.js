import React from "react";
import {TextField, Button, Box, MenuItem, Typography, Container} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite"; // Import observer
import vehicleCreateStore from "../stores/VehicleCreateStore"; // Import your store

const vehicleTypes = [
    {value: "motorcycle", label: "Motorcycle"},
    {value: "car", label: "Car"},
    {value: "truck", label: "Truck"},
    {value: "trailer", label: "Trailer"},
];

const VehicleCreate = observer(() => {
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        vehicleCreateStore.setFormData({[e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await vehicleCreateStore.submitVehicle();
        if (success) {
            navigate("/dashboard"); // Redirect to dashboard after successful creation
        }
    };

    // Fields for each vehicle type
    const renderSpecificFields = () => {
        switch (vehicleCreateStore.vehicleType) {
            case "motorcycle":
                return (
                    <>
                        <TextField
                            label="Engine Capacity"
                            name="engineCapacity"
                            value={vehicleCreateStore.formData.engineCapacity}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Color"
                            name="color"
                            value={vehicleCreateStore.formData.color}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                    </>
                );
            case "car":
                return (
                    <>
                        <TextField
                            label="Engine Capacity"
                            name="engineCapacity"
                            value={vehicleCreateStore.formData.engineCapacity}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Color"
                            name="color"
                            value={vehicleCreateStore.formData.color}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Number of Doors"
                            name="numberOfDoors"
                            value={vehicleCreateStore.formData.numberOfDoors}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            select
                            required
                        >
                            {[3, 4, 5].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Car Category"
                            name="carCategory"
                            value={vehicleCreateStore.formData.carCategory}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                    </>
                );
            case "truck":
                return (
                    <>
                        <TextField
                            label="Engine Capacity"
                            name="engineCapacity"
                            value={vehicleCreateStore.formData.engineCapacity}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Color"
                            name="color"
                            value={vehicleCreateStore.formData.color}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Number of Beds"
                            name="numberOfBeds"
                            value={vehicleCreateStore.formData.numberOfBeds}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            select
                            required
                        >
                            {[1, 2].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </>
                );
            case "trailer":
                return (
                    <>
                        <TextField
                            label="Load Capacity (kg)"
                            name="loadCapacity"
                            value={vehicleCreateStore.formData.loadCapacity}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Number of Axles"
                            name="numberOfAxles"
                            value={vehicleCreateStore.formData.numberOfAxles}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            select
                            required
                        >
                            {[1, 2, 3].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={4} mb={2}>
                <Typography variant="h4" align="center" gutterBottom>
                    Create New Vehicle
                </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
                <TextField
                    select
                    label="Vehicle Type"
                    value={vehicleCreateStore.vehicleType}
                    onChange={(e) => vehicleCreateStore.setVehicleType(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                >
                    {vehicleTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    label="Brand"
                    name="brand"
                    value={vehicleCreateStore.formData.brand}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Model"
                    name="model"
                    value={vehicleCreateStore.formData.model}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={vehicleCreateStore.formData.price}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={vehicleCreateStore.formData.quantity}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                />

                {/* Specific fields based on the vehicle type */}
                {renderSpecificFields()}

                {vehicleCreateStore.errors && (
                    <Typography color="error" align="center">
                        {vehicleCreateStore.errors || "Failed to create vehicle. Please try again."}
                    </Typography>
                )}

                <Box mt={3}>
                    <Button fullWidth variant="contained" color="primary" type="submit">
                        Create Vehicle
                    </Button>
                    <Button fullWidth variant="outlined" onClick={() => {
                        vehicleCreateStore.resetFormData(); // Reset form data
                        navigate('/dashboard'); // Navigate to dashboard
                         }} sx={{mt: 3}}>
                        Back to Dashboard
                    </Button>
                </Box>
            </form>
        </Container>
    );
});

export default VehicleCreate;
