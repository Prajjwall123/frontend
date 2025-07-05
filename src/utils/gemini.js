import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with API key from environment variables
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

// Common study visa document requirements
const STUDY_VISA_DOCS = `
1. Valid passport (6+ months validity)
2. DS-160 confirmation page
3. SEVIS I-901 fee receipt
4. Visa application fee receipt
5. Passport-size photo (recent)
6. Form I-20 (signed by you and school)
7. University acceptance letter
8. Academic documents (transcripts, diplomas, test scores)
9. Proof of financial support (bank statements, sponsor letters)
10. Proof of intent to return home (family ties, property, job offer)`;

// Common study visa interview questions
const COMMON_QUESTIONS = [
    "Why do you want to study in the US?",
    "Why did you choose this university?",
    "What is your planned major?",
    "How will this program help your career?",
    "What are your plans after graduation?",
    "Do you have family in the US?",
    "How will you fund your education?",
    "What are your career goals?",
    "Why not study in your home country?",
    "What do your parents do for work?"
];

// Function to generate visa interview response
export const generateVisaInterviewResponse = async (messages) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Get the last user message
        const lastMessage = messages[messages.length - 1].content.toLowerCase();

        // Check for document-related queries
        if (lastMessage.includes('document') || lastMessage.includes('bring') || lastMessage.includes('need')) {
            return {
                success: true,
                message: `For your F-1 student visa interview, bring these documents:\n\n${STUDY_VISA_DOCS}\n\nTip: Organize them in a folder for easy access.`
            };
        }

        // Check for common questions
        if (lastMessage.includes('common question') || lastMessage.includes('ask') || lastMessage.includes('prepare')) {
            const questionsList = COMMON_QUESTIONS.map((q, i) => `${i + 1}. ${q}`).join('\n');
            return {
                success: true,
                message: `Common F-1 visa interview questions:\n\n${questionsList}\n\nPractice answering these clearly and honestly.`
            };
        }

        // For other queries, use the AI
        const chat = model.startChat({
            generationConfig: {
                temperature: 0.7,
                topP: 0.8,
                topK: 40,
                maxOutputTokens: 500,
            },
            systemInstruction: {
                role: 'model',
                parts: [{
                    text: 'You are a helpful F-1 student visa interview assistant. Provide clear, concise answers. ' +
                        'Focus on study visa requirements and interview preparation. ' +
                        'Keep responses under 3 sentences when possible. ' +
                        'For document questions, refer to the standard F-1 visa requirements.'
                }]
            },
        });

        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        const text = response.text();

        return {
            success: true,
            message: text
        };
    } catch (error) {
        console.error('Error generating response:', error);
        return {
            success: false,
            message: 'Sorry, I encountered an error. Please try again.'
        };
    }
};

// Function to analyze visa documents
export const analyzeVisaDocuments = async (documentText) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `Analyze these F-1 visa documents. Be concise. Highlight any issues or missing items:
        
        ${documentText}
        
        Format response:
        1. Document type
        2. Key points
        3. Any issues found`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return {
            success: true,
            analysis: text
        };
    } catch (error) {
        console.error('Error analyzing documents:', error);
        return {
            success: false,
            analysis: 'Error analyzing documents. Please try again.'
        };
    }
};
