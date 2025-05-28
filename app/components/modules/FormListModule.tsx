'use client';

import React, { useState } from 'react';
import { FileText, Calendar, CheckCircle, Clock, AlertTriangle, Plus, Search, Filter, Download, Edit } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

// Form type definition
interface Form {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  category: 'course_design' | 'evaluation' | 'summary' | 'planning' | 'assessment';
  status: 'completed' | 'in_progress' | 'pending' | 'overdue';
  dueDate: string;
  completedDate?: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: number; // in minutes
  tags: string[];
}

// Mock forms data
const mockForms: Form[] = [
  {
    id: '1',
    title: {
      en: 'Professional Course Design Work Summary 2024.1',
      zh: '专业方向课程设计 工作总结表 2024.1',
    },
    description: {
      en: 'Comprehensive summary of professional course design work for Spring 2024 semester',
      zh: '2024年春季学期专业方向课程设计工作的综合总结',
    },
    category: 'summary',
    status: 'completed',
    dueDate: '2024-03-15',
    completedDate: '2024-03-10',
    priority: 'high',
    estimatedTime: 120,
    tags: ['课程设计', '总结报告', '春季学期']
  },
  {
    id: '2',
    title: {
      en: 'Professional Course Design Evaluation Form & Materials Checklist',
      zh: '专业方向课程设计 评分表 & 材料清单',
    },
    description: {
      en: 'Evaluation rubric and required materials checklist for professional course design projects',
      zh: '专业方向课程设计项目的评分标准和必需材料清单',
    },
    category: 'evaluation',
    status: 'in_progress',
    dueDate: '2024-12-20',
    priority: 'high',
    estimatedTime: 90,
    tags: ['评分标准', '材料清单', '课程设计']
  },
  {
    id: '3',
    title: {
      en: 'Professional Course Design Task Assignment',
      zh: '专业方向课程设计 任务书',
    },
    description: {
      en: 'Detailed task assignments and requirements for professional course design',
      zh: '专业方向课程设计的详细任务分配和要求',
    },
    category: 'planning',
    status: 'pending',
    dueDate: '2024-12-25',
    priority: 'medium',
    estimatedTime: 60,
    tags: ['任务分配', '课程设计', '要求文档']
  },
  {
    id: '4',
    title: {
      en: 'Graduate Research Mentoring Progress Report 2024.2',
      zh: '研究生导师指导进展报告 2024.2',
    },
    description: {
      en: 'Progress report on graduate student mentoring activities for Fall 2024',
      zh: '2024年秋季学期研究生指导活动的进展报告',
    },
    category: 'summary',
    status: 'pending',
    dueDate: '2024-12-30',
    priority: 'high',
    estimatedTime: 150,
    tags: ['研究生指导', '进展报告', '秋季学期']
  },
  {
    id: '5',
    title: {
      en: 'Teaching Quality Self-Assessment Form 2024',
      zh: '教学质量自评表 2024',
    },
    description: {
      en: 'Annual self-assessment of teaching quality and professional development',
      zh: '教学质量和专业发展的年度自我评估',
    },
    category: 'assessment',
    status: 'overdue',
    dueDate: '2024-11-30',
    priority: 'high',
    estimatedTime: 100,
    tags: ['教学质量', '自我评估', '年度总结']
  },
  {
    id: '6',
    title: {
      en: 'Laboratory Safety Compliance Checklist 2024',
      zh: '实验室安全合规检查表 2024',
    },
    description: {
      en: 'Annual laboratory safety compliance verification and documentation',
      zh: '年度实验室安全合规验证和文档记录',
    },
    category: 'assessment',
    status: 'in_progress',
    dueDate: '2024-12-15',
    priority: 'high',
    estimatedTime: 45,
    tags: ['实验室安全', '合规检查', '年度审核']
  },
  {
    id: '7',
    title: {
      en: 'Research Ethics Training Completion Certificate',
      zh: '科研伦理培训完成证明',
    },
    description: {
      en: 'Documentation of completed research ethics training and certification',
      zh: '科研伦理培训完成和认证的文档记录',
    },
    category: 'assessment',
    status: 'pending',
    dueDate: '2025-01-15',
    priority: 'medium',
    estimatedTime: 30,
    tags: ['科研伦理', '培训证明', '认证文档']
  },
  {
    id: '8',
    title: {
      en: 'Academic Year Teaching Plan 2024-2025',
      zh: '学年教学计划 2024-2025',
    },
    description: {
      en: 'Comprehensive teaching plan and course schedule for the 2024-2025 academic year',
      zh: '2024-2025学年的综合教学计划和课程安排',
    },
    category: 'planning',
    status: 'completed',
    dueDate: '2024-08-30',
    completedDate: '2024-08-25',
    priority: 'high',
    estimatedTime: 180,
    tags: ['教学计划', '课程安排', '学年规划']
  }
];

export default function FormListModule() {
  const { language } = useLanguage();
  const { user } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  // Get status text and color
  const getStatusInfo = (status: string) => {
    const statusMap = {
      completed: {
        text: language === 'en' ? 'Completed' : '已完成',
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircle size={16} />
      },
      in_progress: {
        text: language === 'en' ? 'In Progress' : '进行中',
        color: 'bg-blue-100 text-blue-800',
        icon: <Clock size={16} />
      },
      pending: {
        text: language === 'en' ? 'Pending' : '待开始',
        color: 'bg-yellow-100 text-yellow-800',
        icon: <Clock size={16} />
      },
      overdue: {
        text: language === 'en' ? 'Overdue' : '已逾期',
        color: 'bg-red-100 text-red-800',
        icon: <AlertTriangle size={16} />
      }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.pending;
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    const priorityMap = {
      high: 'border-l-4 border-red-500',
      medium: 'border-l-4 border-yellow-500',
      low: 'border-l-4 border-green-500'
    };
    return priorityMap[priority as keyof typeof priorityMap] || priorityMap.medium;
  };

  // Get category text
  const getCategoryText = (category: string) => {
    const categoryMap = {
      course_design: language === 'en' ? 'Course Design' : '课程设计',
      evaluation: language === 'en' ? 'Evaluation' : '评估表',
      summary: language === 'en' ? 'Summary Report' : '总结报告',
      planning: language === 'en' ? 'Planning' : '计划文档',
      assessment: language === 'en' ? 'Assessment' : '评估认证'
    };
    return categoryMap[category as keyof typeof categoryMap] || category;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Filter and sort forms
  const filteredAndSortedForms = mockForms
    .filter(form => {
      // Search filter
      if (searchQuery && !form.title[language].toLowerCase().includes(searchQuery.toLowerCase()) && 
          !form.description[language].toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Status filter
      if (statusFilter !== 'all' && form.status !== statusFilter) {
        return false;
      }
      
      // Category filter
      if (categoryFilter !== 'all' && form.category !== categoryFilter) {
        return false;
      }
      
      // Priority filter
      if (priorityFilter !== 'all' && form.priority !== priorityFilter) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  // Calculate statistics
  const totalForms = mockForms.length;
  const completedForms = mockForms.filter(f => f.status === 'completed').length;
  const overdueForms = mockForms.filter(f => f.status === 'overdue').length;
  const pendingForms = mockForms.filter(f => f.status === 'pending' || f.status === 'in_progress').length;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          {language === 'en' ? 'Form Management' : '表单列表'}
        </h2>
        <p className="text-indigo-100">
          {language === 'en' 
            ? 'Manage and track all required institutional forms and documentation'
            : '管理和跟踪所有必需的制度表单和文档'
          }
        </p>
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-4">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{language === 'en' ? 'Total Forms' : '总表单数'}</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalForms}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full mr-4">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{language === 'en' ? 'Completed' : '已完成'}</p>
              <h3 className="text-2xl font-bold text-gray-800">{completedForms}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full mr-4">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{language === 'en' ? 'Pending' : '待处理'}</p>
              <h3 className="text-2xl font-bold text-gray-800">{pendingForms}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center bg-red-100 text-red-600 rounded-full mr-4">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{language === 'en' ? 'Overdue' : '已逾期'}</p>
              <h3 className="text-2xl font-bold text-gray-800">{overdueForms}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Search */}
          <div className="relative md:col-span-2">
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={language === 'en' ? 'Search forms...' : '搜索表单...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          {/* Status filter */}
          <div>
            <select 
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">{language === 'en' ? 'All Status' : '所有状态'}</option>
              <option value="pending">{language === 'en' ? 'Pending' : '待开始'}</option>
              <option value="in_progress">{language === 'en' ? 'In Progress' : '进行中'}</option>
              <option value="completed">{language === 'en' ? 'Completed' : '已完成'}</option>
              <option value="overdue">{language === 'en' ? 'Overdue' : '已逾期'}</option>
            </select>
          </div>

          {/* Category filter */}
          <div>
            <select 
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">{language === 'en' ? 'All Categories' : '所有类别'}</option>
              <option value="course_design">{language === 'en' ? 'Course Design' : '课程设计'}</option>
              <option value="evaluation">{language === 'en' ? 'Evaluation' : '评估表'}</option>
              <option value="summary">{language === 'en' ? 'Summary Report' : '总结报告'}</option>
              <option value="planning">{language === 'en' ? 'Planning' : '计划文档'}</option>
              <option value="assessment">{language === 'en' ? 'Assessment' : '评估认证'}</option>
            </select>
          </div>

          {/* Priority filter */}
          <div>
            <select 
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">{language === 'en' ? 'All Priorities' : '所有优先级'}</option>
              <option value="high">{language === 'en' ? 'High Priority' : '高优先级'}</option>
              <option value="medium">{language === 'en' ? 'Medium Priority' : '中优先级'}</option>
              <option value="low">{language === 'en' ? 'Low Priority' : '低优先级'}</option>
            </select>
          </div>

          {/* Sort by */}
          <div>
            <select 
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="dueDate">{language === 'en' ? 'Sort by Due Date' : '按截止日期排序'}</option>
              <option value="priority">{language === 'en' ? 'Sort by Priority' : '按优先级排序'}</option>
              <option value="status">{language === 'en' ? 'Sort by Status' : '按状态排序'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Forms list */}
      <div className="space-y-4">
        {filteredAndSortedForms.map((form) => {
          const statusInfo = getStatusInfo(form.status);
          const isOverdue = new Date(form.dueDate) < new Date() && form.status !== 'completed';
          
          return (
            <div 
              key={form.id} 
              className={`bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition ${getPriorityColor(form.priority)}`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 mr-3">
                        {form.title[language]}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${statusInfo.color}`}>
                        {statusInfo.icon}
                        <span className="ml-1">{statusInfo.text}</span>
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{form.description[language]}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        <span>
                          {language === 'en' ? 'Due:' : '截止日期:'} {formatDate(form.dueDate)}
                          {isOverdue && <span className="text-red-500 ml-1">({language === 'en' ? 'Overdue' : '已逾期'})</span>}
                        </span>
                      </div>
                      
                      {form.completedDate && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle size={16} className="mr-1" />
                          <span>
                            {language === 'en' ? 'Completed:' : '完成日期:'} {formatDate(form.completedDate)}
                          </span>
                        </div>
                      )}
                      
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        {getCategoryText(form.category)}
                      </span>
                      
                      <span className="text-xs">
                        {language === 'en' ? 'Est. Time:' : '预计时间:'} {form.estimatedTime} {language === 'en' ? 'mins' : '分钟'}
                      </span>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {form.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-6">
                    {form.status === 'completed' ? (
                      <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition flex items-center">
                        <Download size={16} className="mr-1" />
                        <span>{language === 'en' ? 'Download' : '下载'}</span>
                      </button>
                    ) : (
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center">
                        <Edit size={16} className="mr-1" />
                        <span>{language === 'en' ? 'Fill Form' : '填写表单'}</span>
                      </button>
                    )}
                    
                    <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition">
                      {language === 'en' ? 'Details' : '查看详情'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAndSortedForms.length === 0 && (
        <div className="text-center py-10">
          <FileText size={40} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-600">
            {language === 'en' ? 'No forms found' : '未找到表单'}
          </h3>
          <p className="text-gray-400">
            {language === 'en' 
              ? 'Try adjusting your search or filters' 
              : '尝试调整您的搜索或筛选条件'
            }
          </p>
        </div>
      )}
    </div>
  );
} 