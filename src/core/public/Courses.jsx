import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, BookOpen, Clock, GraduationCap, Award } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Sample courses data - this would typically come from an API
const coursesData = [
  {
    id: '1',
    title: 'Computer Science BSc (Hons)',
    university: 'University of Oxford',
    location: 'Oxford, United Kingdom',
    duration: '3 years',
    degree: 'Bachelor',
    about: 'This course provides a comprehensive understanding of computer science fundamentals including programming, algorithms, and software development.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/University_of_Oxford.svg/1200px-University_of_Oxford.svg.png',
    fees: '£9,250',
    startDate: 'October 2024'
  },
  {
    id: '2',
    title: 'Business Administration MBA',
    university: 'University of Cambridge',
    location: 'Cambridge, United Kingdom',
    duration: '1 year',
    degree: 'Master',
    about: 'An intensive MBA program designed for future business leaders, focusing on leadership, strategy, and innovation.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/28/University_of_Cambridge_coat_of_arms.svg/1200px-University_of_Cambridge_coat_of_arms.svg.png',
    fees: '£59,000',
    startDate: 'September 2024'
  },
  {
    id: '3',
    title: 'Mechanical Engineering MEng',
    university: 'Imperial College London',
    location: 'London, United Kingdom',
    duration: '4 years',
    degree: 'Master',
    about: 'This integrated masters program combines engineering principles with practical applications in mechanical systems.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Imperial_College_London_crest.svg/1200px-Imperial_College_London_crest.svg.png',
    fees: '£35,100',
    startDate: 'October 2024'
  },
  {
    id: '4',
    title: 'Medicine MBBS',
    university: 'University of Edinburgh',
    location: 'Edinburgh, United Kingdom',
    duration: '6 years',
    degree: 'Bachelor',
    about: 'Comprehensive medical training program preparing students for a career in medicine with clinical placements.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/University_of_Edinburgh_ceremonial_roundel.svg/1200px-University_of_Edinburgh_ceremonial_roundel.svg.png',
    fees: '£9,250',
    startDate: 'September 2024'
  },
  {
    id: '5',
    title: 'Law LLB',
    university: 'University of Manchester',
    location: 'Manchester, United Kingdom',
    duration: '3 years',
    degree: 'Bachelor',
    about: 'A qualifying law degree providing a strong foundation in legal principles and practice.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/University_of_Manchester_circular_logo.svg/1200px-University_of_Manchester_circular_logo.svg.png',
    fees: '£9,250',
    startDate: 'September 2024'
  },
  {
    id: '6',
    title: 'Architecture BA (Hons)',
    university: 'University of Sheffield',
    location: 'Sheffield, United Kingdom',
    duration: '3 years',
    degree: 'Bachelor',
    about: 'Creative and technical course focusing on architectural design, theory, and practice.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/University_of_Sheffield_logo.svg/1200px-University_of_Sheffield_logo.svg.png',
    fees: '£9,250',
    startDate: 'September 2024'
  },
];

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedDegree, setSelectedDegree] = useState('all');
  const [filtersApplied, setFiltersApplied] = useState(false);
  
  // Available filters
  const countries = ['All Countries', 'United Kingdom'];
  const degreeLevels = [
    { value: 'all', label: 'All Degrees' },
    { value: 'Bachelor', label: 'Bachelor\'s' },
    { value: 'Master', label: 'Master\'s' },
  ];

  useEffect(() => {
    // Simulate API call
    const fetchCourses = async () => {
      try {
        // In a real app, you would fetch from your API
        setTimeout(() => {
          setCourses(coursesData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    setFiltersApplied(true);
  };

  // Handle clearing all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCountry('all');
    setSelectedDegree('all');
    setFiltersApplied(false);
  };

  // Filter and sort courses
  const filteredCourses = [...courses]
    .filter(course => {
      // If no filters are applied, show all courses
      if (!filtersApplied && !searchTerm && selectedCountry === 'all' && selectedDegree === 'all') {
        return true;
      }
      
      const matchesSearch = 
        searchTerm === '' || 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.university.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCountry = 
        selectedCountry === 'all' || 
        course.location.includes(selectedCountry);
      
      const matchesDegree = 
        selectedDegree === 'all' || 
        course.degree === selectedDegree;
      
      return matchesSearch && matchesCountry && matchesDegree;
    });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-12 bg-gray-200 rounded w-1/3"></div>
              <div className="h-10 bg-gray-200 rounded w-1/2"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar className="fixed top-0 w-full z-50" />
      
      {/* Main content wrapper with padding for fixed navbar */}
      <div className="flex-1 pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Course</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-6">
              Discover and compare courses from top universities to find your ideal academic path.
            </p>
            <form 
              onSubmit={handleSearch}
              className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-1 flex flex-wrap md:flex-nowrap"
            >
              {/* Search Input */}
              <div className="relative flex-1 w-full md:w-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="block w-full pl-12 pr-4 py-3 border-0 focus:ring-0 focus:outline-none text-gray-800 rounded-l-lg md:rounded-r-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                />
              </div>
              
              {/* Country Dropdown */}
              <div className="relative w-full md:w-48 border-t md:border-t-0 md:border-l border-gray-200">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="appearance-none w-full pl-4 pr-10 py-3 bg-white text-gray-700 border-0 focus:ring-0 focus:outline-none"
                >
                  {countries.map(country => (
                    <option key={country} value={country === 'All Countries' ? 'all' : country}>
                      {country}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {/* Degree Level Dropdown */}
              <div className="relative w-full md:w-48 border-t md:border-t-0 md:border-l border-gray-200">
                <select
                  value={selectedDegree}
                  onChange={(e) => setSelectedDegree(e.target.value)}
                  className="appearance-none w-full pl-4 pr-10 py-3 bg-white text-gray-700 border-0 focus:ring-0 focus:outline-none"
                >
                  {degreeLevels.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg font-medium transition-colors whitespace-nowrap"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Filters and results count */}
        <div className="container mx-auto px-4 pt-6 pb-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'} Found
              {(searchTerm || selectedCountry !== 'all' || selectedDegree !== 'all') && ' (Filtered)'}
            </h2>
            
            {(searchTerm || selectedCountry !== 'all' || selectedDegree !== 'all') && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="container mx-auto px-4 mb-8">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <Link to={`/course/${course.id}`} className="block">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-1">
                          <img 
                            src={course.logo} 
                            alt={`${course.university} logo`}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/64?text=Logo';
                            }}
                          />
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {course.degree}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                      <p className="text-sm font-medium text-gray-600 mb-2">{course.university}</p>
                      <p className="flex items-center text-sm text-gray-500 mb-3">
                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{course.location}</span>
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {course.about}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <Clock className="h-3 w-3 mr-1" />
                          {course.duration}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {course.fees}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search criteria</p>
              <button
                onClick={clearFilters}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Courses;
