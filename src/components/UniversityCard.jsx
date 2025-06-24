import React from "react";
import { RefreshCw, FileText } from "lucide-react";

/**
 * UniversityCard component
 * @param {Object} props
 * @param {string} props.logo - University logo image path
 * @param {string} props.university - University name
 * @param {string} props.level - Program level (e.g., Postgraduate Certificate)
 * @param {string} props.program - Program name
 * @param {string} props.location - Location (e.g., Coventry, ENG)
 * @param {string|number} props.tuition - Tuition fee (e.g., "$13,640")
 * @param {string|number} props.applicationFee - Application fee (e.g., "$125")
 * @param {string} props.duration - Duration (e.g., "24 months")
 * @param {function} [props.onApply] - Optional Apply button handler
 */
const UniversityCard = ({
  logo,
  university,
  level,
  program,
  location,
  tuition,
  applicationFee,
  duration,
  onApply = () => {},
}) => {
  return (
    <div className="rounded-2xl bg-white p-4 w-full border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
      {/* University Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <img src={logo} alt="University Logo" className="h-6 w-auto" />
          </div>
          <div className="font-semibold text-gray-900">{university}</div>
        </div>
        <button 
          className="text-gray-500 hover:text-gray-700 transition-colors p-1 -mr-2"
          title="Compare"
        >
          <RefreshCw size={18} />
        </button>
      </div>
      
      {/* Program Info */}
      <div className="mb-4">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{level}</div>
        <h3 className="text-base font-semibold text-gray-900 leading-tight mb-3">{program}</h3>
      </div>
      
      {/* Divider */}
      <div className="h-px bg-gray-100 w-full my-2"></div>
      
      {/* Details */}
      <div className="space-y-3 my-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Location</span>
          <span className="text-sm font-medium text-gray-900">{location}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Tuition (1st Year)</span>
          <span className="text-sm font-medium text-gray-900">{tuition}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Application Fee</span>
          <span className="text-sm font-medium text-gray-900">{applicationFee}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Duration</span>
          <span className="text-sm font-medium text-gray-900">{duration}</span>
        </div>
      </div>
      
      {/* Apply Button */}
      <div className="mt-auto pt-4">
        <button 
          onClick={onApply}
          className="w-full bg-[#05213b] text-white py-3 px-4 rounded-xl font-medium text-sm hover:bg-[#1a3450] transition-all flex items-center justify-center gap-3 group"
        >
          <FileText size={18} className="text-white/90 group-hover:scale-110 transition-transform" />
          <span>Apply Now</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1 group-hover:translate-x-1 transition-transform">
            <path d="M3.33325 8H12.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 3.33334L12.6667 8.00001L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UniversityCard;
