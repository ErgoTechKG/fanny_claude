'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Eye, UserPlus, AlertTriangle, CheckCircle } from 'lucide-react';
import ProfessorProfileModal from '../modals/ProfessorProfileModal';
import Pagination from '../common/Pagination';

// Define Professor type (or import if exported from modal)
interface Professor {
  id: string;
  name: string;
  profileLink?: string; // Kept for now, but modal will be primary
  alerts: number;
  lastOnline: string;
  department?: string;
  email?: string;
  phone?: string;
  office?: string;
  bio?: string;
  expertise?: string[];
  coursesTaught?: { id: string; name: string; code: string }[];
  advisees?: { id: string; name: string; project: string }[];
  avatar?: string;
}

// Expanded Mock Data
const generateMockStudents = (count: number): Student[] => {
  const students: Student[] = [];
  const firstNames = ['伟', '芳', '娜', '敏', '静', '磊', '洋', '勇', '杰', '强'];
  const lastNames = ['张', '王', '李', '赵', '刘', '陈', '杨', '黄', '周', '吴'];
  const projects = ['人工智能研究', '机器学习模型', '数据可视化平台', '自然语言处理', '计算机视觉算法', '机器人技术', '区块链应用', '物联网安全', '云计算架构', '边缘计算'];
  for (let i = 1; i <= count; i++) {
    students.push({
      id: `s${i}`,
      name: `${lastNames[i % lastNames.length]}${firstNames[i % firstNames.length]}${i > 10 ? (i % 10) : ''}`,
      project: projects[i % projects.length],
      progress: `${Math.floor(Math.random() * 100)}%`,
      lastOnline: `2024-07-${String(15 + (i % 15)).padStart(2, '0')}`,
      deadlineMissed: Math.random() < 0.2,
      alerts: Math.floor(Math.random() * 3),
    });
  }
  return students;
};

const generateMockProfessors = (count: number): Professor[] => {
  const professors: Professor[] = [];
  const firstNames = ['敏', '凯', '悦', '强', '萍', '波', '芳', '刚', '琳', '军'];
  const lastNames = ['赵', '钱', '孙', '周', '吴', '郑', '王', '冯', '陈', '褚'];
  const departments = ['计算机科学系', '电子工程系', '物理学院', '数学系', '化学学院', '生命科学学院', '机械工程系', '土木工程系', '经济管理学院', '外国语学院'];
  const expertises = ['人工智能', '信号处理', '理论物理', '应用数学', '有机化学', '分子生物学', '机器人控制', '结构力学', '金融工程', '语言学'];

  for (let i = 1; i <= count; i++) {
    const lastName = lastNames[i % lastNames.length];
    const firstName = firstNames[i % firstNames.length];
    const name = `${lastName}${firstName}${i > 10 ? (i % 10) : ''}`;
    professors.push({
      id: `p${i}`,
      name: name,
      profileLink: `/profile/p${i}`,
      alerts: Math.floor(Math.random() * 3),
      lastOnline: `2024-07-${String(20 + (i % 10)).padStart(2, '0')}`,
      department: departments[i % departments.length],
      email: `${lastName.toLowerCase()}${firstName.toLowerCase()}${i}@example.com`,
      bio: `${name}教授专注于${expertises[i % expertises.length]}研究领域，成果卓著。`,
      expertise: [expertises[i % expertises.length], expertises[(i + 1) % expertises.length]],
      coursesTaught: [{ id: `C${i}01`, name: `${expertises[i % expertises.length]}导论`, code: `CS${i}01` }],
      advisees: [{id: `adv${i}01`, name: `学生${i}A`, project: `${expertises[i % expertises.length]}项目`}],
      avatar: `https://i.pravatar.cc/150?u=prof${i}`
    });
  }
  return professors;
};

const mockStudents = generateMockStudents(50); // Generate 50 students
const mockProfessors: Professor[] = generateMockProfessors(50); // Generate 50 professors

const ROLES = ['项目Advisor', '授课教授', '主任教授'];
const ITEMS_PER_PAGE = 5;

export default function AssignRolesModule() {
  const { language } = useLanguage();
  const t = (key: string) => {
    const texts: { [key: string]: { [lang: string]: string } } = {
      assignRolesTitle: { en: 'Assign Roles', zh: '分配角色' },
      studentsList: { en: 'Students List', zh: '学生列表' },
      studentName: { en: 'Name', zh: '姓名' },
      project: { en: 'Project', zh: '项目' },
      progress: { en: 'Progress', zh: '进度' },
      lastOnline: { en: 'Last Online', zh: '最后上线' },
      status: { en: 'Status', zh: '状态' },
      professorsList: { en: 'Professors List', zh: 'Professor列表' },
      professorName: { en: 'Name', zh: '姓名' },
      profile: { en: 'Profile', zh: 'Profile' },
      assignRole: { en: 'Assign Role', zh: '分配角色' },
      noAlerts: { en: 'No Alerts', zh: '无提醒' },
      alerts: { en: 'Alerts', zh: '提醒' },
      deadlineMissed: { en: 'Deadline Missed', zh: '错过Deadline' },
      onTrack: { en: 'On Track', zh: '正常'},
      viewProfile: { en: 'View Profile', zh: '查看Profile' },
    };
    return texts[key]?.[language] || texts[key]?.['en'] || key;
  };

  const [professorRoles, setProfessorRoles] = useState<{[key: string]: string[]}>({});
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);

  // Pagination state for students
  const [currentStudentPage, setCurrentStudentPage] = useState(1);
  // Pagination state for professors
  const [currentProfessorPage, setCurrentProfessorPage] = useState(1);

  // Memoized paginated students
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentStudentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return mockStudents.slice(startIndex, endIndex);
  }, [currentStudentPage]);

  // Memoized paginated professors
  const paginatedProfessors = useMemo(() => {
    const startIndex = (currentProfessorPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return mockProfessors.slice(startIndex, endIndex);
  }, [currentProfessorPage]);

  useEffect(() => {
    // Reset page if language changes and it affects total pages (not really applicable here with static data but good practice)
    setCurrentStudentPage(1);
    setCurrentProfessorPage(1);
  }, [language]);

  const handleRoleChange = (professorId: string, role: string) => {
    setProfessorRoles(prev => {
      const currentRoles = prev[professorId] || [];
      if (currentRoles.includes(role)) {
        return { ...prev, [professorId]: currentRoles.filter(r => r !== role) };
      } else {
        return { ...prev, [professorId]: [...currentRoles, role] };
      }
    });
  };

  const openProfessorProfile = (professor: Professor) => {
    setSelectedProfessor(professor);
    setIsProfileModalOpen(true);
  };

  const closeProfessorProfile = () => {
    setIsProfileModalOpen(false);
    setSelectedProfessor(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('assignRolesTitle')}</h1>

      {/* Students Section */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">{t('studentsList')}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('studentName')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('project')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('progress')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('lastOnline')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedStudents.map(student => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.project}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.progress}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.lastOnline}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {student.deadlineMissed && (
                      <span className="mr-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        <AlertTriangle size={14} className="mr-1" /> {t('deadlineMissed')}
                      </span>
                    )}
                    {student.alerts > 0 && (
                       <span className="mr-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                         <AlertTriangle size={14} className="mr-1" /> {student.alerts} {t('alerts')}
                       </span>
                    )}
                    {!student.deadlineMissed && student.alerts === 0 && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        <CheckCircle size={14} className="mr-1" /> {t('onTrack')}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentStudentPage}
          totalPages={Math.ceil(mockStudents.length / ITEMS_PER_PAGE)}
          onPageChange={setCurrentStudentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={mockStudents.length}
          language={language}
        />
      </div>

      {/* Professors Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">{t('professorsList')}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('professorName')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('lastOnline')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('profile')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('assignRole')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedProfessors.map(professor => (
                <tr key={professor.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{professor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{professor.lastOnline}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {professor.alerts > 0 ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        <AlertTriangle size={14} className="mr-1" /> {professor.alerts} {t('alerts')}
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        <CheckCircle size={14} className="mr-1" /> {t('noAlerts')}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                    <button onClick={() => openProfessorProfile(professor)} className="flex items-center">
                      <Eye size={16} className="mr-1" /> {t('viewProfile')}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-wrap gap-2">
                      {ROLES.map(role => (
                        <button
                          key={role}
                          onClick={() => handleRoleChange(professor.id, role)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-full flex items-center transition-colors
                            ${(professorRoles[professor.id] || []).includes(role)
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                          <UserPlus size={14} className="mr-1.5" />
                          {role}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentProfessorPage}
          totalPages={Math.ceil(mockProfessors.length / ITEMS_PER_PAGE)}
          onPageChange={setCurrentProfessorPage}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={mockProfessors.length}
          language={language}
        />
      </div>

      {/* Professor Profile Modal */}
      <ProfessorProfileModal
        professor={selectedProfessor}
        isOpen={isProfileModalOpen}
        onClose={closeProfessorProfile}
      />
    </div>
  );
} 