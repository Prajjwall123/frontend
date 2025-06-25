import API from './api';


const getScholarshipById = async (id) => {
    try {
        const response = await API.get(`/scholarships/${id}`);
        return response.data || null;
    } catch (error) {
        console.error(`Error fetching scholarship with ID ${id}:`, error);
        throw error;
    }
};


const getScholarshipsByIds = async (ids) => {
    if (!ids || ids.length === 0) return [];

    try {
        const scholarshipPromises = ids.map(id => getScholarshipById(id));
        const results = await Promise.all(scholarshipPromises);

        return results.filter(scholarship => scholarship !== null);
    } catch (error) {
        console.error('Error fetching scholarships:', error);
        throw error;
    }
};


const getScholarshipsByUniversityId = async (universityId) => {
    try {
        const response = await API.get(`/scholarships/university/${universityId}`);
        // Return the nested scholarships array from the response
        return response.data?.scholarships || [];
    } catch (error) {
        console.error(`Error fetching scholarships for university ${universityId}:`, error);
        return [];
    }
};

export { getScholarshipById, getScholarshipsByIds, getScholarshipsByUniversityId };
