'use client';

import React, { useState } from 'react';
import { Users, Search, UserPlus, Mail, Phone, MapPin, Briefcase, Link2, Award, MessageSquare, FileText, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

// Collaborator type
interface Collaborator {
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
  department: {
    en: string;
    zh: string;
  };
  location: {
    en: string;
    zh: string;
  };
  email: string;
  phone?: string;
  website?: string;
  expertise: {
    en: string[];
    zh: string[];
  };
  collaborationCount: number;
  publicationCount: number;
  bio: {
    en: string;
    zh: string;
  };
  status: 'active' | 'inactive' | 'pending';
  lastActivity: string;
}

// Mock collaborators data
const mockCollaborators: Collaborator[] = [
  {
    id: '1',
    name: 'Prof. Li Ming',
    avatar: 'https://placehold.co/200x200/blue/white?text=LM',
    role: {
      en: 'Professor',
      zh: '教授',
    },
    institution: {
      en: 'Tsinghua University',
      zh: '清华大学',
    },
    department: {
      en: 'Department of Mechanical Engineering',
      zh: '机械工程系',
    },
    location: {
      en: 'Beijing, China',
      zh: '中国北京',
    },
    email: 'li.ming@tsinghua.edu.cn',
    phone: '+86 123 4567 8901',
    website: 'https://example.com/liming',
    expertise: {
      en: ['Composite Materials', 'Energy Storage', 'Sustainable Manufacturing'],
      zh: ['复合材料', '能源存储', '可持续制造'],
    },
    collaborationCount: 5,
    publicationCount: 12,
    bio: {
      en: 'Professor Li Ming specializes in advanced materials research with a focus on energy storage applications. He has over 15 years of experience in the field and has published extensively in leading journals.',
      zh: 'Li Ming教授专注于先进材料研究，尤其是能源存储应用。他在该领域拥有超过15年的经验，并在领先期刊上发表了大量论文。',
    },
    status: 'active',
    lastActivity: '2023-07-15',
  },
  {
    id: '2',
    name: 'Dr. Zhang Wei',
    avatar: 'https://placehold.co/200x200/green/white?text=ZW',
    role: {
      en: 'Associate Professor',
      zh: '副教授',
    },
    institution: {
      en: 'Shanghai Jiao Tong University',
      zh: '上海交通大学',
    },
    department: {
      en: 'School of Materials Science and Engineering',
      zh: '材料科学与工程学院',
    },
    location: {
      en: 'Shanghai, China',
      zh: '中国上海',
    },
    email: 'zhang.wei@sjtu.edu.cn',
    phone: '+86 135 7890 1234',
    website: 'https://example.com/zhangwei',
    expertise: {
      en: ['Smart Materials', 'Aerospace Applications', 'Self-healing Materials'],
      zh: ['智能材料', '航空航天应用', '自愈合材料'],
    },
    collaborationCount: 3,
    publicationCount: 8,
    bio: {
      en: 'Dr. Zhang Wei is a leading researcher in smart materials with self-healing properties, particularly focused on aerospace applications. His work has been recognized with several international awards.',
      zh: 'Zhang Wei博士是自愈合智能材料领域的领先研究者，特别专注于航空航天应用。他的工作获得了多项国际奖项认可。',
    },
    status: 'active',
    lastActivity: '2023-07-20',
  },
  {
    id: '3',
    name: 'Dr. Wang Jie',
    avatar: 'https://placehold.co/200x200/purple/white?text=WJ',
    role: {
      en: 'Assistant Professor',
      zh: '助理教授',
    },
    institution: {
      en: 'Zhejiang University',
      zh: '浙江大学',
    },
    department: {
      en: 'College of Biomedical Engineering',
      zh: '生物医学工程学院',
    },
    location: {
      en: 'Hangzhou, China',
      zh: '中国杭州',
    },
    email: 'wang.jie@zju.edu.cn',
    website: 'https://example.com/wangjie',
    expertise: {
      en: ['Robotics', 'Rehabilitation Engineering', 'Mechatronics'],
      zh: ['机器人学', '康复工程', '机电一体化'],
    },
    collaborationCount: 4,
    publicationCount: 6,
    bio: {
      en: 'Dr. Wang Jie focuses on developing mechatronic systems for rehabilitation. His interdisciplinary approach combines mechanical engineering, electronics, and biomedical principles.',
      zh: 'Wang Jie博士专注于开发用于康复的机电系统。他的跨学科方法结合了机械工程、电子学和生物医学原理。',
    },
    status: 'inactive',
    lastActivity: '2023-05-10',
  },
  {
    id: '4',
    name: 'Prof. Chen Mei',
    avatar: 'https://placehold.co/200x200/red/white?text=CM',
    role: {
      en: 'Professor',
      zh: '教授',
    },
    institution: {
      en: 'Beijing Institute of Technology',
      zh: '北京理工大学',
    },
    department: {
      en: 'School of Mechanical Engineering',
      zh: '机械工程学院',
    },
    location: {
      en: 'Beijing, China',
      zh: '中国北京',
    },
    email: 'chen.mei@bit.edu.cn',
    phone: '+86 139 8765 4321',
    expertise: {
      en: ['Manufacturing Processes', 'Optimization Algorithms', 'Industry 4.0'],
      zh: ['制造工艺', '优化算法', '工业4.0'],
    },
    collaborationCount: 6,
    publicationCount: 15,
    bio: {
      en: 'Professor Chen Mei is a renowned expert in manufacturing processes and optimization algorithms. Her research is focused on advancing Industry 4.0 technologies in the Chinese manufacturing sector.',
      zh: 'Chen Mei教授是制造工艺和优化算法方面的著名专家。她的研究重点是推进中国制造业的工业4.0技术。',
    },
    status: 'active',
    lastActivity: '2023-07-25',
  },
  {
    id: '5',
    name: 'Dr. Liu Yang',
    avatar: 'https://placehold.co/200x200/orange/white?text=LY',
    role: {
      en: 'Research Scientist',
      zh: '研究科学家',
    },
    institution: {
      en: 'Chinese Academy of Sciences',
      zh: '中国科学院',
    },
    department: {
      en: 'Institute of Chemistry',
      zh: '化学研究所',
    },
    location: {
      en: 'Beijing, China',
      zh: '中国北京',
    },
    email: 'liu.yang@cas.cn',
    expertise: {
      en: ['Nanomaterials', 'Chemical Engineering', 'Energy Applications'],
      zh: ['纳米材料', '化学工程', '能源应用'],
    },
    collaborationCount: 2,
    publicationCount: 4,
    bio: {
      en: 'Dr. Liu Yang specializes in nanomaterials for energy applications. His research explores novel chemical processes for synthesizing advanced materials with enhanced properties.',
      zh: 'Liu Yang博士专注于能源应用纳米材料。他的研究探索了合成具有增强特性的先进材料的新型化学工艺。',
    },
    status: 'pending',
    lastActivity: '2023-07-02',
  },
];

export default function CollaboratorsModule() {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const userRole = user?.role || 'student';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expertiseFilter, setExpertiseFilter] = useState('all');
  const [selectedCollaborator, setSelectedCollaborator] = useState<Collaborator | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  // Get all expertise areas for filtering
  const allExpertise = new Set<string>();
  mockCollaborators.forEach(collaborator => {
    collaborator.expertise[language].forEach(area => {
      allExpertise.add(area);
    });
  });
  const expertiseOptions = ['all', ...Array.from(allExpertise)];
  
  // Get status text based on status and language
  const getStatusText = (status: string) => {
    if (language === 'en') {
      const statusMap: Record<string, string> = {
        'active': 'Active',
        'inactive': 'Inactive',
        'pending': 'Pending'
      };
      return statusMap[status] || status;
    } else {
      const statusMap: Record<string, string> = {
        'active': '活跃',
        'inactive': '不活跃',
        'pending': '待定'
      };
      return statusMap[status] || status;
    }
  };
  
  // Get status color
  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'pending': 'bg-yellow-100 text-yellow-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };
  
  // Format date to localized string
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Filter collaborators based on search query, status, and expertise
  const filteredCollaborators = mockCollaborators.filter(collaborator => {
    // Search filter
    if (searchQuery && 
        !collaborator.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !collaborator.institution[language].toLowerCase().includes(searchQuery.toLowerCase()) &&
        !collaborator.department[language].toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== 'all' && collaborator.status !== statusFilter) {
      return false;
    }
    
    // Expertise filter
    if (expertiseFilter !== 'all' && !collaborator.expertise[language].includes(expertiseFilter)) {
      return false;
    }
    
    return true;
  });
  
  // Open collaborator profile modal
  const openProfileModal = (collaborator: Collaborator) => {
    setSelectedCollaborator(collaborator);
    setIsProfileModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{language === 'en' ? 'Collaborators' : '合作者'}</h2>
        <p className="text-blue-100">
          {language === 'en' 
            ? 'Connect and collaborate with researchers across institutions'
            : '与跨机构的研究人员建立联系并合作'
          }
        </p>
      </div>
      
      {/* Search and filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={language === 'en' ? 'Search collaborators...' : '搜索合作者...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          {/* Status filter */}
          <div>
            <select 
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">{language === 'en' ? 'All Statuses' : '所有状态'}</option>
              <option value="active">{language === 'en' ? 'Active' : '活跃'}</option>
              <option value="inactive">{language === 'en' ? 'Inactive' : '不活跃'}</option>
              <option value="pending">{language === 'en' ? 'Pending' : '待定'}</option>
            </select>
          </div>
          
          {/* Expertise filter */}
          <div>
            <select 
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={expertiseFilter}
              onChange={(e) => setExpertiseFilter(e.target.value)}
            >
              <option value="all">{language === 'en' ? 'All Expertise Areas' : '所有专业领域'}</option>
              {expertiseOptions.slice(1).map((expertise, index) => (
                <option key={index} value={expertise}>{expertise}</option>
              ))}
            </select>
          </div>
          
          {/* Add new collaborator button */}
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center">
              <UserPlus size={18} className="mr-1" />
              <span>{language === 'en' ? 'Add Collaborator' : '添加合作者'}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Collaborators grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCollaborators.map((collaborator) => (
          <div 
            key={collaborator.id} 
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition"
          >
            <div className="p-5">
              <div className="flex items-start mb-4">
                <img 
                  src={collaborator.avatar} 
                  alt={collaborator.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">{collaborator.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(collaborator.status)}`}>
                      {getStatusText(collaborator.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{collaborator.role[language]}</p>
                  <p className="text-sm text-gray-600">{collaborator.institution[language]}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <Briefcase size={14} className="mr-1" />
                  <span className="truncate">{collaborator.department[language]}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={14} className="mr-1" />
                  <span className="truncate">{collaborator.location[language]}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-1">{language === 'en' ? 'Expertise' : '专业领域'}</div>
                <div className="flex flex-wrap gap-1">
                  {collaborator.expertise[language].slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {skill}
                    </span>
                  ))}
                  {collaborator.expertise[language].length > 3 && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      +{collaborator.expertise[language].length - 3}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Users size={14} className="mr-1" />
                  <span>{collaborator.collaborationCount} {language === 'en' ? 'collaborations' : '合作'}</span>
                </div>
                <div className="flex items-center">
                  <FileText size={14} className="mr-1" />
                  <span>{collaborator.publicationCount} {language === 'en' ? 'publications' : '发表'}</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button 
                  onClick={() => openProfileModal(collaborator)}
                  className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                >
                  {language === 'en' ? 'View Profile' : '查看资料'}
                </button>
                <button className="px-3 py-1.5 border border-blue-600 text-blue-600 text-sm rounded-lg hover:bg-blue-50 transition flex items-center">
                  <MessageSquare size={14} className="mr-1" />
                  <span>{language === 'en' ? 'Message' : '发消息'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCollaborators.length === 0 && (
        <div className="text-center py-10">
          <Users size={40} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-600">
            {language === 'en' ? 'No collaborators found' : '未找到合作者'}
          </h3>
          <p className="text-gray-400">
            {language === 'en' 
              ? 'Try adjusting your search or filters' 
              : '尝试调整您的搜索或筛选条件'
            }
          </p>
        </div>
      )}
      
      {/* Collaborator profile modal */}
      {isProfileModalOpen && selectedCollaborator && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col">
            {/* Modal header */}
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
              <h3 className="text-xl font-semibold">{language === 'en' ? 'Collaborator Profile' : '合作者资料'}</h3>
              <button 
                onClick={() => setIsProfileModalOpen(false)}
                className="text-white hover:text-blue-200"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Modal content */}
            <div className="p-6 overflow-y-auto">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Profile information */}
                <div className="sm:w-1/3 flex flex-col items-center">
                  <img 
                    src={selectedCollaborator.avatar} 
                    alt={selectedCollaborator.name}
                    className="w-32 h-32 rounded-full object-cover mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 text-center">{selectedCollaborator.name}</h3>
                  <p className="text-gray-600 mb-1 text-center">{selectedCollaborator.role[language]}</p>
                  <p className="text-gray-600 text-center mb-4">{selectedCollaborator.institution[language]}</p>
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCollaborator.status)} mb-4`}>
                    {getStatusText(selectedCollaborator.status)}
                  </span>
                  
                  <div className="w-full space-y-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Mail size={16} className="mr-2" />
                      <a href={`mailto:${selectedCollaborator.email}`} className="text-blue-600 hover:underline truncate">
                        {selectedCollaborator.email}
                      </a>
                    </div>
                    
                    {selectedCollaborator.phone && (
                      <div className="flex items-center text-gray-600">
                        <Phone size={16} className="mr-2" />
                        <span>{selectedCollaborator.phone}</span>
                      </div>
                    )}
                    
                    {selectedCollaborator.website && (
                      <div className="flex items-center text-gray-600">
                        <Link2 size={16} className="mr-2" />
                        <a 
                          href={selectedCollaborator.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline truncate"
                        >
                          {selectedCollaborator.website.replace('https://', '')}
                        </a>
                      </div>
                    )}
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2" />
                      <span>{selectedCollaborator.location[language]}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Briefcase size={16} className="mr-2" />
                      <span>{selectedCollaborator.department[language]}</span>
                    </div>
                  </div>
                </div>
                
                {/* Bio and other details */}
                <div className="sm:w-2/3">
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {language === 'en' ? 'Biography' : '个人简介'}
                    </h4>
                    <p className="text-gray-600">{selectedCollaborator.bio[language]}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {language === 'en' ? 'Expertise' : '专业领域'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCollaborator.expertise[language].map((skill, index) => (
                        <span key={index} className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center text-gray-600 mb-1">
                        <Users size={18} className="mr-2" />
                        <h5 className="font-medium">{language === 'en' ? 'Collaborations' : '合作'}</h5>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">{selectedCollaborator.collaborationCount}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center text-gray-600 mb-1">
                        <FileText size={18} className="mr-2" />
                        <h5 className="font-medium">{language === 'en' ? 'Publications' : '发表'}</h5>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">{selectedCollaborator.publicationCount}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {language === 'en' ? 'Last Activity' : '最近活动'}
                    </h4>
                    <p className="text-gray-600">{formatDate(selectedCollaborator.lastActivity)}</p>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center">
                      <Users size={18} className="mr-1" />
                      <span>{language === 'en' ? 'Invite to Project' : '邀请参与项目'}</span>
                    </button>
                    
                    <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition flex items-center">
                      <MessageSquare size={18} className="mr-1" />
                      <span>{language === 'en' ? 'Send Message' : '发送消息'}</span>
                    </button>
                    
                    <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition flex items-center">
                      <Award size={18} className="mr-1" />
                      <span>{language === 'en' ? 'View Publications' : '查看发表'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 