import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, BookOpen, Check, Calendar, ExternalLink, GraduationCap, Clock, CreditCard, X } from 'lucide-react';
import { getCourseById } from '../../utils/coursesHelper';
import { getScholarshipsByUniversityId } from '../../utils/scholarshipHelper';
import { isAuthenticated } from '../../utils/authHelper';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { toast } from 'react-toastify';

const ApplicationModal = ({ course, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedIntake, setSelectedIntake] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const steps = [
    { id: 'intake', title: 'Pick Intake' },
    { id: 'requirements', title: 'Entry Requirements' },
    { id: 'terms', title: 'Terms & Conditions' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (currentStep === steps.length - 1 && !agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    if (currentStep === 0 && !selectedIntake) {
      toast.error('Please select an intake');
      return;
    }

    if (currentStep === steps.length - 1) {
      onSubmit({
        intake: selectedIntake,
        course: course.course_name,
        university: course.university?.name,
        requirements: course.entry_requirements,
        terms: course.terms_and_conditions
      });
      onClose();
    } else {
      handleNext();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Select Intake</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={selectedIntake}
              onChange={(e) => setSelectedIntake(e.target.value)}
            >
              <option value="">Select an intake</option>
              {course.intake?.map((intake, index) => (
                <option key={index} value={intake}>
                  {intake}
                </option>
              ))}
            </select>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Entry Requirements</h3>
            <ul className="space-y-2">
              {course.entry_requirements?.map((req, index) => (
                <li key={index} className="flex items-start">
                  <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Terms and Conditions</h3>
            <div className="max-h-60 overflow-y-auto p-4 bg-gray-50 rounded-md text-sm">
              {course.terms_and_conditions?.map((term, index) => (
                <p key={index} className="mb-2">
                  {index + 1}. {term}
                </p>
              ))}
            </div>
            <div className="flex items-start mt-4">
              <input
                id="terms-checkbox"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms-checkbox" className="ml-2 block text-sm text-gray-700">
                I agree to the terms and conditions
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white z-10 px-4 pt-5 pb-4 sm:p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">New Application</h2>
                <p className="text-sm text-gray-500">{course.course_name} - {course.university?.name}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Stepper */}
            <div className="mb-6 mt-4">
              <div className="flex justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                      {index + 1}
                    </div>
                    <span className={`text-xs mt-1 ${currentStep >= index ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
                <div
                  className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 transition-all duration-300"
                  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="px-4 pb-4 sm:px-6 sm:pb-6">
            {renderStepContent()}
          </div>

          {/* Footer Buttons */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSubmit}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${currentStep === steps.length - 1
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
                } text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm`}
            >
              {currentStep === steps.length - 1 ? 'Create Application' : 'Next'}
            </button>
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scholarships, setScholarships] = useState([]);
  const [isLoadingScholarships, setIsLoadingScholarships] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  // Function to handle authentication check and redirect
  const handleAuthRequired = (e, action) => {
    e?.preventDefault();
    if (!isAuthenticated()) {
      const redirectPath = `/login?redirect=${encodeURIComponent(location.pathname)}`;
      toast.info('Please login to continue');
      navigate(redirectPath);
      return false;
    }
    return true;
  };

  // Handle scholarship details click
  const handleViewDetails = (e, scholarshipName) => {
    if (handleAuthRequired(e)) {
      console.log('View details for:', scholarshipName);
    }
  };

  // Handle apply now click
  const handleApplyNow = (e) => {
    if (handleAuthRequired(e)) {
      setShowApplicationModal(true);
    }
  };

  // Handle application submission
  const handleApplicationSubmit = (applicationData) => {
    console.log('Application submitted:', applicationData);
    toast.success('Application created successfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

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

      {/* Main Content */}
      <div className="pt-16 flex-1">
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
                <button
                  onClick={handleApplyNow}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
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
            <div className="lg:w-1/3 space-y-6">
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
                        <li key={index} className="flex flex-col p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-start">
                            <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                              </svg>
                            </div>
                            <div className="flex-1">
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
                          </div>
                          <button
                            className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium text-left flex items-center"
                            onClick={(e) => handleViewDetails(e, scholarship.scholarship_name)}
                          >
                            View Details
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </button>
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
                      <p className="text-gray-900 font-medium">
                        {Array.isArray(course.intake) && course.intake.length > 0
                          ? course.intake.join(', ')
                          : 'N/A'}
                      </p>
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

          {/* Footer */}
          <Footer />

          {/* Application Modal */}
          {showApplicationModal && course && (
            <ApplicationModal
              course={course}
              onClose={() => setShowApplicationModal(false)}
              onSubmit={handleApplicationSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
