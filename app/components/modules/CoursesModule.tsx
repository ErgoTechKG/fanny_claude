'use client';

import React, { useState } from 'react';
import { Book, Clock, CheckCircle2, VideoIcon, Users, Search, ArrowLeft, Eye, FileText, Calendar, User } from 'lucide-react';
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

// Research Project type for lab rotation
interface ResearchProject {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  supervisor: string;
  department: {
    en: string;
    zh: string;
  };
  category: {
    en: string;
    zh: string;
  };
  duration: string;
  deadline: string;
  maxStudents: number;
  currentStudents: number;
  requirements: {
    en: string[];
    zh: string[];
  };
  image: string;
}

// Mock research projects for lab rotation
const labRotationProjects: ResearchProject[] = [
  {
    id: 'lr1',
    title: {
      en: 'Novel Materials for Renewable Energy Storage',
      zh: '可再生能源存储的新型材料',
    },
    description: {
      en: 'Join our cutting-edge research on developing advanced materials for more efficient renewable energy storage solutions. You will work with nanomaterials and conduct electrochemical analysis.',
      zh: '加入我们在开发用于更高效可再生能源存储解决方案的先进材料方面的前沿研究。您将使用纳米材料并进行电化学分析。',
    },
    supervisor: 'Prof. Li Ming',
    department: {
      en: 'Materials Science & Engineering',
      zh: '材料科学与工程',
    },
    category: {
      en: 'Renewable Energy',
      zh: '可再生能源',
    },
    duration: '6 months',
    deadline: '2024-03-15',
    maxStudents: 3,
    currentStudents: 1,
    requirements: {
      en: ['Basic knowledge of materials science', 'Experience with lab equipment', 'Good analytical skills'],
      zh: ['材料科学基础知识', '实验设备使用经验', '良好的分析能力'],
    },
    image: 'https://placehold.co/600x400/blue/white?text=Renewable+Energy',
  },
  {
    id: 'lr2',
    title: {
      en: 'AI-Driven Manufacturing Optimization',
      zh: 'AI驱动的制造工艺优化',
    },
    description: {
      en: 'Explore the intersection of artificial intelligence and manufacturing processes. Develop machine learning algorithms to optimize production efficiency and reduce waste.',
      zh: '探索人工智能与制造工艺的交叉点。开发机器学习算法以优化生产效率并减少浪费。',
    },
    supervisor: 'Prof. Wang Jie',
    department: {
      en: 'Computer Science & Engineering',
      zh: '计算机科学与工程',
    },
    category: {
      en: 'Artificial Intelligence',
      zh: '人工智能',
    },
    duration: '4 months',
    deadline: '2024-03-20',
    maxStudents: 2,
    currentStudents: 0,
    requirements: {
      en: ['Programming skills (Python/MATLAB)', 'Understanding of machine learning', 'Interest in manufacturing'],
      zh: ['编程技能（Python/MATLAB）', '机器学习理解', '对制造业的兴趣'],
    },
    image: 'https://placehold.co/600x400/green/white?text=AI+Manufacturing',
  },
  {
    id: 'lr3',
    title: {
      en: 'Biomedical Device Innovation',
      zh: '生物医学设备创新',
    },
    description: {
      en: 'Design and develop innovative biomedical devices for healthcare applications. Focus on wearable sensors and diagnostic tools.',
      zh: '设计和开发用于医疗保健应用的创新生物医学设备。专注于可穿戴传感器和诊断工具。',
    },
    supervisor: 'Prof. Chen Mei',
    department: {
      en: 'Biomedical Engineering',
      zh: '生物医学工程',
    },
    category: {
      en: 'Medical Devices',
      zh: '医疗设备',
    },
    duration: '5 months',
    deadline: '2024-03-10',
    maxStudents: 4,
    currentStudents: 2,
    requirements: {
      en: ['Basic electronics knowledge', 'Interest in healthcare', 'Team collaboration skills'],
      zh: ['基础电子学知识', '对医疗保健的兴趣', '团队协作技能'],
    },
    image: 'https://placehold.co/600x400/purple/white?text=Biomedical+Device',
  },
  {
    id: 'lr4',
    title: {
      en: 'Sustainable Architecture Design',
      zh: '可持续建筑设计',
    },
    description: {
      en: 'Research sustainable building materials and energy-efficient design principles. Contribute to the future of green architecture.',
      zh: '研究可持续建筑材料和节能设计原则。为绿色建筑的未来做出贡献。',
    },
    supervisor: 'Prof. Zhang Wei',
    department: {
      en: 'Architecture & Planning',
      zh: '建筑与规划',
    },
    category: {
      en: 'Sustainability',
      zh: '可持续性',
    },
    duration: '6 months',
    deadline: '2024-03-25',
    maxStudents: 3,
    currentStudents: 1,
    requirements: {
      en: ['Architecture or engineering background', 'CAD software skills', 'Environmental awareness'],
      zh: ['建筑或工程背景', 'CAD软件技能', '环境意识'],
    },
    image: 'https://placehold.co/600x400/teal/white?text=Sustainable+Architecture',
  },
];

// Mock courses data
const mockCourses: Course[] = [
  {
    id: '1',
    title: {
      en: 'Lab Rotation',
      zh: '实验室轮转',
    },
    description: {
      en: 'Explore different research laboratories and find your perfect research match through hands-on experience.',
      zh: '通过实践体验探索不同的研究实验室，找到您的完美研究匹配。',
    },
    category: {
      en: 'Research Methods',
      zh: '研究方法',
    },
    level: 'beginner',
    duration: 16,
    enrolled: 120,
    completed: false,
    image: 'https://placehold.co/600x400/blue/white?text=Lab+Rotation',
  },
  {
    id: '2',
    title: {
      en: 'Academic Writing Excellence',
      zh: '学术写作精要',
    },
    description: {
      en: 'Master the art of academic writing, from research papers to grant proposals.',
      zh: '掌握学术写作的艺术，从研究论文到资助申请。',
    },
    category: {
      en: 'Writing Skills',
      zh: '写作技能',
    },
    level: 'intermediate',
    duration: 12,
    enrolled: 85,
    completed: true,
    image: 'https://placehold.co/600x400/green/white?text=Academic+Writing',
  },
  {
    id: '3',
    title: {
      en: 'Data Analysis & Visualization',
      zh: '数据分析与可视化',
    },
    description: {
      en: 'Learn advanced statistical methods and create compelling data visualizations.',
      zh: '学习高级统计方法并创建引人注目的数据可视化。',
    },
    category: {
      en: 'Data Science',
      zh: '数据科学',
    },
    level: 'advanced',
    duration: 20,
    enrolled: 76,
    completed: false,
    image: 'https://placehold.co/600x400/purple/white?text=Data+Analysis',
  },
  {
    id: '4',
    title: {
      en: 'Research Ethics & Integrity',
      zh: '研究伦理与诚信',
    },
    description: {
      en: 'Understand ethical principles and best practices in research conduct.',
      zh: '了解研究行为中的伦理原则和最佳实践。',
    },
    category: {
      en: 'Ethics',
      zh: '伦理学',
    },
    level: 'beginner',
    duration: 8,
    enrolled: 150,
    completed: true,
    image: 'https://placehold.co/600x400/orange/white?text=Research+Ethics',
  },
  {
    id: '5',
    title: {
      en: 'Presentation & Communication Skills',
      zh: '演示与沟通技巧',
    },
    description: {
      en: 'Develop confidence in presenting research findings to diverse audiences.',
      zh: '培养向不同受众展示研究成果的信心。',
    },
    category: {
      en: 'Communication',
      zh: '沟通',
    },
    level: 'intermediate',
    duration: 14,
    enrolled: 92,
    completed: false,
    image: 'https://placehold.co/600x400/red/white?text=Communication+Skills',
  },
  {
    id: '6',
    title: {
      en: 'Grant Writing Workshop',
      zh: '资助申请写作工作坊',
    },
    description: {
      en: 'Learn strategies for successful research funding applications.',
      zh: '学习成功申请研究资助的策略。',
    },
    category: {
      en: 'Funding',
      zh: '资助',
    },
    level: 'advanced',
    duration: 10,
    enrolled: 45,
    completed: false,
    image: 'https://placehold.co/600x400/yellow/white?text=Grant+Writing',
  }
];

export default function CoursesModule() {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showLabRotation, setShowLabRotation] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ResearchProject | null>(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  
  // Get unique categories from courses
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
    if (categoryFilter !== 'all' && course.category[language] !== categoryFilter) {
      return false;
    }
    
    return true;
  });

  // Filter lab rotation projects
  const filteredLabProjects = labRotationProjects.filter(project => {
    if (projectSearchQuery && !project.title[language].toLowerCase().includes(projectSearchQuery.toLowerCase()) && 
        !project.description[language].toLowerCase().includes(projectSearchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Handle course click - for Lab Rotation (id: '1'), show projects list
  const handleCourseClick = (course: Course) => {
    if (course.id === '1' && user?.role === 'student') {
      setShowLabRotation(true);
    }
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

  // Handle project details view
  const viewProjectDetails = (project: ResearchProject) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  // Handle project application
  const applyToProject = (project: ResearchProject) => {
    alert(language === 'en' 
      ? `Application submitted for "${project.title[language]}"! You will receive a confirmation email soon.`
      : `已提交"${project.title[language]}"的申请！您将很快收到确认邮件。`
    );
  };

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

  // If showing lab rotation projects
  if (showLabRotation) {
    return (
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-xl p-6 text-white">
          <div className="flex items-center mb-4">
            <button 
              onClick={() => setShowLabRotation(false)}
              className="mr-4 p-2 hover:bg-green-600 rounded-lg transition"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-2xl font-bold mb-2">{language === 'en' ? 'Lab Rotation Projects' : '实验室轮转项目'}</h2>
              <p className="text-green-100">
                {language === 'en' 
                  ? 'Explore available research projects and apply for lab rotations'
                  : '探索可用的研究项目并申请实验室轮转'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="relative">
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder={language === 'en' ? 'Search projects...' : '搜索项目...'}
              value={projectSearchQuery}
              onChange={(e) => setProjectSearchQuery(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredLabProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition">
              <img 
                src={project.image} 
                alt={project.title[language]} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">{project.title[language]}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.currentStudents >= project.maxStudents 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {project.currentStudents}/{project.maxStudents} {language === 'en' ? 'students' : '学生'}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description[language]}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <User size={16} className="mr-2" />
                    <span>{language === 'en' ? 'Supervisor:' : '导师:'} {project.supervisor}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Book size={16} className="mr-2" />
                    <span>{project.department[language]}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={16} className="mr-2" />
                    <span>{language === 'en' ? 'Duration:' : '持续时间:'} {project.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span>{language === 'en' ? 'Deadline:' : '截止日期:'} {formatDate(project.deadline)}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button 
                    onClick={() => viewProjectDetails(project)}
                    className="flex-1 py-2 px-4 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition flex items-center justify-center"
                  >
                    <Eye size={16} className="mr-1" />
                    <span>{language === 'en' ? 'View Details' : '查看详情'}</span>
                  </button>
                  <button 
                    onClick={() => applyToProject(project)}
                    disabled={project.currentStudents >= project.maxStudents}
                    className={`flex-1 py-2 px-4 rounded-lg transition flex items-center justify-center ${
                      project.currentStudents >= project.maxStudents
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    <FileText size={16} className="mr-1" />
                    <span>{language === 'en' ? 'Apply Project' : '申请项目'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLabProjects.length === 0 && (
          <div className="text-center py-10">
            <Book size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-600">
              {language === 'en' ? 'No projects found' : '未找到项目'}
            </h3>
            <p className="text-gray-400">
              {language === 'en' 
                ? 'Try adjusting your search criteria' 
                : '尝试调整您的搜索条件'
              }
            </p>
          </div>
        )}

        {/* Project Details Modal */}
        {showProjectDetails && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-green-600 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{selectedProject.title[language]}</h3>
                    <p className="text-green-100">{selectedProject.department[language]}</p>
                  </div>
                  <button 
                    onClick={() => setShowProjectDetails(false)}
                    className="text-white hover:text-green-200 p-2"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main content */}
                  <div className="lg:col-span-2">
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        {language === 'en' ? 'Project Description' : '项目描述'}
                      </h4>
                      <p className="text-gray-600">{selectedProject.description[language]}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        {language === 'en' ? 'Requirements' : '要求'}
                      </h4>
                      <ul className="list-disc list-inside space-y-2">
                        {selectedProject.requirements[language].map((req, index) => (
                          <li key={index} className="text-gray-600">{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      {language === 'en' ? 'Project Details' : '项目详情'}
                    </h4>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-500">{language === 'en' ? 'Supervisor' : '导师'}</div>
                        <div className="font-medium">{selectedProject.supervisor}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">{language === 'en' ? 'Category' : '类别'}</div>
                        <div className="font-medium">{selectedProject.category[language]}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">{language === 'en' ? 'Duration' : '持续时间'}</div>
                        <div className="font-medium">{selectedProject.duration}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">{language === 'en' ? 'Application Deadline' : '申请截止日期'}</div>
                        <div className="font-medium">{formatDate(selectedProject.deadline)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">{language === 'en' ? 'Availability' : '可用性'}</div>
                        <div className="font-medium">
                          {selectedProject.currentStudents}/{selectedProject.maxStudents} {language === 'en' ? 'students' : '学生'}
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => applyToProject(selectedProject)}
                      disabled={selectedProject.currentStudents >= selectedProject.maxStudents}
                      className={`w-full mt-6 py-3 px-4 rounded-lg transition font-medium ${
                        selectedProject.currentStudents >= selectedProject.maxStudents
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {language === 'en' ? 'Apply for This Project' : '申请此项目'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

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
            className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100 ${
              course.id === '1' && user?.role === 'student' ? 'cursor-pointer' : ''
            }`}
            onClick={() => handleCourseClick(course)}
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
              
              <button 
                className={`w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${
                  course.id === '1' && user?.role === 'student' ? 'bg-green-600 hover:bg-green-700' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCourseClick(course);
                }}
              >
                {course.id === '1' && user?.role === 'student' 
                  ? (language === 'en' ? 'Explore Research Projects' : '探索研究项目')
                  : course.completed 
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