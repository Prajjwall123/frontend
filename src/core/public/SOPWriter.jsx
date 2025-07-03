import React, { useState, useRef, useEffect } from 'react';
import { Save, ExternalLink } from 'lucide-react';
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
    const navigate = useNavigate();

    // Course details (replace with dynamic data later)
    const courseName = 'Computer Science';
    const universityName = 'Stanford University';
    const courseId = 'cs101';

    // Handle content updates with typewriter effect
    useEffect(() => {
        if (content && content !== displayedContent) {
            setIsUpdatingEssay(true);
        }
    }, [content, displayedContent]);

    const handleContentUpdate = (newContent) => {
        if (newContent && newContent !== content) {
            setContent(newContent);
        }
    };

    const handleTypewriterComplete = () => {
        setIsUpdatingEssay(false);
        setDisplayedContent(content);
    };

    const handleViewCourse = () => {
        navigate(`/course/${courseId}`);
    };

    const handleSubmit = () => {
        // Handle SOP submission
        console.log('SOP submitted:', content);
        alert('SOP submitted successfully!');
    };

    // Handle messages from the chatbot
    const handleBotMessage = (message) => {
        if (message.updatedEssay) {
            handleContentUpdate(message.updatedEssay);
        }
    };

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
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />

            <div className="flex-1 flex flex-col" style={{ marginTop: '5rem', minHeight: 'calc(100vh - 10rem)' }}>
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900">{courseName}</h1>
                        <p className="text-sm text-gray-600">{universityName}</p>
                    </div>
                    <button
                        onClick={handleViewCourse}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        <ExternalLink className="w-4 h-4 mr-2 text-gray-900" />
                        View Course
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left Side - Editor */}
                    <div className="flex-1 flex flex-col border-r border-gray-200 overflow-hidden">
                        {/* Toolbar */}
                        <div className="border-b border-gray-200 bg-gray-50 p-2 flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                {wordCount} words • {characterCount} characters
                            </div>
                        </div>

                        {/* Editor */}
                        <div className="flex-1 overflow-auto">
                            <div className={`essay-container ${isUpdatingEssay ? 'updating' : ''}`}>
                                {isUpdatingEssay ? (
                                    <div className="p-4">
                                        <Typewriter
                                            text={content}
                                            speed={1}
                                            onComplete={handleTypewriterComplete}
                                            className="whitespace-pre-wrap"
                                        />
                                    </div>
                                ) : (
                                    <textarea
                                        ref={textareaRef}
                                        className="essay-editor"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Start writing your Statement of Purpose here..."
                                        style={{
                                            minHeight: 'calc(100vh - 20rem)',
                                            height: 'auto',
                                            resize: 'none',
                                            overflow: 'auto'
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                            <div className="flex justify-center">
                                <button
                                    onClick={handleSubmit}
                                    className="w-full max-w-xs flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    <Save className="w-4 h-4 mr-2 text-white" />
                                    Submit SOP
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Voice Chat */}
                    <div className="w-96 flex flex-col border-l border-gray-200" style={{
                        height: 'calc(100vh - 5rem)', // Adjust this value based on your header height
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <VoiceChatBot
                            onMessage={handleBotMessage}
                            initialMessages={initialMessages}
                            currentSOP={content}
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SOPWriter;
