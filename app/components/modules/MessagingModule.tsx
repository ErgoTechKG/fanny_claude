'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Search, 
  MessageCircle, 
  Send, 
  PlusCircle,
  Paperclip,
  User,
  ArrowLeft
} from 'lucide-react';

// Mock data interfaces
interface Person {
  id: string;
  name: string;
  avatar: string;
  role: 'student' | 'instructor' | 'admin';
  department: string;
  status: 'online' | 'offline' | 'away';
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  participants: string[];
  lastMessageTime: Date;
  unreadCount: number;
}

// Mock data
const mockPersons: Person[] = [
  { id: 's1', name: 'Zhang Wei', avatar: 'https://placehold.co/40x40', role: 'student', department: 'Computer Science', status: 'online' },
  { id: 's2', name: 'Lin Mei', avatar: 'https://placehold.co/40x40', role: 'student', department: 'Computer Science', status: 'offline' },
  { id: 's3', name: 'Wang Tao', avatar: 'https://placehold.co/40x40', role: 'student', department: 'Mechanical Engineering', status: 'away' },
  { id: 'i1', name: 'Prof. Li Ming', avatar: 'https://placehold.co/40x40', role: 'instructor', department: 'Computer Science', status: 'online' },
  { id: 'i2', name: 'Dr. Zhao Jian', avatar: 'https://placehold.co/40x40', role: 'instructor', department: 'Computer Science', status: 'offline' },
  { id: 'i3', name: 'Prof. Wu Hong', avatar: 'https://placehold.co/40x40', role: 'instructor', department: 'Mechanical Engineering', status: 'online' },
];

const mockConversations: Conversation[] = [
  { id: 'c1', participants: ['admin', 's1'], lastMessageTime: new Date('2023-08-01T14:00:00'), unreadCount: 0 },
  { id: 'c2', participants: ['admin', 'i1'], lastMessageTime: new Date('2023-08-01T12:30:00'), unreadCount: 2 },
  { id: 'c3', participants: ['admin', 's2'], lastMessageTime: new Date('2023-07-31T15:45:00'), unreadCount: 0 },
  { id: 'c4', participants: ['admin', 'i2'], lastMessageTime: new Date('2023-07-30T09:20:00'), unreadCount: 0 },
];

const mockMessages: Message[] = [
  { id: 'm1', conversationId: 'c1', senderId: 'admin', content: 'Hello Zhang Wei, how is your research going?', timestamp: new Date('2023-08-01T13:50:00'), read: true },
  { id: 'm2', conversationId: 'c1', senderId: 's1', content: 'Hi Admin, it\'s going well. I\'m making progress on data collection.', timestamp: new Date('2023-08-01T14:00:00'), read: true },
  
  { id: 'm3', conversationId: 'c2', senderId: 'admin', content: 'Professor Li, have you reviewed the research proposal from Zhang Wei?', timestamp: new Date('2023-08-01T11:20:00'), read: true },
  { id: 'm4', conversationId: 'c2', senderId: 'i1', content: 'Yes, I\'ve reviewed it and have some feedback to provide.', timestamp: new Date('2023-08-01T12:15:00'), read: true },
  { id: 'm5', conversationId: 'c2', senderId: 'i1', content: 'Could we schedule a meeting to discuss it in detail?', timestamp: new Date('2023-08-01T12:30:00'), read: false },
  
  { id: 'm6', conversationId: 'c3', senderId: 's2', content: 'Admin, I need help with accessing the research database.', timestamp: new Date('2023-07-31T15:30:00'), read: true },
  { id: 'm7', conversationId: 'c3', senderId: 'admin', content: 'I\'ll check the permissions and get back to you shortly.', timestamp: new Date('2023-07-31T15:45:00'), read: true },
  
  { id: 'm8', conversationId: 'c4', senderId: 'admin', content: 'Dr. Zhao, congratulations on your recent publication!', timestamp: new Date('2023-07-30T09:10:00'), read: true },
  { id: 'm9', conversationId: 'c4', senderId: 'i2', content: 'Thank you! It was a team effort with our dedicated students.', timestamp: new Date('2023-07-30T09:20:00'), read: true },
];

export default function MessagingModule() {
  const { language } = useLanguage();
  const [people] = useState<Person[]>(mockPersons);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewConversation, setShowNewConversation] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  
  // Set the first conversation as active by default
  useEffect(() => {
    if (conversations.length > 0 && !currentConversation) {
      setCurrentConversation(conversations[0].id);
    }
  }, []);
  
  // Helper function to get a person by ID
  const getPersonById = (id: string): Person | undefined => {
    return people.find(p => p.id === id);
  };
  
  // Get conversation title (other participant's name)
  const getConversationTitle = (conversation: Conversation): string => {
    const otherParticipantId = conversation.participants.find(id => id !== 'admin');
    if (!otherParticipantId) return language === 'en' ? 'Unknown' : '未知';
    
    const person = getPersonById(otherParticipantId);
    return person ? person.name : (language === 'en' ? 'Unknown' : '未知');
  };
  
  // Get messages for the current conversation
  const getCurrentMessages = (): Message[] => {
    if (!currentConversation) return [];
    return messages
      .filter(m => m.conversationId === currentConversation)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };
  
  // Format timestamp
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString(language === 'en' ? 'en-US' : 'zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: language === 'en'
    });
  };
  
  // Format date
  const formatDate = (date: Date): string => {
    const today = new Date();
    const isToday = date.getDate() === today.getDate() && 
                   date.getMonth() === today.getMonth() &&
                   date.getFullYear() === today.getFullYear();
    
    if (isToday) {
      return language === 'en' ? 'Today' : '今天';
    }
    
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Filter conversations and people based on search query
  const filteredConversations = conversations.filter(conversation => {
    if (!searchQuery) return true;
    
    const otherParticipantId = conversation.participants.find(id => id !== 'admin');
    if (!otherParticipantId) return false;
    
    const person = getPersonById(otherParticipantId);
    if (!person) return false;
    
    return (
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  
  const filteredPeople = people.filter(person => {
    if (!searchQuery) return true;
    
    return (
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  
  // Send a new message
  const handleSendMessage = () => {
    if (!messageInput.trim() || !currentConversation) return;
    
    const newMessage: Message = {
      id: `m${messages.length + 1}`,
      conversationId: currentConversation,
      senderId: 'admin',
      content: messageInput,
      timestamp: new Date(),
      read: true
    };
    
    // Add the new message
    setMessages([...messages, newMessage]);
    
    // Update the conversation's last message time
    setConversations(conversations.map(conv => {
      if (conv.id === currentConversation) {
        return {
          ...conv,
          lastMessageTime: new Date(),
          unreadCount: 0
        };
      }
      return conv;
    }));
    
    // Clear the input field
    setMessageInput('');
  };
  
  // Start a new conversation
  const handleStartNewConversation = () => {
    if (!selectedPerson) return;
    
    // Check if a conversation already exists with this person
    const existingConversation = conversations.find(c => 
      c.participants.includes('admin') && c.participants.includes(selectedPerson)
    );
    
    if (existingConversation) {
      // If it exists, just set it as current
      setCurrentConversation(existingConversation.id);
      setShowNewConversation(false);
      setSelectedPerson(null);
      return;
    }
    
    // Otherwise create a new conversation
    const newConversation: Conversation = {
      id: `c${conversations.length + 1}`,
      participants: ['admin', selectedPerson],
      lastMessageTime: new Date(),
      unreadCount: 0
    };
    
    setConversations([...conversations, newConversation]);
    setCurrentConversation(newConversation.id);
    setShowNewConversation(false);
    setSelectedPerson(null);
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{language === 'en' ? 'Private Messaging' : '私信系统'}</h2>
        <p className="text-blue-100">
          {language === 'en'
            ? 'Send and receive private messages with students and professors'
            : '与学生和教授收发私信'
          }
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            {/* Search and new conversation */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative mb-3">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={language === 'en' ? 'Search messages...' : '搜索消息...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              
              <button 
                onClick={() => setShowNewConversation(true)}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                <PlusCircle size={18} className="mr-2" />
                {language === 'en' ? 'New Message' : '新建消息'}
              </button>
            </div>
            
            {/* Conversations list */}
            {!showNewConversation ? (
              <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map(conversation => {
                    const otherParticipantId = conversation.participants.find(id => id !== 'admin');
                    const person = otherParticipantId ? getPersonById(otherParticipantId) : undefined;
                    
                    return (
                      <div
                        key={conversation.id}
                        className={`p-3 cursor-pointer hover:bg-gray-50 ${currentConversation === conversation.id ? 'bg-blue-50' : ''}`}
                        onClick={() => setCurrentConversation(conversation.id)}
                      >
                        <div className="flex items-center">
                          <div className="relative">
                            <img 
                              src={person?.avatar || 'https://placehold.co/40x40'} 
                              alt={person?.name || 'User'} 
                              className="w-12 h-12 rounded-full"
                            />
                            {person?.status === 'online' && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                            {person?.status === 'away' && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between items-center">
                              <h3 className="text-sm font-medium">{getConversationTitle(conversation)}</h3>
                              <span className="text-xs text-gray-500">{formatDate(conversation.lastMessageTime)}</span>
                            </div>
                            
                            <div className="flex justify-between items-center mt-1">
                              {/* Last message preview would go here */}
                              <p className="text-sm text-gray-500 truncate">
                                {/* In a real app, we'd show the last message content here */}
                                {language === 'en' ? 'Tap to view messages' : '点击查看消息'}
                              </p>
                              
                              {conversation.unreadCount > 0 && (
                                <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                  {conversation.unreadCount}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    {language === 'en' ? 'No conversations found' : '未找到对话'}
                  </div>
                )}
              </div>
            ) : (
              // New conversation view - people list
              <div className="flex flex-col">
                <div className="p-3 border-b border-gray-200">
                  <button 
                    onClick={() => setShowNewConversation(false)}
                    className="flex items-center text-blue-600"
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    {language === 'en' ? 'Back to conversations' : '返回对话列表'}
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
                  {filteredPeople.map(person => (
                    <div
                      key={person.id}
                      className={`p-3 cursor-pointer hover:bg-gray-50 ${selectedPerson === person.id ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedPerson(person.id)}
                    >
                      <div className="flex items-center">
                        <div className="relative">
                          <img 
                            src={person.avatar} 
                            alt={person.name} 
                            className="w-12 h-12 rounded-full"
                          />
                          {person.status === 'online' && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                          {person.status === 'away' && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        
                        <div className="ml-3">
                          <h3 className="text-sm font-medium">{person.name}</h3>
                          <p className="text-xs text-gray-500">
                            {person.role === 'student' ? (language === 'en' ? 'Student' : '学生') : (language === 'en' ? 'Professor' : '教授')}
                            {' • '}
                            {person.department}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {person.status === 'online' 
                              ? (language === 'en' ? 'Online' : '在线') 
                              : person.status === 'away'
                                ? (language === 'en' ? 'Away' : '离开')
                                : (language === 'en' ? 'Offline' : '离线')
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 border-t border-gray-200">
                  <button
                    onClick={handleStartNewConversation}
                    disabled={!selectedPerson}
                    className={`w-full py-2 rounded-md ${
                      selectedPerson
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {language === 'en' ? 'Start Conversation' : '开始对话'}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Message area */}
          <div className="w-2/3 flex flex-col">
            {currentConversation ? (
              <>
                {/* Conversation header */}
                <div className="p-4 border-b border-gray-200 flex items-center">
                  {(() => {
                    const conversation = conversations.find(c => c.id === currentConversation);
                    if (!conversation) return null;
                    
                    const otherParticipantId = conversation.participants.find(id => id !== 'admin');
                    const person = otherParticipantId ? getPersonById(otherParticipantId) : undefined;
                    
                    return (
                      <>
                        <div className="relative mr-3">
                          <img 
                            src={person?.avatar || 'https://placehold.co/40x40'} 
                            alt={person?.name || 'User'} 
                            className="w-10 h-10 rounded-full"
                          />
                          {person?.status === 'online' && (
                            <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="font-medium">{getConversationTitle(conversation)}</h3>
                          <p className="text-xs text-gray-500">
                            {person?.role === 'student' ? (language === 'en' ? 'Student' : '学生') : (language === 'en' ? 'Professor' : '教授')}
                            {' • '}
                            {person?.department}
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                  <div className="space-y-4">
                    {getCurrentMessages().map(message => {
                      const isFromMe = message.senderId === 'admin';
                      
                      return (
                        <div key={message.id} className={`flex ${isFromMe ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md ${isFromMe ? 'order-2' : 'order-1'}`}>
                            <div className={`px-4 py-2 rounded-lg inline-block ${
                              isFromMe 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-white border border-gray-200 text-gray-700'
                            }`}>
                              <p>{message.content}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                          
                          {!isFromMe && (
                            <img 
                              src={getPersonById(message.senderId)?.avatar || 'https://placehold.co/30x30'} 
                              alt="Avatar" 
                              className="w-8 h-8 rounded-full mr-2 order-0"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Message input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <button className="text-gray-500 hover:text-gray-700 mr-2">
                      <Paperclip size={20} />
                    </button>
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={language === 'en' ? 'Type a message...' : '输入消息...'}
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      className={`px-4 py-2 rounded-r-md ${
                        messageInput.trim()
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // No conversation selected
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle size={48} className="mx-auto text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-700">
                    {language === 'en' ? 'Select a conversation' : '选择一个对话'}
                  </h3>
                  <p className="text-gray-500 max-w-md mt-1">
                    {language === 'en' 
                      ? 'Choose an existing conversation or start a new one by clicking the "New Message" button.'
                      : '选择现有对话或点击"新建消息"按钮开始新对话。'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 