import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Check, Calendar, ExternalLink, GraduationCap, Clock, CreditCard } from 'lucide-react';
import { getCourseById } from '../../utils/coursesHelper';
import { getScholarshipsByUniversityId } from '../../utils/scholarshipHelper';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scholarships, setScholarships] = useState([]);
  const [isLoadingScholarships, setIsLoadingScholarships] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        const courseData = await getCourseById(id);
        setCourse(courseData);

        // Fetch scholarships for the university
        if (courseData.university?._id) {
          await fetchUniversityScholarships(courseData.university._id);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const fetchUniversityScholarships = async (universityId) => {
    try {
      setIsLoadingScholarships(true);
      const scholarshipsData = await getScholarshipsByUniversityId(universityId);
      setScholarships(scholarshipsData);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      setScholarships([]);
    } finally {
      setIsLoadingScholarships(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mt-8"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
            <button
              onClick={() => navigate(-1)}
              className="text-blue-600 hover:underline flex items-center justify-center mx-auto"
            >
              <ArrowLeft size={16} className="mr-1" />
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Format currency
  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return 'N/A';
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar className="fixed top-0 w-full z-50" />

      <div className="pt-16">
        {/* Course Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center">
                {course.university?.photo && (
                  <div className="w-10 h-10 bg-white rounded-full border border-gray-200 flex items-center justify-center mr-3 overflow-hidden">
                    <img
                      src={`http://localhost:3000${course.university.photo}`}
                      alt={`${course.university.name} logo`}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2QjcyN0UiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1ncmFkdWF0aW9uLWNhcCI+PHBhdGggZD0ibTggMTQgMiAyIDQtNCIvPjxwYXRoIGQ9Ik0yMiAxMGMwIDYtNCAxMC0xMCAxMFMyIDIxLjMgMiAxMy44VjVhMiAyIDAgMCAxIDItMmg0Ii8+PHBhdGggZD0i0xNCAyYzAgNCAyLjUgOCA0LjUgMTAgMS4zLTEuMyAyLTMuNyAyLTYiLz48cGF0aCBkPSJNMTguMjIgMTIuMjNhMyAxIDAgMSAwIC0uMjItMS45OSIvPjwvc3ZnPg==';
                      }}
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{course.course_name || 'N/A'}</h1>
                  <p className="text-gray-600 mt-1">{course.university?.name || 'N/A'}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Left Column */}
            <div className="lg:w-2/3">
              {/* About Course */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About this course</h2>
                <div className="prose max-w-none text-gray-600">
                  <p>{course.about || 'N/A'}</p>
                </div>
              </div>

              {/* Entry Requirements */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Entry Requirements</h2>
                <ul className="space-y-3">
                  {course.entry_requirements?.length > 0 ? (
                    course.entry_requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <Check size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{req}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No entry requirements available</li>
                  )}
                </ul>
              </div>

              {/* Modules */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Modules</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.modules?.length > 0 ? (
                    course.modules.map((module, index) => (
                      <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                        <BookOpen size={16} className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{module}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No module information available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:w-1/3 lg:sticky lg:top-24 space-y-6 w-full">
              {/* Scholarships */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-blue-600 p-4">
                  <h3 className="text-lg font-semibold text-white">Available Scholarships</h3>
                </div>
                <div className="p-5">
                  {isLoadingScholarships ? (
                    <div className="animate-pulse space-y-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
                      ))}
                    </div>
                  ) : scholarships.length > 0 ? (
                    <ul className="space-y-4">
                      {scholarships.map((scholarship, index) => (
                        <li key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                          <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{scholarship.scholarship_name || 'Scholarship'}</p>
                            <p className="text-sm text-gray-600">
                              {scholarship.amount_per_year
                                ? `${scholarship.isPercentage
                                  ? `${scholarship.amount_per_year * 100}% of tuition`
                                  : `£${scholarship.amount_per_year.toLocaleString()}`} per year`
                                : 'Amount varies'}
                            </p>
                            {scholarship.eligibility && (
                              <p className="text-xs text-gray-500 mt-1">{scholarship.eligibility}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No scholarships available for this course.</p>
                  )}
                </div>
              </div>

              {/* Quick Facts */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-800 p-4">
                  <h3 className="text-lg font-semibold text-white">Course Details</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <GraduationCap size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Level</p>
                      <p className="text-gray-900 font-medium capitalize">{course.course_level || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <Clock size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="text-gray-900 font-medium">{course.course_duration || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <Calendar size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Intake</p>
                      <p className="text-gray-900 font-medium">{course.intake || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <CreditCard size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tuition Fee</p>
                      <p className="text-gray-900 font-medium">{formatCurrency(course.course_tuition)} per year</p>
                      <p className="text-xs text-gray-500">
                        {course.application_fee ? `Application fee: ${formatCurrency(course.application_fee)}` : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* University Info */}
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-medium text-gray-900 mb-3">Offered by</h3>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3 overflow-hidden">
                    {course.university?.photo ? (
                      <img
                        src={`http://localhost:3000${course.university.photo}`}
                        alt={`${course.university.name} logo`}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2QjcyN0UiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1ncmFkdWF0aW9uLWNhcCI+PHBhdGggZD0ibTggMTQgMiAyIDQtNCIvPjxwYXRoIGQ9Ik0yMiAxMGMwIDYtNCAxMC0xMCAxMFMyIDIxLjMgMiAxMy44VjVhMiAyIDAgMCAxIDItMmg0Ii8+PHBhdGggZD0i0xNCAyYzAgNCAyLjUgOCA0LjUgMTAgMS4zLTEuMyAyLTMuNyAyLTYiLz48cGF0aCBkPSJNMTguMjIgMTIuMjNhMyAxIDAgMSAwIC0uMjItMS45OSIvPjwvc3ZnPg==';
                        }}
                      />
                    ) : (
                      <GraduationCap size={20} className="text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{course.university?.name || 'N/A'}</p>
                    <p className="text-sm text-gray-600">{course.university?.location || 'N/A'}</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (course.university?._id) {
                          window.open(`/university/${course.university._id}`, '_blank', 'noopener,noreferrer');
                        } else {
                          // toast.error('University information not available');
                        }
                      }}
                      className="text-blue-600 hover:text-blue-800 hover:underline text-sm mt-1 inline-flex items-center transition-colors"
                      aria-label={`View ${course.university?.name || 'university'} details`}
                    >
                      View university <ExternalLink size={14} className="ml-1" />
                    </button>
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

export default CourseDetail;
