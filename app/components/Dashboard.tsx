'use client';

import React, { useState } from 'react';
import { MessageSquare, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const userRole = user?.role || 'student';
  const [showCompletedProjects, setShowCompletedProjects] = useState(false);
  const router = useRouter();

  const activeProjects = [
    {
      id: 1,
      title: language === 'en' 
        ? 'Piezoelectric Fan Array for Silent and Efficient Cooling Technology'
        : '基于压电风扇阵列的静音高效冷却技术',
      description: language === 'en'
        ? 'Traditional air cooling solutions have issues with noise and energy efficiency. This project studies the cooling effects of piezoelectric fan arrays to provide low-noise, high-efficiency cooling solutions for consumer electronics, data centers, and other applications.'
        : '传统风冷散热方案存在噪音大、能效低等问题，本项目研究压电风扇（Piezoelectric Fans）阵列的冷却效果，提供低噪音、高效散热方案，适用于消费电子、数据中心等应用场景。',
      progress: 65,
      step: '7'
    },
    {
      id: 2,
      title: language === 'en'
        ? 'Ultrasonic Bubble Control System and Computational Model Design'
        : '超声气泡操控系统及计算模型设计',
      description: language === 'en'
        ? 'Bubbles have wide applications in biomedicine, materials science, optics, and fluid mechanics. This project aims to study bubble control principles under ultrasonic action and build experimental devices and computational models to control bubble movement.'
        : '气泡在生物医学、材料科学、光学、流体力学等领域具有广泛应用。例如，在医学领域，超声气泡可用于靶向药物输送、超声造影；在工业应用中，气泡操控技术可优化液体净化、微流控芯片等系统。本项目旨在研究超声作用下气泡的操控原理，并构建可控制气泡运动的实验装置与计算模型。',
      progress: 40,
      step: '4'
    }
  ];

  const completedProjects = [
    {
      id: 1,
      title: language === 'en'
        ? 'Oxalate Smart Monitoring Chip Design for Rare Pediatric Disease Treatment'
        : '草酸智能监测芯片设计与儿童罕见病治疗',
      description: language === 'en'
        ? 'This project focuses on monitoring urinary oxalate concentration and personalized diagnostics, combining high-resolution micrometer-level additive manufacturing, electrochemical detection technology, and Lab on chip concepts to develop a portable urinary oxalate concentration detection device paired with an AI smart diagnostic mini-program.'
        : '本项目聚焦于尿液草酸浓度监测及个性化诊疗领域，融合高分辨率微米级增材制造、电化学检测技术与 Lab on chip 理念，开发便携式尿液草酸盐浓度检测设备，并搭配 AI 智能诊断系统小程序，旨在解决当前检测依赖大型仪器、流程繁琐、成本高昂等问题，满足原发性高草酸尿症患者及肾结石患者的诊疗需求，构建健康数据平台生态，提供增值服务',
      progress: 100,
      step: '12'
    },
    {
      id: 2,
      title: language === 'en'
        ? 'Fitness Exoskeleton Design Based on Human Walking Principles'
        : '基于人体行走原理的健身外骨骼设计',
      description: language === 'en'
        ? 'Walking is a universally accessible form of healthy exercise, but using walking for fitness has limitations such as low exercise efficiency and inadequate muscle stimulation. This self-generating fitness exoskeleton provides resistance during the gait cycle to greatly improve walking exercise effects, with a target cost of around 2000 yuan.'
        : '步行是一种非常具有普适性的健康锻炼方式，但想要依靠步行进行锻炼存在运动效率低，肌肉刺激不到位，投入时间大，燃脂效率低等问题。利用步行外骨骼机器人在步态周期中提供阻力，能够极大改善步行锻炼的效果。通过利用贝叶斯黑盒优化的特点，针对人体需求的生物力学数据建立阻力提供的曲线，具有巨大的科研与应用前景。 我这边提一个"自发电行走健身外骨骼"，希望能够以"走路"的时间成本和接近舒适度，产生"跑步"的新陈代谢消耗，帮助忙碌的都市人群在行走中健身。这个外骨骼几步不需要充电，人体走路就会给外骨骼充电。此外，外骨骼还可以给手机充电，解决人们户外电池焦虑问题。未来成本希望2000元左右',
      progress: 100,
      step: '12'
    }
  ];

  const displayedProjects = showCompletedProjects ? completedProjects : activeProjects;

  const handleProjectClick = (projectId: number, isCompleted: boolean) => {
    // Store project info in sessionStorage to be retrieved by the ProjectsModule
    sessionStorage.setItem('selectedProject', JSON.stringify({
      id: projectId.toString(), // Convert to string to match ProjectsModule expectations
      isCompleted: isCompleted
    }));
    
    // Use a custom event to notify ResearchApp to switch modules instead of router.push
    // which would attempt a full page navigation
    window.dispatchEvent(new CustomEvent('switchModule', { detail: { module: 'projects' } }));
  };

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
            color: 'bg-blue-500',
            onClick: () => userRole === 'student' && setShowCompletedProjects(false)
          },
          { 
            title: userRole === 'student' ? t('dashboard.completedProjects') : t('instructor.studentProgress'), 
            value: userRole === 'student' ? '3' : '12',
            color: 'bg-green-500',
            onClick: () => userRole === 'student' && setShowCompletedProjects(true) 
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
            className={`bg-white rounded-xl shadow-sm p-6 border-t-4 border-l-4 transition-transform hover:scale-105 ${stat.onClick ? 'cursor-pointer' : ''}`}
            style={{ borderColor: stat.color.replace('bg-', '') }}
            onClick={stat.onClick}
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
              {userRole === 'student' 
                ? (showCompletedProjects ? t('dashboard.completedProjects') : t('dashboard.activeProjects'))
                : t('instructor.studentProgress')
              }
            </h3>
            <button 
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
              onClick={() => userRole === 'student' && setShowCompletedProjects(!showCompletedProjects)}
            >
              {userRole === 'student'
                ? (showCompletedProjects ? t('dashboard.viewActiveProjects') : t('dashboard.viewCompletedProjects'))
                : t('dashboard.viewAll')
              }
            </button>
          </div>
          
          {/* Project items */}
          <div className="space-y-4">
            {displayedProjects.map((project) => (
              <div 
                key={project.id} 
                className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer" 
                onClick={() => handleProjectClick(project.id, showCompletedProjects)}
              >
                <div className="flex justify-between">
                  <h4 className="font-medium text-gray-800">
                    {language === 'en' 
                      ? `${userRole === 'student' ? project.title : 'Student ' + project.id}`
                      : `${userRole === 'student' ? project.title : '学生 ' + project.id}`
                    }
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${showCompletedProjects ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {showCompletedProjects ? t('dashboard.completed') : t('dashboard.inProgress')}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  {userRole === 'student' ? project.description : (
                    language === 'en'
                      ? 'This is a brief description of the project or student progress.'
                      : '这是项目或学生进度的简要描述。'
                  )}
                </p>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`${showCompletedProjects ? 'bg-green-600' : 'bg-blue-600'} h-2.5 rounded-full`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>{t('dashboard.progress')}: {project.progress}%</span>
                    <span>
                      {language === 'en' 
                        ? `${userRole === 'student' ? t('student.step') : t('instructor.week')} ${project.step}/12`
                        : `${userRole === 'student' ? t('student.step') : t('instructor.week')} ${project.step}/12`
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