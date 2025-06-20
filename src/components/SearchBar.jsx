import React, { useState } from "react";

const categories = ["Universities", "Courses", "Scholarships", "Programs"];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categories[0]);

  return (
    <form className="flex flex-col sm:flex-row items-center bg-[#f6f8fa] rounded-xl border shadow-sm px-4 py-3 gap-3 max-w-3xl mx-auto">
      <div className="flex items-center flex-1 w-full">
        <span className="text-gray-400 text-2xl mr-2">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </span>
        <input
          type="text"
          placeholder={`Search ${category.toLowerCase()}...`}
          className="flex-1 bg-transparent outline-none text-base px-2 py-1"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {query && (
          <button type="button" className="ml-1 text-gray-400 hover:text-gray-700" onClick={() => setQuery("")}>×</button>
        )}
      </div>
      <select
        className="bg-white border rounded px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#05213b]"
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        {categories.map(cat => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-[#05213b] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#1a3450] transition w-full sm:w-auto mt-2 sm:mt-0"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
