import API from './api';


export const updateProfile = async (profileData, userId = '685e758150ed23b5362de641') => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await API.patch(
            `profiles/${userId}`,
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


export const getProfile = async (userId = '685e758150ed23b5362de641') => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await API.get(
            `profiles/${userId}`,
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
