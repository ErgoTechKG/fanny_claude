'use client';

import React, { useState } from 'react';
import { User, Users, Search, Filter, ChevronDown, Mail, Phone, Briefcase, Award, TrendingUp, BarChart2, MessageSquare, FileText, Link as LinkIcon, Linkedin, Twitter, Github, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

interface Student {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone?: string;
  major: { en: string; zh: string };
  year: number;
  researchArea: { en: string; zh: string };
  currentProject: { en: string; zh: string };
  projectProgress: number;
  academicAdvisor: string;
  publicationsCount: number;
  presentationsCount: number;
  skills: { en: string[]; zh: string[] };
  linkedin?: string;
  twitter?: string;
  github?: string;
  portfolioUrl?: string;
  lastMeeting?: string;
  nextMeeting?: string;
  overallPerformance?: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement';
}

const mockStudents: Student[] = [
  {
    id: 'student1',
    name: 'Wang Xiaoming (王小明)',
    avatar: '',
    email: 'xiaoming.wang@example.com',
    phone: '13812345678',
    major: { en: 'Computer Science', zh: '计算机科学' },
    year: 3,
    researchArea: { en: 'Machine Learning', zh: '机器学习' },
    currentProject: { en: 'Image Recognition for Autonomous Vehicles', zh: '自动驾驶车辆的图像识别' },
    projectProgress: 75,
    academicAdvisor: 'Prof. Li Wei (李伟教授)',
    publicationsCount: 2,
    presentationsCount: 1,
    skills: {
      en: ['Python', 'TensorFlow', 'OpenCV', 'Data Analysis', 'Academic Writing'],
      zh: ['Python', 'TensorFlow', 'OpenCV', '数据分析', '学术写作']
    },
    linkedin: 'https://linkedin.com/in/xiaomingwang',
    github: 'https://github.com/xiaomingwang',
    lastMeeting: '2024-07-15',
    nextMeeting: '2024-07-29',
    overallPerformance: 'good',
  },
  {
    id: 'student2',
    name: 'Li Jing (李静)',
    avatar: '',
    email: 'jing.li@example.com',
    major: { en: 'Electrical Engineering', zh: '电气工程' },
    year: 4,
    researchArea: { en: 'Renewable Energy Systems', zh: '可再生能源系统' },
    currentProject: { en: 'Optimization of Solar Panel Efficiency', zh: '太阳能电池板效率优化' },
    projectProgress: 60,
    academicAdvisor: 'Prof. Zhang Min (张敏教授)',
    publicationsCount: 1,
    presentationsCount: 2,
    skills: {
      en: ['MATLAB', 'Simulink', 'Power Systems', 'Circuit Design'],
      zh: ['MATLAB', 'Simulink', '电力系统', '电路设计']
    },
    linkedin: 'https://linkedin.com/in/jingli',
    lastMeeting: '2024-07-10',
    overallPerformance: 'excellent',
  },
  {
    id: 'student3',
    name: 'Chen Hao (陈浩)',
    avatar: '',
    email: 'hao.chen@example.com',
    major: { en: 'Mechanical Engineering', zh: '机械工程' },
    year: 2,
    researchArea: { en: 'Robotics and Automation', zh: '机器人与自动化' },
    currentProject: { en: 'Development of a Gripper for Delicate Objects', zh: '精密物体抓取器开发' },
    projectProgress: 45,
    academicAdvisor: 'Prof. Wang Fang (王芳教授)',
    publicationsCount: 0,
    presentationsCount: 0,
    skills: {
      en: ['SolidWorks', 'ANSYS', 'C++', 'Control Systems'],
      zh: ['SolidWorks', 'ANSYS', 'C++', '控制系统']
    },
    github: 'https://github.com/haochen',
    nextMeeting: '2024-08-01',
    overallPerformance: 'satisfactory',
  },
  {
    id: 'student4',
    name: 'Zhang Yuting (张雨婷)',
    avatar: '',
    email: 'yuting.zhang@example.com',
    major: { en: 'Biomedical Engineering', zh: '生物医学工程' },
    year: 3,
    researchArea: { en: 'Medical Imaging', zh: '医学影像' },
    currentProject: { en: 'AI-Assisted Diagnosis from MRI Scans', zh: '基于MRI扫描的AI辅助诊断' },
    projectProgress: 85,
    academicAdvisor: 'Prof. Liu Yang (刘洋教授)',
    publicationsCount: 3,
    presentationsCount: 3,
    skills: {
      en: ['Python', 'PyTorch', 'Medical Image Analysis', 'Statistics'],
      zh: ['Python', 'PyTorch', '医学图像分析', '统计学']
    },
    linkedin: 'https://linkedin.com/in/yutingzhang',
    twitter: 'https://twitter.com/yutingzhang',
    lastMeeting: '2024-07-18',
    nextMeeting: '2024-07-25',
    overallPerformance: 'excellent',
  },
];

export default function ResearchStudentsModule() {
  const { language } = useLanguage();
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState<number | string>('all');
  const [filterPerformance, setFilterPerformance] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const performanceText = (performance?: string) => {
    if (!performance) return 'N/A';
    const map = {
      excellent: language === 'en' ? 'Excellent' : '优秀',
      good: language === 'en' ? 'Good' : '良好',
      satisfactory: language === 'en' ? 'Satisfactory' : '一般',
      needs_improvement: language === 'en' ? 'Needs Improvement' : '需改进',
    };
    return map[performance as keyof typeof map] || 'N/A';
  };

  const performanceColor = (performance?: string) => {
    if (!performance) return 'bg-gray-100 text-gray-800';
    const map = {
      excellent: 'bg-green-100 text-green-800',
      good: 'bg-blue-100 text-blue-800',
      satisfactory: 'bg-yellow-100 text-yellow-800',
      needs_improvement: 'bg-red-100 text-red-800',
    };
    return map[performance as keyof typeof map] || 'bg-gray-100 text-gray-800';
  };

  const filteredStudents = mockStudents.filter(student => {
    const nameMatch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const researchAreaMatch = student.researchArea[language].toLowerCase().includes(searchTerm.toLowerCase());
    const projectMatch = student.currentProject[language].toLowerCase().includes(searchTerm.toLowerCase());
    const yearMatch = filterYear === 'all' || student.year === Number(filterYear);
    const performanceMatch = filterPerformance === 'all' || student.overallPerformance === filterPerformance;

    return (nameMatch || emailMatch || researchAreaMatch || projectMatch) && yearMatch && performanceMatch;
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{language === 'en' ? 'Research Students' : '科研学生管理'}</h2>
        <p className="text-purple-100">
          {language === 'en' ? 'Manage and track your research students and their progress.' : '管理和跟踪您的科研学生及其研究进展。'}
        </p>
      </div>

      {/* Filters */} 
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2">
            <label htmlFor="search-students" className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'Search Students' : '搜索学生'}
            </label>
            <div className="relative">
              <input
                type="text"
                id="search-students"
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={language === 'en' ? 'Search by name, email, research area...' : '按姓名、邮箱、研究方向搜索...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
          <div>
            <label htmlFor="filter-year" className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'Filter by Year' : '按年级筛选'}
            </label>
            <select 
              id="filter-year"
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            >
              <option value="all">{language === 'en' ? 'All Years' : '所有年级'}</option>
              {[1, 2, 3, 4, 5].map(year => (
                <option key={year} value={year}>{language === 'en' ? `Year ${year}` : `${year} 年级`}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-performance" className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'Filter by Performance' : '按表现筛选'}
            </label>
            <select 
              id="filter-performance"
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              value={filterPerformance}
              onChange={(e) => setFilterPerformance(e.target.value)}
            >
              <option value="all">{language === 'en' ? 'All Performances' : '所有表现'}</option>
              <option value="excellent">{language === 'en' ? 'Excellent' : '优秀'}</option>
              <option value="good">{language === 'en' ? 'Good' : '良好'}</option>
              <option value="satisfactory">{language === 'en' ? 'Satisfactory' : '一般'}</option>
              <option value="needs_improvement">{language === 'en' ? 'Needs Improvement' : '需改进'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student List */} 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map(student => (
          <div 
            key={student.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => setSelectedStudent(student)}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                {student.avatar ? (
                  <img src={student.avatar} alt={student.name} className="w-16 h-16 rounded-full mr-4 border-2 border-purple-200"/>
                ) : (
                  <div className="w-16 h-16 rounded-full mr-4 border-2 border-purple-200 bg-gray-200 flex items-center justify-center">
                    <User size={32} className="text-gray-500" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-purple-700">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.major[language]} - {language === 'en' ? `Year ${student.year}` : `${student.year} 年级`}</p>
                  <p className="text-xs text-gray-500 mt-1">{student.email}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Briefcase size={14} className="mr-2 text-purple-500" />
                  <span className="text-gray-700 font-medium">{language === 'en' ? 'Research Area:' : '研究方向:'}</span>
                  <span className="text-gray-600 ml-1">{student.researchArea[language]}</span>
                </div>
                <div className="flex items-center">
                  <FileText size={14} className="mr-2 text-purple-500" />
                  <span className="text-gray-700 font-medium">{language === 'en' ? 'Current Project:' : '当前项目:'}</span>
                  <span className="text-gray-600 ml-1 truncate w-40" title={student.currentProject[language]}>{student.currentProject[language]}</span>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{language === 'en' ? 'Project Progress' : '项目进度'}</span>
                    <span>{student.projectProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${student.projectProgress}%` }}></div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Award size={14} className="mr-2 text-purple-500" />
                  <span className="text-gray-700 font-medium">{language === 'en' ? 'Overall Performance:' : '综合表现:'}</span>
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${performanceColor(student.overallPerformance)}`}>
                    {performanceText(student.overallPerformance)}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 px-6 py-3 border-t border-purple-100 text-right">
              <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                {language === 'en' ? 'View Details' : '查看详情'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {language === 'en' ? 'No Students Found' : '未找到学生'}
          </h3>
          <p className="text-gray-500">
            {language === 'en' ? 'Try adjusting your search or filters.' : '请尝试调整搜索或筛选条件。'}
          </p>
        </div>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  {selectedStudent.avatar ? (
                    <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-24 h-24 rounded-full mr-6 border-4 border-purple-300"/>
                  ) : (
                    <div className="w-24 h-24 rounded-full mr-6 border-4 border-purple-300 bg-gray-200 flex items-center justify-center">
                      <User size={48} className="text-gray-500" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-3xl font-bold text-purple-800 mb-1">{selectedStudent.name}</h2>
                    <p className="text-lg text-gray-600">{selectedStudent.major[language]} - {language === 'en' ? `Year ${selectedStudent.year}` : `${selectedStudent.year} 年级`}</p>
                    <p className="text-md text-gray-500 mt-1">{selectedStudent.email}</p>
                    {selectedStudent.phone && <p className="text-md text-gray-500">{selectedStudent.phone}</p>}
                  </div>
                </div>
                <button onClick={() => setSelectedStudent(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={28} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-purple-700 mb-3">{language === 'en' ? 'Research Profile' : '科研档案'}</h4>
                  <div className="space-y-2 text-md">
                    <p><strong className="text-gray-700">{language === 'en' ? 'Area:' : '领域:'}</strong> {selectedStudent.researchArea[language]}</p>
                    <p><strong className="text-gray-700">{language === 'en' ? 'Current Project:' : '当前项目:'}</strong> {selectedStudent.currentProject[language]}</p>
                    <p><strong className="text-gray-700">{language === 'en' ? 'Advisor:' : '导师:'}</strong> {selectedStudent.academicAdvisor}</p>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{language === 'en' ? 'Project Progress' : '项目进度'}</span>
                        <span>{selectedStudent.projectProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${selectedStudent.projectProgress}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-indigo-700 mb-3">{language === 'en' ? 'Academic Performance' : '学术表现'}</h4>
                  <div className="space-y-2 text-md">
                    <p><strong className="text-gray-700">{language === 'en' ? 'Overall:' : '综合评价:'}</strong> 
                      <span className={`ml-1 px-2 py-1 rounded-full text-sm ${performanceColor(selectedStudent.overallPerformance)}`}>
                        {performanceText(selectedStudent.overallPerformance)}
                      </span>
                    </p>
                    <p><strong className="text-gray-700">{language === 'en' ? 'Publications:' : '发表论文:'}</strong> {selectedStudent.publicationsCount}</p>
                    <p><strong className="text-gray-700">{language === 'en' ? 'Presentations:' : '学术报告:'}</strong> {selectedStudent.presentationsCount}</p>
                    <p><strong className="text-gray-700">{language === 'en' ? 'Last Meeting:' : '上次会议:'}</strong> {formatDate(selectedStudent.lastMeeting)}</p>
                    <p><strong className="text-gray-700">{language === 'en' ? 'Next Meeting:' : '下次会议:'}</strong> {formatDate(selectedStudent.nextMeeting)}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-700 mb-3">{language === 'en' ? 'Skills' : '技能掌握'}</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.skills[language].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">{skill}</span>
                  ))}
                </div>
              </div>

              {(selectedStudent.linkedin || selectedStudent.twitter || selectedStudent.github || selectedStudent.portfolioUrl) && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-700 mb-3">{language === 'en' ? 'Online Presence' : '在线资料'}</h4>
                  <div className="flex flex-wrap gap-4">
                    {selectedStudent.linkedin && <a href={selectedStudent.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800"><Linkedin size={20} className="mr-1" /> LinkedIn</a>}
                    {selectedStudent.twitter && <a href={selectedStudent.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center text-sky-500 hover:text-sky-700"><Twitter size={20} className="mr-1" /> Twitter</a>}
                    {selectedStudent.github && <a href={selectedStudent.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-800 hover:text-black"><Github size={20} className="mr-1" /> GitHub</a>}
                    {selectedStudent.portfolioUrl && <a href={selectedStudent.portfolioUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-purple-600 hover:text-purple-800"><LinkIcon size={20} className="mr-1" /> Portfolio</a>}
                  </div>
                </div>
              )}

              <div className="border-t pt-6 mt-6 flex flex-col md:flex-row gap-3">
                <button className="flex-1 py-3 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center text-lg">
                  <MessageSquare size={20} className="mr-2" /> {language === 'en' ? 'Schedule Meeting' : '安排会议'}
                </button>
                <button className="flex-1 py-3 px-6 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition flex items-center justify-center text-lg">
                  <BarChart2 size={20} className="mr-2" /> {language === 'en' ? 'View Full Report' : '查看完整报告'}
                </button>
                <button className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition flex items-center justify-center text-lg">
                  <Mail size={20} className="mr-2" /> {language === 'en' ? 'Send Email' : '发送邮件'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 