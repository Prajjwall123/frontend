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