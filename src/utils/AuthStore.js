// src/utils/AuthStore.js
import { makeAutoObservable } from "mobx";
import axiosInstance from "../utils/axiosInstance"; // Adjust the path as needed

class AuthStore {
    token = localStorage.getItem("token") || null;
    isAuthenticated = !!this.token;
    errors = null;
    roles = []; // Store user roles

    constructor() {
        makeAutoObservable(this);
        this.loadRoles(); // Load roles from localStorage
    }

    // Load roles from localStorage if present
    loadRoles() {
        const storedRoles = localStorage.getItem("roles");
        if (storedRoles) {
            try {
                this.roles = JSON.parse(storedRoles); // Опитай да парснеш JSON
                console.log("Loaded roles from localStorage:", this.roles); // Логване на заредените роли
            } catch (e) {
                console.error("Failed to parse roles from localStorage:", e);
                this.roles = []; // Нулирай ролите при грешка
            }
        } else {
            console.warn("No roles found in localStorage."); // Логване, ако няма роли
        }
    }

    // Register a new user
    async register(userData) {
        try {
            const response = await axiosInstance.post("/register", userData);
            console.log("Registration Response:", response.data); // Логване на отговора от регистрацията
            this.setToken(response.data.token, response.data.roles); // Set roles after registration
            return response.data;
        } catch (error) {
            this.errors = error.response ? error.response.data : error.message;
            console.error("Registration error:", this.errors); // Логване на грешка
        }
    }

    // Login user
    async login(userData) {
        try {
            const response = await axiosInstance.post("/login", userData);
            console.log("API Response:", response.data); // Логване на отговора от API-то
            this.setToken(response.data.token, response.data.roles);
            return response.data;
        } catch (error) {
            this.errors = error.response ? error.response.data : error.message;
            console.error("Login error:", this.errors); // Логване на грешка
        }
    }

    // Logout user
    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.roles = []; // Clear roles on logout
        localStorage.removeItem("token");
        localStorage.removeItem("roles"); // Also clear roles from local storage
        console.log("User logged out and roles cleared."); // Логване на изхода
    }

    // Set JWT token and update authentication state
    setToken(token, roles) {
        this.token = token;
        this.isAuthenticated = true;
        this.roles = Array.from(roles || []); // Копирай ролите в нов масив

        // Логване на ролите преди запис
        console.log("Saving roles to localStorage:", this.roles);

        localStorage.setItem("token", token);
        localStorage.setItem("roles", JSON.stringify(this.roles)); // Store roles in local storage
        this.errors = null; // Reset errors on successful login
    }

    // Check if user has a specific role
    hasRole(role) {
        const hasRole = this.roles.includes(role);
        console.log("Checking role:", role, "Available roles:", this.roles);
        return hasRole;
    }
}

const authStore = new AuthStore();
export default authStore; // Export the instance
