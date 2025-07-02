import React, { useState, useRef, useEffect } from 'react';
import { Send, Copy, Save, Bold, Italic, Underline, MessageSquare, Bot, User, Sparkles, ExternalLink } from 'lucide-react';
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
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    // Course details (replace with dynamic data later)
    const courseName = 'Computer Science';
    const universityName = 'Stanford University';
    const courseId = 'cs101';

    const handleFormat = (format) => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        let newText = content;

        switch (format) {
            case 'bold':
                newText = `${content.substring(0, start)}**${selectedText}**${content.substring(end)}`;
                break;
            case 'italic':
                newText = `${content.substring(0, start)}*${selectedText}*${content.substring(end)}`;
                break;
            case 'underline':
                newText = `${content.substring(0, start)}_${selectedText}_${content.substring(end)}`;
                break;
            default:
                break;
        }

        setContent(newText);
        textarea.focus();
        // Set cursor position after the formatted text
        setTimeout(() => {
            textarea.selectionStart = start + (format === 'bold' ? 2 : 1);
            textarea.selectionEnd = end + (format === 'bold' ? 2 : 1);
        }, 0);
    };

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

    // Auto-scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

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
                    <div className="flex-1 flex flex-col border-r border-gray-200">
                        {/* Toolbar */}
                        <div className="border-b border-gray-200 bg-gray-50 p-2 flex items-center gap-2">
                            <button
                                onClick={() => handleFormat('bold')}
                                className="p-2 rounded hover:bg-gray-200 text-gray-900"
                                title="Bold (Ctrl+B)"
                            >
                                <Bold size={16} className="text-gray-900" />
                            </button>
                            <button
                                onClick={() => handleFormat('italic')}
                                className="p-2 rounded hover:bg-gray-200 text-gray-900"
                                title="Italic (Ctrl+I)"
                            >
                                <Italic size={16} className="text-gray-900" />
                            </button>
                            <button
                                onClick={() => handleFormat('underline')}
                                className="p-2 rounded hover:bg-gray-200 text-gray-900"
                                title="Underline (Ctrl+U)"
                            >
                                <Underline size={16} className="text-gray-900" />
                            </button>
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
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                            <div className="flex justify-end mb-2">
                                <div className="text-sm text-gray-500">
                                    {wordCount} words • {characterCount} characters
                                </div>
                            </div>
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

                    {/* Right Side - Chat Interface */}
                    <div className="w-96 border-l border-gray-200 bg-white flex flex-col h-full">
                        {/* Chat Header */}
                        <div className="p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <h2 className="font-medium text-gray-900">SOP Assistant</h2>
                                    <p className="text-xs text-gray-500">Ask me anything about your SOP</p>
                                </div>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 22rem)' }}>
                            <div className="p-4 space-y-4">
                                {/* In your message rendering JSX */}
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                                    >
                                        <div
                                            className={`max-w-3/4 rounded-lg px-4 py-2 ${message.role === 'user'
                                                ? 'bg-blue-500 text-white'
                                                : message.isError
                                                    ? 'bg-red-100 text-red-800 border border-red-300'
                                                    : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            <div className="flex items-center mb-1">
                                                {message.role === 'assistant' ? (
                                                    <Bot size={16} className="mr-2" />
                                                ) : (
                                                    <User size={16} className="mr-2" />
                                                )}
                                                <span className="font-semibold">
                                                    {message.role === 'assistant' ? 'SOP Assistant' : 'You'}
                                                </span>
                                                <span className="text-xs opacity-75 ml-2">
                                                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <div className="whitespace-pre-wrap">{message.content}</div>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800 rounded-bl-none">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Bot size={14} className="text-blue-600" />
                                                <span className="text-xs font-medium">SOP Assistant</span>
                                            </div>
                                            <p className="text-sm">Thinking...</p>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                            <form onSubmit={handleSendMessage} className="relative">
                                <input
                                    type="text"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Message SOP Assistant..."
                                    className="w-full pl-4 pr-12 py-3 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-gray-500 focus:border-transparent h-12"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={!prompt.trim() || isLoading}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-gray-900 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={18} className="text-gray-900" />
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
