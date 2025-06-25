import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({
  filters = {},
  filterOptions = {},
  onFilterChange = () => { }
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterSelect = (filterName, value) => {
    onFilterChange(filterName, value);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for programs"
            className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400 text-base"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 hover:text-blue-700"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Country Dropdown */}
          <div>
            <select
              value={filters.country || ''}
              onChange={(e) => handleFilterSelect('country', e.target.value)}
              className="w-full pl-3 pr-10 py-2.5 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
            >
              {filterOptions.countries?.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Level Dropdown */}
          <div>
            <select
              value={filters.level || ''}
              onChange={(e) => handleFilterSelect('level', e.target.value)}
              className="w-full pl-3 pr-10 py-2.5 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
            >
              {filterOptions.levels?.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Dropdown */}
          <div>
            <select
              value={filters.subject || ''}
              onChange={(e) => handleFilterSelect('subject', e.target.value)}
              className="w-full pl-3 pr-10 py-2.5 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
            >
              {filterOptions.subjects?.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {/* Duration Dropdown */}
          <div>
            <select
              value={filters.duration || ''}
              onChange={(e) => handleFilterSelect('duration', e.target.value)}
              className="w-full pl-3 pr-10 py-2.5 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
            >
              {filterOptions.durations?.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
