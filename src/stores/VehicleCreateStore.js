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
        this.resetFormData();
    }

    setFormData(data) {
        this.formData = { ...this.formData, ...data };
    }
    resetFormData() {
        this.formData = {
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
    }
    async submitVehicle() {
        try {
            await axiosInstance.post("/api/vehicle/", {
                type: this.vehicleType,
                ...this.formData,
            });
            this.resetFormData()
            return true;
        } catch (error) {
            runInAction(() => {
                this.errors = error.response?.data?.detail || error.message;
            });
            return false;
        }
    }
}

const vehicleCreateStore = new VehicleCreateStore();
export default vehicleCreateStore;
