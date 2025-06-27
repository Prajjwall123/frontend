// src/core/private/profile-steps/EnglishTestStep.jsx
import React, { useState, useEffect } from 'react';
import { BookOpen, AlertCircle, CheckCircle, Upload, Calendar } from 'lucide-react';

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
        if (value !== '' && isNaN(parseFloat(value))) {
            return;
        }

        const newScores = {
            ...scores,
            [section]: value
        };
        setScores(newScores);

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sections.map((section) => (
                        <div key={section} className="space-y-1.5">
                            <label className="block text-sm font-medium text-gray-700 capitalize">
                                {section} Score
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <input
                                    type="number"
                                    value={scores[section] || ''}
                                    onChange={(e) => handleScoreChange(section, e.target.value)}
                                    min={scoreLimits[testType]?.min || 0}
                                    max={scoreLimits[testType]?.max || 100}
                                    step={testType === 'ielts' ? 0.5 : 1}
                                    className="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                    placeholder={`Enter ${section} score`}
                                />
                            </div>
                            <p className="text-xs text-gray-500">
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
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">English Language Proficiency</h2>
                <p className="text-sm text-gray-500">Provide your English test scores (if available)</p>
            </div>

            <div className="space-y-4">
                {/* Test Type Selection */}
                <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700">English Test Type</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {testTypes.map((type) => (
                            <label
                                key={type.id}
                                className={`relative border rounded-md p-3 flex items-center space-x-3 cursor-pointer transition-colors ${testType === type.id
                                    ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
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
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-gray-700">
                                Test Date
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="date"
                                    name="englishTest.testDate"
                                    value={formData.englishTest?.testDate || ''}
                                    onChange={handleChange}
                                    max={new Date().toISOString().split('T')[0]}
                                    className="block w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {renderScoreInputs()}

                        {/* Test Report Form Upload */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-gray-700">
                                Upload Test Report Form (Optional)
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Upload className="h-4 w-4 text-gray-400" />
                                </div>
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
                                    className="block w-full text-sm text-gray-500 pl-10 py-2.5 border border-gray-300 rounded-md file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-blue-600 hover:file:bg-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                />
                            </div>
                            <p className="text-xs text-gray-500">
                                Accepted formats: PDF, JPG, PNG (Max size: 5MB)
                            </p>
                        </div>

                        {/* Test Reference Number */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-gray-700">
                                Test Reference Number (Optional)
                            </label>
                            <input
                                type="text"
                                name="englishTest.referenceNumber"
                                value={formData.englishTest?.referenceNumber || ''}
                                onChange={handleChange}
                                className="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your test reference number"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default EnglishTestStep;