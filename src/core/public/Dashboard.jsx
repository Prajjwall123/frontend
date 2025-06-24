import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import SearchBar from "../../components/SearchBar";
import Sidebar from "../../components/Sidebar";
import UniversityCard from "../../components/UniversityCard";
import coventryLogo from "../../assets/coventry_logo.png";
import alexanderLogo from "../../assets/alexander_logo.png";
import constogaLogo from "../../assets/constoga_logo.png";
import { SlidersHorizontal, LayoutGrid, List, ChevronDown, Filter } from "lucide-react";
import Footer from "../../components/Footer";

const sampleCards = [
  {
    id: 'coventry-university',
    logo: coventryLogo,
    university: "Coventry University",
    level: "Postgraduate Certificate",
    program: "Graduate Certificate-International Business",
    location: "Coventry, ENG",
    tuition: "$13,640",
    applicationFee: "$125",
    duration: "24 months",
  },
  {
    id: 'alexander-college',
    logo: alexanderLogo,
    university: "Alexander College Burnaby",
    level: "Undergraduate Diploma",
    program: "Associate of Arts-Psychology",
    location: "British Columbia, CAN",
    tuition: "$13,640",
    applicationFee: "$125",
    duration: "24 months",
  },
  {
    id: 'constoga-college',
    logo: constogaLogo,
    university: "Constoga College Don",
    level: "Undergraduate Diploma",
    program: "College Diploma- Office Administration",
    location: "Ontario, CAN",
    tuition: "$13,640",
    applicationFee: "$125",
    duration: "24 months",
  },
  {
    id: 'uts-sydney',
    logo: coventryLogo, // Using existing logo for now
    university: "University of Technology Sydney",
    level: "Master's Degree",
    program: "Master of Data Science and Innovation",
    location: "Sydney, AUS",
    tuition: "$42,000",
    applicationFee: "$150",
    duration: "24 months",
  },
];

// Helper function to extract unique values from university data
const extractUniqueValues = (data, key) => {
  const values = data.map(item => item[key] || '');
  return ['All', ...new Set(values)].filter(Boolean);
};

// Helper function to extract countries from location strings
const extractCountries = (data) => {
  const countries = data.map(item => {
    const parts = item.location?.split(', ');
    return parts?.length > 1 ? parts[1] : '';
  });
  return ['All Countries', ...new Set(countries)].filter(Boolean);
};

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState({
    country: 'All Countries',
    level: 'All',
    subject: 'All',
    duration: 'All',
    programLevels: [],
    locations: [],
    durations: []
  });

  // Extract filter options from sample data
  const filterOptions = {
    countries: extractCountries(sampleCards),
    levels: extractUniqueValues(sampleCards, 'level'),
    subjects: extractUniqueValues(sampleCards, 'program').flatMap(program => 
      program.split(' ').map(word => word.replace(/[^a-zA-Z]/g, ''))
    ).filter((value, index, self) => self.indexOf(value) === index && value.length > 3).slice(0, 10),
    durations: extractUniqueValues(sampleCards, 'duration')
  };

  // Apply filters to university data
  const filteredCards = sampleCards.filter(card => {
    // Extract country from location (e.g., "Coventry, ENG" -> "ENG")
    const cardCountry = card.location?.split(', ')[1] || '';
    const cardDuration = card.duration?.split(' ')[0];
    
    return (
      (filters.country === 'All Countries' || cardCountry === filters.country.split(' ').pop()) &&
      (filters.level === 'All' || card.level?.includes(filters.level)) &&
      (filters.subject === 'All' || card.program?.toLowerCase().includes(filters.subject.toLowerCase())) &&
      (filters.duration === 'All' || cardDuration === filters.duration.split(' ')[0]) &&
      (filters.programLevels.length === 0 || filters.programLevels.some(level => card.level?.includes(level))) &&
      (filters.locations.length === 0 || filters.locations.some(loc => card.location?.includes(loc)))
    );
  });

  // Handle filter changes from SearchBar
  const handleSearchFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
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
                subjects: ['All', ...filterOptions.subjects],
                durations: ['All', ...filterOptions.durations]
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
              onFilterChange={handleSidebarFilterChange}
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
                    {...card} 
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
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${
                    page === 1 ? 'bg-[#05213b] text-white' : 'text-gray-700 hover:bg-gray-50'
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
