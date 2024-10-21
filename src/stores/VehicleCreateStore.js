// stores/VehicleCreateStore.js
import { makeAutoObservable, runInAction } from "mobx";
import axiosInstance from '../utils/axiosInstance';

class VehicleCreateStore {
    vehicleType = "motorcycle";
    formData = {
        brand: "",
        model: "",
        price: "",
        quantity: "",
        engineCapacity: "",
        color: "",
        numberOfDoors: "",
        carCategory: "",
        numberOfBeds: "",
        loadCapacity: "",
        numberOfAxles: "",
    };
    errors = null;

    constructor() {
        makeAutoObservable(this);
    }

    setVehicleType(type) {
        this.vehicleType = type;
    }

    setFormData(data) {
        this.formData = { ...this.formData, ...data };
    }

    async submitVehicle() {
        try {
            await axiosInstance.post("/api/vehicle/", {
                type: this.vehicleType,
                ...this.formData,
            });
            return true; // Indicate success
        } catch (error) {
            runInAction(() => {
                this.errors = error.response ? error.response.data : error.message;
            });
            return false; // Indicate failure
        }
    }
}

const vehicleCreateStore = new VehicleCreateStore();
export default vehicleCreateStore;
