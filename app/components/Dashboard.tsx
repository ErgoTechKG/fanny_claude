'use client';

import React, { useState } from 'react';
import { MessageSquare, FileText, X, Calendar, Clock, Upload, Users, VideoIcon, MapPin, Link, CheckCircle, Star, Award, TrendingUp, AlertTriangle, Medal, Download, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const userRole = user?.role || 'student';
  const [showCompletedProjects, setShowCompletedProjects] = useState(false);
  const router = useRouter();
  const [showReportModal, setShowReportModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [reportNotes, setReportNotes] = useState('');
  
  // Certificates data
  interface Certificate {
    id: number;
    title: {
      en: string;
      zh: string;
    };
    issuer: {
      en: string;
      zh: string;
    };
    date: string;
    description: {
      en: string;
      zh: string;
    };
    skills: string[];
    image: string;
    badgeColor: string;
  }
  
  const certificates: Certificate[] = [
    {
      id: 1,
      title: {
        en: 'Advanced Research Methodology',
        zh: '高级研究方法'
      },
      issuer: {
        en: 'HUST Research Institute',
        zh: '华中科技大学研究院'
      },
      date: '2023-02-15',
      description: {
        en: 'Completed advanced training in research methodology, experimental design, and data analysis techniques.',
        zh: '完成了研究方法、实验设计和数据分析技术的高级培训。'
      },
      skills: ['Research Design', 'Data Analysis', 'Statistical Methods'],
      image: 'https://placehold.co/600x400/blue/white?text=Research+Certificate',
      badgeColor: 'blue'
    },
    {
      id: 2,
      title: {
        en: 'Scientific Paper Publication',
        zh: '科学论文发表'
      },
      issuer: {
        en: 'International Journal of Engineering',
        zh: '国际工程杂志'
      },
      date: '2023-05-20',
      description: {
        en: 'Successfully published research findings in a peer-reviewed international journal.',
        zh: '成功在国际同行评审期刊上发表研究成果。'
      },
      skills: ['Academic Writing', 'Research Publication', 'Peer Review Process'],
      image: 'https://placehold.co/600x400/green/white?text=Publication+Certificate',
      badgeColor: 'green'
    },
    {
      id: 3,
      title: {
        en: 'Innovation in Engineering',
        zh: '工程创新'
      },
      issuer: {
        en: 'China Engineering Innovation Council',
        zh: '中国工程创新委员会'
      },
      date: '2023-08-10',
      description: {
        en: 'Recognized for developing innovative solutions in engineering with practical applications.',
        zh: '因开发具有实际应用的工程创新解决方案而获得认可。'
      },
      skills: ['Innovation', 'Problem Solving', 'Engineering Design'],
      image: 'https://placehold.co/600x400/purple/white?text=Innovation+Certificate',
      badgeColor: 'purple'
    }
  ];
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Open certificate details
  const openCertificateDetails = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setShowCertificateModal(true);
  };

  // Evaluation form states
  const [evaluationForm, setEvaluationForm] = useState({
    researchProgress: 3,
    methodology: 4,
    dataQuality: 3,
    analysis: 4,
    initiative: 4,
    comments: ''
  });

  // Handle evaluation form change
  const handleEvaluationChange = (field: string, value: any) => {
    setEvaluationForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle evaluation form submit
  const handleSubmitEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would actually submit the evaluation to your backend
    alert(language === 'en' ? 'Evaluation submitted successfully!' : '评估提交成功！');
    setShowEvaluationModal(false);
  };

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

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReportFile(e.target.files[0]);
    }
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would actually submit the report to your backend
    alert(language === 'en' ? 'Report submitted successfully!' : '报告提交成功！');
    setShowReportModal(false);
    setReportFile(null);
    setReportNotes('');
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
                id: 1,
                date: '04/07', 
                event: language === 'en' 
                  ? `${userRole === 'student' ? 'Submit weekly report' : 'Review student reports'}`
                  : `${userRole === 'student' ? '提交周报' : '批改学生报告'}`,
                onClick: userRole === 'student' ? () => setShowReportModal(true) : undefined
              },
              { 
                id: 2,
                date: '04/10', 
                event: language === 'en' 
                  ? `${userRole === 'student' ? 'Meeting with Prof. Li' : 'Department meeting'}`
                  : `${userRole === 'student' ? '与李教授会面' : '系部会议'}`,
                onClick: userRole === 'student' ? () => setShowMeetingModal(true) : undefined
              },
              { 
                id: 3,
                date: '04/15', 
                event: language === 'en' 
                  ? `${userRole === 'student' ? 'Research Project Evaluation' : 'Grant application deadline'}`
                  : `${userRole === 'student' ? '科研项目导师评估' : '项目申请截止日期'}`,
                onClick: userRole === 'student' ? () => setShowEvaluationModal(true) : undefined
              }
            ].map((item, index) => (
              <div key={item.id} className="relative pl-10 pb-8">
                <div className="absolute left-1.5 mt-1.5 rounded-full w-6 h-6 bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                <div 
                  className={`bg-gray-50 rounded-lg p-3 hover:shadow-md transition ${item.onClick ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                  onClick={item.onClick}
                >
                  <span className="text-xs font-medium text-gray-500 block">{item.date}</span>
                  <span className="text-sm font-medium text-gray-700 mt-1 block">{item.event}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificates Section */}
      {userRole === 'student' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              {language === 'en' ? 'Earned Certificates' : '获得的证书'}
            </h3>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
              {language === 'en' ? 'View All' : '查看全部'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificates.map((certificate) => (
              <div 
                key={certificate.id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer"
                onClick={() => openCertificateDetails(certificate)}
              >
                <div className={`h-3 bg-${certificate.badgeColor}-500`}></div>
                <div className="p-5">
                  <div className="flex items-start">
                    <div className={`p-2 bg-${certificate.badgeColor}-100 rounded-full mr-3`}>
                      <Medal size={20} className={`text-${certificate.badgeColor}-600`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">{certificate.title[language]}</h4>
                      <p className="text-sm text-gray-500">{certificate.issuer[language]}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-500">
                    {language === 'en' ? 'Issued on' : '发布于'}: {formatDate(certificate.date)}
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {certificate.skills.slice(0, 2).map((skill, index) => (
                      <span 
                        key={index}
                        className={`px-2 py-1 text-xs rounded-full bg-${certificate.badgeColor}-50 text-${certificate.badgeColor}-700`}
                      >
                        {skill}
                      </span>
                    ))}
                    {certificate.skills.length > 2 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                        +{certificate.skills.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Research Mentor section */}
      {userRole === 'student' && (
        <div 
          className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500 cursor-pointer hover:shadow-md transition"
          onClick={() => window.dispatchEvent(new CustomEvent('switchModule', { detail: { module: 'aiMentor' } }))}
        >
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
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent duplicate events
                  window.dispatchEvent(new CustomEvent('switchModule', { detail: { module: 'aiMentor' } }));
                }}
              >
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

      {/* Weekly Report Submission Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                {language === 'en' ? 'Weekly Report Submission' : '周报提交'}
              </h3>
              <button onClick={() => setShowReportModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmitReport} className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Report Title' : '报告标题'}
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={language === 'en' ? 'Weekly Progress Report - Week 12' : '周进度报告 - 第12周'}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Upload Report' : '上传报告'}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {!reportFile ? (
                      <div>
                        <Upload size={36} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-sm text-gray-500 mb-2">
                          {language === 'en' 
                            ? 'Drag and drop your file here, or click to browse' 
                            : '拖放文件到这里，或点击浏览'
                          }
                        </p>
                        <p className="text-xs text-gray-400">
                          {language === 'en' ? 'Supports PDF, DOC, DOCX up to 10MB' : '支持PDF、DOC、DOCX格式，最大10MB'}
                        </p>
                        <input 
                          type="file" 
                          id="report-file" 
                          className="hidden" 
                          accept=".pdf,.doc,.docx"
                          onChange={handleUploadChange}
                        />
                        <button 
                          type="button"
                          onClick={() => document.getElementById('report-file')?.click()}
                          className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                        >
                          {language === 'en' ? 'Select File' : '选择文件'}
                        </button>
                      </div>
                    ) : (
                      <div>
                        <FileText size={36} className="mx-auto text-blue-500 mb-4" />
                        <p className="text-sm font-medium text-gray-700 mb-2">{reportFile.name}</p>
                        <p className="text-xs text-gray-500">
                          {(reportFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <button 
                          type="button"
                          onClick={() => setReportFile(null)}
                          className="mt-4 px-4 py-2 border border-red-500 text-red-500 text-sm rounded-lg hover:bg-red-50 transition"
                        >
                          {language === 'en' ? 'Remove' : '移除'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Additional Notes' : '附加说明'}
                  </label>
                  <textarea 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder={language === 'en' ? 'Any challenges or achievements to highlight...' : '需要强调的任何挑战或成就...'}
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  type="button" 
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  {language === 'en' ? 'Cancel' : '取消'}
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  disabled={!reportFile}
                >
                  {language === 'en' ? 'Submit Report' : '提交报告'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Meeting with Prof. Li Modal */}
      {showMeetingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                {language === 'en' ? 'Meeting with Prof. Li' : '与李教授会面'}
              </h3>
              <button onClick={() => setShowMeetingModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Calendar size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      {language === 'en' ? 'Date & Time' : '日期和时间'}
                    </h4>
                    <p className="text-base font-medium">
                      April 10, 2023 • 10:00 AM - 11:00 AM
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <Users size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      {language === 'en' ? 'Participants' : '参与者'}
                    </h4>
                    <p className="text-base font-medium">
                      {user?.name}, Prof. Li Wei, Zhang Mei (TA)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-4">
                    <VideoIcon size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      {language === 'en' ? 'Meeting Type' : '会议类型'}
                    </h4>
                    <p className="text-base font-medium">
                      {language === 'en' ? 'Hybrid (In-person & Zoom)' : '混合式（线下和Zoom）'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-100 p-2 rounded-full mr-4">
                    <MapPin size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      {language === 'en' ? 'Location' : '地点'}
                    </h4>
                    <p className="text-base font-medium">
                      {language === 'en' ? 'Building A, Room 305' : 'A楼305室'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Link size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      {language === 'en' ? 'Zoom Link' : 'Zoom链接'}
                    </h4>
                    <a href="#" className="text-base font-medium text-blue-600 hover:text-blue-800">
                      https://hust-edu.zoom.us/j/123456789
                    </a>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Meeting Agenda' : '会议议程'}
                  </h4>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600">
                    <li>{language === 'en' ? 'Progress update on research project' : '研究项目进展更新'}</li>
                    <li>{language === 'en' ? 'Discussion of experimental results' : '实验结果讨论'}</li>
                    <li>{language === 'en' ? 'Planning for next phase' : '下一阶段计划'}</li>
                    <li>{language === 'en' ? 'Publication timeline' : '发表时间线'}</li>
                  </ol>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-700 mb-2">
                    {language === 'en' ? 'Preparation Required' : '需要准备'}
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-blue-600">
                    <li>{language === 'en' ? 'Bring latest experimental data' : '带上最新的实验数据'}</li>
                    <li>{language === 'en' ? 'Prepare slides for progress update (5-7 slides)' : '准备进度更新幻灯片（5-7张）'}</li>
                    <li>{language === 'en' ? 'Draft of methods section for review' : '方法部分的草稿供审查'}</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button 
                  className="px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition"
                >
                  {language === 'en' ? 'Reschedule' : '重新安排'}
                </button>
                <div className="space-x-3">
                  <button 
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    onClick={() => setShowMeetingModal(false)}
                  >
                    {language === 'en' ? 'Close' : '关闭'}
                  </button>
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    {language === 'en' ? 'Add to Calendar' : '添加到日历'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Research Project Evaluation Modal */}
      {showEvaluationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                {language === 'en' ? 'Research Project Evaluation' : '科研项目导师评估'}
              </h3>
              <button onClick={() => setShowEvaluationModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmitEvaluation} className="p-6">
              <div className="space-y-8">
                {/* Project and student information */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        {language === 'en' ? 'Project' : '项目'}
                      </h4>
                      <p className="text-base font-medium text-gray-800">
                        {language === 'en' 
                          ? 'Piezoelectric Fan Array for Silent and Efficient Cooling Technology' 
                          : '基于压电风扇阵列的静音高效冷却技术'}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        {language === 'en' ? 'Student' : '学生'}
                      </h4>
                      <p className="text-base font-medium text-gray-800">{user?.name}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        {language === 'en' ? 'Supervisor' : '导师'}
                      </h4>
                      <p className="text-base font-medium text-gray-800">Prof. Wang Jie</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        {language === 'en' ? 'Evaluation Period' : '评估周期'}
                      </h4>
                      <p className="text-base font-medium text-gray-800">
                        Jan 15, 2023 - Apr 15, 2023
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Evaluation criteria */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    {language === 'en' ? 'Research Performance' : '研究表现'}
                  </h4>
                  
                  {/* Research Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        {language === 'en' ? 'Research Progress' : '研究进度'}
                        <span className="ml-1 text-xs text-gray-500">
                          {language === 'en' ? '(1-5 scale)' : '(1-5分)'}
                        </span>
                      </label>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => handleEvaluationChange('researchProgress', rating)}
                            className={`w-8 h-8 rounded-full mx-0.5 flex items-center justify-center ${
                              evaluationForm.researchProgress >= rating 
                                ? 'bg-yellow-400 text-white' 
                                : 'bg-gray-200 text-gray-400'
                            }`}
                          >
                            <Star size={16} fill={evaluationForm.researchProgress >= rating ? 'currentColor' : 'none'} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">
                      {language === 'en' 
                        ? 'Evaluate the student\'s progress relative to project timeline and milestones.' 
                        : '评估学生相对于项目时间表和里程碑的进度。'}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-yellow-400 h-1.5 rounded-full" 
                        style={{ width: `${(evaluationForm.researchProgress / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Research Methodology */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        {language === 'en' ? 'Research Methodology' : '研究方法'}
                        <span className="ml-1 text-xs text-gray-500">
                          {language === 'en' ? '(1-5 scale)' : '(1-5分)'}
                        </span>
                      </label>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => handleEvaluationChange('methodology', rating)}
                            className={`w-8 h-8 rounded-full mx-0.5 flex items-center justify-center ${
                              evaluationForm.methodology >= rating 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-200 text-gray-400'
                            }`}
                          >
                            <Star size={16} fill={evaluationForm.methodology >= rating ? 'currentColor' : 'none'} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">
                      {language === 'en' 
                        ? 'Assess the appropriateness and rigor of research methods employed.' 
                        : '评估所采用研究方法的适当性和严谨性。'}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full" 
                        style={{ width: `${(evaluationForm.methodology / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Data Quality and Management */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        {language === 'en' ? 'Data Quality and Management' : '数据质量与管理'}
                        <span className="ml-1 text-xs text-gray-500">
                          {language === 'en' ? '(1-5 scale)' : '(1-5分)'}
                        </span>
                      </label>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => handleEvaluationChange('dataQuality', rating)}
                            className={`w-8 h-8 rounded-full mx-0.5 flex items-center justify-center ${
                              evaluationForm.dataQuality >= rating 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-200 text-gray-400'
                            }`}
                          >
                            <Star size={16} fill={evaluationForm.dataQuality >= rating ? 'currentColor' : 'none'} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">
                      {language === 'en' 
                        ? 'Evaluate the quality, organization, and documentation of research data.' 
                        : '评估研究数据的质量、组织和文档记录。'}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-green-500 h-1.5 rounded-full" 
                        style={{ width: `${(evaluationForm.dataQuality / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Analysis and Interpretation */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        {language === 'en' ? 'Analysis and Interpretation' : '分析与解释'}
                        <span className="ml-1 text-xs text-gray-500">
                          {language === 'en' ? '(1-5 scale)' : '(1-5分)'}
                        </span>
                      </label>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => handleEvaluationChange('analysis', rating)}
                            className={`w-8 h-8 rounded-full mx-0.5 flex items-center justify-center ${
                              evaluationForm.analysis >= rating 
                                ? 'bg-purple-500 text-white' 
                                : 'bg-gray-200 text-gray-400'
                            }`}
                          >
                            <Star size={16} fill={evaluationForm.analysis >= rating ? 'currentColor' : 'none'} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">
                      {language === 'en' 
                        ? 'Assess ability to analyze data and draw meaningful conclusions.' 
                        : '评估分析数据并得出有意义结论的能力。'}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-purple-500 h-1.5 rounded-full" 
                        style={{ width: `${(evaluationForm.analysis / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Initiative and Independence */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        {language === 'en' ? 'Initiative and Independence' : '主动性与独立性'}
                        <span className="ml-1 text-xs text-gray-500">
                          {language === 'en' ? '(1-5 scale)' : '(1-5分)'}
                        </span>
                      </label>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => handleEvaluationChange('initiative', rating)}
                            className={`w-8 h-8 rounded-full mx-0.5 flex items-center justify-center ${
                              evaluationForm.initiative >= rating 
                                ? 'bg-orange-500 text-white' 
                                : 'bg-gray-200 text-gray-400'
                            }`}
                          >
                            <Star size={16} fill={evaluationForm.initiative >= rating ? 'currentColor' : 'none'} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">
                      {language === 'en' 
                        ? 'Rate the student\'s self-direction and ability to work independently.' 
                        : '评估学生的自我指导和独立工作的能力。'}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-orange-500 h-1.5 rounded-full" 
                        style={{ width: `${(evaluationForm.initiative / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {/* Overall evaluation summary */}
                <div>
                  <div className="flex items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {language === 'en' ? 'Overall Evaluation' : '总体评估'}
                    </h4>
                    <div className="ml-4 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 flex items-center">
                      <Award size={16} className="mr-1" />
                      <span>
                        {language === 'en' ? 'Good Progress' : '进展良好'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 p-3 rounded-lg flex items-center">
                      <CheckCircle size={20} className="text-green-600 mr-2" />
                      <div>
                        <h5 className="text-sm font-medium text-green-800">
                          {language === 'en' ? 'Strengths' : '优势'}
                        </h5>
                        <p className="text-xs text-green-700">
                          {language === 'en' 
                            ? 'Excellent experimental design and data collection' 
                            : '出色的实验设计和数据收集'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 p-3 rounded-lg flex items-center">
                      <TrendingUp size={20} className="text-amber-600 mr-2" />
                      <div>
                        <h5 className="text-sm font-medium text-amber-800">
                          {language === 'en' ? 'Growth Areas' : '成长领域'}
                        </h5>
                        <p className="text-xs text-amber-700">
                          {language === 'en'
                            ? 'Further development in data visualization'
                            : '数据可视化方面的进一步发展'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start mb-2">
                      <AlertTriangle size={20} className="text-amber-500 mr-2 mt-0.5" />
                      <h5 className="text-sm font-medium text-gray-700">
                        {language === 'en' ? 'Action Items for Next Phase' : '下一阶段行动项目'}
                      </h5>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 pl-6">
                      <li>{language === 'en' ? 'Refine computational fluid dynamics model' : '完善计算流体动力学模型'}</li>
                      <li>{language === 'en' ? 'Conduct comparative analysis with conventional cooling solutions' : '与传统冷却解决方案进行比较分析'}</li>
                      <li>{language === 'en' ? 'Prepare preliminary results for mid-year symposium' : '为年中研讨会准备初步结果'}</li>
                    </ul>
                  </div>
                </div>
                
                {/* Comments */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Additional Comments and Feedback' : '其他评论和反馈'}
                  </label>
                  <textarea 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder={language === 'en' ? 'Provide any additional feedback or observations...' : '提供任何其他反馈或观察...'}
                    value={evaluationForm.comments}
                    onChange={(e) => handleEvaluationChange('comments', e.target.value)}
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button 
                  type="button"
                  onClick={() => setShowEvaluationModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  {language === 'en' ? 'Cancel' : '取消'}
                </button>
                <div className="space-x-3">
                  <button 
                    type="button"
                    className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                  >
                    {language === 'en' ? 'Save Draft' : '保存草稿'}
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    {language === 'en' ? 'Submit Evaluation' : '提交评估'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certificate Details Modal */}
      {showCertificateModal && selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                {language === 'en' ? 'Certificate Details' : '证书详情'}
              </h3>
              <button onClick={() => setShowCertificateModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Certificate image */}
                <div className="border rounded-lg overflow-hidden">
                  <div className={`h-4 bg-${selectedCertificate.badgeColor}-500`}></div>
                  <div className="p-4 bg-gray-50 flex justify-center">
                    <div className="bg-white p-4 border rounded-lg shadow-sm max-w-xs w-full">
                      <div className="flex justify-center mb-4">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center bg-${selectedCertificate.badgeColor}-100`}>
                          <Medal size={40} className={`text-${selectedCertificate.badgeColor}-600`} />
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <h4 className="text-lg font-semibold mb-1">{selectedCertificate.title[language]}</h4>
                        <p className="text-sm text-gray-600 mb-3">{selectedCertificate.issuer[language]}</p>
                        
                        <div className="w-full h-px bg-gray-200 my-4"></div>
                        
                        <p className="text-xs text-gray-500 mb-2">{language === 'en' ? 'Awarded to' : '授予'}</p>
                        <p className="text-base font-medium mb-4">{user?.name}</p>
                        
                        <div className="w-full h-px bg-gray-200 my-4"></div>
                        
                        <p className="text-xs text-gray-500 mb-2">{language === 'en' ? 'Issue Date' : '颁发日期'}</p>
                        <p className="text-sm">{formatDate(selectedCertificate.date)}</p>
                        
                        <div className="w-full h-px bg-gray-200 my-4"></div>
                        
                        <div className="flex justify-center mt-4">
                          <div className={`px-3 py-1 rounded-full bg-${selectedCertificate.badgeColor}-100 text-${selectedCertificate.badgeColor}-700 text-xs flex items-center`}>
                            <CheckCircle size={14} className="mr-1" />
                            {language === 'en' ? 'Verified' : '已验证'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Certificate details */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {selectedCertificate.title[language]}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {selectedCertificate.description[language]}
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Skills & Competencies' : '技能和能力'}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedCertificate.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className={`px-2 py-1 text-xs rounded-full bg-${selectedCertificate.badgeColor}-50 text-${selectedCertificate.badgeColor}-700`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Issuing Organization' : '颁发机构'}
                    </h5>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <span className="text-gray-800">{selectedCertificate.issuer[language]}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {language === 'en' 
                        ? 'This certificate is verifiable and has been issued by an accredited institution.' 
                        : '此证书可验证，并已由认可机构颁发。'
                      }
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="text-sm font-medium text-gray-700 mb-3">
                      {language === 'en' ? 'Certificate ID' : '证书ID'}
                    </h5>
                    <p className="text-xs text-gray-500 font-mono">
                      HUST-CERT-{selectedCertificate.id}-{new Date(selectedCertificate.date).getFullYear()}-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
                      <Download size={16} className="mr-2" />
                      {language === 'en' ? 'Download' : '下载'}
                    </button>
                    <button className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center justify-center">
                      <ExternalLink size={16} className="mr-2" />
                      {language === 'en' ? 'Verify' : '验证'}
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