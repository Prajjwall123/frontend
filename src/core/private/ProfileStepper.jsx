// src/core/private/ProfileStepper.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, User, Book, Globe, FileText, ChevronRight, ChevronLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PersonalInfoStep from './profile-steps/PersonalInfoStep';
import EducationStep from './profile-steps/EducationStep';
import VisaStep from './profile-steps/VisaStep';
import EnglishTestStep from './profile-steps/EnglishTestStep';

// Import the profile side image
import profileImage from '../../assets/profile-side-image.jpg';

const steps = [
    { id: 'Personal', icon: User, component: PersonalInfoStep, name: 'Personal' },
    { id: 'Education', icon: Book, component: EducationStep, name: 'Education' },
    { id: 'Visa', icon: Globe, component: VisaStep, name: 'Visa' },
    { id: 'English', icon: FileText, component: EnglishTestStep, name: 'English' },
];

const ProfileStepper = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        // Personal Info
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        city: '',
        country: '',
        gender: '',

        // Education
        highestEducation: '',
        institution: '',
        fieldOfStudy: '',
        graduationYear: '',
        gpa: '',

        // Visa
        hasPreviousVisa: false,
        visaCountry: '',
        visaType: '',
        visaStatus: '',

        // English Test
        englishTest: {
            testType: '',
            overallScore: '',
            reading: '',
            writing: '',
            speaking: '',
            listening: '',
            testDate: '',
            testReport: null
        },
    });

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(prev => prev - 1);
        }
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === 'file' ? files[0] : value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const CurrentStep = steps[activeStep]?.component;

    if (activeStep >= steps.length) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white rounded-lg shadow overflow-hidden p-8 text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                            <Check className="h-6 w-6 text-green-600" />
                        </div>
                        <h2 className="mt-3 text-2xl font-medium text-gray-900">Application Submitted!</h2>
                        <p className="mt-2 text-gray-600">Thank you for submitting your application. We'll review your information and get back to you soon.</p>
                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={() => setActiveStep(0)}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Start New Application
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!CurrentStep) {
        return <Navigate to="/profile" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar className="fixed top-0 left-0 right-0 z-50" />

            {/* Main Content - Increased top padding to pt-24 */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pt-24">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
                    {/* Top border highlight */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-600"></div>

                    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-14rem)]">
                        {/* Left Side - Image - Slightly wider */}
                        <div className="lg:w-6/12 bg-gray-100">
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
                                }}
                            />
                        </div>

                        {/* Right Side - Form with Stepper - Slightly narrower */}
                        <div className="lg:w-6/12 p-6 md:p-8 flex flex-col">
                            {/* Reduced top padding for stepper */}
                            <div className="pt-8">
                                {/* Centered Stepper */}
                                <div className="mb-8">
                                    <nav aria-label="Progress" className="flex justify-center">
                                        <ol role="list" className="flex items-center">
                                            {steps.map((step, stepIdx) => (
                                                <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-16' : ''}`}>
                                                    {stepIdx < activeStep ? (
                                                        <>
                                                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                                <div className="h-0.5 w-full bg-blue-600" />
                                                            </div>
                                                            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-900">
                                                                {step.icon ? (
                                                                    <step.icon className="h-4 w-4 text-white" aria-hidden="true" />
                                                                ) : (
                                                                    <span className="text-sm font-medium text-white">{step.id}</span>
                                                                )}
                                                            </div>
                                                            <span className="mt-2 block text-xs font-medium text-gray-900">{step.name}</span>
                                                        </>
                                                    ) : stepIdx === activeStep ? (
                                                        <div className="flex flex-col items-center">
                                                            <div className="relative">
                                                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                                    <div className="h-0.5 w-full bg-gray-200" />
                                                                </div>
                                                                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white">
                                                                    {step.icon ? (
                                                                        <step.icon className="h-4 w-4 text-blue-600" aria-hidden="true" />
                                                                    ) : (
                                                                        <span className="text-sm font-medium text-blue-600">{step.id}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <span className="mt-2 text-xs font-medium text-blue-600">{step.name}</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center">
                                                            <div className="relative">
                                                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                                    <div className="h-0.5 w-full bg-gray-200" />
                                                                </div>
                                                                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
                                                                    {step.icon ? (
                                                                        <step.icon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                                                                    ) : (
                                                                        <span className="text-sm font-medium text-gray-400">{step.id}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <span className="mt-2 text-xs font-medium text-gray-500">{step.name}</span>
                                                        </div>
                                                    )}
                                                </li>
                                            ))}
                                        </ol>
                                    </nav>
                                </div>

                                <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="flex-1 flex flex-col">
                                    <div className="flex-1">
                                        <CurrentStep
                                            formData={formData}
                                            handleChange={handleChange}
                                        />
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-gray-100">
                                        <div className="flex justify-between">
                                            <button
                                                type="button"
                                                onClick={handleBack}
                                                disabled={activeStep === 0}
                                                className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md ${activeStep === 0 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-50'} transition-colors`}
                                            >
                                                <ChevronLeft className="h-3.5 w-3.5 mr-1" /> Back
                                            </button>

                                            <button
                                                type="submit"
                                                className="inline-flex items-center px-4 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500 transition-colors"
                                            >
                                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                                {activeStep < steps.length - 1 && <ChevronRight className="h-3.5 w-3.5 ml-1" />}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProfileStepper;