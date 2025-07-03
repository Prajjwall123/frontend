import React, { useState, useRef, useEffect } from 'react';
import { Send, Copy, Save, MessageSquare, Bot, User, Sparkles, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { generateSOPSuggestion } from '../../utils/geminiHelper';
import './SOPWriter.css';

const SOPWriter = () => {
    const [content, setContent] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'assistant',
            content: 'Hello! I\'m your SOP Assistant. I can help you write and improve your Statement of Purpose. How can I assist you today?',
            timestamp: new Date()
        }
    ]);
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdatingEssay, setIsUpdatingEssay] = useState(false);
    const textareaRef = useRef(null);
    const navigate = useNavigate();

    // Course details (replace with dynamic data later)
    const courseName = 'Computer Science';
    const universityName = 'Stanford University';
    const courseId = 'cs101';

    const handleViewCourse = () => {
        navigate(`/course/${courseId}`);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            role: 'user',
            content: prompt,
            timestamp: new Date()
        };

        // Add user message to chat
        setMessages(prev => [...prev, userMessage]);
        setPrompt('');
        setIsLoading(true);

        try {
            const response = await generateSOPSuggestion(prompt, content);

            // Log the response for debugging
            console.log('AI Response:', response);

            if (response.error) {
                const errorMessage = {
                    id: Date.now() + 1,
                    role: 'assistant',
                    content: `Error: ${response.error}`,
                    timestamp: new Date(),
                    isError: true
                };
                setMessages(prev => [...prev, errorMessage]);
                return;
            }

            // Create AI response message
            const aiResponse = {
                id: Date.now() + 1,
                role: 'assistant',
                content: response.data || 'I\'ve updated your SOP with the requested changes.',
                timestamp: new Date()
            };

            // Update messages first
            setMessages(prev => [...prev, aiResponse]);

            // If there's an updated essay, update it with animation
            if (response.updatedEssay && response.updatedEssay !== content) {
                // Show update animation
                setIsUpdatingEssay(true);

                // Small delay to ensure chat updates first
                setTimeout(() => {
                    setContent(response.updatedEssay);

                    // Hide animation after update is complete
                    setTimeout(() => {
                        setIsUpdatingEssay(false);
                    }, 1000);
                }, 100);
            }
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = {
                id: Date.now() + 1,
                role: 'assistant',
                content: 'An error occurred while processing your request. Please try again.',
                timestamp: new Date(),
                isError: true
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = () => {
        // Handle SOP submission logic here
        alert('SOP submitted successfully!');
    };

    // Word and character count
    const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
    const characterCount = content.length;

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />

            {/* Original SOP Writer Content */}
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
                            <div className="flex items-center gap-2">
                                {/* Formatting buttons have been removed */}
                            </div>
                            <div className="text-sm text-gray-500">
                                {wordCount} words • {characterCount} characters
                            </div>
                        </div>

                        {/* Editor */}
                        <div className="flex-1 overflow-auto">
                            <div className={`essay-container ${isUpdatingEssay ? 'updating' : ''}`}>
                                {isUpdatingEssay && (
                                    <div className="update-overlay">
                                        <div className="update-spinner"></div>
                                        <span>Updating your essay...</span>
                                    </div>
                                )}
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

                    {/* Right Side - Chat */}
                    <div className="w-80 flex flex-col border-l border-gray-200 overflow-hidden">
                        {/* Chat Header */}
                        <div className="border-b border-gray-200 p-4 flex items-center justify-between bg-gray-50 flex-shrink-0">
                            <h2 className="text-lg font-medium text-gray-900">SOP Assistant</h2>
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                <span className="text-sm text-gray-500">Online</span>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-4" style={{ minHeight: 0 }}>
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`${message.role === 'user' ? 'text-right' : 'text-left'}`}
                                    >
                                        <div
                                            className={`inline-block p-3 rounded-lg max-w-[90%] ${message.role === 'user'
                                                ? 'bg-gray-900 text-white'
                                                : message.isError
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-gray-100 text-gray-800'}`}
                                        >
                                            {message.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chat Input */}
                        <div className="border-t border-gray-200 p-4 bg-white flex-shrink-0">
                            <form onSubmit={handleSendMessage} className="flex items-center">
                                <input
                                    type="text"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                    placeholder="Ask for help with your SOP..."
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    className="bg-gray-900 text-white p-2 rounded-r-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50"
                                    disabled={isLoading || !prompt.trim()}
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-2 border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <Send size={18} />
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SOPWriter;
