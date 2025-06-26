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

const steps = [
    { id: 'Personal', icon: User, component: PersonalInfoStep },
    { id: 'Education', icon: Book, component: EducationStep },
    { id: 'Visa', icon: Globe, component: VisaStep },
    { id: 'English', icon: FileText, component: EnglishTestStep },
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
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {/* Stepper */}
                    <div className="px-6 py-8 border-b border-gray-200">
                        <nav aria-label="Progress">
                            <ol className="flex items-center">
                                {steps.map((step, index) => (
                                    <li key={step.id} className={`relative ${index !== steps.length - 1 ? 'flex-1' : 'flex-none'}`}>
                                        {index < steps.length - 1 && (
                                            <div className={`absolute top-4 left-4 -ml-px mt-0.5 h-0.5 w-full ${index < activeStep ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                                        )}
                                        <div className="group flex flex-col items-center">
                                            <span className={`flex items-center justify-center w-8 h-8 rounded-full ${index <= activeStep ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                {index < activeStep ? (
                                                    <Check className="h-5 w-5" />
                                                ) : (
                                                    <step.icon className="h-5 w-5" />
                                                )}
                                            </span>
                                            <span className={`mt-2 text-xs font-medium ${index <= activeStep ? 'text-blue-600' : 'text-gray-500'}`}>
                                                {step.id}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    </div>

                    {/* Form Content */}
                    <div className="px-6 py-8">
                        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                            <CurrentStep
                                formData={formData}
                                handleChange={handleChange}
                            />

                            <div className="flex justify-between pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    disabled={activeStep === 0}
                                    className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${activeStep === 0 ? 'text-gray-400 bg-gray-50' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
                                >
                                    <ChevronLeft className="h-5 w-5 mr-1" /> Back
                                </button>

                                <div className="flex items-center space-x-3">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        {activeStep === steps.length - 1 ? 'Submit Application' : 'Next'}
                                        {activeStep < steps.length - 1 && <ChevronRight className="h-5 w-5 ml-1" />}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProfileStepper;