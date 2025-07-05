import API from './api';
import { getUserInfo } from './authHelper';

export const updateProfile = async (profileData) => {
    try {
        const { _id } = getUserInfo();
        if (!_id) {
            throw new Error('No user is currently logged in');
        }

        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await API.patch(
            `profiles/${_id}`,
            profileData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error.response?.data || error;
    }
};

export const getProfile = async () => {
    try {
        const { _id } = getUserInfo();
        if (!_id) {
            throw new Error('No user is currently logged in');
        }

        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await API.get(
            `profiles/${_id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error.response?.data || error;
    }
};
