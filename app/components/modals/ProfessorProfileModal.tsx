'use client';

import React from 'react';
import { X, Mail, Phone, Briefcase, BookOpen, Users, Star } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Professor {
  id: string;
  name: string;
  department?: string;
  email?: string;
  phone?: string;
  office?: string;
  bio?: string;
  expertise?: string[];
  coursesTaught?: { id: string; name: string; code: string }[];
  advisees?: { id: string; name: string; project: string }[];
  avatar?: string; // Optional: if you have avatar images
}

interface ProfessorProfileModalProps {
  professor: Professor | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfessorProfileModal({ professor, isOpen, onClose }: ProfessorProfileModalProps) {
  const { language } = useLanguage();
  const t = (key: string, replacements?: {[key: string]: string | number}) => {
    const texts: { [key: string]: { [lang: string]: string } } = {
      profileTitle: { en: "Professor Profile", zh: "教授信息" },
      department: { en: "Department", zh: "院系" },
      email: { en: "Email", zh: "邮箱" },
      phone: { en: "Phone", zh: "电话" },
      office: { en: "Office", zh: "办公室" },
      bio: { en: "Biography", zh: "个人简介" },
      expertise: { en: "Areas of Expertise", zh: "专业领域" },
      coursesTaught: { en: "Courses Taught", zh: "教授课程" },
      currentAdvisees: { en: "Current Advisees", zh: "指导学生" },
      noInformation: { en: "Not available", zh: "暂无信息" },
      adviseeProject: { en: "Project: {project}", zh: "研究项目: {project}" },
      close: { en: "Close", zh: "关闭" },
    };
    let text = texts[key]?.[language] || texts[key]?.['en'] || key;
    if (replacements) {
      Object.keys(replacements).forEach(rKey => {
        text = text.replace(`{${rKey}}`, String(replacements[rKey]));
      });
    }
    return text;
  };

  if (!isOpen || !professor) return null;

  // Mock details if not provided in professor object - for demonstration
  const displayProfessor = {
    ...professor,
    department: professor.department || t('noInformation'),
    email: professor.email || 'professor.email@example.com',
    phone: professor.phone || '123-456-7890',
    office: professor.office || 'Building A, Room 101',
    bio: professor.bio || (language === 'zh' ? '这是一位经验丰富的教授，在相关领域拥有多年教学和研究经验。' : 'This is an experienced professor with many years of teaching and research in relevant fields.'),
    expertise: professor.expertise || (language === 'zh' ? ['人工智能', '机器学习', '数据科学'] : ['Artificial Intelligence', 'Machine Learning', 'Data Science']),
    coursesTaught: professor.coursesTaught || [
      { id: 'c1', name: language === 'zh' ? '高级算法设计' : 'Advanced Algorithm Design', code: 'CS501' },
      { id: 'c2', name: language === 'zh' ? '计算机网络' : 'Computer Networks', code: 'CS403' },
    ],
    advisees: professor.advisees || [
      { id: 's1', name: '王明', project: language === 'zh' ? '智能推荐系统' : 'Intelligent Recommendation Systems' },
      { id: 's2', name: '李静', project: language === 'zh' ? '自动驾驶技术研究' : 'Autonomous Driving Research' },
    ],
    avatar: professor.avatar || `https://i.pravatar.cc/150?u=${professor.id}`
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out" style={{ opacity: isOpen ? 1 : 0 }}>
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col transform transition-all duration-300 ease-in-out" style={{ transform: isOpen ? 'scale(1)' : 'scale(0.95)' }}>
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white flex justify-between items-center">
          <h3 className="text-2xl font-semibold">{t('profileTitle')}</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-200 transition-colors p-1 rounded-full hover:bg-white/20"
            aria-label={t('close')}
          >
            <X size={28} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-gray-50">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-gray-200">
            <img
              src={displayProfessor.avatar}
              alt={displayProfessor.name}
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover shadow-lg border-4 border-white"
            />
            <div className="text-center sm:text-left pt-2 sm:pt-0">
              <h2 className="text-3xl font-bold text-gray-800">{displayProfessor.name}</h2>
              <p className="text-lg text-indigo-600 font-medium">{displayProfessor.department}</p>
              <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-3 text-sm">
                <span className="flex items-center text-gray-600 bg-gray-200 px-3 py-1 rounded-full">
                  <Mail size={14} className="mr-1.5 text-indigo-500" /> {displayProfessor.email}
                </span>
                <span className="flex items-center text-gray-600 bg-gray-200 px-3 py-1 rounded-full">
                  <Phone size={14} className="mr-1.5 text-indigo-500" /> {displayProfessor.phone}
                </span>
                <span className="flex items-center text-gray-600 bg-gray-200 px-3 py-1 rounded-full">
                  <Briefcase size={14} className="mr-1.5 text-indigo-500" /> {displayProfessor.office}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
                <Star size={20} className="mr-2 text-yellow-500" /> {t('bio')}
              </h4>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line bg-white p-4 rounded-lg shadow-sm">{displayProfessor.bio}</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                <BookOpen size={20} className="mr-2 text-green-500" /> {t('expertise')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {displayProfessor.expertise.map((skill, index) => (
                  <span key={index} className="px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-700 shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                <Users size={20} className="mr-2 text-purple-500" /> {t('coursesTaught')}
              </h4>
              <ul className="space-y-2">
                {displayProfessor.coursesTaught.map(course => (
                  <li key={course.id} className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{course.name}</span>
                    <span className="text-sm text-gray-500 bg-purple-100 px-2 py-0.5 rounded-full">{course.code}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                <Users size={20} className="mr-2 text-teal-500" /> {t('currentAdvisees')}
              </h4>
              {displayProfessor.advisees.length > 0 ? (
                <ul className="space-y-2">
                  {displayProfessor.advisees.map(advisee => (
                    <li key={advisee.id} className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-gray-700 font-medium">{advisee.name}</p>
                      <p className="text-sm text-gray-500">{t('adviseeProject', { project: advisee.project })}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 bg-white p-3 rounded-lg shadow-sm">{t('noInformation')}</p>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-100 border-t border-gray-200 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
} 