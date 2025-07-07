import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, FileText, Loader2, Calendar, BookOpen, Building2, Clock, Search, X } from 'lucide-react';
import { getUserApplications, cancelApplication } from '../../utils/applicationHelper';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    submitted: 'bg-blue-100 text-blue-800',
    under_review: 'bg-purple-100 text-purple-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800'
};

const statusLabels = {
    pending: 'Pending',
    submitted: 'Submitted',
    under_review: 'Under Review',
    accepted: 'Accepted',
    rejected: 'Rejected',
    cancelled: 'Cancelled'
};

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
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

    const handleCancelApplication = async (applicationId) => {
        if (window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
            try {
                await cancelApplication(applicationId);
                // Remove the deleted application from the list
                setApplications(applications.filter(app => app._id !== applicationId));
                toast.success('Application deleted successfully');
            } catch (error) {
                console.error('Error deleting application:', error);
                toast.error(error.response?.data?.message || 'Failed to delete application');
            }
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const filteredApplications = applications.filter(app => {
        const searchLower = searchTerm.toLowerCase();
        return (
            app.course.course_name.toLowerCase().includes(searchLower) ||
            app.course.university.university_name.toLowerCase().includes(searchLower) ||
            app.status.toLowerCase().includes(searchLower)
        );
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading your applications...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ">
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 mt-16">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Track and manage all your course applications in one place
                            </p>
                        </div>
                        <div className="relative w-full sm:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Search applications..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {filteredApplications.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-1">No applications found</h3>
                            <p className="text-gray-500 mb-6">
                                {searchTerm ? 'No applications match your search.' : 'You haven\'t applied to any courses yet.'}
                            </p>
                            {!searchTerm && (
                                <button
                                    onClick={() => navigate('/programs')}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Browse Courses
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                            {filteredApplications.map((application) => (
                                <div key={application._id} className="bg-white overflow-hidden shadow rounded-xl hover:shadow-md transition-shadow duration-200">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {application.course.course_name}
                                                    </h3>
                                                    <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[application.status] || 'bg-gray-100 text-gray-800'}`}>
                                                        {statusLabels[application.status] || application.status}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {application.course.university.university_name}
                                                </p>
                                            </div>
                                            <div className="flex space-x-2">
                                                {application.status !== 'cancelled' && application.status !== 'rejected' && (
                                                    <button
                                                        onClick={() => handleCancelApplication(application._id)}
                                                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                        disabled={application.status === 'cancelled'}
                                                    >
                                                        <X className="h-4 w-4 mr-1.5" />
                                                        Cancel
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleUpdateSOP(application)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    <Edit className="h-4 w-4 mr-1.5" />
                                                    Update SOP
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                                            <div className="flex items-start">
                                                <Calendar className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-500">Intake</p>
                                                    <p className="text-sm text-gray-900 capitalize">
                                                        {application.intake || 'Not specified'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <Clock className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-500">Applied on</p>
                                                    <p className="text-sm text-gray-900">
                                                        {application.appliedAt ? formatDate(application.appliedAt) : 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <Clock className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-500">Last updated on</p>
                                                    <p className="text-sm text-gray-900">
                                                        {application.updatedAt ? formatDate(application.updatedAt) : 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-5 flex justify-end space-x-3">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                onClick={() => navigate(`/course/${application.course._id}`)}
                                            >
                                                View Course
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Applications;
