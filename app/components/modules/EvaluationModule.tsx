'use client';

import React, { useState } from 'react';
import { ClipboardCheck, ChevronDown, ChevronUp, BarChart2, Award, TrendingUp, ArrowRight, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

// Skill category type
interface SkillCategory {
  id: string;
  name: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  skills: Skill[];
}

// Skill type
interface Skill {
  id: string;
  name: {
    en: string;
    zh: string;
  };
  level: number; // 1-5
  description: {
    en: string;
    zh: string;
  };
  recommendedResources?: string[];
}

// Evaluation result type
interface EvaluationResult {
  id: string;
  date: Date;
  overallScore: number;
  categoryScores: {
    [key: string]: number;
  };
}

// Mock skill categories and skills
const mockSkillCategories: SkillCategory[] = [
  {
    id: 'research-methodology',
    name: {
      en: 'Research Methodology',
      zh: '研究方法论',
    },
    description: {
      en: 'Skills related to research design, data collection, and methodological approaches.',
      zh: '与研究设计、数据收集和方法论方法相关的技能。',
    },
    skills: [
      {
        id: 'experimental-design',
        name: {
          en: 'Experimental Design',
          zh: '实验设计',
        },
        level: 4,
        description: {
          en: 'Ability to design rigorous experiments with proper controls and variables.',
          zh: '设计具有适当控制和变量的严格实验的能力。',
        },
        recommendedResources: ['research-methodology-guide'],
      },
      {
        id: 'data-collection',
        name: {
          en: 'Data Collection',
          zh: '数据收集',
        },
        level: 3,
        description: {
          en: 'Proficiency in collecting reliable and valid data using appropriate methods.',
          zh: '使用适当方法收集可靠和有效数据的熟练程度。',
        },
      },
      {
        id: 'sampling-techniques',
        name: {
          en: 'Sampling Techniques',
          zh: '抽样技术',
        },
        level: 2,
        description: {
          en: 'Knowledge and application of proper sampling methods for research.',
          zh: '研究适当抽样方法的知识和应用。',
        },
        recommendedResources: ['research-methodology-guide'],
      },
    ],
  },
  {
    id: 'data-analysis',
    name: {
      en: 'Data Analysis',
      zh: '数据分析',
    },
    description: {
      en: 'Competencies in analyzing, interpreting, and drawing conclusions from research data.',
      zh: '分析、解释和从研究数据中得出结论的能力。',
    },
    skills: [
      {
        id: 'statistical-analysis',
        name: {
          en: 'Statistical Analysis',
          zh: '统计分析',
        },
        level: 3,
        description: {
          en: 'Application of appropriate statistical methods to analyze research data.',
          zh: '应用适当的统计方法分析研究数据。',
        },
      },
      {
        id: 'data-visualization',
        name: {
          en: 'Data Visualization',
          zh: '数据可视化',
        },
        level: 4,
        description: {
          en: 'Creation of clear, informative, and visually appealing representations of data.',
          zh: '创建清晰、信息丰富且视觉吸引力的数据表示。',
        },
      },
      {
        id: 'result-interpretation',
        name: {
          en: 'Result Interpretation',
          zh: '结果解释',
        },
        level: 3,
        description: {
          en: 'Ability to derive meaningful insights and conclusions from analysis results.',
          zh: '从分析结果中获取有意义的见解和结论的能力。',
        },
      },
    ],
  },
  {
    id: 'academic-writing',
    name: {
      en: 'Academic Writing',
      zh: '学术写作',
    },
    description: {
      en: 'Skills in scholarly writing, citation, and research communication.',
      zh: '学术写作、引用和研究交流方面的技能。',
    },
    skills: [
      {
        id: 'paper-structure',
        name: {
          en: 'Paper Structure',
          zh: '论文结构',
        },
        level: 4,
        description: {
          en: 'Organization of research papers with appropriate sections and flow.',
          zh: '使用适当的部分和流程组织研究论文。',
        },
        recommendedResources: ['academic-writing-standards'],
      },
      {
        id: 'citation-practices',
        name: {
          en: 'Citation Practices',
          zh: '引用实践',
        },
        level: 5,
        description: {
          en: 'Proper attribution of sources and adherence to citation standards.',
          zh: '适当归属来源并遵守引用标准。',
        },
      },
      {
        id: 'scientific-language',
        name: {
          en: 'Scientific Language',
          zh: '科学语言',
        },
        level: 3,
        description: {
          en: 'Use of precise, clear, and discipline-appropriate terminology in writing.',
          zh: '在写作中使用精确、清晰和适合学科的术语。',
        },
        recommendedResources: ['academic-writing-standards'],
      },
    ],
  },
  {
    id: 'research-ethics',
    name: {
      en: 'Research Ethics',
      zh: '研究伦理',
    },
    description: {
      en: 'Understanding and application of ethical principles in research.',
      zh: '理解和应用研究中的伦理原则。',
    },
    skills: [
      {
        id: 'ethical-considerations',
        name: {
          en: 'Ethical Considerations',
          zh: '伦理考虑',
        },
        level: 4,
        description: {
          en: 'Identification and addressing of ethical issues in research design and execution.',
          zh: '在研究设计和执行中识别和解决伦理问题。',
        },
        recommendedResources: ['research-ethics-framework'],
      },
      {
        id: 'integrity-practices',
        name: {
          en: 'Integrity Practices',
          zh: '诚信实践',
        },
        level: 5,
        description: {
          en: 'Adherence to principles of honesty, transparency, and accuracy in research.',
          zh: '遵守研究中的诚实、透明和准确性原则。',
        },
      },
      {
        id: 'informed-consent',
        name: {
          en: 'Informed Consent',
          zh: '知情同意',
        },
        level: 3,
        description: {
          en: 'Appropriate procedures for obtaining and documenting informed consent.',
          zh: '获取和记录知情同意的适当程序。',
        },
      },
    ],
  },
];

// Mock evaluation results
const mockEvaluationResults: EvaluationResult[] = [
  {
    id: '1',
    date: new Date('2023-07-01'),
    overallScore: 3.5,
    categoryScores: {
      'research-methodology': 3.2,
      'data-analysis': 3.7,
      'academic-writing': 4.0,
      'research-ethics': 3.2,
    },
  },
  {
    id: '2',
    date: new Date('2023-04-15'),
    overallScore: 3.2,
    categoryScores: {
      'research-methodology': 3.0,
      'data-analysis': 3.3,
      'academic-writing': 3.7,
      'research-ethics': 2.8,
    },
  },
  {
    id: '3',
    date: new Date('2023-01-20'),
    overallScore: 2.8,
    categoryScores: {
      'research-methodology': 2.7,
      'data-analysis': 2.5,
      'academic-writing': 3.3,
      'research-ethics': 2.7,
    },
  },
];

export default function EvaluationModule() {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['research-methodology']);
  const [showPastEvaluations, setShowPastEvaluations] = useState(false);
  
  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };
  
  // Format date to localized string
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Get skill level text
  const getSkillLevelText = (level: number) => {
    if (language === 'en') {
      const levelMap: Record<number, string> = {
        1: 'Novice',
        2: 'Developing',
        3: 'Competent',
        4: 'Proficient',
        5: 'Expert',
      };
      return levelMap[level] || 'Unknown';
    } else {
      const levelMap: Record<number, string> = {
        1: '新手',
        2: '发展中',
        3: '胜任',
        4: '熟练',
        5: '专家',
      };
      return levelMap[level] || '未知';
    }
  };
  
  // Get skill level color
  const getSkillLevelColor = (level: number) => {
    const colorMap: Record<number, string> = {
      1: 'bg-red-100 text-red-800',
      2: 'bg-orange-100 text-orange-800',
      3: 'bg-yellow-100 text-yellow-800',
      4: 'bg-green-100 text-green-800',
      5: 'bg-blue-100 text-blue-800',
    };
    return colorMap[level] || 'bg-gray-100 text-gray-800';
  };
  
  // Calculate overall average skill level
  const overallSkillLevel = mockSkillCategories.reduce((total, category) => {
    const categoryAverage = category.skills.reduce((sum, skill) => sum + skill.level, 0) / category.skills.length;
    return total + categoryAverage;
  }, 0) / mockSkillCategories.length;
  
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{language === 'en' ? 'Research Evaluation' : '研究能力评估'}</h2>
        <p className="text-blue-100">
          {language === 'en' 
            ? 'Track and improve your research skills and competencies'
            : '跟踪和提高您的研究技能和能力'
          }
        </p>
      </div>
      
      {/* Skills overview */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            {language === 'en' ? 'Research Skills Assessment' : '研究技能评估'}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-500">
              {language === 'en' ? 'Overall Level:' : '整体水平:'}
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {overallSkillLevel.toFixed(1)} / 5.0
            </span>
          </div>
        </div>
        
        {/* Skill categories */}
        <div className="space-y-4">
          {mockSkillCategories.map((category) => (
            <div key={category.id} className="border rounded-lg overflow-hidden">
              {/* Category header */}
              <button 
                onClick={() => toggleCategory(category.id)}
                className="w-full px-4 py-3 bg-gray-50 flex justify-between items-center hover:bg-gray-100 transition"
              >
                <div>
                  <h4 className="font-medium text-gray-800">{category.name[language]}</h4>
                  <p className="text-sm text-gray-500">{category.description[language]}</p>
                </div>
                <div className="flex items-center">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800 mr-3">
                    {(category.skills.reduce((sum, skill) => sum + skill.level, 0) / category.skills.length).toFixed(1)} / 5.0
                  </span>
                  {expandedCategories.includes(category.id) ? (
                    <ChevronUp size={20} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </div>
              </button>
              
              {/* Category skills */}
              {expandedCategories.includes(category.id) && (
                <div className="px-4 py-3 space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-medium text-gray-800">{skill.name[language]}</h5>
                          <p className="text-sm text-gray-600">{skill.description[language]}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(skill.level)}`}>
                          {getSkillLevelText(skill.level)}
                        </span>
                      </div>
                      
                      {/* Skill level progress bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        ></div>
                      </div>
                      
                      {/* Recommended resources if any */}
                      {skill.recommendedResources && skill.recommendedResources.length > 0 && (
                        <div className="mt-2">
                          <a 
                            href="#"
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            <BookIcon size={14} className="mr-1" />
                            <span>
                              {language === 'en' 
                                ? `View recommended resources (${skill.recommendedResources.length})` 
                                : `查看推荐资源 (${skill.recommendedResources.length})`
                              }
                            </span>
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Past evaluations */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div 
          className="px-6 py-4 bg-gray-50 flex justify-between items-center cursor-pointer"
          onClick={() => setShowPastEvaluations(!showPastEvaluations)}
        >
          <h3 className="text-lg font-semibold text-gray-800">
            {language === 'en' ? 'Past Evaluations' : '过去的评估'}
          </h3>
          <div>
            {showPastEvaluations ? (
              <ChevronUp size={20} className="text-gray-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-400" />
            )}
          </div>
        </div>
        
        {showPastEvaluations && (
          <div className="p-6">
            <div className="space-y-6">
              {mockEvaluationResults.map((result) => (
                <div key={result.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-800">{formatDate(result.date)}</h4>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {result.overallScore.toFixed(1)} / 5.0
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {Object.entries(result.categoryScores).map(([categoryId, score]) => {
                      const category = mockSkillCategories.find(cat => cat.id === categoryId);
                      if (!category) return null;
                      
                      return (
                        <div key={categoryId} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{category.name[language]}</span>
                          <div className="flex items-center">
                            <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${(score / 5) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium text-gray-700">{score.toFixed(1)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Improvement suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center mr-3">
              <TrendingUp size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {language === 'en' ? 'Areas for Improvement' : '需要改进的领域'}
            </h3>
          </div>
          
          <ul className="space-y-3">
            {mockSkillCategories
              .flatMap(category => category.skills)
              .filter(skill => skill.level < 3)
              .slice(0, 3)
              .map(skill => (
                <li key={skill.id} className="flex items-start">
                  <ArrowRight size={16} className="text-yellow-600 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-800">{skill.name[language]}</span>
                    <p className="text-sm text-gray-600">{skill.description[language]}</p>
                  </div>
                </li>
              ))}
          </ul>
          
          <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center">
            <span>{language === 'en' ? 'View recommended courses' : '查看推荐课程'}</span>
            <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-3">
              <Award size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {language === 'en' ? 'Your Strengths' : '您的优势'}
            </h3>
          </div>
          
          <ul className="space-y-3">
            {mockSkillCategories
              .flatMap(category => category.skills)
              .filter(skill => skill.level >= 4)
              .slice(0, 3)
              .map(skill => (
                <li key={skill.id} className="flex items-start">
                  <ArrowRight size={16} className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-800">{skill.name[language]}</span>
                    <p className="text-sm text-gray-600">{skill.description[language]}</p>
                  </div>
                </li>
              ))}
          </ul>
          
          <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center">
            <span>{language === 'en' ? 'How to leverage your strengths' : '如何利用您的优势'}</span>
            <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
      
      {/* Action section */}
      <div className="bg-blue-50 rounded-xl p-6">
        <div className="flex items-start">
          <div className="mr-4 p-3 bg-blue-100 rounded-full text-blue-700">
            <BarChart2 size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {language === 'en' ? 'Take a New Assessment' : '进行新的评估'}
            </h3>
            <p className="text-gray-600 mb-4">
              {language === 'en'
                ? 'Update your skills evaluation with a comprehensive research competency assessment.'
                : '使用全面的研究能力评估更新您的技能评估。'
              }
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              {language === 'en' ? 'Start Assessment' : '开始评估'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Book icon component
const BookIcon = ({ size = 24, className = "" }) => (
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
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
); 