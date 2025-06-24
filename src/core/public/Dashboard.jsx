import React from "react";
import Navbar from "../../components/Navbar";
import SearchBar from "../../components/SearchBar";
import UniversityCard from "../../components/UniversityCard";
import coventryLogo from "../../assets/coventry_logo.png";
import alexanderLogo from "../../assets/alexander_logo.png";
import constogaLogo from "../../assets/constoga_logo.png";
import { SlidersHorizontal } from "lucide-react";

const sampleCards = [
  {
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

const Dashboard = () => (
  <div className="min-h-screen bg-[#fafbfc]">
    <Navbar />
    <div className="pt-18"></div> {/* Added spacing */}
    <main className="max-w-7xl mx-auto px-4 pt-6 pb-12">
      {/* Search Bar Section */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 mb-8">
        <h1 className="text-2xl font-bold text-black mb-6">Find Your Program</h1>
        <SearchBar />
      </div>

      <hr className="my-4 border-gray-200" />
      {/* University Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
        {sampleCards.map((card, i) => (
          <UniversityCard key={i} {...card} />
        ))}
      </div>
    </main>
  </div>
);

export default Dashboard;
