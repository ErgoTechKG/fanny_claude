'use client';

import React from 'react';
import { MessageSquare, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const userRole = user?.role || 'student';

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-1">{t('dashboard.welcome')}, {user?.name}</h2>
        <p className="text-blue-100">
          {language === 'en' 
            ? `You have ${userRole === 'student' ? '3 upcoming deadlines' : '5 assignments to review'} this week.`
            : `本周您有${userRole === 'student' ? '3个即将到来的截止日期' : '5份作业需要批改'}。`
          }
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: userRole === 'student' ? t('dashboard.activeProjects') : t('instructor.pendingReviews'), 
            value: userRole === 'student' ? '2' : '5',
            color: 'bg-blue-500'
          },
          { 
            title: userRole === 'student' ? t('dashboard.completedProjects') : t('instructor.studentProgress'), 
            value: userRole === 'student' ? '3' : '12',
            color: 'bg-green-500'
          },
          { 
            title: t('dashboard.upcomingDeadlines'), 
            value: userRole === 'student' ? '3' : '2',
            color: 'bg-yellow-500'
          },
          { 
            title: userRole === 'student' ? t('student.nextDeadline') : t('instructor.grantDeadlines'), 
            value: '04/15',
            color: 'bg-purple-500'
          }
        ].map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-l-4 transition-transform hover:scale-105" 
            style={{ borderColor: stat.color.replace('bg-', '') }}
          >
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold mt-2 text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Projects and Timeline section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects list */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              {userRole === 'student' ? t('dashboard.activeProjects') : t('instructor.studentProgress')}
            </h3>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
              {t('dashboard.viewAll')}
            </button>
          </div>
          
          {/* Project items */}
          <div className="space-y-4">
            {[1, 2].map((project) => (
              <div key={project} className="border rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between">
                  <h4 className="font-medium text-gray-800">
                    {language === 'en' 
                      ? `${userRole === 'student' ? 'Project' : 'Student'} ${project}`
                      : `${userRole === 'student' ? '项目' : '学生'} ${project}`
                    }
                  </h4>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {t('dashboard.inProgress')}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  {language === 'en'
                    ? 'This is a brief description of the project or student progress.'
                    : '这是项目或学生进度的简要描述。'
                  }
                </p>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${(project === 1 ? 65 : 40)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>{t('dashboard.progress')}: {project === 1 ? '65%' : '40%'}</span>
                    <span>
                      {language === 'en' 
                        ? `${userRole === 'student' ? t('student.step') : t('instructor.week')} ${project === 1 ? '7' : '4'}/12`
                        : `${userRole === 'student' ? t('student.step') : t('instructor.week')} ${project === 1 ? '7' : '4'}/12`
                      }
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline/Upcoming */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            {t('dashboard.upcomingEvents')}
          </h3>
          
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200"></div>
            
            {[
              { 
                date: '04/07', 
                event: language === 'en' 
                  ? `${userRole === 'student' ? 'Submit weekly report' : 'Review student reports'}`
                  : `${userRole === 'student' ? '提交周报' : '批改学生报告'}`
              },
              { 
                date: '04/10', 
                event: language === 'en' 
                  ? `${userRole === 'student' ? 'Meeting with Prof. Li' : 'Department meeting'}`
                  : `${userRole === 'student' ? '与李教授会面' : '系部会议'}`
              },
              { 
                date: '04/15', 
                event: language === 'en' 
                  ? `${userRole === 'student' ? 'Phase completion deadline' : 'Grant application deadline'}`
                  : `${userRole === 'student' ? '阶段性任务截止日期' : '项目申请截止日期'}`
              }
            ].map((item, index) => (
              <div key={index} className="relative pl-10 pb-8">
                <div className="absolute left-1.5 mt-1.5 rounded-full w-6 h-6 bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                <div className="bg-gray-50 rounded-lg p-3 hover:shadow-md transition">
                  <span className="text-xs font-medium text-gray-500 block">{item.date}</span>
                  <span className="text-sm font-medium text-gray-700 mt-1 block">{item.event}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Research Mentor section */}
      {userRole === 'student' && (
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <MessageSquare size={24} className="text-blue-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {t('student.aiMentorTitle')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('student.aiMentorDesc')}
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                {t('student.askAiMentor')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publish new topic section (for instructors) */}
      {userRole === 'instructor' && (
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-start">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FileText size={24} className="text-green-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {t('instructor.publishTopic')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('instructor.publishTopicDesc')}
              </p>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                {t('instructor.createNewTopic')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 