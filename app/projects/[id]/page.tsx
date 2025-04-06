'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Calendar, Users, FileText, CheckCircle, Clock, BarChart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

interface ProjectData {
  id: number;
  title: string;
  description: string;
  progress: number;
  step: string;
  isCompleted: boolean;
  startDate?: string;
  endDate?: string;
  supervisor?: string;
  team?: string[];
  // Additional fields for project details
  objectives?: string[];
  methodology?: string;
  outcomes?: string[];
  nextSteps?: string[];
  publications?: string[];
  milestones?: { date: string; title: string; completed: boolean }[];
}

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = parseInt(params.id);
  const isCompleted = searchParams.get('completed') === 'true';
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // In a real application, this data would come from an API
  useEffect(() => {
    // Simulating API fetch delay
    const timer = setTimeout(() => {
      if (isCompleted) {
        if (projectId === 1) {
          setProjectData({
            id: 1,
            title: language === 'en'
              ? 'Oxalate Smart Monitoring Chip Design for Rare Pediatric Disease Treatment'
              : '草酸智能监测芯片设计与儿童罕见病治疗',
            description: language === 'en'
              ? 'This project focuses on monitoring urinary oxalate concentration and personalized diagnostics, combining high-resolution micrometer-level additive manufacturing, electrochemical detection technology, and Lab on chip concepts to develop a portable urinary oxalate concentration detection device paired with an AI smart diagnostic mini-program.'
              : '本项目聚焦于尿液草酸浓度监测及个性化诊疗领域，融合高分辨率微米级增材制造、电化学检测技术与 Lab on chip 理念，开发便携式尿液草酸盐浓度检测设备，并搭配 AI 智能诊断系统小程序，旨在解决当前检测依赖大型仪器、流程繁琐、成本高昂等问题，满足原发性高草酸尿症患者及肾结石患者的诊疗需求，构建健康数据平台生态，提供增值服务',
            progress: 100,
            step: '12',
            isCompleted: true,
            startDate: '01/15/2023',
            endDate: '01/10/2024',
            supervisor: 'Prof. Zhang Wei',
            team: ['Li Mei', 'Wang Chen', 'You'],
            objectives: [
              language === 'en' ? 'Develop a portable urinary oxalate detection device' : '开发便携式尿液草酸盐检测设备',
              language === 'en' ? 'Create an AI diagnostic system for personalized treatment' : '创建人工智能诊断系统，实现个性化治疗',
              language === 'en' ? 'Build a health data platform ecosystem' : '构建健康数据平台生态系统'
            ],
            methodology: language === 'en' 
              ? 'Utilized microfluidic technology combined with electrochemical sensors to develop a Lab-on-chip solution for rapid and accurate oxalate detection. The AI component was built using machine learning models trained on clinical data.'
              : '利用微流控技术结合电化学传感器，开发用于快速准确检测草酸盐的Lab-on-chip解决方案。AI组件是使用基于临床数据训练的机器学习模型构建的。',
            outcomes: [
              language === 'en' ? 'Developed prototype with 95% detection accuracy' : '开发了检测准确率为95%的原型',
              language === 'en' ? 'Successfully integrated with mobile application' : '成功与移动应用程序集成',
              language === 'en' ? 'Published research in Journal of Biomedical Engineering' : '在《生物医学工程杂志》上发表研究'
            ],
            publications: [
              'Zhang et al. (2023). "Portable Microfluidic System for Urinary Oxalate Detection". Journal of Biomedical Engineering, 45(3), 289-302.',
              'Li et al. (2023). "AI-Based Diagnostic Systems for Pediatric Rare Diseases". International Conference on Healthcare Innovations, pp. 156-163.'
            ],
            milestones: [
              { date: '03/15/2023', title: language === 'en' ? 'Initial prototype development' : '初始原型开发', completed: true },
              { date: '06/20/2023', title: language === 'en' ? 'AI algorithm implementation' : 'AI算法实现', completed: true },
              { date: '09/10/2023', title: language === 'en' ? 'Clinical testing phase' : '临床测试阶段', completed: true },
              { date: '12/05/2023', title: language === 'en' ? 'Final product validation' : '最终产品验证', completed: true }
            ]
          });
        } else if (projectId === 2) {
          setProjectData({
            id: 2,
            title: language === 'en'
              ? 'Fitness Exoskeleton Design Based on Human Walking Principles'
              : '基于人体行走原理的健身外骨骼设计',
            description: language === 'en'
              ? 'Walking is a universally accessible form of healthy exercise, but using walking for fitness has limitations such as low exercise efficiency and inadequate muscle stimulation. This self-generating fitness exoskeleton provides resistance during the gait cycle to greatly improve walking exercise effects, with a target cost of around 2000 yuan.'
              : '步行是一种非常具有普适性的健康锻炼方式，但想要依靠步行进行锻炼存在运动效率低，肌肉刺激不到位，投入时间大，燃脂效率低等问题。利用步行外骨骼机器人在步态周期中提供阻力，能够极大改善步行锻炼的效果。通过利用贝叶斯黑盒优化的特点，针对人体需求的生物力学数据建立阻力提供的曲线，具有巨大的科研与应用前景。 我这边提一个"自发电行走健身外骨骼"，希望能够以"走路"的时间成本和接近舒适度，产生"跑步"的新陈代谢消耗，帮助忙碌的都市人群在行走中健身。这个外骨骼几步不需要充电，人体走路就会给外骨骼充电。此外，外骨骼还可以给手机充电，解决人们户外电池焦虑问题。未来成本希望2000元左右',
            progress: 100,
            step: '12',
            isCompleted: true,
            startDate: '03/05/2023',
            endDate: '03/01/2024',
            supervisor: 'Prof. Chen Li',
            team: ['Zhang Min', 'Liu Jian', 'You'],
            objectives: [
              language === 'en' ? 'Design a self-generating fitness exoskeleton' : '设计自发电健身外骨骼',
              language === 'en' ? 'Optimize resistance curves based on biomechanical data' : '基于生物力学数据优化阻力曲线',
              language === 'en' ? 'Develop prototype with phone charging capability' : '开发具有手机充电功能的原型'
            ],
            methodology: language === 'en' 
              ? 'Applied Bayesian black-box optimization to establish optimal resistance curves tailored to human biomechanical needs. The exoskeleton was designed with integrated energy harvesting technology to convert kinetic energy into electrical energy during walking.'
              : '应用贝叶斯黑盒优化建立针对人体生物力学需求的最佳阻力曲线。外骨骼设计集成了能量收集技术，可在行走过程中将动能转换为电能。',
            outcomes: [
              language === 'en' ? 'Achieved 40% increased metabolic consumption compared to regular walking' : '与普通步行相比，实现了40%的新陈代谢消耗增加',
              language === 'en' ? 'Developed working prototype with self-charging capability' : '开发了具有自充电功能的工作原型',
              language === 'en' ? 'Final product cost projection: 2200 yuan' : '最终产品成本预测：2200元'
            ],
            publications: [
              'Chen et al. (2024). "Self-generating Exoskeleton Design for Enhanced Metabolic Activity During Walking". Journal of Human Kinetics, 42(2), 187-199.',
              'Liu et al. (2023). "Energy Harvesting Technology in Wearable Fitness Devices". International Conference on Biomedical Engineering, pp. 423-430.'
            ],
            milestones: [
              { date: '05/15/2023', title: language === 'en' ? 'Biomechanical data collection' : '生物力学数据收集', completed: true },
              { date: '07/30/2023', title: language === 'en' ? 'First prototype development' : '第一个原型开发', completed: true },
              { date: '10/25/2023', title: language === 'en' ? 'Energy harvesting integration' : '能量收集集成', completed: true },
              { date: '02/10/2024', title: language === 'en' ? 'User testing and final optimization' : '用户测试和最终优化', completed: true }
            ]
          });
        }
      } else {
        if (projectId === 1) {
          setProjectData({
            id: 1,
            title: language === 'en' 
              ? 'Piezoelectric Fan Array for Silent and Efficient Cooling Technology'
              : '基于压电风扇阵列的静音高效冷却技术',
            description: language === 'en'
              ? 'Traditional air cooling solutions have issues with noise and energy efficiency. This project studies the cooling effects of piezoelectric fan arrays to provide low-noise, high-efficiency cooling solutions for consumer electronics, data centers, and other applications.'
              : '传统风冷散热方案存在噪音大、能效低等问题，本项目研究压电风扇（Piezoelectric Fans）阵列的冷却效果，提供低噪音、高效散热方案，适用于消费电子、数据中心等应用场景。',
            progress: 65,
            step: '7',
            isCompleted: false,
            startDate: '09/15/2023',
            endDate: '08/30/2024',
            supervisor: 'Prof. Wang Jie',
            team: ['Zhang Lei', 'Li Hui', 'You'],
            objectives: [
              language === 'en' ? 'Design an optimal piezoelectric fan array configuration' : '设计最佳压电风扇阵列配置',
              language === 'en' ? 'Measure noise levels and cooling efficiency' : '测量噪音水平和冷却效率',
              language === 'en' ? 'Develop a prototype for consumer electronics' : '开发用于消费电子产品的原型'
            ],
            methodology: language === 'en' 
              ? 'Using computational fluid dynamics simulations and experimental validation to optimize piezoelectric fan configurations. Testing various array patterns, oscillation frequencies, and power consumption levels to identify optimal cooling solutions.'
              : '使用计算流体力学模拟和实验验证来优化压电风扇配置。测试各种阵列模式、振荡频率和功耗水平，以确定最佳冷却解决方案。',
            nextSteps: [
              language === 'en' ? 'Complete thermal imaging analysis of current prototypes' : '完成当前原型的热成像分析',
              language === 'en' ? 'Develop second-generation prototype with improved efficiency' : '开发效率更高的第二代原型',
              language === 'en' ? 'Prepare preliminary results for mid-year conference' : '为年中会议准备初步结果'
            ],
            milestones: [
              { date: '11/10/2023', title: language === 'en' ? 'Initial design and simulation' : '初始设计和模拟', completed: true },
              { date: '01/20/2024', title: language === 'en' ? 'First prototype development' : '第一个原型开发', completed: true },
              { date: '04/15/2024', title: language === 'en' ? 'Mid-project performance testing' : '项目中期性能测试', completed: false },
              { date: '07/30/2024', title: language === 'en' ? 'Final prototype and documentation' : '最终原型和文档', completed: false }
            ]
          });
        } else if (projectId === 2) {
          setProjectData({
            id: 2,
            title: language === 'en'
              ? 'Ultrasonic Bubble Control System and Computational Model Design'
              : '超声气泡操控系统及计算模型设计',
            description: language === 'en'
              ? 'Bubbles have wide applications in biomedicine, materials science, optics, and fluid mechanics. This project aims to study bubble control principles under ultrasonic action and build experimental devices and computational models to control bubble movement.'
              : '气泡在生物医学、材料科学、光学、流体力学等领域具有广泛应用。例如，在医学领域，超声气泡可用于靶向药物输送、超声造影；在工业应用中，气泡操控技术可优化液体净化、微流控芯片等系统。本项目旨在研究超声作用下气泡的操控原理，并构建可控制气泡运动的实验装置与计算模型。',
            progress: 40,
            step: '4',
            isCompleted: false,
            startDate: '11/01/2023',
            endDate: '10/30/2024',
            supervisor: 'Prof. Liu Hong',
            team: ['Chen Wei', 'Wang Fang', 'You'],
            objectives: [
              language === 'en' ? 'Study bubble behavior under ultrasonic action' : '研究超声作用下的气泡行为',
              language === 'en' ? 'Develop a computational model for bubble movement prediction' : '开发用于气泡运动预测的计算模型',
              language === 'en' ? 'Build an experimental setup for precise bubble control' : '构建用于精确气泡控制的实验装置'
            ],
            methodology: language === 'en' 
              ? 'Combining experimental studies with numerical simulations to understand and predict bubble dynamics under ultrasonic fields. Using high-speed imaging to validate computational models at various frequencies and intensities.'
              : '结合实验研究和数值模拟来理解和预测超声场下的气泡动力学。使用高速成像在各种频率和强度下验证计算模型。',
            nextSteps: [
              language === 'en' ? 'Complete experimental setup for phase 2 testing' : '完成第2阶段测试的实验装置',
              language === 'en' ? 'Refine computational model with experimental data' : '使用实验数据完善计算模型',
              language === 'en' ? 'Prepare progress report for supervisor review' : '准备进度报告供主管审查'
            ],
            milestones: [
              { date: '12/15/2023', title: language === 'en' ? 'Literature review and project planning' : '文献综述和项目规划', completed: true },
              { date: '02/28/2024', title: language === 'en' ? 'Initial computational model development' : '初始计算模型开发', completed: true },
              { date: '05/15/2024', title: language === 'en' ? 'Experimental setup construction' : '实验装置构建', completed: false },
              { date: '09/20/2024', title: language === 'en' ? 'Model validation and final report' : '模型验证和最终报告', completed: false }
            ]
          });
        }
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [projectId, isCompleted, language]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">{t('project.notFound')}</h2>
        <button 
          onClick={() => router.push('/dashboard')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {t('project.backToDashboard')}
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back button and project title header */}
      <div className="mb-8">
        <button 
          onClick={() => router.push('/dashboard')}
          className="flex items-center text-blue-600 hover:text-blue-800 transition mb-4"
        >
          <ArrowLeft className="mr-2" size={18} />
          {t('project.backToDashboard')}
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">{projectData.title}</h1>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${projectData.isCompleted ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
            {projectData.isCompleted ? t('project.completed') : t('project.inProgress')}
          </div>
        </div>
      </div>

      {/* Project info cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-2">
            <Calendar className="text-blue-600 mr-3" size={20} />
            <h3 className="text-gray-700 font-medium">{t('project.timeline')}</h3>
          </div>
          <p className="text-gray-600">
            {projectData.startDate} - {projectData.endDate}
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-2">
            <Users className="text-blue-600 mr-3" size={20} />
            <h3 className="text-gray-700 font-medium">{t('project.team')}</h3>
          </div>
          <p className="text-gray-600">{projectData.team?.join(', ')}</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-2">
            <FileText className="text-blue-600 mr-3" size={20} />
            <h3 className="text-gray-700 font-medium">{t('project.supervisor')}</h3>
          </div>
          <p className="text-gray-600">{projectData.supervisor}</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-2">
            <BarChart className="text-blue-600 mr-3" size={20} />
            <h3 className="text-gray-700 font-medium">{t('project.progress')}</h3>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div 
              className={`${projectData.isCompleted ? 'bg-green-600' : 'bg-blue-600'} h-2.5 rounded-full`}
              style={{ width: `${projectData.progress}%` }}
            ></div>
          </div>
          <p className="text-gray-600">{projectData.progress}% ({t('project.step')} {projectData.step}/12)</p>
        </div>
      </div>

      {/* Tabs for different sections */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="flex border-b">
          {['overview', 'milestones', 'publications'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-4 font-medium text-sm transition ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab(tab)}
            >
              {t(`project.tabs.${tab}`)}
            </button>
          ))}
        </div>
        
        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-bold mb-4">{t('project.overview')}</h2>
              <p className="text-gray-700 mb-6">{projectData.description}</p>
              
              <h3 className="text-lg font-semibold mb-3">{t('project.objectives')}</h3>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                {projectData.objectives?.map((objective, index) => (
                  <li key={index} className="text-gray-700">{objective}</li>
                ))}
              </ul>
              
              <h3 className="text-lg font-semibold mb-3">{t('project.methodology')}</h3>
              <p className="text-gray-700 mb-6">{projectData.methodology}</p>
              
              {projectData.isCompleted ? (
                <>
                  <h3 className="text-lg font-semibold mb-3">{t('project.outcomes')}</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {projectData.outcomes?.map((outcome, index) => (
                      <li key={index} className="text-gray-700">{outcome}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-3">{t('project.nextSteps')}</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {projectData.nextSteps?.map((step, index) => (
                      <li key={index} className="text-gray-700">{step}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
          
          {activeTab === 'milestones' && (
            <div>
              <h2 className="text-xl font-bold mb-4">{t('project.milestones')}</h2>
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200"></div>
                
                {projectData.milestones?.map((milestone, index) => (
                  <div key={index} className="relative pl-10 pb-8 last:pb-0">
                    <div className={`absolute left-1.5 mt-1.5 rounded-full w-6 h-6 ${milestone.completed ? 'bg-green-500' : 'bg-blue-500'} text-white flex items-center justify-center`}>
                      {milestone.completed ? <CheckCircle size={16} /> : <Clock size={16} />}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition">
                      <span className="text-xs font-medium text-gray-500 block">{milestone.date}</span>
                      <span className="text-sm font-medium text-gray-700 mt-1 block">{milestone.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'publications' && (
            <div>
              <h2 className="text-xl font-bold mb-4">{t('project.publications')}</h2>
              {projectData.publications && projectData.publications.length > 0 ? (
                <ul className="space-y-4">
                  {projectData.publications.map((publication, index) => (
                    <li key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition">
                      {publication}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">{t('project.noPublications')}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 