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
                            name="highest_education_level"
                            value={formData.highest_education_level || ''}
                            onChange={handleChange}
                            className="appearance-none block w-full pl-10 pr-8 py-2.5 text-sm border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            required
                        >
                            <option value="">Select highest education level</option>
                            <option value="High School">High School</option>
                            <option value="Bachelors">Bachelor's Degree</option>
                            <option value="Masters">Master's Degree</option>
                            <option value="PhD">PhD/Doctorate</option>
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
                            name="institution_name"
                            value={formData.institution_name || ''}
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
                        <input
                            type="text"
                            name="field_of_study"
                            value={formData.field_of_study || ''}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter field of study"
                            required
                        />
                    </div>
                </div>

                {/* Graduation Year and Currently Enrolled */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
                        <div className="relative rounded-md shadow-sm">
                            <input
                                type="number"
                                name="graduation_year"
                                value={formData.graduation_year || ''}
                                onChange={handleChange}
                                min="1900"
                                max={new Date().getFullYear() + 5}
                                className="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., 2023"
                                required={!formData.currently_enrolled}
                                disabled={formData.currently_enrolled}
                            />
                        </div>
                    </div>
                    <div className="flex items-end space-x-2">
                        <div className="flex items-center h-5">
                            <input
                                id="currently_enrolled"
                                name="currently_enrolled"
                                type="checkbox"
                                checked={formData.currently_enrolled || false}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                        </div>
                        <label htmlFor="currently_enrolled" className="text-sm font-medium text-gray-700">
                            Currently Enrolled
                        </label>
                    </div>
                </div>

                {/* Final Grade */}
                <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">Final Grade</label>
                    <div className="relative rounded-md shadow-sm">
                        <select
                            name="final_grade"
                            value={formData.final_grade || ''}
                            onChange={handleChange}
                            className="appearance-none block w-full pl-3 pr-8 py-2.5 text-sm border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            required
                        >
                            <option value="">Select final grade</option>
                            <option value="A+">A+</option>
                            <option value="A">A</option>
                            <option value="B+">B+</option>
                            <option value="B">B</option>
                            <option value="C+">C+</option>
                            <option value="C">C</option>
                            <option value="D+">D+</option>
                            <option value="D">D</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EducationStep;