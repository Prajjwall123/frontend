import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, Volume2, VolumeX, MicOff } from 'lucide-react';
import Typewriter from '../../components/Typewriter';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { generateVisaInterviewResponse } from '../../utils/gemini';
import { motion, AnimatePresence } from 'framer-motion';

// Voice visualization component with smooth animations
const VoiceVisualization = ({ isSpeaking, isListening }) => {
    return (
        <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Wave circles */}
            <div className="absolute inset-0 flex items-center justify-center">
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border-2 border-blue-300"
                        animate={{
                            scale: isSpeaking ? [1, 1.2, 1] : 0.8,
                            opacity: isSpeaking ? [0.4, 0.7, 0.4] : 0,
                            width: 80 + i * 40,
                            height: 80 + i * 40,
                        }}
                        transition={{
                            duration: 2,
                            repeat: isSpeaking ? Infinity : 0,
                            ease: 'easeInOut',
                            delay: i * 0.2
                        }}
                    />
                ))}
            </div>

            {/* Base circle */}
            <motion.div
                className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg"
                animate={{
                    scale: isListening ? [1, 1.05, 1] : 1,
                    boxShadow: isListening
                        ? '0 0 20px rgba(59, 130, 246, 0.7)'
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                transition={{
                    duration: 2,
                    repeat: isListening ? Infinity : 0,
                    ease: 'easeInOut'
                }}
            >
                {isListening ? (
                    <Mic className="w-8 h-8 text-white animate-pulse" />
                ) : (
                    <MicOff className="w-8 h-8 text-white" />
                )}
            </motion.div>
        </div>
    );
};

// Animated message bubble
const MessageBubble = ({ message, isUser }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
        >
            <div
                className={`relative max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl px-5 py-3 shadow-sm ${isUser
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none'
                    : 'bg-gray-50 text-gray-800 rounded-bl-none border border-gray-200'
                    }`}
            >
                {message.content}
                {!isUser && (
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 transform -rotate-45 bg-gray-50 border-b border-l border-gray-200"></div>
                )}
                {isUser && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 transform rotate-45 bg-blue-500"></div>
                )}
            </div>
        </motion.div>
    );
};

const VisaInterview = () => {
    const [input, setInput] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            content: "Hello! I'm your visa interview assistant. How can I help you prepare for your F-1 visa interview today?",
            role: 'assistant'
        }
    ]);
    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);
    const synthRef = useRef(null);

    // Initialize speech recognition and synthesis
    useEffect(() => {
        // Initialize speech synthesis
        synthRef.current = window.speechSynthesis;

        // Initialize speech recognition if available
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = false;
                recognitionRef.current.interimResults = false;
                recognitionRef.current.lang = 'en-US';

                recognitionRef.current.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    console.log('Voice input:', transcript);
                    setInput(prev => prev ? `${prev} ${transcript}` : transcript);
                };

                recognitionRef.current.onerror = (event) => {
                    console.error('Speech recognition error', event.error);
                    setIsListening(false);

                    const errorMessage = {
                        id: Date.now() + 1,
                        role: 'assistant',
                        content: 'Sorry, there was an error with voice recognition. Please try again or type your request.',
                        isError: true
                    };

                    setMessages(prev => [...prev, errorMessage]);
                };

                recognitionRef.current.onend = () => {
                    if (isListening) {
                        recognitionRef.current.start();
                    }
                };
            }
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            if (synthRef.current) {
                synthRef.current.cancel();
            }
        };
    }, [isListening]);

    // Speak the assistant's messages when isSpeaking is true
    useEffect(() => {
        if (isSpeaking && messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.role === 'assistant' && !lastMessage.isError) {
                speakText(lastMessage.content);
            }
        }
    }, [messages, isSpeaking]);

    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert('Speech recognition is not supported in your browser');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            setInput('');
            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (error) {
                console.error('Error starting speech recognition:', error);
            }
        }
    };

    const speakText = (text) => {
        if (!isSpeaking || !('speechSynthesis' in window)) return;

        // Cancel any ongoing speech
        synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        synthRef.current.speak(utterance);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now(),
            content: input,
            role: 'user'
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await generateVisaInterviewResponse(input);
            const responseContent = typeof response === 'object' ? response.message : response;

            const botMessage = {
                id: Date.now() + 1,
                content: responseContent,
                role: 'assistant'
            };

            setMessages(prev => [...prev, botMessage]);
            scrollToBottom();
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = {
                id: Date.now() + 1,
                content: "I'm sorry, I encountered an error. Please try again.",
                role: 'assistant',
                isError: true
            };
            setMessages(prev => [...prev, errorMessage]);
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Visa Interview Assistant</h1>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    <h2 className="font-semibold">Visa Interview Assistant</h2>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setIsSpeaking(!isSpeaking)}
                                        className="p-1.5 rounded-full bg-blue-500 bg-opacity-20 hover:bg-opacity-30 transition-colors"
                                        title={isSpeaking ? 'Mute responses' : 'Unmute responses'}
                                    >
                                        {isSpeaking ?
                                            <Volume2 className="w-4 h-4" /> :
                                            <VolumeX className="w-4 h-4" />
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Chat container */}
                        <div className="flex flex-col h-[70vh]">
                            {/* Messages area */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                                <AnimatePresence>
                                    {messages.map((message) => (
                                        <MessageBubble
                                            key={message.id}
                                            message={message}
                                            isUser={message.role === 'user'}
                                        />
                                    ))}
                                    {isLoading && (
                                        <motion.div
                                            className="flex justify-start"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <div className="bg-gray-100 rounded-2xl px-4 py-2 rounded-bl-none">
                                                <div className="flex space-x-2 py-2">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </AnimatePresence>
                            </div>

                            {/* Input area */}
                            <div className="border-t border-gray-200 bg-white p-4">
                                <form onSubmit={handleSubmit} className="relative">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Type your question about the visa interview..."
                                            className="w-full pl-4 pr-24 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            disabled={isLoading}
                                        />
                                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                                            <button
                                                type="button"
                                                onClick={toggleListening}
                                                className={`p-2 rounded-full transition-colors ${isListening
                                                    ? 'text-red-600 bg-red-50 animate-pulse'
                                                    : 'text-gray-500 hover:bg-gray-100'
                                                    }`}
                                                disabled={isLoading}
                                                title={isListening ? 'Stop listening' : 'Start voice input'}
                                            >
                                                <Mic className="w-5 h-5" />
                                            </button>
                                            <button
                                                type="submit"
                                                className="p-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={!input.trim() || isLoading}
                                                title="Send message"
                                            >
                                                <Send className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-xs text-center text-gray-500">
                                        {isListening
                                            ? 'Listening... Speak now.'
                                            : 'Type your question or click the mic to speak'}
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default VisaInterview;
