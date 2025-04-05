'use client';

import React, { useState } from 'react';
import { FileText, Search, Link2, Eye, Download, ExternalLink, BookOpen, Users, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

// Publication type
interface Publication {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  abstract: {
    en: string;
    zh: string;
  };
  authors: string[];
  journal: string;
  publicationDate: string;
  doi: string;
  status: 'published' | 'in_review' | 'draft' | 'rejected';
  citations: number;
  category: {
    en: string;
    zh: string;
  };
  tags: string[];
  pdfUrl?: string;
}

// Mock publications data
const mockPublications: Publication[] = [
  {
    id: '1',
    title: {
      en: 'Novel Composite Materials for High-Efficiency Energy Storage Applications',
      zh: '高效能源存储应用的新型复合材料',
    },
    abstract: {
      en: 'This paper presents a comprehensive study on novel composite materials designed for high-efficiency energy storage applications. The proposed materials demonstrate superior energy density and cycle stability compared to conventional solutions.',
      zh: '本文对为高效能源存储应用而设计的新型复合材料进行了全面研究。所提出的材料与传统解决方案相比，表现出更高的能量密度和循环稳定性。',
    },
    authors: ['Zhang Wei', 'Li Ming', 'Wang Jie', 'Chen Mei'],
    journal: 'Journal of Materials Science and Technology',
    publicationDate: '2023-04-15',
    doi: '10.1234/jmst.2023.04.001',
    status: 'published',
    citations: 12,
    category: {
      en: 'Materials Science',
      zh: '材料科学',
    },
    tags: ['composite materials', 'energy storage', 'efficiency'],
    pdfUrl: 'https://example.com/papers/1',
  },
  {
    id: '2',
    title: {
      en: 'Optimization Algorithms for Advanced Manufacturing Processes',
      zh: '先进制造工艺的优化算法',
    },
    abstract: {
      en: 'This research proposes novel optimization algorithms to enhance efficiency and reduce waste in advanced manufacturing processes. Experimental results demonstrate a 15% improvement in resource utilization.',
      zh: '本研究提出了新的优化算法，以提高先进制造工艺的效率并减少浪费。实验结果表明资源利用率提高了15%。',
    },
    authors: ['Chen Lei', 'Zhang Wei', 'Liu Yang'],
    journal: 'International Journal of Advanced Manufacturing Technology',
    publicationDate: '2023-02-28',
    doi: '10.5678/ijamt.2023.02.005',
    status: 'published',
    citations: 8,
    category: {
      en: 'Manufacturing Technology',
      zh: '制造技术',
    },
    tags: ['optimization', 'algorithms', 'manufacturing', 'efficiency'],
    pdfUrl: 'https://example.com/papers/2',
  },
  {
    id: '3',
    title: {
      en: 'Mechatronic Design for Rehabilitation Robotics: A Systematic Review',
      zh: '康复机器人的机电设计：系统综述',
    },
    abstract: {
      en: 'This systematic review examines recent advancements in mechatronic design for rehabilitation robotics. Key trends, challenges, and future directions are identified and discussed.',
      zh: '本系统综述考察了康复机器人机电设计的最新进展。确定并讨论了关键趋势、挑战和未来方向。',
    },
    authors: ['Wang Jie', 'Zhao Hong', 'Zhang Wei'],
    journal: 'IEEE Transactions on Robotics',
    publicationDate: '2022-11-10',
    doi: '10.9012/ieeetr.2022.11.015',
    status: 'published',
    citations: 25,
    category: {
      en: 'Robotics',
      zh: '机器人学',
    },
    tags: ['rehabilitation', 'robotics', 'mechatronics', 'systematic review'],
    pdfUrl: 'https://example.com/papers/3',
  },
  {
    id: '4',
    title: {
      en: 'Smart Materials with Self-Healing Properties for Aerospace Applications',
      zh: '具有自愈特性的航空航天用智能材料',
    },
    abstract: {
      en: 'This paper introduces a new class of smart materials with self-healing properties specifically designed for aerospace applications. Performance under extreme conditions is evaluated and compared with existing solutions.',
      zh: '本文介绍了一种专为航空航天应用而设计的具有自愈特性的新型智能材料。评估了极端条件下的性能并与现有解决方案进行了比较。',
    },
    authors: ['Li Ming', 'Zhang Wei', 'Chen Mei', 'Liu Yang'],
    journal: 'Aerospace Science and Technology',
    publicationDate: '2023-06-20',
    doi: '10.3456/ast.2023.06.008',
    status: 'in_review',
    citations: 0,
    category: {
      en: 'Aerospace Engineering',
      zh: '航空航天工程',
    },
    tags: ['smart materials', 'self-healing', 'aerospace', 'extreme conditions'],
  },
  {
    id: '5',
    title: {
      en: 'Sustainable Manufacturing Techniques: Environmental and Economic Impact Analysis',
      zh: '可持续制造技术：环境和经济影响分析',
    },
    abstract: {
      en: 'This study analyzes the environmental and economic impacts of implementing sustainable manufacturing techniques in the automotive industry. A comparative framework is proposed to evaluate different approaches.',
      zh: '本研究分析了在汽车行业实施可持续制造技术的环境和经济影响。提出了一个比较框架来评估不同的方法。',
    },
    authors: ['Zhao Hong', 'Wang Jie', 'Chen Lei'],
    journal: 'Journal of Cleaner Production',
    publicationDate: '',
    doi: '',
    status: 'draft',
    citations: 0,
    category: {
      en: 'Sustainable Manufacturing',
      zh: '可持续制造',
    },
    tags: ['sustainability', 'manufacturing', 'automotive', 'environmental impact'],
  },
];

export default function PublicationsModule() {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const userRole = user?.role || 'student';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date'); // 'date', 'citations'
  
  // Get unique categories for filter
  const categories = ['all', ...new Set(mockPublications.map(pub => pub.category[language]))];
  
  // Get status text based on status and language
  const getStatusText = (status: string) => {
    if (language === 'en') {
      const statusMap: Record<string, string> = {
        'published': 'Published',
        'in_review': 'In Review',
        'draft': 'Draft',
        'rejected': 'Rejected'
      };
      return statusMap[status] || status;
    } else {
      const statusMap: Record<string, string> = {
        'published': '已发表',
        'in_review': '审核中',
        'draft': '草稿',
        'rejected': '已拒绝'
      };
      return statusMap[status] || status;
    }
  };
  
  // Get status color
  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      'published': 'bg-green-100 text-green-800',
      'in_review': 'bg-yellow-100 text-yellow-800',
      'draft': 'bg-blue-100 text-blue-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };
  
  // Format date to localized string
  const formatDate = (dateString: string) => {
    if (!dateString) return language === 'en' ? 'Not published' : '未发表';
    
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Filter and sort publications
  const filteredPublications = mockPublications
    .filter(pub => {
      // Search filter
      if (searchQuery && 
          !pub.title[language].toLowerCase().includes(searchQuery.toLowerCase()) && 
          !pub.abstract[language].toLowerCase().includes(searchQuery.toLowerCase()) &&
          !pub.authors.join(' ').toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Status filter
      if (statusFilter !== 'all' && pub.status !== statusFilter) {
        return false;
      }
      
      // Category filter
      if (categoryFilter !== 'all' && pub.category[language] !== categoryFilter) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'citations') {
        return b.citations - a.citations;
      } else { // date
        const dateA = a.publicationDate ? new Date(a.publicationDate).getTime() : 0;
        const dateB = b.publicationDate ? new Date(b.publicationDate).getTime() : 0;
        return dateB - dateA;
      }
    });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{language === 'en' ? 'Publications' : '科研发表'}</h2>
        <p className="text-blue-100">
          {language === 'en' 
            ? 'Track, manage, and showcase your research publications'
            : '跟踪、管理和展示您的研究发表'
          }
        </p>
      </div>
      
      {/* Search and filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={language === 'en' ? 'Search publications...' : '搜索发表...'}
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
              <option value="published">{language === 'en' ? 'Published' : '已发表'}</option>
              <option value="in_review">{language === 'en' ? 'In Review' : '审核中'}</option>
              <option value="draft">{language === 'en' ? 'Draft' : '草稿'}</option>
              <option value="rejected">{language === 'en' ? 'Rejected' : '已拒绝'}</option>
            </select>
          </div>
          
          {/* Category filter */}
          <div>
            <select 
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">{language === 'en' ? 'All Categories' : '所有类别'}</option>
              {categories.slice(1).map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          {/* Sort by */}
          <div>
            <select 
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">{language === 'en' ? 'Sort by Date' : '按日期排序'}</option>
              <option value="citations">{language === 'en' ? 'Sort by Citations' : '按引用排序'}</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Publications list */}
      <div className="space-y-4">
        {filteredPublications.map((publication) => (
          <div 
            key={publication.id} 
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition"
          >
            <div className="p-6">
              <div className="flex flex-wrap justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 mr-3 flex-1">
                  {publication.title[language]}
                </h3>
                <span className={`px-2 py-1 h-fit rounded-full text-xs font-medium ${getStatusColor(publication.status)}`}>
                  {getStatusText(publication.status)}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                {publication.abstract[language].length > 200
                  ? `${publication.abstract[language].substring(0, 200)}...`
                  : publication.abstract[language]
                }
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {publication.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                <div className="flex items-center text-gray-600">
                  <Users size={16} className="mr-1" /> 
                  <span>{language === 'en' ? 'Authors: ' : '作者: '}</span>
                  <span className="ml-1 text-gray-800 font-medium truncate">
                    {publication.authors.join(', ')}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <BookOpen size={16} className="mr-1" /> 
                  <span className="truncate">{publication.journal}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-1" /> 
                  <span>{formatDate(publication.publicationDate)}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {publication.status === 'published' && publication.doi && (
                  <a 
                    href={`https://doi.org/${publication.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Link2 size={16} className="mr-1" />
                    <span>DOI: {publication.doi}</span>
                  </a>
                )}
                
                {publication.status === 'published' && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Eye size={16} className="mr-1" />
                    <span>{publication.citations} {language === 'en' ? 'citations' : '引用'}</span>
                  </div>
                )}
                
                <div className="flex-1"></div>
                
                {publication.pdfUrl && publication.status === 'published' && (
                  <a
                    href={publication.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-green-600 hover:text-green-800"
                  >
                    <Download size={16} className="mr-1" />
                    <span>{language === 'en' ? 'Download PDF' : '下载 PDF'}</span>
                  </a>
                )}
                
                <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                  <ExternalLink size={16} className="mr-1" />
                  <span>{language === 'en' ? 'View Details' : '查看详情'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredPublications.length === 0 && (
        <div className="text-center py-10">
          <FileText size={40} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-600">
            {language === 'en' ? 'No publications found' : '未找到发表'}
          </h3>
          <p className="text-gray-400">
            {language === 'en' 
              ? 'Try adjusting your search or filters' 
              : '尝试调整您的搜索或筛选条件'
            }
          </p>
        </div>
      )}
      
      {/* Stats and metrics section */}
      {filteredPublications.length > 0 && (
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {language === 'en' ? 'Publication Metrics' : '发表指标'}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: language === 'en' ? 'Total Publications' : '总发表数',
                value: mockPublications.filter(p => p.status === 'published').length,
                icon: <FileText size={24} className="text-blue-600" />,
              },
              {
                label: language === 'en' ? 'Total Citations' : '总引用数',
                value: mockPublications.reduce((sum, pub) => sum + pub.citations, 0),
                icon: <Eye size={24} className="text-purple-600" />,
              },
              {
                label: language === 'en' ? 'In Review' : '审核中',
                value: mockPublications.filter(p => p.status === 'in_review').length,
                icon: <Clock size={24} className="text-yellow-600" />,
              },
              {
                label: language === 'en' ? 'Drafts' : '草稿',
                value: mockPublications.filter(p => p.status === 'draft').length,
                icon: <Edit size={24} className="text-gray-600" />,
              }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm flex items-center">
                <div className="mr-4 p-2 bg-gray-50 rounded-full">
                  {stat.icon}
                </div>
                <div>
                  <h4 className="text-gray-500 text-sm">{stat.label}</h4>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Simple edit icon component
const Edit = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
); 