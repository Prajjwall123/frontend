import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Mic, MicOff, Volume2, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { generateVisaInterviewScenario, continueVisaInterview, analyzeInterviewPerformance } from '../../utils/gemini';
import { getUserInfo } from '../../utils/authHelper';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { toast } from 'react-toastify';

// Memoize the speech synthesis voices
const useVoices = () => {
    const [voices, setVoices] = useState([]);

    useEffect(() => {
        const updateVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            // Prefer natural-sounding voices
            const preferredVoices = availableVoices.filter(v =>
                v.lang.includes('en-') &&
                (v.name.includes('Google') || v.name.includes('Natural'))
            );
            setVoices(preferredVoices.length ? preferredVoices : availableVoices);
        };

        window.speechSynthesis.onvoiceschanged = updateVoices;
        updateVoices();

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    return voices;
};

const MockVisaInterview = () => {
    const [isListening, setIsListening] = useState(false);
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isInterviewComplete, setIsInterviewComplete] = useState(false);
    const [feedback, setFeedback] = useState('');
    const recognitionRef = useRef(null);
    const synthRef = useRef(null);
    const utteranceRef = useRef(null);
    const conversationEndRef = useRef(null);
    const voices = useVoices();
    const userProfile = useMemo(() => getUserInfo(), []);

    // Initialize speech synthesis and recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize speech synthesis
            synthRef.current = window.speechSynthesis;

            // Initialize speech recognition
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = false;
                recognitionRef.current.interimResults = false;
                recognitionRef.current.lang = 'en-US';

                recognitionRef.current.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    if (transcript.trim()) {
                        handleUserResponse(transcript);
                    }
                };

                recognitionRef.current.onerror = (event) => {
                    if (event.error !== 'no-speech') {
                        console.error('Speech recognition error', event.error);
                        toast.error('Error with speech recognition. Please try again.');
                    }
                    setIsListening(false);
                };

                recognitionRef.current.onspeechend = () => {
                    if (isListening) {
                        recognitionRef.current.stop();
                        setIsListening(false);
                    }
                };
            } else {
                toast.error('Speech recognition is not supported in your browser. Try Chrome or Edge.');
            }
        }

        // Start the interview when component mounts
        startInterview();

        return () => {
            // Cleanup
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            if (synthRef.current && synthRef.current.speaking) {
                synthRef.current.cancel();
            }
        };
    }, []);

    // Auto-scroll to bottom of conversation
    useEffect(() => {
        if (conversationEndRef.current) {
            conversationEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [conversation, feedback]);

    // Speak text using the Web Speech API with optimizations
    const speak = useCallback((text) => {
        return new Promise((resolve) => {
            if (!text || !synthRef.current) return resolve();

            // Cancel any ongoing speech
            if (synthRef.current.speaking) {
                synthRef.current.cancel();
            }

            const utterance = new SpeechSynthesisUtterance(text);

            // Optimize speech settings
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;

            // Use a natural-sounding voice if available
            if (voices.length > 0) {
                const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Natural')) || voices[0];
                utterance.voice = preferredVoice;
            }

            // Set up event handlers
            utterance.onend = () => {
                setIsSpeaking(false);
                resolve();
            };

            utterance.onerror = (event) => {
                console.error('SpeechSynthesis error:', event);
                setIsSpeaking(false);
                resolve();
            };

            // Start speaking
            utteranceRef.current = utterance;
            synthRef.current.speak(utterance);
            setIsSpeaking(true);
        });
    }, [voices]);

    // Start a new interview
    const startInterview = async () => {
        try {
            setIsLoading(true);
            setConversation([]);
            setIsInterviewComplete(false);
            setFeedback('');

            const response = await generateVisaInterviewScenario(userProfile);
            if (response.success) {
                const newMessage = { role: 'officer', content: response.message };
                setConversation([newMessage]);
                await speak(response.message);
            } else {
                toast.error('Failed to start interview. Please try again.');
            }
        } catch (error) {
            console.error('Error starting interview:', error);
            toast.error('An error occurred while starting the interview.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle user's spoken response
    const handleUserResponse = async (userText) => {
        if (!userText.trim()) return;

        const userMessage = { role: 'applicant', content: userText };
        setConversation(prev => [...prev, userMessage]);

        try {
            setIsLoading(true);
            const response = await continueVisaInterview(conversation, userText);

            if (response.success) {
                const officerMessage = { role: 'officer', content: response.message };
                setConversation(prev => [...prev, officerMessage]);

                if (response.isComplete) {
                    setIsInterviewComplete(true);
                    // Don't wait for analysis to finish before showing the message
                    analyzeInterviewPerformance([...conversation, officerMessage])
                        .then(analysis => {
                            if (analysis.success) {
                                setFeedback(analysis.feedback);
                            }
                        });
                }

                await speak(response.message);
            }
        } catch (error) {
            console.error('Error processing response:', error);
            toast.error('An error occurred while processing your response.');
        } finally {
            setIsLoading(false);
        }
    };

    // Toggle microphone on/off
    const toggleListening = useCallback(() => {
        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            try {
                recognitionRef.current.start();
                setIsListening(true);
                toast.info('Listening... Speak now.', { autoClose: 1500 });
            } catch (error) {
                console.error('Error starting recognition:', error);
                toast.error('Error starting voice recognition. Please try again.');
            }
        }
    }, [isListening]);

    // Replay the last message
    const replayLastMessage = useCallback(() => {
        if (conversation.length > 0) {
            const lastMessage = conversation[conversation.length - 1];
            if (lastMessage.role === 'officer') {
                speak(lastMessage.content);
            }
        }
    }, [conversation, speak]);

    // Memoize the conversation items to prevent unnecessary re-renders
    const conversationItems = useMemo(() => {
        return conversation.map((msg, index) => (
            <div
                key={index}
                className={`mb-4 flex ${msg.role === 'officer' ? 'justify-start' : 'justify-end'}`}
            >
                <div
                    className={`max-w-3/4 rounded-lg px-4 py-2 ${msg.role === 'officer'
                            ? 'bg-indigo-100 text-indigo-900'
                            : 'bg-green-100 text-green-900'
                        }`}
                >
                    <p className="font-medium">
                        {msg.role === 'officer' ? 'Visa Officer' : 'You'}
                    </p>
                    <p>{msg.content}</p>
                </div>
            </div>
        ));
    }, [conversation]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-8 text-indigo-800">
                        Mock F1 Visa Interview
                    </h1>

                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <div className="h-96 overflow-y-auto mb-6 p-4 border rounded-lg bg-gray-50">
                            {conversation.length === 0 ? (
                                <p className="text-gray-500 text-center my-8">
                                    {isLoading ? 'Preparing your interview...' : 'The interview will begin shortly...'}
                                </p>
                            ) : (
                                <>
                                    {conversationItems}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-indigo-100 rounded-lg px-4 py-2 text-indigo-900">
                                                <div className="flex space-x-2">
                                                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                            <div ref={conversationEndRef} />
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={toggleListening}
                                disabled={isLoading || isSpeaking || isInterviewComplete}
                                className={`flex items-center px-6 py-3 rounded-full text-white font-medium ${isListening
                                        ? 'bg-red-500 hover:bg-red-600'
                                        : 'bg-indigo-600 hover:bg-indigo-700'
                                    } transition-colors disabled:opacity-50 flex-shrink-0`}
                            >
                                {isListening ? (
                                    <>
                                        <MicOff className="mr-2" size={20} />
                                        Stop Listening
                                    </>
                                ) : (
                                    <>
                                        <Mic className="mr-2" size={20} />
                                        {isSpeaking ? 'Wait...' : 'Speak Your Answer'}
                                    </>
                                )}
                            </button>

                            <button
                                onClick={replayLastMessage}
                                disabled={conversation.length === 0 || isSpeaking || isInterviewComplete}
                                className="flex items-center px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-800 font-medium transition-colors disabled:opacity-50 flex-shrink-0"
                            >
                                <Volume2 className="mr-2" size={20} />
                                Replay
                            </button>

                            <button
                                onClick={startInterview}
                                className="flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 rounded-full text-white font-medium transition-colors flex-shrink-0"
                            >
                                <RotateCcw className="mr-2" size={20} />
                                Restart
                            </button>
                        </div>
                    </div>

                    {isInterviewComplete && feedback && (
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-indigo-500">
                            <h3 className="text-xl font-semibold mb-4 text-indigo-800 flex items-center">
                                <CheckCircle className="mr-2 text-green-500" />
                                Interview Complete - Your Feedback
                            </h3>
                            <div className="prose max-w-none" dangerouslySetInnerHTML={{
                                __html: feedback.replace(/\n/g, '<br>').replace(/•/g, '• ')
                            }} />
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                                    <AlertCircle className="mr-2" size={18} />
                                    Tips for Your Real Interview
                                </h4>
                                <ul className="list-disc pl-5 space-y-1 text-blue-700">
                                    <li>Be concise and to the point in your answers</li>
                                    <li>Bring all required documents in an organized manner</li>
                                    <li>Dress professionally and arrive early</li>
                                    <li>Be honest and consistent with your responses</li>
                                    <li>Practice common questions but don't sound rehearsed</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default React.memo(MockVisaInterview);
