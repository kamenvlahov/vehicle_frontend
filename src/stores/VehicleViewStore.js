// src/stores/VehicleViewStore.js
import { makeAutoObservable } from 'mobx';
import axiosInstance from '../utils/axiosInstance';

class VehicleViewStore {
    vehicle = null;
    loading = false;
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchVehicle(id) {
        this.loading = true;
        this.error = null;

        try {
            const response = await axiosInstance.get(`/api/vehicle/${id}`);
            this.vehicle = response.data;
        } catch (error) {
            this.error = 'Failed to load vehicle details';
        } finally {
            this.loading = false;
        }
    }
}

const vehicleViewStore = new VehicleViewStore();
export default vehicleViewStore;
