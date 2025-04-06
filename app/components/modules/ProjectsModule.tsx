'use client';

import React, { useState } from 'react';
import { ClipboardCheck, Search, Plus, Clock, Calendar, BarChart, Users, ArrowRight, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

// Project type
interface Project {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  status: 'not_started' | 'in_progress' | 'under_review' | 'completed';
  category: {
    en: string;
    zh: string;
  };
  currentStep: number;
  totalSteps: number;
  progress: number;
  deadline: string;
  supervisor: string;
  collaborators: number;
  image?: string;
}

// Mock projects data
const mockProjects: Project[] = [
  {
    id: '1',
    title: {
      en: 'Novel Materials for Renewable Energy Storage',
      zh: '可再生能源存储的新型材料',
    },
    description: {
      en: 'Investigating novel materials for more efficient renewable energy storage solutions.',
      zh: '研究用于更高效可再生能源存储解决方案的新型材料。',
    },
    status: 'in_progress',
    category: {
      en: 'Renewable Energy',
      zh: '可再生能源',
    },
    currentStep: 7,
    totalSteps: 12,
    progress: 58,
    deadline: '2023-08-15',
    supervisor: 'Prof. Li Ming',
    collaborators: 3,
    image: 'https://placehold.co/600x400/blue/white?text=Renewable+Energy',
  },
  {
    id: '2',
    title: {
      en: 'Optimization of Manufacturing Processes',
      zh: '制造工艺优化',
    },
    description: {
      en: 'Developing algorithms for optimizing manufacturing processes and reducing waste.',
      zh: '开发用于优化制造工艺和减少浪费的算法。',
    },
    status: 'in_progress',
    category: {
      en: 'Manufacturing',
      zh: '制造业',
    },
    currentStep: 4,
    totalSteps: 12,
    progress: 33,
    deadline: '2023-09-30',
    supervisor: 'Prof. Wang Jie',
    collaborators: 2,
    image: 'https://placehold.co/600x400/green/white?text=Manufacturing',
  },
  {
    id: '3',
    title: {
      en: 'Smart Materials for Aerospace Applications',
      zh: '航空航天应用的智能材料',
    },
    description: {
      en: 'Researching smart materials with self-healing properties for aerospace applications.',
      zh: '研究具有自愈特性的智能材料在航空航天中的应用。',
    },
    status: 'completed',
    category: {
      en: 'Aerospace',
      zh: '航空航天',
    },
    currentStep: 12,
    totalSteps: 12,
    progress: 100,
    deadline: '2023-03-20',
    supervisor: 'Prof. Zhang Wei',
    collaborators: 4,
    image: 'https://placehold.co/600x400/orange/white?text=Aerospace',
  },
  {
    id: '4',
    title: {
      en: 'Mechatronic Systems for Rehabilitation',
      zh: '康复用机电系统',
    },
    description: {
      en: 'Designing mechatronic systems to assist in physical rehabilitation processes.',
      zh: '设计用于辅助物理康复过程的机电系统。',
    },
    status: 'under_review',
    category: {
      en: 'Medical Devices',
      zh: '医疗设备',
    },
    currentStep: 10,
    totalSteps: 12,
    progress: 83,
    deadline: '2023-07-10',
    supervisor: 'Prof. Chen Mei',
    collaborators: 5,
    image: 'https://placehold.co/600x400/purple/white?text=Rehabilitation',
  },
  {
    id: '5',
    title: {
      en: 'Sustainable Manufacturing Techniques',
      zh: '可持续制造技术',
    },
    description: {
      en: 'Exploring eco-friendly manufacturing methods with reduced environmental impact.',
      zh: '探索具有减少环境影响的环保制造方法。',
    },
    status: 'not_started',
    category: {
      en: 'Sustainability',
      zh: '可持续性',
    },
    currentStep: 0,
    totalSteps: 12,
    progress: 0,
    deadline: '2023-11-30',
    supervisor: 'Prof. Huang Lei',
    collaborators: 2,
    image: 'https://placehold.co/600x400/teal/white?text=Sustainability',
  }
];

export default function ProjectsModule() {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const userRole = user?.role || 'student';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  // Check if we have a selected project from dashboard in sessionStorage
  React.useEffect(() => {
    const storedProject = sessionStorage.getItem('selectedProject');
    if (storedProject) {
      try {
        const { id, isCompleted } = JSON.parse(storedProject);
        
        // Find the project in our data
        const projectId = id.toString(); // Ensure it's a string to match our models
        const foundProject = mockProjects.find(p => p.id === projectId);
        
        if (foundProject) {
          setSelectedProject(foundProject);
          setIsDetailsModalOpen(true);
        }
        
        // Clear the sessionStorage after retrieving
        sessionStorage.removeItem('selectedProject');
      } catch (err) {
        console.error("Error parsing stored project:", err);
      }
    }
  }, []);
  
  // Get status text based on status and language
  const getStatusText = (status: string) => {
    if (language === 'en') {
      const statusMap: Record<string, string> = {
        'not_started': 'Not Started',
        'in_progress': 'In Progress',
        'under_review': 'Under Review',
        'completed': 'Completed'
      };
      return statusMap[status] || status;
    } else {
      const statusMap: Record<string, string> = {
        'not_started': '未开始',
        'in_progress': '进行中',
        'under_review': '审核中',
        'completed': '已完成'
      };
      return statusMap[status] || status;
    }
  };
  
  // Get status color
  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      'not_started': 'bg-gray-100 text-gray-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'under_review': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };
  
  // Format date to localized string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Filter projects based on search query and status filter
  const filteredProjects = mockProjects.filter(project => {
    // Search filter
    if (searchQuery && !project.title[language].toLowerCase().includes(searchQuery.toLowerCase()) && 
        !project.description[language].toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== 'all' && project.status !== statusFilter) {
      return false;
    }
    
    return true;
  });
  
  // Open project details modal
  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
  };
  
  // Steps for the 12-step research method
  const researchSteps = [
    { en: '1. Define Research Problem', zh: '1. 定义研究问题' },
    { en: '2. Literature Review', zh: '2. 文献综述' },
    { en: '3. Formulate Hypothesis', zh: '3. 制定假设' },
    { en: '4. Research Design', zh: '4. 研究设计' },
    { en: '5. Data Collection Planning', zh: '5. 数据收集计划' },
    { en: '6. Pilot Study', zh: '6. 预实验' },
    { en: '7. Data Collection', zh: '7. 数据收集' },
    { en: '8. Data Processing', zh: '8. 数据处理' },
    { en: '9. Data Analysis', zh: '9. 数据分析' },
    { en: '10. Results Interpretation', zh: '10. 结果解释' },
    { en: '11. Report Writing', zh: '11. 报告撰写' },
    { en: '12. Publication/Presentation', zh: '12. 发表/演示' }
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{language === 'en' ? 'Research Projects' : '研究项目'}</h2>
        <p className="text-blue-100">
          {language === 'en' 
            ? userRole === 'student'
              ? 'Track and manage your ongoing research projects'
              : 'Monitor student projects and research initiatives'
            : userRole === 'student'
              ? '跟踪和管理您正在进行的研究项目'
              : '监控学生项目和研究计划'
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
              placeholder={language === 'en' ? 'Search projects...' : '搜索项目...'}
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
              <option value="not_started">{language === 'en' ? 'Not Started' : '未开始'}</option>
              <option value="in_progress">{language === 'en' ? 'In Progress' : '进行中'}</option>
              <option value="under_review">{language === 'en' ? 'Under Review' : '审核中'}</option>
              <option value="completed">{language === 'en' ? 'Completed' : '已完成'}</option>
            </select>
          </div>
          
          {/* New Project button */}
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center">
              <Plus size={18} className="mr-1" />
              <span>{language === 'en' ? 'New Project' : '新项目'}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Projects list */}
      <div className="grid grid-cols-1 gap-4">
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition"
          >
            <div className="p-6">
              <div className="md:flex justify-between">
                <div className="md:flex-1 mb-4 md:mb-0">
                  <div className="flex items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 mr-3">{project.title[language]}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{project.description[language]}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-1" /> 
                      <span>{language === 'en' ? 'Deadline:' : '截止日期:'} {formatDate(project.deadline)}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users size={16} className="mr-1" /> 
                      <span>{project.collaborators} {language === 'en' ? 'Collaborators' : '合作者'}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <ClipboardCheck size={16} className="mr-1" /> 
                      <span>{language === 'en' ? 'Supervisor:' : '导师:'} {project.supervisor}</span>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-72 md:pl-6 md:border-l md:border-gray-100">
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>{language === 'en' ? 'Progress' : '进度'}</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-4">
                    {language === 'en' ? 'Step' : '步骤'} {project.currentStep}/{project.totalSteps}: 
                    <span className="font-medium ml-1">
                      {project.currentStep > 0 
                        ? researchSteps[project.currentStep - 1][language].split('. ')[1] 
                        : (language === 'en' ? 'Not Started' : '未开始')
                      }
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => openProjectDetails(project)}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                  >
                    <span>{language === 'en' ? 'View Details' : '查看详情'}</span>
                    <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-10">
          <ClipboardCheck size={40} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-600">
            {language === 'en' ? 'No projects found' : '未找到项目'}
          </h3>
          <p className="text-gray-400">
            {language === 'en' 
              ? 'Try adjusting your search or filters' 
              : '尝试调整您的搜索或筛选条件'
            }
          </p>
        </div>
      )}
      
      {/* Project Stats section */}
      {filteredProjects.length > 0 && (
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {language === 'en' ? 'Project Statistics' : '项目统计'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                label: language === 'en' ? 'Active Projects' : '进行中的项目',
                value: mockProjects.filter(p => p.status === 'in_progress').length,
                icon: <ClipboardCheck size={24} className="text-blue-600" />,
              },
              {
                label: language === 'en' ? 'Completed' : '已完成',
                value: mockProjects.filter(p => p.status === 'completed').length,
                icon: <CheckIcon size={24} className="text-green-600" />,
              },
              {
                label: language === 'en' ? 'Deadlines This Month' : '本月截止',
                value: 2,
                icon: <Calendar size={24} className="text-red-600" />,
              },
              {
                label: language === 'en' ? 'Average Progress' : '平均进度',
                value: `${Math.round(mockProjects.reduce((acc, curr) => acc + curr.progress, 0) / mockProjects.length)}%`,
                icon: <BarChart size={24} className="text-purple-600" />,
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
      
      {/* Project Details Modal */}
      {isDetailsModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Modal header */}
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
              <h3 className="text-xl font-semibold">{selectedProject.title[language]}</h3>
              <button 
                onClick={() => setIsDetailsModalOpen(false)}
                className="text-white hover:text-blue-200"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Modal content */}
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left column - Project details */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {language === 'en' ? 'Project Description' : '项目描述'}
                    </h4>
                    <p className="text-gray-600">{selectedProject.description[language]}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      {language === 'en' ? 'Research Progress' : '研究进度'}
                    </h4>
                    
                    <div className="space-y-4">
                      {researchSteps.map((step, index) => {
                        const isCompleted = index < selectedProject.currentStep;
                        const isCurrent = index === selectedProject.currentStep - 1;
                        
                        return (
                          <div 
                            key={index} 
                            className={`p-4 rounded-lg border ${
                              isCompleted 
                                ? 'border-green-200 bg-green-50' 
                                : isCurrent
                                  ? 'border-blue-200 bg-blue-50'
                                  : 'border-gray-200 bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center">
                              <div className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center ${
                                isCompleted 
                                  ? 'bg-green-500 text-white' 
                                  : isCurrent
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-300 text-gray-600'
                              }`}>
                                {isCompleted ? (
                                  <CheckIcon size={16} />
                                ) : (
                                  <span>{index + 1}</span>
                                )}
                              </div>
                              <div className="flex-1">
                                <h5 className={`font-medium ${
                                  isCompleted 
                                    ? 'text-green-800' 
                                    : isCurrent
                                      ? 'text-blue-800'
                                      : 'text-gray-600'
                                }`}>
                                  {step[language].split('. ')[1]}
                                </h5>
                              </div>
                              {isCompleted && (
                                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                  {language === 'en' ? 'Completed' : '已完成'}
                                </span>
                              )}
                              {isCurrent && (
                                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                  {language === 'en' ? 'In Progress' : '进行中'}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Right column - Side info */}
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      {language === 'en' ? 'Project Details' : '项目详情'}
                    </h4>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-500">
                          {language === 'en' ? 'Status' : '状态'}
                        </div>
                        <div className="font-medium">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(selectedProject.status)}`}>
                            {getStatusText(selectedProject.status)}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">
                          {language === 'en' ? 'Category' : '类别'}
                        </div>
                        <div className="font-medium">{selectedProject.category[language]}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">
                          {language === 'en' ? 'Deadline' : '截止日期'}
                        </div>
                        <div className="font-medium">{formatDate(selectedProject.deadline)}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">
                          {language === 'en' ? 'Supervisor' : '导师'}
                        </div>
                        <div className="font-medium">{selectedProject.supervisor}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">
                          {language === 'en' ? 'Collaborators' : '合作者'}
                        </div>
                        <div className="font-medium">{selectedProject.collaborators} {language === 'en' ? 'people' : '人'}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="space-y-3">
                    <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      {language === 'en' ? 'Update Progress' : '更新进度'}
                    </button>
                    <button className="w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                      {language === 'en' ? 'Request Meeting' : '申请会议'}
                    </button>
                    <button className="w-full py-2 px-4 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition">
                      {language === 'en' ? 'Download Report' : '下载报告'}
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

// Simple check icon component
const CheckIcon = ({ size = 24, className = "" }) => (
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
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
); 