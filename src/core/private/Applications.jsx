import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, FileText, Loader2 } from 'lucide-react';
import { getUserApplications } from '../../utils/applicationHelper';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sopModal, setSopModal] = useState({ open: false, applicationId: null, sop: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                const data = await getUserApplications();
                setApplications(data);
            } catch (error) {
                console.error('Error fetching applications:', error);
                toast.error('Failed to load applications');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleEditApplication = (applicationId) => {
        // Navigate to edit page or open edit modal
        console.log('Edit application:', applicationId);
    };

    const handleUpdateSOP = (application) => {
        navigate('/sop-writer', {
            state: {
                applicationId: application._id,
                course: application.course,
                university: {
                    ...application.course.university,
                    university_photo: application.course.university.university_photo || null
                },
                intake: application.intake,
                currentSOP: application.sop || ''
            }
        });
    };

    const handleSOPSubmit = async (e) => {
        e.preventDefault();
        try {
            // TODO: Implement SOP update API call
            console.log('Updating SOP for:', sopModal.applicationId, sopModal.sop);
            // await updateApplicationSOP(sopModal.applicationId, sopModal.sop);
            toast.success('SOP updated successfully');
            setSopModal({ open: false, applicationId: null, sop: '' });
            // Refresh applications
            const data = await getUserApplications();
            setApplications(data);
        } catch (error) {
            console.error('Error updating SOP:', error);
            toast.error('Failed to update SOP');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 mt-26">
                <div className="max-w-7xl mx-auto">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-2xl font-semibold text-gray-900">My Applications</h1>
                            <p className="mt-2 text-sm text-gray-700">
                                A list of all your course applications including their current status.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Application ID
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    University
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Course
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Status
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                    <span className="sr-only">Actions</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {applications.length > 0 ? (
                                                applications.map((application) => (
                                                    <tr key={application._id}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                            {application._id.substring(0, 8)}...
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {application.course?.university?.university_name || 'N/A'}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {application.course?.course_name || 'N/A'}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${application.status === 'submitted'
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : application.status === 'approved'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-yellow-100 text-yellow-800'
                                                                }`}>
                                                                {application.status || 'pending'}
                                                            </span>
                                                        </td>
                                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-2">
                                                            <button
                                                                onClick={() => handleEditApplication(application._id)}
                                                                className="text-blue-600 hover:text-blue-900"
                                                            >
                                                                <Edit className="h-5 w-5" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleUpdateSOP(application)}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                                title="Update SOP"
                                                            >
                                                                <FileText className="h-5 w-5" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                                        No applications found. Start by applying to a course.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            {/* SOP Update Modal */}
            {sopModal.open && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Update Statement of Purpose</h3>
                                        <div className="mt-4">
                                            <form onSubmit={handleSOPSubmit}>
                                                <div>
                                                    <label htmlFor="sop" className="block text-sm font-medium text-gray-700">
                                                        Your Statement of Purpose
                                                    </label>
                                                    <div className="mt-1">
                                                        <textarea
                                                            id="sop"
                                                            name="sop"
                                                            rows={8}
                                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                                            placeholder="Explain why you want to join this course..."
                                                            value={sopModal.sop}
                                                            onChange={(e) => setSopModal({ ...sopModal, sop: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                                    <button
                                                        type="submit"
                                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                                                    >
                                                        Update SOP
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                                        onClick={() => setSopModal({ open: false, applicationId: null, sop: '' })}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Applications;
