import API from './api';

const getUniversities = async () => {
    try {
        const response = await API.get("/universities");
        return response.data || [];
    } catch (error) {
        console.error('Error fetching universities:', error);
        throw error;
    }
};

const getUniversityById = async (id) => {
    try {
        const response = await API.get(`/universities/${id}`);
        return response.data || null;
    } catch (error) {
        console.error(`Error fetching university with ID ${id}:`, error);
        throw error;
    }
};

export { getUniversities, getUniversityById };
