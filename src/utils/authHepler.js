import API from './api';

const loginUser = async (credentials) => {
    try {
        const response = await API.post("/users/login", credentials);

        localStorage.setItem("token", response.data.token);

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Network error" };
    }
};

const registerUser = async (userData) => {
    try {
        const response = await API.post("/users/register", userData);
        return response.data;
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;
    }
};

const verifyOTP = async (payload, navigate) => {
    try {
        const response = await API.post("/users/verify-otp", payload);
        const verifiedUser = response.data;
        return verifiedUser;
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : { message: "Network error" };
    }
};

export { loginUser, registerUser, verifyOTP };