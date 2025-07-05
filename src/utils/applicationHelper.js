import API from './api';
import { getUserInfo } from './authHelper';

/**
 * Create a new application
 * @param {string} courseId - The ID of the course to apply for
 * @param {string} intake - The selected intake
 * @returns {Promise<Object>} The created application data
 */
export const createApplication = async (courseId, intake) => {
    try {
        const user = getUserInfo();
        if (!user || !user._id) {
            throw new Error('User not authenticated');
        }

        const response = await API.post('/applications', {
            userId: user._id,
            courseId,
            intake
        });

        return response.data;
    } catch (error) {
        console.error('Error creating application:', error);
        throw error;
    }
};

/**
 * Get all applications for the current user
 * @returns {Promise<Array>} List of user's applications
 */
export const getUserApplications = async () => {
    try {
        const user = getUserInfo();
        if (!user || !user._id) {
            throw new Error('User not authenticated');
        }

        const response = await API.get(`/applications/user/${user._id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user applications:', error);
        throw error;
    }
};
