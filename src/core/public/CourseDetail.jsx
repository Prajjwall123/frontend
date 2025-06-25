import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Check, Calendar, ExternalLink, GraduationCap, Clock, CreditCard } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Sample data for BSc (Hons) Computing at Coventry University
const courseData = {
  course_number: '1',
  course_name: 'BSc (Hons) Computing',
  course_level: 'undergraduate',
  university: {
    id: '1',
    name: 'Coventry University',
    location: 'Coventry, United Kingdom'
  },
  course_tuition: 15000,
  application_fee: 20,
  course_duration: '3 years full-time',
  about: 'This Computing degree offers a broad education in computing, allowing you to develop skills in software development, computer systems, and information systems. You will have the opportunity to work on real-world projects and gain practical experience with industry-standard tools and technologies.',
  scholarships: [
    "Academic Excellence Scholarship: £2,000 per year for students with AAA at A-level",
    "International Student Scholarship: £1,500 one-time award for international students",
    "Early Application Bursary: £500 for applicants who apply before January"
  ],
  entry_requirements: [
    'A levels: BBB',
    'BTEC: DDM',
    'IB Diploma: 30 points',
    'GCSE: 5 GCSEs at grade 4 / C or above including English and Mathematics',
    'IELTS: 6.0 overall (with no component lower than 5.5)'
  ],
  modules: [
    'Programming and Algorithms',
    'Computer Systems',
    'Database Design and Implementation',
    'Web Development',
    'Software Design and Development',
    'Networks and Operating Systems',
    'Professional and Ethical Issues in Computing',
    'Final Year Project'
  ],
  intake: 'September, January',
  lastUpdated: '2025-06-25'
};

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchCourse = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch the course data from your API
        // const response = await fetch(`/api/courses/${id}`);
        // const data = await response.json();
        // setCourse(data);
        
        // For now, use the sample data
        setTimeout(() => {
          setCourse(courseData);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching course:', error);
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar className="fixed top-0 w-full z-50" />
      
      {/* Main content wrapper with padding for fixed navbar */}
      <div className="pt-16">
        {/* Course Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{course.course_name}</h1>
                <p className="text-gray-600 mt-1">{course.university.name}</p>
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
                  <p>{course.about}</p>
                </div>
              </div>

              {/* Entry Requirements */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Entry Requirements</h2>
                <ul className="space-y-3">
                  {course.entry_requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modules */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Modules</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.modules.map((module, index) => (
                    <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <BookOpen size={16} className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{module}</span>
                    </div>
                  ))}
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
                  {course.scholarships && course.scholarships.length > 0 ? (
                    <ul className="space-y-4">
                      {course.scholarships.map((scholarship, index) => (
                        <li key={index} className="flex items-start">
                          <div className="bg-blue-100 p-1.5 rounded-full mr-3 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{scholarship.split(':')[0]}</p>
                            <p className="text-sm text-gray-600">{scholarship.split(':').slice(1).join(':').trim()}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No scholarships available</p>
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
                      <p className="text-gray-900 font-medium capitalize">{course.course_level}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <Clock size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="text-gray-900 font-medium">{course.course_duration}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <Calendar size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Intake</p>
                      <p className="text-gray-900 font-medium">{course.intake}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <CreditCard size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tuition Fee</p>
                      <p className="text-gray-900 font-medium">£{course.course_tuition?.toLocaleString()} per year</p>
                      <p className="text-xs text-gray-500">Application fee: £{course.application_fee}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* University Info */}
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-medium text-gray-900 mb-3">Offered by</h3>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3 overflow-hidden">
                    <img 
                      src={`https://logo.clearbit.com/${course.university.name.toLowerCase().replace(/\s+/g, '')}.com`} 
                      alt={`${course.university.name} logo`}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/48?text=Uni';
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{course.university.name}</p>
                    <p className="text-sm text-gray-600">{course.university.location}</p>
                    <button 
                      onClick={() => navigate(`/university/${course.university.id}`)}
                      className="text-blue-600 hover:underline text-sm mt-1 inline-flex items-center"
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
