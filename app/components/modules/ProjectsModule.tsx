'use client';

import React, { useState } from 'react';
import { ClipboardCheck, Search, Plus, Clock, Calendar, BarChart, Users, ArrowRight, X, FileText } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'published' | 'drafts'>(userRole === 'instructor' ? 'published' : 'published');
  const [detailsActiveTab, setDetailsActiveTab] = useState<'overview' | 'submissions'>('overview');
  const [selectedSubmission, setSelectedSubmission] = useState<null | {
    id: string;
    student: string;
    title: string;
    status: 'pending' | 'in_review' | 'approved' | 'rejected';
    date: string;
    description: string;
  }>(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  
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
  
  // Professor's draft projects
  const draftProjects: Project[] = [
    {
      id: 'draft1',
      title: {
        en: 'Advanced Materials for Quantum Computing',
        zh: '量子计算的先进材料',
      },
      description: {
        en: 'Research on novel materials for building more efficient quantum computing components.',
        zh: '研究用于构建更高效量子计算组件的新型材料。',
      },
      status: 'not_started',
      category: {
        en: 'Quantum Physics',
        zh: '量子物理',
      },
      currentStep: 0,
      totalSteps: 12,
      progress: 0,
      deadline: '2024-05-15',
      supervisor: user?.name || 'Prof. Zhang',
      collaborators: 0,
      image: 'https://placehold.co/600x400/purple/white?text=Quantum+Computing',
    },
    {
      id: 'draft2',
      title: {
        en: 'Eco-friendly Biodegradable Polymers',
        zh: '环保生物降解聚合物',
      },
      description: {
        en: 'Developing new biodegradable polymers with improved mechanical properties for replacing traditional plastics.',
        zh: '开发具有改进机械性能的新型生物降解聚合物，以替代传统塑料。',
      },
      status: 'not_started',
      category: {
        en: 'Materials Science',
        zh: '材料科学',
      },
      currentStep: 0,
      totalSteps: 12,
      progress: 0,
      deadline: '2024-06-30',
      supervisor: user?.name || 'Prof. Zhang',
      collaborators: 0,
      image: 'https://placehold.co/600x400/green/white?text=Biodegradable+Polymers',
    }
  ];

  // Filter projects based on search query, status filter, and active tab
  const filteredProjects = (userRole === 'instructor' && activeTab === 'drafts' ? draftProjects : mockProjects).filter(project => {
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

  // Mock student submissions for project details
  const mockSubmissions = [
    {
      id: 'sub1',
      student: 'Wang Xiaoming',
      title: language === 'en' ? 'Literature Review' : '文献综述',
      status: 'approved',
      date: '2023-06-15',
      description: language === 'en' 
        ? 'The student has provided a comprehensive literature review covering the major developments in this field over the past decade.'
        : '该学生提供了一份全面的文献综述，涵盖了过去十年该领域的主要发展。'
    },
    {
      id: 'sub2',
      student: 'Li Juan',
      title: language === 'en' ? 'Experimental Design' : '实验设计',
      status: 'in_review',
      date: '2023-07-10',
      description: language === 'en'
        ? 'The experimental design includes detailed methodology and material requirements. Needs review for feasibility.'
        : '实验设计包括详细的方法和材料要求。需要审查其可行性。'
    },
    {
      id: 'sub3',
      student: 'Zhang Wei',
      title: language === 'en' ? 'Preliminary Results' : '初步结果',
      status: 'pending',
      date: '2023-07-25',
      description: language === 'en'
        ? 'Initial findings from the first phase of experiments. Data analysis is still ongoing.'
        : '第一阶段实验的初步发现。数据分析仍在进行中。'
    },
  ];
  
  // Previous project participants
  const previousParticipants = [
    { name: 'Chen Mei', year: '2022', contribution: language === 'en' ? 'Initial research design' : '初始研究设计' },
    { name: 'Liu Jian', year: '2022', contribution: language === 'en' ? 'Experimental setup' : '实验设置' },
  ];
  
  // Get status text for submission status
  const getSubmissionStatusText = (status: string) => {
    if (language === 'en') {
      const statusMap: Record<string, string> = {
        'pending': 'Pending Review',
        'in_review': 'In Review',
        'approved': 'Approved',
        'rejected': 'Rejected'
      };
      return statusMap[status] || status;
    } else {
      const statusMap: Record<string, string> = {
        'pending': '待审核',
        'in_review': '审核中',
        'approved': '已批准',
        'rejected': '已拒绝'
      };
      return statusMap[status] || status;
    }
  };
  
  // Get status color for submission status
  const getSubmissionStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'in_review': 'bg-blue-100 text-blue-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };
  
  // Handle dragging for submissions (in a real app, this would update the backend)
  const handleDragSubmission = (submissionId: string, newStatus: 'pending' | 'in_review' | 'approved' | 'rejected') => {
    // In a real app, this would update the backend
    alert(language === 'en' 
      ? `Moved submission ${submissionId} to ${getSubmissionStatusText(newStatus)}`
      : `将提交 ${submissionId} 移动到 ${getSubmissionStatusText(newStatus)}`
    );
  };
  
  // View submission details
  const viewSubmissionDetails = (submission: any) => {
    setSelectedSubmission(submission);
    setShowSubmissionModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{language === 'en' ? 'Research Projects' : '研究项目'}</h2>
        <p className="text-blue-100">
          {language === 'en' 
            ? userRole === 'student'
              ? 'Track and manage your ongoing research projects'
              : 'Manage research projects and monitor student submissions'
            : userRole === 'student'
              ? '跟踪和管理您正在进行的研究项目'
              : '管理研究项目并监控学生提交'
          }
        </p>
      </div>
      
      {/* Tabs for professor users */}
      {userRole === 'instructor' && (
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('published')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'published'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {language === 'en' ? 'Published Projects' : '已发布项目'}
              </button>
              <button
                onClick={() => setActiveTab('drafts')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'drafts'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {language === 'en' ? 'Draft Projects' : '草稿箱'}
              </button>
            </nav>
          </div>
        </div>
      )}
      
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
              <span>{userRole === 'instructor' && activeTab === 'drafts' 
                ? (language === 'en' ? 'Create Draft' : '创建草稿') 
                : (language === 'en' ? 'New Project' : '新项目')
              }</span>
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
          <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-6xl w-full max-h-[90vh] flex flex-col">
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
            
            {/* Tabs for project details - only for professors */}
            {userRole === 'instructor' && (
              <div className="bg-white border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setDetailsActiveTab('overview')}
                    className={`py-4 px-6 border-b-2 font-medium text-sm ${
                      detailsActiveTab === 'overview'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {language === 'en' ? 'Project Overview' : '项目概述'}
                  </button>
                  <button
                    onClick={() => setDetailsActiveTab('submissions')}
                    className={`py-4 px-6 border-b-2 font-medium text-sm ${
                      detailsActiveTab === 'submissions'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {language === 'en' ? 'Student Submissions' : '学生提交'}
                  </button>
                </nav>
              </div>
            )}
            
            {/* Modal content */}
            <div className="p-6 overflow-y-auto">
              {/* Project overview tab */}
              {(detailsActiveTab === 'overview' || userRole !== 'instructor') && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left column - Project details */}
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        {language === 'en' ? 'Project Description' : '项目描述'}
                      </h4>
                      <p className="text-gray-600">{selectedProject.description[language]}</p>
                    </div>
                    
                    {/* Previous participants section for professors */}
                    {userRole === 'instructor' && previousParticipants.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">
                          {language === 'en' ? 'Previous Participants' : '以前的参与者'}
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <table className="min-w-full">
                            <thead>
                              <tr>
                                <th className="text-left text-sm font-medium text-gray-500 py-2">
                                  {language === 'en' ? 'Student' : '学生'}
                                </th>
                                <th className="text-left text-sm font-medium text-gray-500 py-2">
                                  {language === 'en' ? 'Year' : '年份'}
                                </th>
                                <th className="text-left text-sm font-medium text-gray-500 py-2">
                                  {language === 'en' ? 'Contribution' : '贡献'}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {previousParticipants.map((participant, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                  <td className="py-3 text-sm font-medium text-gray-900">{participant.name}</td>
                                  <td className="py-3 text-sm text-gray-500">{participant.year}</td>
                                  <td className="py-3 text-sm text-gray-500">{participant.contribution}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    
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
                      {userRole === 'instructor' && (
                        <button className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                          {language === 'en' ? 'Manage Project Materials' : '管理项目资料'}
                        </button>
                      )}
                      {userRole === 'student' && (
                        <button className="w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                          {language === 'en' ? 'Request Guidance' : '请求指导'}
                        </button>
                      )}
                      <button className="w-full py-2 px-4 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition">
                        {language === 'en' ? 'Download Report' : '下载报告'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Student submissions tab - only for professors */}
              {detailsActiveTab === 'submissions' && userRole === 'instructor' && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-6">
                    {language === 'en' ? 'Student Submissions' : '学生提交'}
                  </h4>
                  
                  {/* Kanban-style board for submissions */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Pending column */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-700 mb-3 flex items-center">
                        <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                        {language === 'en' ? 'Pending Review' : '待审核'}
                        <span className="ml-2 text-xs bg-gray-200 text-gray-600 py-0.5 px-2 rounded-full">
                          {mockSubmissions.filter(s => s.status === 'pending').length}
                        </span>
                      </h5>
                      
                      <div className="space-y-3">
                        {mockSubmissions.filter(s => s.status === 'pending').map((submission) => (
                          <div
                            key={submission.id}
                            className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition"
                            onClick={() => viewSubmissionDetails(submission)}
                            draggable
                            onDragEnd={() => handleDragSubmission(submission.id, 'in_review')}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h6 className="font-medium text-gray-800">{submission.title}</h6>
                              <span className={`text-xs px-2 py-1 rounded-full ${getSubmissionStatusColor(submission.status)}`}>
                                {getSubmissionStatusText(submission.status)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{submission.student}</p>
                            <p className="text-xs text-gray-400">{formatDate(submission.date)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* In Review column */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-700 mb-3 flex items-center">
                        <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                        {language === 'en' ? 'In Review' : '审核中'}
                        <span className="ml-2 text-xs bg-gray-200 text-gray-600 py-0.5 px-2 rounded-full">
                          {mockSubmissions.filter(s => s.status === 'in_review').length}
                        </span>
                      </h5>
                      
                      <div className="space-y-3">
                        {mockSubmissions.filter(s => s.status === 'in_review').map((submission) => (
                          <div
                            key={submission.id}
                            className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition"
                            onClick={() => viewSubmissionDetails(submission)}
                            draggable
                            onDragEnd={() => handleDragSubmission(submission.id, 'approved')}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h6 className="font-medium text-gray-800">{submission.title}</h6>
                              <span className={`text-xs px-2 py-1 rounded-full ${getSubmissionStatusColor(submission.status)}`}>
                                {getSubmissionStatusText(submission.status)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{submission.student}</p>
                            <p className="text-xs text-gray-400">{formatDate(submission.date)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Approved column */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-700 mb-3 flex items-center">
                        <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                        {language === 'en' ? 'Approved' : '已批准'}
                        <span className="ml-2 text-xs bg-gray-200 text-gray-600 py-0.5 px-2 rounded-full">
                          {mockSubmissions.filter(s => s.status === 'approved').length}
                        </span>
                      </h5>
                      
                      <div className="space-y-3">
                        {mockSubmissions.filter(s => s.status === 'approved').map((submission) => (
                          <div
                            key={submission.id}
                            className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition"
                            onClick={() => viewSubmissionDetails(submission)}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h6 className="font-medium text-gray-800">{submission.title}</h6>
                              <span className={`text-xs px-2 py-1 rounded-full ${getSubmissionStatusColor(submission.status)}`}>
                                {getSubmissionStatusText(submission.status)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{submission.student}</p>
                            <p className="text-xs text-gray-400">{formatDate(submission.date)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Rejected column */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-700 mb-3 flex items-center">
                        <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
                        {language === 'en' ? 'Rejected' : '已拒绝'}
                        <span className="ml-2 text-xs bg-gray-200 text-gray-600 py-0.5 px-2 rounded-full">
                          {mockSubmissions.filter(s => s.status === 'rejected').length}
                        </span>
                      </h5>
                      
                      <div className="space-y-3">
                        {mockSubmissions.filter(s => s.status === 'rejected').map((submission) => (
                          <div
                            key={submission.id}
                            className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition"
                            onClick={() => viewSubmissionDetails(submission)}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h6 className="font-medium text-gray-800">{submission.title}</h6>
                              <span className={`text-xs px-2 py-1 rounded-full ${getSubmissionStatusColor(submission.status)}`}>
                                {getSubmissionStatusText(submission.status)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{submission.student}</p>
                            <p className="text-xs text-gray-400">{formatDate(submission.date)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Submission Details Modal */}
      {showSubmissionModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                {selectedSubmission.title}
              </h3>
              <button onClick={() => setShowSubmissionModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">
                      {language === 'en' ? 'Submitted by' : '提交者'}
                    </div>
                    <div className="text-lg font-medium">{selectedSubmission.student}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">
                      {language === 'en' ? 'Status' : '状态'}
                    </div>
                    <span className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${getSubmissionStatusColor(selectedSubmission.status)}`}>
                      {getSubmissionStatusText(selectedSubmission.status)}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">
                    {language === 'en' ? 'Submission Date' : '提交日期'}
                  </div>
                  <div>{formatDate(selectedSubmission.date)}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    {language === 'en' ? 'Description' : '描述'}
                  </div>
                  <p className="text-gray-700">{selectedSubmission.description}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-800 mb-3">
                  {language === 'en' ? 'Attached Files' : '附件'}
                </h4>
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <div className="flex items-center">
                    <FileText size={20} className="text-blue-500 mr-2" />
                    <span className="text-sm">{selectedSubmission.title} - {selectedSubmission.date}.pdf</span>
                    <button className="ml-auto text-blue-600 hover:text-blue-800 text-sm">
                      {language === 'en' ? 'Download' : '下载'}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                {selectedSubmission.status === 'pending' || selectedSubmission.status === 'in_review' ? (
                  <>
                    <button className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                      {language === 'en' ? 'Approve' : '批准'}
                    </button>
                    <button className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                      {language === 'en' ? 'Reject' : '拒绝'}
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setShowSubmissionModal(false)}
                    className="col-span-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    {language === 'en' ? 'Close' : '关闭'}
                  </button>
                )}
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