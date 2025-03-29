import api from "../../services/axios"

export const AuthService = {
	register: async (userData) => {
		try {
			const response = await api.post("/register", userData);
			return response.data;
		} catch (error) {
			throw error.response?.data || error;
		}
	},

	login: async (credentials) => {
		try {
			// Get CSRF cookie first (needed for Laravel)
			await api.get("/csrf-cookie");

      const response = await api.post("/login", credentials);
			return response.data;
		} catch (error) {
			throw error.response?.data || error;
		}
	},

	logout: async () => {
		try {
			const response = await api.post("/logout");
			return response.data;
		} catch (error) {
			throw error.response?.data || error;
		}
	},

	getCurrentUser: async () => {
		try {
			const response = await api.get("/user");
			return response.data.user;
		} catch (error) {
			return error;
		}
	},
};
