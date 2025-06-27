// src/core/private/profile-steps/EducationStep.jsx
import React from 'react';
import { GraduationCap, BookOpen, Award } from 'lucide-react';

const EducationStep = ({ formData, handleChange }) => {
    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Education Information</h2>
                <p className="text-sm text-gray-500">Provide your academic details</p>
            </div>

            <div className="space-y-4">
                {/* Highest Education Level */}
                <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">Highest Education Level</label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <GraduationCap className="h-4 w-4 text-gray-400" />
                        </div>
                        <select
                            name="highestEducation"
                            value={formData.highestEducation || ''}
                            onChange={handleChange}
                            className="appearance-none block w-full pl-10 pr-8 py-2.5 text-sm border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            required
                        >
                            <option value="">Select highest education level</option>
                            <option value="high_school">High School</option>
                            <option value="diploma">Diploma</option>
                            <option value="bachelors">Bachelor's Degree</option>
                            <option value="masters">Master's Degree</option>
                            <option value="phd">PhD/Doctorate</option>
                            <option value="other">Other</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Institution Name */}
                <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">Institution Name</label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BookOpen className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="institution"
                            value={formData.institution || ''}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter institution name"
                            required
                        />
                    </div>
                </div>

                {/* Field of Study */}
                <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Award className="h-4 w-4 text-gray-400" />
                        </div>
                        <select
                            name="fieldOfStudy"
                            value={formData.fieldOfStudy || ''}
                            onChange={handleChange}
                            className="appearance-none block w-full pl-10 pr-8 py-2.5 text-sm border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            required
                        >
                            <option value="">Select field of study</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Business Administration">Business Administration</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Medicine">Medicine</option>
                            <option value="Law">Law</option>
                            <option value="Arts & Humanities">Arts & Humanities</option>
                            <option value="Social Sciences">Social Sciences</option>
                            <option value="Natural Sciences">Natural Sciences</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Architecture">Architecture</option>
                            <option value="Education">Education</option>
                            <option value="Psychology">Psychology</option>
                            <option value="Nursing">Nursing</option>
                            <option value="Economics">Economics</option>
                            <option value="Political Science">Political Science</option>
                            <option value="Other">Other</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Graduation Year and GPA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
                        <div className="relative rounded-md shadow-sm">
                            <input
                                type="number"
                                name="graduationYear"
                                value={formData.graduationYear || ''}
                                onChange={handleChange}
                                min="1900"
                                max={new Date().getFullYear() + 5}
                                className="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., 2023"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">GPA/Percentage</label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Award className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="number"
                                name="gpa"
                                value={formData.gpa || ''}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                max="4.0"
                                className="block w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., 3.5"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Education Details */}
                <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">Additional Education Details</label>
                    <div className="relative rounded-md shadow-sm">
                        <textarea
                            name="educationDetails"
                            value={formData.educationDetails || ''}
                            onChange={handleChange}
                            rows="3"
                            className="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Any additional information about your education"
                        />
                    </div>
                </div>

                {/* Currently Enrolled */}
                <div className="flex items-start pt-2">
                    <div className="flex items-center h-5">
                        <input
                            id="currentlyEnrolled"
                            name="currentlyEnrolled"
                            type="checkbox"
                            checked={formData.currentlyEnrolled || false}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                    </div>
                    <div className="ml-3">
                        <label htmlFor="currentlyEnrolled" className="block text-sm font-medium text-gray-700">
                            I am currently enrolled in this program
                        </label>
                        <p className="text-xs text-gray-500">Check this if you are still studying</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EducationStep;