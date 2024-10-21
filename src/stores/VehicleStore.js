// src/stores/VehicleStore.js
import { makeAutoObservable, runInAction } from "mobx";
import axiosInstance from '../utils/axiosInstance';

class VehicleStore {
    vehicles = [];
    loading = false;
    error = null;
    totalPages = 0;
    page = 1;
    followedVehicles = new Set();

    constructor() {
        makeAutoObservable(this);
    }

    async fetchVehicles(page = 1, limit = 5) { // Set a default limit
        this.loading = true;
        this.error = null;
        try {
            const response = await axiosInstance.get(`/api/vehicle/?page=${page}&limit=${limit}`);
            runInAction(() => {
                this.vehicles = response.data.data; // Store vehicle data
                this.totalPages = response.data.meta.total_pages; // Store total pages from meta
                this.page = response.data.meta.current_page; // Store current page from meta
            });
        } catch (error) {
            console.error("Failed to load vehicles", error);
            runInAction(() => {
                this.error = "Failed to load vehicles.";
            });
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async followVehicle(vehicleId) {
        try {
            const response = await axiosInstance.post(`/api/follow/${vehicleId}`);

            runInAction(() => {
                this.followedVehicles.add(vehicleId); // Add to followed vehicles set
                console.log(`Vehicle ${vehicleId} followed successfully.`);
            });
        } catch (error) {
            runInAction(() => {

                this.error = "Failed to follow vehicle";
            });
        }
    }

    setPage(page) {
        this.page = page;
        this.fetchVehicles(page);
    }
}

// Create an instance of the store and export it
const vehicleStore = new VehicleStore();
export default vehicleStore;
