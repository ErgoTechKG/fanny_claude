'use client';

import React from 'react';
import { 
  FileText, 
  Book, 
  ClipboardCheck, 
  Users, 
  MessageSquare, 
  Settings, 
  Globe, 
  LogOut,
  Activity,
  LayoutDashboard,
  Mail,
  MessageCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  toggleLanguage: () => void;
}

export default function Sidebar({ 
  currentSection, 
  setCurrentSection, 
  sidebarOpen, 
  mobileMenuOpen,
  toggleLanguage
}: SidebarProps) {
  const { t, language } = useLanguage();
  const { logout, userRole } = useAuth();
  const currentUserRole = userRole || 'student'; // Default to student if userRole is null
  
  // Navigation items
  const navItems = [
    { id: 'dashboard', icon: <FileText size={20} />, label: t('nav.dashboard'), hideFor: ['admin'] },
    { id: 'courses', icon: <Book size={20} />, label: t('nav.courses'), hideFor: ['instructor'] },
    { id: 'projects', icon: <ClipboardCheck size={20} />, label: t('nav.projects') },
    { id: 'publications', icon: <FileText size={20} />, label: t('nav.publications') },
    { id: 'collaborators', icon: <Users size={20} />, label: t('nav.collaborators'), hideFor: ['admin'] },
    { id: 'aiMentor', icon: <MessageSquare size={20} />, label: t('nav.aiMentor'), hideFor: ['instructor', 'admin'] },
    { 
      id: 'evaluation', 
      icon: <ClipboardCheck size={20} />, 
      label: currentUserRole === 'instructor' 
        ? (language === 'en' ? 'Teaching Quality Evaluation' : '科研教学质量评估') 
        : t('nav.evaluation'),
      hideFor: ['admin']
    },
    { id: 'researchNetwork', icon: <Users size={20} />, label: t('nav.researchNetwork') },
  ];

  // Admin-specific navigation items
  const adminNavItems = [
    { id: 'adminDashboard', icon: <LayoutDashboard size={20} />, label: t('admin.title') },
    { id: 'bulkEmail', icon: <Mail size={20} />, label: language === 'en' ? 'Bulk Email' : '群发邮件' },
    { id: 'messaging', icon: <MessageCircle size={20} />, label: language === 'en' ? 'Private Messages' : '私信功能' },
  ];
  
  return (
    <div 
      className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out bg-gradient-to-b from-blue-700 to-blue-900 text-white lg:translate-x-0 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo and app name */}
        <div className="p-4 flex items-center border-b border-blue-600">
          <img src="https://cdn.elearningindustry.com/wp-content/uploads/2022/02/shutterstock_1112381495.jpg" alt="HUST Logo" className="mr-3 h-10 w-10" />
          <div>
            <h1 className="font-bold text-lg">HUST</h1>
            <p className="text-xs text-blue-200">{language === 'en' ? 'Research Management' : '科研管理系统'}</p>
          </div>
        </div>
        
        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {/* Show admin navigation items only for admin users */}
            {userRole === 'admin' && adminNavItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentSection(item.id)}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                    currentSection === item.id
                      ? 'bg-blue-800 text-white'
                      : 'text-blue-100 hover:bg-blue-800/50'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
            
            {/* Regular navigation items */}
            {navItems
              .filter(item => !item.hideFor || !item.hideFor.includes(currentUserRole))
              .map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentSection(item.id)}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                    currentSection === item.id
                      ? 'bg-blue-800 text-white'
                      : 'text-blue-100 hover:bg-blue-800/50'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Bottom section with settings and logout */}
        <div className="p-4 border-t border-blue-600">
          <button 
            onClick={toggleLanguage} 
            className="flex items-center text-blue-100 hover:text-white mb-4 w-full px-4 py-2 rounded-lg hover:bg-blue-800/50 transition-colors"
          >
            <Globe size={20} className="mr-3" />
            <span>{language === 'en' ? '切换到中文' : 'Switch to English'}</span>
          </button>
          
          <button className="flex items-center text-blue-100 hover:text-white mb-4 w-full px-4 py-2 rounded-lg hover:bg-blue-800/50 transition-colors">
            <Settings size={20} className="mr-3" />
            <span>{t('nav.settings')}</span>
          </button>
          
          <button 
            onClick={logout}
            className="flex items-center text-blue-100 hover:text-white w-full px-4 py-2 rounded-lg hover:bg-blue-800/50 transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            <span>{t('nav.logout')}</span>
          </button>
        </div>
      </div>
    </div>
  );
} 