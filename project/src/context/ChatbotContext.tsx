import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

type ChatbotContextType = {
  messages: Message[];
  sendMessage: (content: string) => void;
  isTyping: boolean;
  chatOpen: boolean;
  toggleChat: () => void;
};

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

export const ChatbotProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I am UniBot, your university assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Common university-related questions and answers
  const knowledgeBase = {
    'admission': 'Admissions for the next academic year are open until June 30th. You can apply online through our admissions portal.',
    'courses': 'We offer various undergraduate, postgraduate, and diploma courses across Engineering, Allied Health, Management, Pharmacy, Literature, and Multimedia.',
    'hostel': 'Our university has separate hostels for boys and girls. Each hostel has Wi-Fi, laundry services, and a common room.',
    'fees': 'Tuition fees vary by program. You can check the detailed fee structure on our website under Academics > Fee Structure.',
    'campus': 'Our campus spans 100 acres with modern facilities including libraries, labs, sports grounds, and recreational areas.',
    'exams': 'Examinations are held twice a year - mid-semester in October and end-semester in April.',
    'attendance': 'Students must maintain 75% attendance to be eligible for examinations.',
    'library': 'The central library is open from 9 AM to 10 PM on weekdays and 10 AM to 6 PM on weekends.',
    'schedule': 'Class schedules are available on the dashboard under the Academics section.',
    'contact': 'You can contact the administration office at admin@university.edu or call at 123-456-7890.',
    'faculty': 'Information about faculty members is available on our website under About > Faculty.',
    'scholarship': 'We offer merit-based and need-based scholarships. Applications open at the beginning of each academic year.',
    'internship': 'We have a dedicated placement cell that helps students secure internships and job placements.',
    'events': 'Check the Events section on the dashboard for upcoming university events and activities.',
    'help': 'I can help you with information about admissions, courses, hostels, fees, campus facilities, exams, attendance, and more. Just ask me anything!'
  };

  const generateResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Check for keywords in the message
    for (const [keyword, response] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    // Default responses if no keyword matches
    const defaultResponses = [
      "I'm not sure I understand. Could you please rephrase your question?",
      "I don't have that information yet. You can check the university website or contact the administration office.",
      "That's a good question! You can find more details about this on the university portal or by visiting the relevant department.",
      "I'm still learning. Please contact the administration for more accurate information on this topic."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const sendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate bot thinking and typing
    setTimeout(() => {
      const botResponse = generateResponse(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleChat = () => {
    setChatOpen(prev => !prev);
  };

  const value = {
    messages,
    sendMessage,
    isTyping,
    chatOpen,
    toggleChat,
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
};