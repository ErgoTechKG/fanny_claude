'use client';

import React, { useState } from 'react';
import { Book, Clock, CheckCircle2, VideoIcon, Users, Search } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

// Course type
interface Course {
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
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in hours
  enrolled: number;
  completed: boolean;
  image: string;
}

// Mock courses data
const mockCourses: Course[] = [
  {
    id: '1',
    title: {
      en: 'Research Methodology 101',
      zh: '研究方法 101',
    },
    description: {
      en: 'Introduction to research methodology and scientific inquiry.',
      zh: '研究方法和科学探究的介绍。',
    },
    category: {
      en: 'Methodology',
      zh: '方法论',
    },
    level: 'beginner',
    duration: 8,
    enrolled: 234,
    completed: true,
    image: 'https://placehold.co/600x400/blue/white?text=Research+101',
  },
  {
    id: '2',
    title: {
      en: 'Advanced Literature Review',
      zh: '高级文献综述',
    },
    description: {
      en: 'Learn techniques for effective literature review and analysis.',
      zh: '学习有效的文献综述和分析技术。',
    },
    category: {
      en: 'Literature',
      zh: '文献',
    },
    level: 'intermediate',
    duration: 12,
    enrolled: 156,
    completed: false,
    image: 'https://placehold.co/600x400/purple/white?text=Literature+Review',
  },
  {
    id: '3',
    title: {
      en: 'Research Writing and Publication',
      zh: '研究写作与发表',
    },
    description: {
      en: 'Master the art of writing research papers and getting published in top journals.',
      zh: '掌握撰写研究论文和在顶级期刊上发表的技巧。',
    },
    category: {
      en: 'Writing',
      zh: '写作',
    },
    level: 'advanced',
    duration: 15,
    enrolled: 189,
    completed: false,
    image: 'https://placehold.co/600x400/green/white?text=Research+Writing',
  },
  {
    id: '4',
    title: {
      en: 'Data Analysis for Researchers',
      zh: '研究人员的数据分析',
    },
    description: {
      en: 'Statistical methods and data analysis techniques for research projects.',
      zh: '研究项目的统计方法和数据分析技术。',
    },
    category: {
      en: 'Statistics',
      zh: '统计学',
    },
    level: 'intermediate',
    duration: 20,
    enrolled: 245,
    completed: false,
    image: 'https://placehold.co/600x400/orange/white?text=Data+Analysis',
  },
  {
    id: '5',
    title: {
      en: 'Laboratory Safety Procedures',
      zh: '实验室安全程序',
    },
    description: {
      en: 'Essential safety protocols and procedures for research laboratories.',
      zh: '研究实验室的基本安全协议和程序。',
    },
    category: {
      en: 'Safety',
      zh: '安全',
    },
    level: 'beginner',
    duration: 6,
    enrolled: 301,
    completed: true,
    image: 'https://placehold.co/600x400/red/white?text=Lab+Safety',
  },
  {
    id: '6',
    title: {
      en: 'Research Ethics and Integrity',
      zh: '研究伦理与诚信',
    },
    description: {
      en: 'Understanding ethical considerations in research and maintaining integrity.',
      zh: '了解研究中的伦理考虑因素并保持诚信。',
    },
    category: {
      en: 'Ethics',
      zh: '伦理',
    },
    level: 'intermediate',
    duration: 10,
    enrolled: 178,
    completed: false,
    image: 'https://placehold.co/600x400/teal/white?text=Research+Ethics',
  },
];

export default function CoursesModule() {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'ongoing'
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Get unique categories for filter
  const categories = ['all', ...new Set(mockCourses.map(course => course.category[language]))];
  
  // Filter courses based on search query and filters
  const filteredCourses = mockCourses.filter(course => {
    // Search filter
    if (searchQuery && !course.title[language].toLowerCase().includes(searchQuery.toLowerCase()) && 
        !course.description[language].toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (filter === 'completed' && !course.completed) return false;
    if (filter === 'ongoing' && course.completed) return false;
    
    // Category filter
    if (categoryFilter !== 'all' && course.category[language] !== categoryFilter) return false;
    
    return true;
  });

  // Get level text in current language
  const getLevelText = (level: string) => {
    if (language === 'en') {
      return level.charAt(0).toUpperCase() + level.slice(1);
    } else {
      const levelMap: Record<string, string> = {
        'beginner': '初级',
        'intermediate': '中级',
        'advanced': '高级'
      };
      return levelMap[level] || level;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{language === 'en' ? 'Research Courses' : '科研课程'}</h2>
        <p className="text-blue-100">
          {language === 'en' 
            ? 'Enhance your research skills with our comprehensive courses'
            : '通过我们全面的课程提高您的研究技能'
          }
        </p>
      </div>
      
      {/* Search and filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={language === 'en' ? 'Search courses...' : '搜索课程...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          {/* Status filter */}
          <div>
            <select 
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">{language === 'en' ? 'All Courses' : '所有课程'}</option>
              <option value="completed">{language === 'en' ? 'Completed' : '已完成'}</option>
              <option value="ongoing">{language === 'en' ? 'In Progress' : '进行中'}</option>
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
        </div>
      </div>
      
      {/* Course cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div 
            key={course.id} 
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100"
          >
            <img 
              src={course.image} 
              alt={course.title[language]} 
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{course.title[language]}</h3>
                {course.completed && (
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-medium">
                    {language === 'en' ? 'Completed' : '已完成'}
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{course.description[language]}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {course.category[language]}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {getLevelText(course.level)}
                </span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Clock size={16} className="mr-1" /> 
                <span>{course.duration} {language === 'en' ? 'hours' : '小时'}</span>
                <Users size={16} className="ml-3 mr-1" /> 
                <span>{course.enrolled}+ {language === 'en' ? 'enrolled' : '已注册'}</span>
              </div>
              
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                {course.completed 
                  ? (language === 'en' ? 'View Certificate' : '查看证书') 
                  : (language === 'en' ? 'Continue Learning' : '继续学习')
                }
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-10">
          <Book size={40} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-600">
            {language === 'en' ? 'No courses found' : '未找到课程'}
          </h3>
          <p className="text-gray-400">
            {language === 'en' 
              ? 'Try adjusting your search or filters' 
              : '尝试调整您的搜索或筛选条件'
            }
          </p>
        </div>
      )}
      
      {/* Recommended courses section */}
      {filteredCourses.length > 0 && (
        <div className="bg-blue-50 rounded-xl p-6 mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {language === 'en' ? 'Recommended for You' : '为您推荐'}
          </h3>
          <p className="text-gray-600 mb-6">
            {language === 'en' 
              ? 'Based on your research interests and current projects'
              : '基于您的研究兴趣和当前项目'
            }
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockCourses.slice(0, 2).map((course) => (
              <div 
                key={`rec-${course.id}`} 
                className="flex bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <img 
                  src={course.image} 
                  alt={course.title[language]}
                  className="w-24 h-24 object-cover"
                />
                <div className="p-3 flex-1">
                  <h4 className="font-medium text-gray-800 mb-1">{course.title[language]}</h4>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <Clock size={14} className="mr-1" />
                    <span>{course.duration} {language === 'en' ? 'hours' : '小时'}</span>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    {language === 'en' ? 'Learn More' : '了解更多'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 