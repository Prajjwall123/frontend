import React, { useState, useRef, useCallback } from 'react';
import { Save, ExternalLink, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import VoiceChatBot from '../../components/VoiceChatBot';
import Typewriter from '../../components/Typewriter';
import './SOPWriter.css';

const SOPWriter = () => {
    const [content, setContent] = useState('');
    const [isUpdatingEssay, setIsUpdatingEssay] = useState(false);
    const [displayedContent, setDisplayedContent] = useState('');
    const textareaRef = useRef(null);
    const editorRef = useRef(null);
    const navigate = useNavigate();
    const isInitialMount = useRef(true);

    // Course details (replace with dynamic data later)
    const courseName = 'Computer Science';
    const universityName = 'Stanford University';
    const courseId = 'cs101';

    // Handle content updates with typewriter effect
    const handleContentUpdate = useCallback((newContent) => {
        if (!newContent || newContent === content) return;

        // Store scroll position
        const editor = editorRef.current;
        const scrollTop = editor?.scrollTop || 0;

        // Update content
        setContent(newContent);
        setIsUpdatingEssay(true);

        // Restore scroll position after update
        requestAnimationFrame(() => {
            if (editor) {
                editor.scrollTop = scrollTop;
            }
        });
    }, [content]);

    const handleTypewriterComplete = useCallback(() => {
        setIsUpdatingEssay(false);
        setDisplayedContent(content);
    }, [content]);

    const handleViewCourse = () => {
        navigate(`/course/${courseId}`);
    };

    const handleSubmit = () => {
        // Handle SOP submission
        console.log('SOP submitted:', content);
        alert('SOP submitted successfully!');
    };

    // Handle messages from the chatbot
    const handleBotMessage = useCallback((message) => {
        if (message.updatedEssay) {
            handleContentUpdate(message.updatedEssay);
        }
    }, [handleContentUpdate]);

    // Word and character count
    const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
    const characterCount = content.length;

    // Initial message for the chatbot
    const initialMessages = [{
        id: 1,
        role: 'assistant',
        content: 'Hello! I\'m your SOP Assistant. I can help you write and improve your Statement of Purpose. How can I assist you today?',
        timestamp: new Date()
    }];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar />
            <div className="pt-20 flex-1">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                    {/* Course Header */}
                    <div className="bg-gray-900 text-white shadow-lg rounded-lg overflow-hidden border border-gray-800">
                        <div className="px-6 py-5 sm:px-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 bg-gray-800 p-3 rounded-lg">
                                        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                                            <span className="text-2xl font-bold text-white">SU</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-white">{courseName}</h1>
                                        <p className="text-gray-300 mt-1">{universityName}</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <button
                                        onClick={handleViewCourse}
                                        className="inline-flex items-center px-5 py-2.5 border border-gray-600 text-sm font-medium rounded-lg text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        View Course
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Editor and Chat Layout */}
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
                        {/* Editor Section */}
                        <div
                            ref={editorRef}
                            className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 flex flex-col"
                            style={{ height: 'calc(100vh - 280px)' }}
                        >
                            {/* Editor Header */}
                            <div className="bg-gray-50 px-6 py-3.5 border-b border-gray-200 flex justify-between items-center">
                                <div className="text-sm font-medium text-gray-700">
                                    {wordCount} words • {characterCount} characters
                                </div>
                                <button
                                    onClick={handleViewCourse}
                                    className="lg:hidden inline-flex items-center px-3.5 py-1.5 border border-gray-300 text-xs rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                                    View Course
                                </button>
                            </div>

                            {/* Editor Content */}
                            <div className="flex-1 overflow-auto">
                                <div className={`essay-container ${isUpdatingEssay ? 'updating' : ''}`}>
                                    {isUpdatingEssay ? (
                                        <div className="p-6">
                                            <Typewriter
                                                text={content}
                                                speed={1}
                                                onComplete={handleTypewriterComplete}
                                                className="whitespace-pre-wrap text-base leading-relaxed text-gray-800"
                                                scrollContainer={editorRef.current}
                                                preventScroll={true}
                                            />
                                        </div>
                                    ) : (
                                        <textarea
                                            ref={textareaRef}
                                            className="essay-editor w-full p-6 text-base leading-relaxed text-gray-800 focus:outline-none resize-none bg-white"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            placeholder="Start writing your Statement of Purpose here..."
                                            style={{
                                                minHeight: '100%',
                                                lineHeight: '1.75',
                                                width: '100%'
                                            }}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Editor Footer */}
                            <div className="bg-gray-50 px-6 py-3.5 border-t border-gray-200">
                                <div className="flex justify-center">
                                    <button
                                        onClick={handleSubmit}
                                        className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                                    >
                                        <Save className="w-4 h-4 mr-2 text-white" />
                                        Submit SOP
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Chat Section */}
                        <div className="lg:col-span-1 flex flex-col" style={{ height: 'calc(100vh - 280px)' }}>
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
                                <div className="bg-gray-900 px-5 py-3.5">
                                    <h3 className="text-white font-semibold flex items-center">
                                        <MessageSquare className="w-5 h-5 mr-2" />
                                        SOP Assistant
                                    </h3>
                                </div>
                                <div className="flex-1 overflow-auto">
                                    <VoiceChatBot
                                        onMessage={handleBotMessage}
                                        initialMessages={initialMessages}
                                        currentSOP={content}
                                        disableAutoScroll={true}
                                    />
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

export default SOPWriter;
