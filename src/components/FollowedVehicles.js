import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import {
    Card,
    CardContent,
    Typography,
    Box,
    CircularProgress,
    Button,
    Pagination,
    Alert,
    AlertTitle,
    Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FollowedVehicles = () => {
    const [items, setItems] = useState([]); // Change variable name from vehicles to items
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1); // Track total pages
    const navigate = useNavigate(); // Hook for navigation
    const limit = 10; // Number of items per page

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            setError(null); // Reset error before making a new request
            try {
                const response = await axiosInstance.get(`/api/follow/?page=${page}&limit=${limit}`);
                setItems(response.data.data); // Adjust according to actual data structure
                setTotalPages(response.data.meta.total_pages); // Adjust according to actual meta structure
                setLoading(false);
            } catch (error) {
                console.error('Error fetching items:', error);
                setError('Failed to load items. Please try again later.');
                setLoading(false);
            }
        };

        fetchItems();
    }, [page]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    const handleCardClick = (id) => {
        navigate(`/vehicle/${id}`);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Follow List
            </Typography>
            <Box  mb={5}>
                <Button variant="contained" color="primary" onClick={() => navigate("/dashboard")}>
                    Dashboard
                </Button>
            </Box>
            {/* Display Error Message */}
            {error && (
                <Box mb={3}>
                    <Alert severity="error" onClose={() => setError(null)}>
                        <AlertTitle>Error</AlertTitle>
                        {error} — <strong>please try again!</strong>
                    </Alert>
                </Box>
            )}

            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                {items.length > 0 ? (
                    items.map((item) => (
                        <Box key={item.vehicle.id} sx={{ width: { xs: '100%', sm: '45%', md: '30%' }, mb: 2 }}>
                            <Card sx={{ position: 'relative', cursor: 'pointer' }} onClick={() => handleCardClick(item.vehicle.id)}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {item.vehicle.name}
                                    </Typography>
                                    <Typography color="text.primary" sx={{ fontWeight: 'bold' }}>
                                        {item.vehicle.brand}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Model: {item.vehicle.model}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Price: ${item.vehicle.price}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Quantity: {item.vehicle.quantity}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))
                ) : (
                    <Typography variant="h6" align="center" color="textSecondary">
                        No items available
                    </Typography>
                )}
            </Box>


            <Box display="flex" justifyContent="center" mt={10}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                />
            </Box>
        </Box>
    );
};

export default FollowedVehicles;
