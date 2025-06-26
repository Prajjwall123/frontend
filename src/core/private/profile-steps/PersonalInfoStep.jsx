import React from 'react';

const PersonalInfoStep = ({ formData, handleChange }) => {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
                <p className="text-gray-600">Please fill in your personal details</p>
            </div>

            <div className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth || ''}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Address */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                        name="address"
                        value={formData.address || ''}
                        onChange={handleChange}
                        rows="3"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter your full address"
                        required
                    />
                </div>

                {/* City */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city || ''}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter your city"
                        required
                    />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formData.gender === 'male'}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                required
                            />
                            <span className="ml-2 text-gray-700">Male</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formData.gender === 'female'}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-gray-700">Female</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="other"
                                checked={formData.gender === 'other'}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-gray-700">Other</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoStep;