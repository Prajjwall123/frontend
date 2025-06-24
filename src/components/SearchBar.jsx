import React, { useState } from "react";
import { ChevronDown, Filter, Search as SearchIcon } from "lucide-react";

const degreeOptions = [
  "Master's Degree",
  "Bachelor's Degree",
  "Diploma",
  "Certificate",
  "PhD/Doctorate",
  "Associate Degree"
];
const fieldOptions = [
  "Field",
  "Business",
  "Engineering",
  "Computer Science",
  "Health Sciences",
  "Arts & Humanities",
  "Law",
  "Education"
];
const intakeOptions = [
  "Intakes",
  "Fall 2025",
  "Spring 2025",
  "Summer 2025",
  "Winter 2026"
];
const searchCategoryOptions = [
  "Universities",
  "Courses",
  "Countries"
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(searchCategoryOptions[0]);

  return (
    <div className="w-full flex flex-col gap-4 mt-4">
      {/* Search Bar */}
      <form className="w-full bg-white border border-gray-200 rounded-2xl flex flex-row items-center px-4 py-2.5 gap-3 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center flex-1 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-100 transition-colors focus-within:border-[#05213b]/40 focus-within:bg-white">
          <SearchIcon size={20} className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="What Would You Like To Study?"
            className="flex-1 bg-transparent outline-none text-base font-medium placeholder:font-medium placeholder:text-gray-400 text-black px-1"
            style={{ minWidth: 0 }}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-200 rounded-xl px-5 py-3 text-base font-medium text-gray-800 min-w-[180px] focus:outline-none focus:ring-2 focus:ring-[#05213b]/20 focus:border-[#05213b] transition-all cursor-pointer pr-10 hover:bg-gray-50"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {searchCategoryOptions.map(opt => (
              <option key={opt} value={opt} className="text-gray-800 py-2">{opt}</option>
            ))}
          </select>
          <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
        <button
          type="submit"
          className="bg-[#05213b] text-white px-6 py-2.5 rounded-xl font-semibold text-base hover:bg-[#0d3a6e] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md whitespace-nowrap"
        >
          Search
        </button>
      </form>
      {/* Dropdown Filters */}
      <div className="flex flex-wrap items-center gap-5 mt-4">
        <div className="relative">
          <select
            className="appearance-none border border-gray-300 bg-white rounded-xl px-5 py-2.5 text-base font-medium text-gray-900 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-[#05213b]/30 focus:border-[#05213b] transition-all cursor-pointer pr-10 hover:bg-gray-100/70"
          >
            {degreeOptions.map(opt => (
              <option key={opt} value={opt} className="text-gray-900 py-2">{opt}</option>
            ))}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />
        </div>
        <div className="relative">
          <select
            className="appearance-none border border-gray-300 bg-white rounded-xl px-5 py-2.5 text-base font-medium text-gray-900 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-[#05213b]/30 focus:border-[#05213b] transition-all cursor-pointer pr-10 hover:bg-gray-100/70"
          >
            {fieldOptions.map(opt => (
              <option key={opt} value={opt} className="text-gray-900 py-2">{opt}</option>
            ))}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />
        </div>
        <div className="relative">
          <select
            className="appearance-none border border-gray-300 bg-white rounded-xl px-5 py-2.5 text-base font-medium text-gray-900 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-[#05213b]/30 focus:border-[#05213b] transition-all cursor-pointer pr-10 hover:bg-gray-100/70"
          >
            {intakeOptions.map(opt => (
              <option key={opt} value={opt} className="text-gray-900 py-2">{opt}</option>
            ))}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />
        </div>
        <button
          type="button"
          className="border border-gray-300 rounded-xl px-5 py-2.5 text-base font-medium flex items-center justify-center gap-2 min-w-[160px] bg-white hover:bg-gray-100/70 transition-all hover:border-gray-400 hover:shadow-sm"
        >
          <Filter size={18} className="text-gray-800" />
          <span>Filters</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
