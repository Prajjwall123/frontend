// src/core/private/profile-steps/EducationStep.jsx
import React from 'react';
import { GraduationCap, BookOpen, Award } from 'lucide-react';

const EducationStep = ({ formData, handleChange }) => {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">Education Details</h2>
                <p className="text-gray-600">Please provide your academic information</p>
            </div>

            <div className="space-y-6">
                {/* Highest Education Level */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Highest Education Level</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <GraduationCap className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                            name="highestEducation"
                            value={formData.highestEducation}
                            onChange={handleChange}
                            className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                    </div>
                </div>

                {/* Institution Name */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Institution Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <BookOpen className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="institution"
                            value={formData.institution}
                            onChange={handleChange}
                            className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Enter institution name"
                            required
                        />
                    </div>
                </div>

                {/* Field of Study */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Award className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                            name="fieldOfStudy"
                            value={formData.fieldOfStudy || ''}
                            onChange={handleChange}
                            className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                    </div>
                </div>

                {/* Graduation Year and GPA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
                        <input
                            type="number"
                            name="graduationYear"
                            value={formData.graduationYear}
                            onChange={handleChange}
                            min="1900"
                            max={new Date().getFullYear() + 5}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">GPA/Percentage</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <Award className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="number"
                                name="gpa"
                                value={formData.gpa}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                max="4.0"
                                className="block w-full pr-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="e.g., 3.5"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Education Details */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Additional Education Details</label>
                    <textarea
                        name="educationDetails"
                        value={formData.educationDetails || ''}
                        onChange={handleChange}
                        rows="3"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Any additional information about your education"
                    />
                </div>

                {/* Currently Enrolled */}
                <div className="flex items-start">
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
                    <div className="ml-3 text-sm">
                        <label htmlFor="currentlyEnrolled" className="font-medium text-gray-700">
                            I am currently enrolled in this program
                        </label>
                        <p className="text-gray-500">Check this if you are still studying</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EducationStep;