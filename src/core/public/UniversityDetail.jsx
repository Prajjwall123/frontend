import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Award, Users, Globe, BookOpen, Check, Calendar, ExternalLink } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Single university data for id=1
const universityData = {
  id: '1',
  name: 'Coventry University',
  location: 'Coventry, United Kingdom',
  address: 'Priory St, Coventry CV1 5FB, United Kingdom',
  founded: 1992,
  institutionType: 'Public',
  universityNumber: '#1',
  ranking: 'Top 15 UK University (Guardian University Guide 2021)',
  students: '38,000+',
  internationalStudents: '13,500+',
  about: 'Coventry University is a forward-looking, modern university with a proud tradition as a provider of high quality education and a focus on applied research. The university was awarded Gold for outstanding teaching and learning in the 2017 Teaching Excellence Framework (TEF).',
  logo: 'https://www.coventry.ac.uk/wp-content/themes/covuni/dist/images/logo.png',
  website: 'https://www.coventry.ac.uk',
  email: 'enquiries@coventry.ac.uk',
  phone: '+44 (0) 24 7765 7688',
  latitude: 52.407536427761066,
  longitude: -1.5021131609299423,
  scholarships: [
    'International Excellence Scholarship: Up to £2,000',
    'Vice-Chancellor\'s Scholarship: Up to £10,000',
    'EU Support Bursary: £1,000',
    'Alumni Discount: 20% off tuition fees'
  ]
};

const programsData = [
  {
    id: 'msc-cyber-security',
    title: 'MSc Cyber Security',
    level: 'Postgraduate',
    duration: '1 year full-time',
    fee: '£17,900 per year',
    about: 'This course is designed to equip you with advanced knowledge and skills in cyber security, including network security, ethical hacking, and digital forensics.',
    requirements: [
      'A 2:2 undergraduate degree in a relevant subject',
      'IELTS 6.5 overall with no component lower than 5.5',
      'Personal statement and references'
    ],
    modules: [
      'Network Security',
      'Ethical Hacking',
      'Digital Forensics',
      'Secure Software Development',
      'Information Risk Management'
    ],
    startDate: 'September 2024, January 2025'
  },
  {
    id: 'bsc-computer-science',
    title: 'BSc (Hons) Computer Science',
    level: 'Undergraduate',
    duration: '3 years full-time',
    fee: '£16,800 per year',
    about: 'Develop the skills to design and build the next generation of software tools and systems, with a strong emphasis on practical skills and employability.',
    requirements: [
      'A Level: BBB-BBC',
      'GCSE: 5 GCSEs at grade 4 / C or above',
      'IELTS 6.0 overall with no component lower than 5.5'
    ],
    modules: [
      'Programming and Algorithms',
      'Computer Systems',
      'Web Development',
      'Database Design',
      'Software Engineering'
    ],
    startDate: 'September 2024'
  }
];

const UniversityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [university] = useState(universityData);
  const [programs] = useState(programsData);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (id !== '1') {
        // Redirect to home if not the expected ID
        navigate('/');
      }
      setIsLoading(false);
    }, 500);
  }, [id, navigate]);

  if (isLoading || !university) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="animate-pulse space-y-4 w-full max-w-4xl">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded mt-6"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar className="fixed top-0 w-full z-50" />
      
      {/* Main content wrapper with padding for fixed navbar */}
      <div className="pt-16">

      {/* University Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-1">
                <img 
                  src={university.logo} 
                  alt={`${university.name} logo`} 
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/64?text=Logo';
                  }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{university.name}</h1>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  {university.location}
                </div>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Left Column */}
            <div className="lg:w-2/3">
              {/* Scholarships Section */}
              <div className="bg-white rounded-lg border border-gray-200 mb-6 overflow-hidden">
                <div className="bg-blue-600 p-4">
                  <h2 className="text-xl font-semibold text-white">Available Scholarships</h2>
                </div>
                <div className="p-6">
                  {university?.scholarships?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {university.scholarships.map((scholarship, index) => (
                        <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                          <div className="bg-blue-100 p-2 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{scholarship.split(':')[0]}</p>
                            <p className="text-sm text-gray-600">{scholarship.split(':').slice(1).join(':').trim()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No scholarships available</p>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('programs')}
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'programs' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Programs
                </button>
              </div>

              {/* Tab Content */}
              <div className="mt-6">
                {activeTab === 'overview' ? (
                  <div>
                    {/* About University */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">About {university.name}</h2>
                      <div className="prose max-w-none text-gray-600">
                        <p>{university.about}</p>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <MapPin className="text-gray-500 mt-0.5 mr-3 flex-shrink-0" size={18} />
                          <div>
                            <p className="font-medium text-gray-900">Address</p>
                            <p className="text-gray-600">{university.address}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mt-0.5 mr-3 flex-shrink-0">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                          <div>
                            <p className="font-medium text-gray-900">Phone</p>
                            <a href={`tel:${university.phone.replace(/\D/g, '')}`} className="text-blue-600 hover:underline">
                              {university.phone}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mt-0.5 mr-3 flex-shrink-0">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                          </svg>
                          <div>
                            <p className="font-medium text-gray-900">Email</p>
                            <a href={`mailto:${university.email}`} className="text-blue-600 hover:underline">
                              {university.email}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mt-0.5 mr-3 flex-shrink-0">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                          </svg>
                          <div>
                            <p className="font-medium text-gray-900">Website</p>
                            <a href={university.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {university.website.replace(/^https?:\/\//, '')}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Programs at {university.name}</h2>

                    {programs.length > 0 ? (
                      <div className="space-y-6">
                        {programs.map((program) => (
                          <div key={program.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900">{program.title}</h3>
                                  <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <span>{program.level}</span>
                                    <span className="mx-2">•</span>
                                    <span>{program.duration}</span>
                                  </div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                  <span className="inline-block bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                    {program.fee}
                                  </span>
                                </div>
                              </div>

                              <div className="mt-4">
                                <h4 className="font-medium text-gray-900 mb-2">About the Program</h4>
                                <p className="text-gray-600 text-sm">{program.about}</p>
                              </div>

                              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2">Entry Requirements</h4>
                                  <ul className="space-y-2">
                                    {program.requirements.map((req, i) => (
                                      <li key={i} className="flex items-start">
                                        <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-600">{req}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2">Key Modules</h4>
                                  <ul className="space-y-2">
                                    {program.modules.map((module, i) => (
                                      <li key={i} className="flex items-start">
                                        <BookOpen size={16} className="text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-600">{module}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between border-t border-gray-100 pt-4">
                                <div className="flex items-center text-sm text-gray-500 mb-3 sm:mb-0">
                                  <Calendar size={16} className="mr-1.5" />
                                  Next intake: {program.startDate}
                                </div>
                                <a
                                  href={`/apply?university=${encodeURIComponent(university.name)}&program=${encodeURIComponent(program.title)}`}
                                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                  Apply Now
                                  <ExternalLink size={16} className="ml-2" />
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900">No programs available</h3>
                        <p className="mt-1 text-gray-500">There are currently no programs listed for this university.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Sticky Sidebar */}
            <div className="lg:w-1/3 space-y-4 lg:sticky lg:top-24">
              {/* Contact Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <Globe size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a 
                        href={university.website.startsWith('http') ? university.website : `https://${university.website}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm flex items-center"
                      >
                        {university.website.replace(/^https?:\/\//, '')}
                        <ExternalLink size={12} className="ml-1" />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a 
                        href={`mailto:${university.email}`}
                        className="text-blue-600 hover:underline text-sm break-all"
                      >
                        {university.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a 
                        href={`tel:${university.phone.replace(/\D/g, '')}`}
                        className="text-gray-900 text-sm"
                      >
                        {university.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <MapPin size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-900 text-sm">{university.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* University Details */}
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">University Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <MapPin size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-gray-900 text-sm">{university.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Founded</p>
                      <p className="text-gray-900 text-sm">{university.founded}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Institution Type</p>
                      <p className="text-gray-900 text-sm">{university.institutionType}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">University Rank</p>
                      <p className="text-gray-900 text-sm">{university.universityNumber}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* University Details */}
              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="bg-gray-800 p-4">
                  <h3 className="text-lg font-semibold text-white">Quick Facts</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Founded</p>
                      <p className="text-gray-900 font-medium">{university.founded}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Institution Type</p>
                      <p className="text-gray-900 font-medium">{university.institutionType}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">University Rank</p>
                      <p className="text-gray-900 font-medium">{university.universityNumber}</p>
                    </div>
                  </div>
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

export default UniversityDetail;
