'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, PlusCircle, BookOpen, FileText, HelpCircle, TrendingUp, Search, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

// Message type
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Suggested question type
interface SuggestedQuestion {
  id: string;
  text: {
    en: string;
    zh: string;
  };
  category: 'methodology' | 'writing' | 'research' | 'publication';
}

// Resource type
interface Resource {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  category: {
    en: string;
    zh: string;
  };
  url: string;
  icon: React.ReactNode;
}

// Conversation type
interface Conversation {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
}

// Mock suggested questions
const suggestedQuestions: SuggestedQuestion[] = [
  {
    id: '1',
    text: {
      en: 'How do I structure my research methodology section?',
      zh: '如何组织我的研究方法部分？',
    },
    category: 'methodology',
  },
  {
    id: '2',
    text: {
      en: 'What are the best practices for writing a literature review?',
      zh: '撰写文献综述的最佳实践是什么？',
    },
    category: 'writing',
  },
  {
    id: '3',
    text: {
      en: 'How can I improve the impact of my research papers?',
      zh: '如何提高我的研究论文的影响力？',
    },
    category: 'publication',
  },
  {
    id: '4',
    text: {
      en: 'What statistical methods are appropriate for my research data?',
      zh: '哪些统计方法适合我的研究数据？',
    },
    category: 'research',
  },
  {
    id: '5',
    text: {
      en: 'How do I select the right journal for my publication?',
      zh: '如何为我的论文选择合适的期刊？',
    },
    category: 'publication',
  },
  {
    id: '6',
    text: {
      en: 'What are effective ways to visualize complex research data?',
      zh: '有哪些有效的方法可视化复杂研究数据？',
    },
    category: 'research',
  },
];

// Mock resources
const mockResources: Resource[] = [
  {
    id: '1',
    title: {
      en: 'Research Methodology Guide',
      zh: '研究方法指南',
    },
    description: {
      en: 'Comprehensive guide to research methodologies in mechanical engineering.',
      zh: '机械工程研究方法的综合指南。',
    },
    category: {
      en: 'Methodology',
      zh: '方法论',
    },
    url: '#',
    icon: <BookOpen size={20} />,
  },
  {
    id: '2',
    title: {
      en: 'Academic Writing Standards',
      zh: '学术写作标准',
    },
    description: {
      en: 'Best practices and standards for academic writing in scientific journals.',
      zh: '科学期刊学术写作的最佳实践和标准。',
    },
    category: {
      en: 'Writing',
      zh: '写作',
    },
    url: '#',
    icon: <FileText size={20} />,
  },
  {
    id: '3',
    title: {
      en: 'Journal Publication Guide',
      zh: '期刊发表指南',
    },
    description: {
      en: 'Step-by-step guide to publishing your research in high-impact journals.',
      zh: '在高影响力期刊上发表研究的分步指南。',
    },
    category: {
      en: 'Publication',
      zh: '发表',
    },
    url: '#',
    icon: <TrendingUp size={20} />,
  },
  {
    id: '4',
    title: {
      en: 'Research Ethics Framework',
      zh: '研究伦理框架',
    },
    description: {
      en: 'Ethical considerations and guidelines for conducting research.',
      zh: '进行研究的伦理考虑和指导方针。',
    },
    category: {
      en: 'Research',
      zh: '研究',
    },
    url: '#',
    icon: <HelpCircle size={20} />,
  },
];

// Mock previous conversations
const mockConversations: Conversation[] = [
  {
    id: '1',
    title: {
      en: 'Literature Review Structure',
      zh: '文献综述结构',
    },
    lastMessage: 'Thanks for the help with my literature review.',
    timestamp: new Date('2023-07-20T14:30:00'),
    messages: [
      {
        id: '1-1',
        role: 'user',
        content: 'How should I structure my literature review for a mechanical engineering paper?',
        timestamp: new Date('2023-07-20T14:25:00'),
      },
      {
        id: '1-2',
        role: 'assistant',
        content: 'For a mechanical engineering literature review, I recommend organizing by themes or chronologically. Start with a clear introduction stating the purpose of your review, then systematically cover key developments in your area, and conclude by identifying research gaps your work addresses.',
        timestamp: new Date('2023-07-20T14:26:00'),
      },
      {
        id: '1-3',
        role: 'user',
        content: 'Thanks for the help with my literature review.',
        timestamp: new Date('2023-07-20T14:30:00'),
      },
    ],
  },
  {
    id: '2',
    title: {
      en: 'Data Analysis Methods',
      zh: '数据分析方法',
    },
    lastMessage: "I'll try applying ANOVA to my experimental data, thanks!",
    timestamp: new Date('2023-07-18T09:15:00'),
    messages: [
      {
        id: '2-1',
        role: 'user',
        content: 'What statistical methods should I use for comparing three experimental groups?',
        timestamp: new Date('2023-07-18T09:10:00'),
      },
      {
        id: '2-2',
        role: 'assistant',
        content: 'For comparing three experimental groups, ANOVA (Analysis of Variance) is typically the most appropriate statistical method. This allows you to determine if there are any statistically significant differences between the means of your three groups. If you find significance with ANOVA, you can then perform post-hoc tests like Tukey"s HSD to identify which specific groups differ from each other.',
        timestamp: new Date('2023-07-18T09:12:00'),
      },
      {
        id: '2-3',
        role: 'user',
        content: "I'll try applying ANOVA to my experimental data, thanks!",
        timestamp: new Date('2023-07-18T09:15:00'),
      },
    ],
  },
];

export default function AiMentorModule() {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'resources'
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [userMessage, setUserMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConversation?.messages]);
  
  // Format date to localized string
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation => {
    if (!searchQuery) return true;
    
    return conversation.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
           conversation.messages.some(msg => msg.content.toLowerCase().includes(searchQuery.toLowerCase()));
  });
  
  // Create a new conversation
  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: `new-${Date.now()}`,
      title: {
        en: 'New Conversation',
        zh: '新对话',
      },
      lastMessage: '',
      timestamp: new Date(),
      messages: [],
    };
    
    setConversations([newConversation, ...conversations]);
    setActiveConversation(newConversation);
  };
  
  // Send a message
  const sendMessage = async () => {
    if (!userMessage.trim()) return;
    
    // Create a copy of the active conversation or create a new one if none is active
    let currentConversation = activeConversation;
    if (!currentConversation) {
      currentConversation = {
        id: `new-${Date.now()}`,
        title: {
          en: `Conversation ${conversations.length + 1}`,
          zh: `对话 ${conversations.length + 1}`,
        },
        lastMessage: userMessage,
        timestamp: new Date(),
        messages: [],
      };
      setConversations([currentConversation, ...conversations]);
    }
    
    // Add user message
    const newUserMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    
    const updatedMessages = [...currentConversation.messages, newUserMessage];
    
    // Update conversation
    const updatedConversation: Conversation = {
      ...currentConversation,
      messages: updatedMessages,
      lastMessage: userMessage,
      timestamp: new Date(),
    };
    
    // If this is the first message, update the title
    if (updatedConversation.messages.length === 1) {
      updatedConversation.title = {
        en: userMessage.length > 30 ? `${userMessage.substring(0, 30)}...` : userMessage,
        zh: userMessage.length > 15 ? `${userMessage.substring(0, 15)}...` : userMessage,
      };
    }
    
    // Update state
    setActiveConversation(updatedConversation);
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === updatedConversation.id ? updatedConversation : conv
      )
    );
    setUserMessage('');
    
    // Simulate AI response (in a real app, this would call an API)
    setIsTyping(true);
    
    setTimeout(() => {
      // Simulated AI response
      const aiResponse: Message = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: getMockResponse(userMessage),
        timestamp: new Date(),
      };
      
      const conversationWithAiResponse: Conversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, aiResponse],
        lastMessage: aiResponse.content,
      };
      
      setActiveConversation(conversationWithAiResponse);
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === conversationWithAiResponse.id ? conversationWithAiResponse : conv
        )
      );
      
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay to simulate thinking
  };
  
  // Get a mock response
  const getMockResponse = (message: string): string => {
    const responses = [
      "That's an interesting research question. Based on current literature, there are several approaches you could take. I'd recommend starting with a structured literature review to identify the key methodologies in this area.",
      "For your research methodology, consider using a mixed-methods approach. This would allow you to collect both quantitative data through experiments and qualitative insights through interviews or surveys.",
      "When writing your literature review, organize it thematically rather than chronologically. This will help you identify gaps in the current research that your work can address.",
      "For data visualization in engineering research, consider using heat maps for spatial data, box plots for statistical distributions, and network diagrams for relationship mapping.",
      "When selecting a journal for publication, consider factors like impact factor, scope alignment with your research, and typical time to publication. I'd recommend starting with journals like the Journal of Mechanical Engineering or Applied Materials Today.",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  // Handle clicking on a suggested question
  const handleSuggestedQuestion = (question: SuggestedQuestion) => {
    setUserMessage(question.text[language]);
  };
  
  // Select a conversation
  const selectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
  };
  
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{language === 'en' ? 'AI Research Mentor' : 'AI科研导师'}</h2>
        <p className="text-blue-100">
          {language === 'en' 
            ? 'Get personalized guidance on your research journey'
            : '获取个性化的研究指导'
          }
        </p>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex border-b">
          <button 
            onClick={() => setActiveTab('chat')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'chat' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center">
              <MessageSquare size={16} className="mr-2" />
              <span>{language === 'en' ? 'Chat' : '对话'}</span>
            </div>
          </button>
          
          <button 
            onClick={() => setActiveTab('resources')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'resources' 
                ? 'border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center">
              <BookOpen size={16} className="mr-2" />
              <span>{language === 'en' ? 'Resources' : '资源'}</span>
            </div>
          </button>
        </div>
        
        {/* Chat tab content */}
        {activeTab === 'chat' && (
          <div className="flex h-[calc(100vh-340px)] min-h-[500px]">
            {/* Conversations sidebar */}
            <div className="w-64 border-r border-gray-200 bg-gray-50">
              <div className="p-4">
                <button 
                  onClick={createNewConversation}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                >
                  <PlusCircle size={16} className="mr-2" />
                  <span>{language === 'en' ? 'New Chat' : '新对话'}</span>
                </button>
                
                <div className="relative mt-4">
                  <input 
                    type="text" 
                    className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={language === 'en' ? 'Search conversations...' : '搜索对话...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                </div>
              </div>
              
              <div className="overflow-y-auto h-[calc(100%-90px)]">
                {filteredConversations.length > 0 ? (
                  <div className="space-y-1 px-2">
                    {filteredConversations.map(conversation => (
                      <button 
                        key={conversation.id}
                        onClick={() => selectConversation(conversation)}
                        className={`w-full px-3 py-2 text-left rounded-lg transition ${
                          activeConversation?.id === conversation.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="text-sm font-medium truncate">{conversation.title[language]}</div>
                        <div className="text-xs text-gray-500 truncate">{formatDate(conversation.timestamp)}</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500 text-sm">
                    {language === 'en' ? 'No conversations found' : '未找到对话'}
                  </div>
                )}
              </div>
            </div>
            
            {/* Chat area */}
            <div className="flex-1 flex flex-col">
              {/* Messages area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {activeConversation?.messages && activeConversation.messages.length > 0 ? (
                  activeConversation.messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.role === 'user' 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <div className="text-sm">{message.content}</div>
                        <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {formatDate(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <MessageSquare size={48} className="text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-600">
                      {language === 'en' ? 'AI Research Mentor' : 'AI科研导师'}
                    </h3>
                    <p className="text-gray-500 max-w-md mt-2">
                      {language === 'en'
                        ? 'Ask me anything about research methodology, literature reviews, data analysis, or publishing your work.'
                        : '询问我有关研究方法、文献综述、数据分析或发表工作的任何问题。'
                      }
                    </p>
                    
                    {/* Suggested questions */}
                    <div className="mt-8 w-full max-w-xl">
                      <h4 className="text-sm font-medium text-gray-600 mb-3">
                        {language === 'en' ? 'Try asking:' : '尝试询问：'}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {suggestedQuestions.map(question => (
                          <button
                            key={question.id}
                            onClick={() => handleSuggestedQuestion(question)}
                            className="text-left bg-white border border-gray-200 rounded-lg p-3 hover:border-blue-400 hover:shadow-sm transition flex items-center"
                          >
                            <span className="text-sm text-gray-700">{question.text[language]}</span>
                            <ChevronRight size={16} className="text-gray-400 ml-auto" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none max-w-[80%] p-4">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef}></div>
              </div>
              
              {/* Message input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex">
                  <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={language === 'en' ? 'Ask your research question...' : '提出您的研究问题...'}
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition flex items-center"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Resources tab content */}
        {activeTab === 'resources' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-6">
              {language === 'en' ? 'Research Resources' : '研究资源'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockResources.map(resource => (
                <div 
                  key={resource.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                        {resource.icon}
                      </div>
                      <h4 className="text-lg font-medium text-gray-800">{resource.title[language]}</h4>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{resource.description[language]}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {resource.category[language]}
                      </span>
                      
                      <a 
                        href={resource.url}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                      >
                        <span>{language === 'en' ? 'Access Resource' : '访问资源'}</span>
                        <ChevronRight size={16} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 