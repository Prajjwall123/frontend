// src/core/private/profile-steps/EnglishTestStep.jsx
import React, { useState, useEffect } from 'react';
import { BookOpen, AlertCircle, CheckCircle } from 'lucide-react';

const EnglishTestStep = ({ formData, handleChange }) => {
    const [testType, setTestType] = useState(formData.englishTest?.testType || '');
    const [scores, setScores] = useState({
        overall: formData.englishTest?.overallScore || '',
        reading: formData.englishTest?.reading || '',
        writing: formData.englishTest?.writing || '',
        speaking: formData.englishTest?.speaking || '',
        listening: formData.englishTest?.listening || ''
    });

    const testTypes = [
        { id: 'ielts', name: 'IELTS' },
        { id: 'toefl', name: 'TOEFL iBT' },
        { id: 'pte', name: 'PTE Academic' },
        { id: 'duolingo', name: 'Duolingo English Test' },
        { id: 'other', name: 'Other' }
    ];

    const scoreLimits = {
        ielts: { min: 1, max: 9, step: 0.5 },
        toefl: { min: 0, max: 120, step: 1 },
        pte: { min: 10, max: 90, step: 1 },
        duolingo: { min: 10, max: 160, step: 5 },
        other: { min: 0, max: 100, step: 1 }
    };

    const handleScoreChange = (section, value) => {
        // Ensure the value is a valid number or empty string
        if (value !== '' && isNaN(parseFloat(value))) {
            return; // Don't update if not a valid number
        }

        const newScores = {
            ...scores,
            [section]: value
        };
        setScores(newScores);

        // Update parent form data
        handleChange({
            target: {
                name: `englishTest.${section}`,
                value: value === '' ? '' : parseFloat(value)
            }
        });
    };

    const handleTestTypeChange = (e) => {
        const value = e.target.value;
        setTestType(value);
        handleChange({
            target: {
                name: 'englishTest.testType',
                value
            }
        });
    };

    const calculateOverall = () => {
        if (testType !== 'ielts' && testType !== 'other') return '';
        const { reading, writing, speaking, listening } = scores;
        const validScores = [reading, writing, speaking, listening].filter(score => score !== '');
        if (validScores.length === 0) return '';

        const sum = validScores.reduce((acc, score) => acc + parseFloat(score), 0);
        const average = sum / validScores.length;
        return testType === 'ielts' ? Math.round(average * 2) / 2 : Math.round(average);
    };

    useEffect(() => {
        if (testType && testType !== 'other') {
            const overall = calculateOverall();
            if (overall !== '') {
                handleScoreChange('overall', overall);
            }
        }
    }, [scores, testType]);

    const renderScoreInputs = () => {
        if (!testType) return null;

        const sections = testType === 'other'
            ? ['overall']
            : ['reading', 'writing', 'speaking', 'listening'];

        return (
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Test Scores</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sections.map((section) => (
                        <div key={section} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 capitalize">
                                {section} Score
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={scores[section] || ''}
                                    onChange={(e) => handleScoreChange(section, e.target.value)}
                                    min={scoreLimits[testType]?.min || 0}
                                    max={scoreLimits[testType]?.max || 100}
                                    step={testType === 'ielts' ? 0.5 : 1}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder={`Enter ${section} score`}
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                                Range: {scoreLimits[testType]?.min} - {scoreLimits[testType]?.max}
                                {testType === 'ielts' ? ' (increments of 0.5)' : ''}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">English Language Proficiency</h2>
                <p className="text-gray-600">Provide your English test scores (if available)</p>
            </div>

            <div className="space-y-6">
                {/* Test Type Selection */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">English Test Type</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {testTypes.map((type) => (
                            <label
                                key={type.id}
                                className={`relative border rounded-lg p-4 flex items-center space-x-3 cursor-pointer ${testType === type.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-300 hover:border-blue-300'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="testType"
                                    value={type.id}
                                    checked={testType === type.id}
                                    onChange={handleTestTypeChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="block text-sm font-medium text-gray-700">
                                    {type.name}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {testType && (
                    <>
                        {/* Test Date */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Test Date
                            </label>
                            <input
                                type="date"
                                name="englishTest.testDate"
                                value={formData.englishTest?.testDate || ''}
                                onChange={handleChange}
                                max={new Date().toISOString().split('T')[0]}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        {renderScoreInputs()}

                        {/* Test Report Form Upload */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Upload Test Report Form (Optional)
                            </label>
                            <div className="mt-1 flex items-center">
                                <input
                                    type="file"
                                    name="englishTest.testReport"
                                    onChange={(e) => {
                                        handleChange({
                                            target: {
                                                name: 'englishTest.testReport',
                                                value: e.target.files[0]
                                            }
                                        });
                                    }}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                                Accepted formats: PDF, JPG, PNG (Max size: 5MB)
                            </p>
                        </div>
                    </>
                )}

                {/* No Test Taken */}
                {!testType && (
                    <div className="rounded-md bg-yellow-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-800">No test selected</h3>
                                <div className="mt-2 text-sm text-yellow-700">
                                    <p>
                                        If you haven't taken an English proficiency test yet, you can skip this section
                                        and come back later. However, most universities require proof of English
                                        proficiency for admission.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnglishTestStep;