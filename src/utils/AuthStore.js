import {makeAutoObservable} from "mobx";
import axiosInstance from "../utils/axiosInstance";

class AuthStore {
    token = localStorage.getItem("token") || null;
    isAuthenticated = !!this.token;
    errors = null;
    roles = [];

    constructor() {
        makeAutoObservable(this);
        this.loadRoles();
    }

    loadRoles() {
        const storedRoles = localStorage.getItem("roles");
        if (storedRoles) {
            try {
                this.roles = JSON.parse(storedRoles);
            } catch (e) {
                this.roles = []; // Reset roles on error
            }
        } else {
            console.warn("No roles found in localStorage.");
        }
    }

    async register(userData) {
        this.errors = null;
        try {
            const response = await axiosInstance.post("/register", userData);
            console.log("Registration Response:", response.data);
            this.setToken(response.data.token, response.data.roles);
            return response.data;
        } catch (error) {

            if (error.response && error.response.data) {
                this.errors = error.response.data.errors || error.response.data;
            } else {
                this.errors = error.message;
            }
            console.error("Registration error:", this.errors);
        }
    }

    async login(userData) {
        // this.errors = null;
        console.log(this.errors)
        try {
            const response = await axiosInstance.post("/login", userData);
            this.setToken(response.data.token, response.data.roles);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                this.errors = error.response.data.errors || error.response.data;
            } else {
                this.errors = error.message;
            }
            console.error("Login error:", this.errors);
        }
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.roles = [];
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        console.log("User logged out and roles cleared.");
    }

    setToken(token, roles) {
        this.token = token;
        this.isAuthenticated = true;
        this.roles = Array.from(roles || []);

        console.log("Saving roles to localStorage:", this.roles);

        localStorage.setItem("token", token);
        localStorage.setItem("roles", JSON.stringify(this.roles));
        this.errors = null; // Reset errors on successful login
    }

    hasRole(role) {
        const hasRole = this.roles.includes(role);
        console.log("Checking role:", role, "Available roles:", this.roles);
        return hasRole;
    }
}

const authStore = new AuthStore();
export default authStore;
