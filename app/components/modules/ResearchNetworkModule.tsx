'use client';

import React, { useState } from 'react';
import { Users, Search, MapPin, Globe, Filter, TrendingUp, MessageSquare, UserPlus } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

// Researcher type
interface Researcher {
  id: string;
  name: string;
  avatar: string;
  role: {
    en: string;
    zh: string;
  };
  institution: {
    en: string;
    zh: string;
  };
  location: {
    en: string;
    zh: string;
  };
  interests: {
    en: string[];
    zh: string[];
  };
  publicationCount: number;
  citationCount: number;
  hIndex: number;
  connectionDegree?: number; // 1 = direct connection, 2 = 2nd degree, etc.
  mutualConnections?: number;
}

// Mock researchers data
const mockResearchers: Researcher[] = [
  {
    id: '1',
    name: 'Prof. Wang Jia',
    avatar: 'https://placehold.co/200x200/blue/white?text=WJ',
    role: {
      en: 'Professor',
      zh: '教授',
    },
    institution: {
      en: 'Peking University',
      zh: '北京大学',
    },
    location: {
      en: 'Beijing, China',
      zh: '中国北京',
    },
    interests: {
      en: ['Material Science', 'Nanotechnology', 'Renewable Energy'],
      zh: ['材料科学', '纳米技术', '可再生能源'],
    },
    publicationCount: 87,
    citationCount: 1250,
    hIndex: 24,
    connectionDegree: 2,
    mutualConnections: 3,
  },
  {
    id: '2',
    name: 'Dr. Liu Chen',
    avatar: 'https://placehold.co/200x200/green/white?text=LC',
    role: {
      en: 'Associate Professor',
      zh: '副教授',
    },
    institution: {
      en: 'Shanghai Jiao Tong University',
      zh: '上海交通大学',
    },
    location: {
      en: 'Shanghai, China',
      zh: '中国上海',
    },
    interests: {
      en: ['Robotics', 'Control Systems', 'Artificial Intelligence'],
      zh: ['机器人学', '控制系统', '人工智能'],
    },
    publicationCount: 45,
    citationCount: 630,
    hIndex: 15,
    connectionDegree: 1,
    mutualConnections: 5,
  },
  {
    id: '3',
    name: 'Prof. Zhang Min',
    avatar: 'https://placehold.co/200x200/purple/white?text=ZM',
    role: {
      en: 'Professor',
      zh: '教授',
    },
    institution: {
      en: 'Tsinghua University',
      zh: '清华大学',
    },
    location: {
      en: 'Beijing, China',
      zh: '中国北京',
    },
    interests: {
      en: ['Mechanical Design', 'Manufacturing Processes', 'CAD/CAM'],
      zh: ['机械设计', '制造工艺', 'CAD/CAM'],
    },
    publicationCount: 112,
    citationCount: 1870,
    hIndex: 31,
    connectionDegree: 1,
    mutualConnections: 2,
  },
  {
    id: '4',
    name: 'Dr. Chen Wei',
    avatar: 'https://placehold.co/200x200/red/white?text=CW',
    role: {
      en: 'Assistant Professor',
      zh: '助理教授',
    },
    institution: {
      en: 'Zhejiang University',
      zh: '浙江大学',
    },
    location: {
      en: 'Hangzhou, China',
      zh: '中国杭州',
    },
    interests: {
      en: ['Thermal Engineering', 'Energy Systems', 'Heat Transfer'],
      zh: ['热能工程', '能源系统', '热传递'],
    },
    publicationCount: 28,
    citationCount: 320,
    hIndex: 9,
    connectionDegree: 2,
    mutualConnections: 1,
  },
  {
    id: '5',
    name: 'Prof. Li Xin',
    avatar: 'https://placehold.co/200x200/orange/white?text=LX',
    role: {
      en: 'Professor',
      zh: '教授',
    },
    institution: {
      en: 'Huazhong University of Science and Technology',
      zh: '华中科技大学',
    },
    location: {
      en: 'Wuhan, China',
      zh: '中国武汉',
    },
    interests: {
      en: ['Material Processing', 'Composite Materials', 'Manufacturing Technology'],
      zh: ['材料加工', '复合材料', '制造技术'],
    },
    publicationCount: 95,
    citationCount: 1380,
    hIndex: 26,
    connectionDegree: 1,
    mutualConnections: 7,
  },
  {
    id: '6',
    name: 'Dr. Tan Jun',
    avatar: 'https://placehold.co/200x200/teal/white?text=TJ',
    role: {
      en: 'Research Scientist',
      zh: '研究科学家',
    },
    institution: {
      en: 'Chinese Academy of Sciences',
      zh: '中国科学院',
    },
    location: {
      en: 'Beijing, China',
      zh: '中国北京',
    },
    interests: {
      en: ['Fluid Dynamics', 'Computational Mechanics', 'Aerodynamics'],
      zh: ['流体动力学', '计算力学', '空气动力学'],
    },
    publicationCount: 37,
    citationCount: 490,
    hIndex: 12,
    connectionDegree: 2,
    mutualConnections: 2,
  },
];

// Get all unique interest areas
const allInterests = new Set<string>();
mockResearchers.forEach(researcher => {
  researcher.interests.en.forEach(interest => {
    allInterests.add(interest);
  });
});
const interestOptions = Array.from(allInterests);

export default function ResearchNetworkModule() {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [connectionFilter, setConnectionFilter] = useState('all'); // 'all', 'direct', 'second-degree'
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter researchers based on search, interests, and connection degree
  const filteredResearchers = mockResearchers.filter(researcher => {
    // Search filter
    if (searchQuery && 
        !researcher.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !researcher.institution[language].toLowerCase().includes(searchQuery.toLowerCase()) &&
        !researcher.interests[language].some(interest => 
          interest.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Interest filter
    if (selectedInterests.length > 0 && 
        !researcher.interests.en.some(interest => selectedInterests.includes(interest))) {
      return false;
    }
    
    // Connection filter
    if (connectionFilter === 'direct' && researcher.connectionDegree !== 1) return false;
    if (connectionFilter === 'second-degree' && researcher.connectionDegree !== 2) return false;
    
    return true;
  });
  
  // Toggle interest selection
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{language === 'en' ? 'Research Network' : '科研网络'}</h2>
        <p className="text-blue-100">
          {language === 'en' 
            ? 'Discover and connect with researchers in your field'
            : '发现并与您领域的研究人员建立联系'
          }
        </p>
      </div>
      
      {/* Search and filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[250px]">
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={language === 'en' ? 'Search researchers...' : '搜索研究人员...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          {/* Filter toggle */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition flex items-center"
          >
            <Filter size={18} className="mr-2" />
            <span>{language === 'en' ? 'Filters' : '筛选'}</span>
          </button>
          
          {/* Connection filter */}
          <select 
            className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={connectionFilter}
            onChange={(e) => setConnectionFilter(e.target.value)}
          >
            <option value="all">{language === 'en' ? 'All Connections' : '所有连接'}</option>
            <option value="direct">{language === 'en' ? 'Direct Connections' : '直接连接'}</option>
            <option value="second-degree">{language === 'en' ? '2nd Degree Connections' : '二级连接'}</option>
          </select>
        </div>
        
        {/* Extended filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              {language === 'en' ? 'Research Interests' : '研究兴趣'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedInterests.includes(interest)
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Researchers grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResearchers.map((researcher) => (
          <div 
            key={researcher.id} 
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition"
          >
            <div className="p-5">
              <div className="flex items-start mb-4">
                <img 
                  src={researcher.avatar} 
                  alt={researcher.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{researcher.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{researcher.role[language]}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={14} className="mr-1" />
                    <span>{researcher.institution[language]}</span>
                  </div>
                </div>
              </div>
              
              {/* Research interests */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-2">{language === 'en' ? 'Research Interests' : '研究兴趣'}</div>
                <div className="flex flex-wrap gap-1">
                  {researcher.interests[language].map((interest, index) => (
                    <span key={index} className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-sm font-semibold text-gray-800">{researcher.publicationCount}</div>
                  <div className="text-xs text-gray-500">{language === 'en' ? 'Papers' : '论文'}</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-sm font-semibold text-gray-800">{researcher.citationCount}</div>
                  <div className="text-xs text-gray-500">{language === 'en' ? 'Citations' : '引用'}</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-sm font-semibold text-gray-800">{researcher.hIndex}</div>
                  <div className="text-xs text-gray-500">h-index</div>
                </div>
              </div>
              
              {/* Connection info */}
              {researcher.connectionDegree && (
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Users size={14} className="mr-1" />
                  <span>
                    {researcher.connectionDegree === 1 
                      ? (language === 'en' ? '1st degree connection' : '一级连接') 
                      : (language === 'en' ? '2nd degree connection' : '二级连接')
                    }
                    {researcher.mutualConnections && researcher.mutualConnections > 0 && (
                      <span className="text-gray-500">
                        {' · '}
                        {language === 'en' 
                          ? `${researcher.mutualConnections} mutual connection${researcher.mutualConnections !== 1 ? 's' : ''}`
                          : `${researcher.mutualConnections} 个共同连接`
                        }
                      </span>
                    )}
                  </span>
                </div>
              )}
              
              {/* Action buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
                  <UserPlus size={14} className="mr-1" />
                  <span>{language === 'en' ? 'Connect' : '连接'}</span>
                </button>
                <button className="flex-1 px-3 py-1.5 border border-blue-600 text-blue-600 text-sm rounded-lg hover:bg-blue-50 transition flex items-center justify-center">
                  <MessageSquare size={14} className="mr-1" />
                  <span>{language === 'en' ? 'Message' : '消息'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredResearchers.length === 0 && (
        <div className="text-center py-10 bg-white rounded-xl shadow-sm">
          <Users size={40} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-600">
            {language === 'en' ? 'No researchers found' : '未找到研究人员'}
          </h3>
          <p className="text-gray-400">
            {language === 'en' 
              ? 'Try adjusting your search or filters' 
              : '尝试调整您的搜索或筛选条件'
            }
          </p>
        </div>
      )}
      
      {/* Trending researchers section */}
      <div className="bg-blue-50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <TrendingUp size={20} className="text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">
              {language === 'en' ? 'Trending in Your Field' : '您领域内的趋势'}
            </h3>
          </div>
          <a 
            href="#"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {language === 'en' ? 'View All' : '查看全部'}
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockResearchers.slice(0, 3).map((researcher) => (
            <div 
              key={`trending-${researcher.id}`}
              className="flex items-center bg-white rounded-lg p-3 border border-gray-100"
            >
              <img 
                src={researcher.avatar} 
                alt={researcher.name} 
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h4 className="font-medium text-gray-800">{researcher.name}</h4>
                <p className="text-xs text-gray-600">{researcher.institution[language]}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Globe size={12} className="mr-1" />
                  <span>{researcher.publicationCount} {language === 'en' ? 'publications' : '发表'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 