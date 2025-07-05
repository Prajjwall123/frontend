import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../../utils/coursesHelper";
import Navbar from "../../components/Navbar";
import SearchBar from "../../components/SearchBar";
import Sidebar from "../../components/Sidebar";
import UniversityCard from "../../components/UniversityCard";
import { SlidersHorizontal, LayoutGrid, List, ChevronDown, Filter } from "lucide-react";
import Footer from "../../components/Footer";

// Helper function to extract unique values from university data
const extractUniqueValues = (data, key) => {
  const values = data.map(item => item[key] || '');
  return ['All', ...new Set(values)].filter(Boolean);
};

// Helper function to extract countries from location strings
const extractCountries = (data) => {
  const countries = data.map(item => item.university?.country || '');
  return ['All Countries', ...new Set(countries)].filter(Boolean);
};

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch courses using React Query
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  });

  // Transform course data to match the existing card structure
  const sampleCards = React.useMemo(() => {
    return courses.map(course => ({
      id: course._id,  // Make sure this is the course ID, not university ID
      courseId: course._id,  // Explicitly pass course ID
      logo: course.university?.photo ? `http://localhost:3000${course.university.photo}` : null,
      university: course.university?.name || 'University',
      level: course.course_level ?
        course.course_level.charAt(0).toUpperCase() + course.course_level.slice(1) :
        'Program',
      program: course.course_name || 'Course',
      location: course.university?.location || 'Location not specified',
      tuition: course.course_tuition ? `$${course.course_tuition.toLocaleString()}` : 'Contact for pricing',
      applicationFee: course.application_fee ? `$${course.application_fee}` : 'No fee',
      duration: course.course_duration || 'Duration not specified',
      country: course.university?.country || ''
    }));
  }, [courses]);

  // Filter state
  const [filters, setFilters] = useState({
    country: 'All Countries',
    level: 'All',
    subject: 'All',
    duration: 'All',
  });

  // Extract filter options from real data
  const filterOptions = React.useMemo(() => {
    const options = {
      countries: extractCountries(sampleCards),
      levels: extractUniqueValues(sampleCards, 'level'),
      durations: extractUniqueValues(sampleCards, 'duration')
    };

    // Extract subjects from program names
    const subjects = new Set();
    sampleCards.forEach(card => {
      if (card.program) {
        const words = card.program
          .split(/\s+/)
          .map(word => word.replace(/[^a-zA-Z]/g, ''))
          .filter(word => word.length > 3);
        words.forEach(word => subjects.add(word));
      }
    });

    return {
      ...options,
      subjects: ['All', ...Array.from(subjects)].slice(0, 11) // Limit to 10 subjects + 'All'
    };
  }, [sampleCards]);

  // Apply filters to university data
  const filteredCards = React.useMemo(() => {
    if (!sampleCards?.length) return [];

    return sampleCards.filter(card => {
      // Safely access properties with optional chaining
      const cardCountry = card.country || '';
      const cardLevel = card.level || '';
      const cardDuration = card.duration || '';
      const cardProgram = card.program?.toLowerCase() || '';

      // Get filter values with defaults
      const filterCountry = filters.country || 'All Countries';
      const filterLevel = filters.level || 'All';
      const filterDuration = filters.duration || 'All';
      const filterSubject = (filters.subject || '').toLowerCase();

      // Apply filters
      const matchesCountry = filterCountry === 'All Countries' || cardCountry === filterCountry;
      const matchesLevel = filterLevel === 'All' || cardLevel === filterLevel;
      const matchesDuration = filterDuration === 'All' || cardDuration === filterDuration;
      const matchesSubject = filterSubject === 'all' || cardProgram.includes(filterSubject);

      return matchesCountry && matchesLevel && matchesDuration && matchesSubject;
    });
  }, [sampleCards, filters]);

  // Handle filter changes from SearchBar
  const handleSearchFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value || 'All'  // Ensure we never set undefined or null
    }));
  };

  // Handle filter changes from Sidebar
  const handleSidebarFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16"></div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header and Search */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Find Your Program</h1>
                <p className="text-gray-500 mt-1">Browse and compare programs from top universities</p>
              </div>
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-100 text-[#05213b]' : 'text-gray-400 hover:bg-gray-50'}`}
                  aria-label="List view"
                >
                  <List size={20} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-100 text-[#05213b]' : 'text-gray-400 hover:bg-gray-50'}`}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={20} />
                </button>
              </div>
            </div>
            <SearchBar
              filters={{
                country: filters.country,
                level: filters.level,
                subject: filters.subject,
                duration: filters.duration
              }}
              filterOptions={{
                countries: filterOptions.countries,
                levels: filterOptions.levels,
                subjects: filterOptions.subjects,
                durations: filterOptions.durations
              }}
              onFilterChange={handleSearchFilterChange}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Filters Button */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter size={16} />
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Sidebar - Hidden on mobile when filters are closed */}
          <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block lg:w-1/4`}>
            <Sidebar
              filters={{
                programLevels: filters.programLevels,
                locations: filters.locations,
                durations: filters.durations
              }}
              filterOptions={{
                programLevels: filterOptions.levels.filter(l => l !== 'All'),
                locations: filterOptions.countries.filter(c => c !== 'All Countries'),
                durations: filterOptions.durations.filter(d => d !== 'All')
              }}
              onFilterChange={handleSearchFilterChange}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 bg-white p-4 rounded-xl border border-gray-100">
              <div className="text-sm text-gray-600 mb-2 sm:mb-0">
                Showing <span className="font-medium text-gray-900">{filteredCards.length}</span> of <span className="font-medium text-gray-900">{sampleCards.length}</span> results
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Sort by:</span>
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#05213b]/20 focus:border-[#05213b] cursor-pointer">
                    <option>Most Relevant</option>
                    <option>Tuition (Low to High)</option>
                    <option>Tuition (High to Low)</option>
                    <option>Duration (Shortest First)</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* University Cards Grid */}
            <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'space-y-4'} gap-6`}>
              {filteredCards.length > 0 ? (
                filteredCards.map((card) => (
                  <UniversityCard
                    key={card.id}
                    id={card.courseId}  // Pass course ID for redirection
                    courseId={card.courseId}  // Also pass as courseId prop
                    logo={card.logo}
                    university={card.university}
                    level={card.level}
                    program={card.program}
                    location={card.location}
                    tuition={card.tuition}
                    applicationFee={card.applicationFee}
                    duration={card.duration}
                    viewMode={viewMode}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">No programs found</h3>
                  <p className="mt-1 text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex items-center justify-center gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              {[1, 2, 3, '...', 8].map((page, i) => (
                <button
                  key={i}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${page === 1 ? 'bg-[#05213b] text-white' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
