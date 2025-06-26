// src/core/private/profile-steps/VisaStep.jsx
import React, { useState } from 'react';
import { Globe, Calendar, FileText, ChevronDown, ChevronUp } from 'lucide-react';

const VisaStep = ({ formData, handleChange }) => {
    const [showPreviousVisa, setShowPreviousVisa] = useState(false);

    const countries = [
        'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
        'France', 'Japan', 'South Korea', 'New Zealand', 'Other'
    ];

    const visaTypes = [
        'Student Visa', 'Tourist Visa', 'Work Visa', 'Business Visa',
        'Permanent Residency', 'Other'
    ];

    const visaStatuses = [
        'Approved', 'Rejected', 'Expired', 'Cancelled', 'In Progress'
    ];

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">Visa Information</h2>
                <p className="text-gray-600">Share your visa application history</p>
            </div>

            <div className="space-y-6">
                {/* Previous Visa Applications */}
                <div className="space-y-4">
                    <div className="flex items-center">
                        <input
                            id="hasPreviousVisa"
                            name="hasPreviousVisa"
                            type="checkbox"
                            checked={formData.hasPreviousVisa || false}
                            onChange={(e) => {
                                handleChange(e);
                                setShowPreviousVisa(e.target.checked);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="hasPreviousVisa" className="ml-2 block text-sm font-medium text-gray-700">
                            Have you previously applied for a visa?
                        </label>
                    </div>

                    {showPreviousVisa && (
                        <div className="ml-6 space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Country */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Country</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Globe className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <select
                                            name="visaCountry"
                                            value={formData?.visaCountry || ''}
                                            onChange={handleChange}
                                            className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        >
                                            <option value="">Select country</option>
                                            {countries.map((country) => (
                                                <option key={country} value={country}>
                                                    {country}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Visa Type */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Visa Type</label>
                                    <select
                                        name="visaType"
                                        value={formData?.visaType || ''}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="">Select visa type</option>
                                        {visaTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Application Date */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Application Date</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Calendar className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="date"
                                            name="visaApplicationDate"
                                            value={formData?.visaApplicationDate || ''}
                                            onChange={handleChange}
                                            max={new Date().toISOString().split('T')[0]}
                                            className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FileText className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <select
                                            name="visaStatus"
                                            value={formData?.visaStatus || ''}
                                            onChange={handleChange}
                                            className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        >
                                            <option value="">Select status</option>
                                            {visaStatuses.map((status) => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Notes */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3">
                                        <FileText className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <textarea
                                        name="visaNotes"
                                        value={formData?.visaNotes || ''}
                                        onChange={handleChange}
                                        rows="3"
                                        className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Any additional information about your visa application"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Current Visa Status */}
                <div className="space-y-4 pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Current Visa Status</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Do you currently hold a valid visa?</label>
                            <div className="flex space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="hasCurrentVisa"
                                        value="yes"
                                        checked={formData?.hasCurrentVisa === 'yes'}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Yes</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="hasCurrentVisa"
                                        value="no"
                                        checked={formData?.hasCurrentVisa === 'no'}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                        </div>

                        {formData?.hasCurrentVisa === 'yes' && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Visa Expiry Date</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        name="visaExpiryDate"
                                        value={formData?.visaExpiryDate || ''}
                                        onChange={handleChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisaStep;