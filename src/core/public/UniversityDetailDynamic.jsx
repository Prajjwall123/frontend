import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Award, Users, Globe, BookOpen, Check, Calendar, ExternalLink } from 'lucide-react';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getUniversityById } from '../../utils/universityHelper';
import { getCourseById } from '../../utils/coursesHelper';

const UniversityDetailDynamic = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [programs, setPrograms] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch university data
    const { data: university, isLoading, error } = useQuery({
        queryKey: ['university', id],
        queryFn: () => getUniversityById(id),
    });

    // Fetch courses when university data is loaded
    useEffect(() => {
        if (university?.courses?.length) {
            Promise.all(university.courses.map(courseId => getCourseById(courseId)))
                .then(fetchedCourses => {
                    setPrograms(fetchedCourses.filter(course => course !== null));
                })
                .catch(console.error);
        }
    }, [university]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Navbar />
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="animate-pulse space-y-4 w-full max-w-4xl">
                        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-64 bg-gray-200 rounded mt-6"></div>
                        <div className="h-32 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !university) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading University</h2>
                    <p className="text-gray-600 mb-6">We couldn't load the university details. Please try again later.</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    const filteredPrograms = programs.filter(program => program.course_name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="pt-16">
                {/* University Header */}
                <div className="bg-white border-b border-gray-200">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-1">
                                    {university.university_photo ? (
                                        <img
                                            src={`http://localhost:3000/api/images/${university.university_photo}`}
                                            alt={`${university.university_name} logo`}
                                            className="max-w-full max-h-full object-contain"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/64?text=Logo';
                                            }}
                                        />
                                    ) : (
                                        <div className="text-gray-400 text-xs text-center">No Logo</div>
                                    )}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{university.university_name}</h1>
                                    <div className="flex items-center text-gray-600 text-sm mt-1">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {university.location || `${university.city}, ${university.country}`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 py-6">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row gap-6 items-start">
                            {/* Left Column - Main Content */}
                            <div className="lg:w-2/3 w-full space-y-6">
                                {/* Tabs Navigation */}
                                <div className="bg-white rounded-lg border border-gray-200">
                                    <div className="border-b border-gray-200">
                                        <nav className="flex -mb-px">
                                            <button
                                                onClick={() => setActiveTab('overview')}
                                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'overview'
                                                    ? 'border-blue-500 text-blue-600'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                            >
                                                Overview
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('programs')}
                                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'programs'
                                                    ? 'border-blue-500 text-blue-600'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                            >
                                                Programs
                                            </button>
                                        </nav>
                                    </div>
                                    <div className="p-6">
                                        {activeTab === 'overview' ? (
                                            <div className="space-y-6">
                                                {/* About Widget */}
                                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                                    <h2 className="text-xl font-semibold mb-4">About {university.university_name}</h2>
                                                    <p className="text-gray-700">{university.about_us || 'No description available.'}</p>
                                                </div>

                                                {/* Key Information Widget */}
                                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                                    <h2 className="text-xl font-semibold mb-4">Key Information</h2>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="flex items-center">
                                                            <Award className="w-5 h-5 text-blue-600 mr-2" />
                                                            <span>Established: {university.founded || 'N/A'}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Users className="w-5 h-5 text-blue-600 mr-2" />
                                                            <span>Institution Type: {university.institution_type || 'N/A'}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                                                            <span>Location: {university.location || `${university.city}, ${university.country}`}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                                                            <span>Programs: {programs.length}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Contact Information Widget */}
                                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                                    <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                                                    <div className="space-y-4">
                                                        <div className="flex items-start">
                                                            <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                                            </svg>
                                                            <div>
                                                                <p className="font-medium text-gray-900">Email</p>
                                                                <a href={`mailto:${university.email}`} className="text-blue-600 hover:underline">
                                                                    {university.email || 'N/A'}
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start">
                                                            <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                                            </svg>
                                                            <div>
                                                                <p className="font-medium text-gray-900">Phone</p>
                                                                <a href={`tel:${university.phone}`} className="text-blue-600 hover:underline">
                                                                    {university.phone || 'N/A'}
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start">
                                                            <Globe className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                                                            <div>
                                                                <p className="font-medium text-gray-900">Website</p>
                                                                <a href={university.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                                                                    {university.website?.replace(/^https?:\/\//, '') || 'N/A'}
                                                                    <ExternalLink className="ml-1 w-4 h-4" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start">
                                                            <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                            </svg>
                                                            <div>
                                                                <p className="font-medium text-gray-900">Address</p>
                                                                <p className="text-gray-600">
                                                                    {university.address || `${university.city}, ${university.country}`}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : programs.length > 0 ? (
                                            <div className="space-y-4">
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                                    <h3 className="text-xl font-semibold">Available Programs ({filteredPrograms.length})</h3>
                                                    <div className="w-full sm:w-64">
                                                        <input
                                                            type="text"
                                                            value={searchQuery}
                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                            placeholder="Search programs..."
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    {filteredPrograms.map((program) => (
                                                        <div key={program._id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                                <div>
                                                                    <h4 className="text-lg font-semibold text-gray-900">{program.course_name}</h4>
                                                                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                                                                        <span className="flex items-center">
                                                                            <BookOpen className="w-4 h-4 mr-1.5 text-blue-600" />
                                                                            {program.course_level ? program.course_level.charAt(0).toUpperCase() + program.course_level.slice(1) : 'N/A'}
                                                                        </span>
                                                                        <span className="flex items-center">
                                                                            <Calendar className="w-4 h-4 mr-1.5 text-blue-600" />
                                                                            {program.course_duration || 'N/A'}
                                                                        </span>
                                                                        {program.intake && (
                                                                            <span className="flex items-center">
                                                                                <svg className="w-4 h-4 mr-1.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                                                </svg>
                                                                                {program.intake}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col items-end">
                                                                    <span className="text-lg font-semibold text-blue-600">
                                                                        {program.course_tuition ? `$${program.course_tuition.toLocaleString()}` : 'Contact for pricing'}
                                                                    </span>
                                                                    <span className="text-sm text-gray-500">
                                                                        {program.application_fee ? `+ $${program.application_fee} application fee` : 'No application fee'}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {program.about && (
                                                                <div className="mt-3 text-gray-700">
                                                                    {program.about}
                                                                </div>
                                                            )}

                                                            {(program.modules?.length > 0 || program.entry_requirements?.length > 0) && (
                                                                <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
                                                                    {program.entry_requirements?.length > 0 && (
                                                                        <div>
                                                                            <h5 className="text-sm font-medium text-gray-900 mb-2">Entry Requirements:</h5>
                                                                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                                                                {program.entry_requirements.map((req, idx) => (
                                                                                    <li key={`req-${idx}`}>{req}</li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    )}
                                                                    {program.modules?.length > 0 && (
                                                                        <div>
                                                                            <h5 className="text-sm font-medium text-gray-900 mb-2">Key Modules:</h5>
                                                                            <div className="flex flex-wrap gap-2">
                                                                                {program.modules.map((module, idx) => (
                                                                                    <span key={`module-${idx}`} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                                                                                        {module}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-12">
                                                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                                                <h3 className="mt-2 text-lg font-medium text-gray-900">No programs available</h3>
                                                <p className="mt-1 text-gray-500">This university hasn't listed any programs yet.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Quick Facts and Scholarships */}
                            <div className="lg:w-1/3 w-full space-y-6">
                                {/* Scholarships Widget */}
                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <h2 className="text-xl font-semibold mb-4">Scholarships</h2>
                                    <p className="text-gray-500">No scholarships available at the moment.</p>
                                </div>

                                {/* Quick Facts Widget */}
                                <div className="bg-white rounded-lg border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold mb-4">Quick Facts</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Institution Type</span>
                                            <span className="font-medium capitalize">{university.institution_type || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Established</span>
                                            <span className="font-medium">{university.founded || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Location</span>
                                            <span className="font-medium text-right">
                                                {university.location || `${university.city}, ${university.country}`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Average Tuition</span>
                                            <span className="font-medium">
                                                {university.average_gross_tuition ? `£${university.average_gross_tuition}` : 'N/A'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Cost of Living</span>
                                            <span className="font-medium">
                                                {university.average_cost_of_living ? `£${university.average_cost_of_living}/year` : 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UniversityDetailDynamic;
