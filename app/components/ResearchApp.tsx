'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Login from './Login';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import CoursesModule from './modules/CoursesModule';
import ProjectsModule from './modules/ProjectsModule';
import PublicationsModule from './modules/PublicationsModule';
import CollaboratorsModule from './modules/CollaboratorsModule';
import AiMentorModule from './modules/AiMentorModule';
import EvaluationModule from './modules/EvaluationModule';
import ResearchNetworkModule from './modules/ResearchNetworkModule';
import AdminDashboardModule from './modules/AdminDashboardModule';

export default function ResearchApp() {
  const { isAuthenticated } = useAuth();
  const { language, setLanguage } = useLanguage();

  // State for UI
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('dashboard');

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <Login />;
  }

  // Get the appropriate module component based on currentSection
  const getModuleComponent = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <CoursesModule />;
      case 'projects':
        return <ProjectsModule />;
      case 'publications':
        return <PublicationsModule />;
      case 'collaborators':
        return <CollaboratorsModule />;
      case 'aiMentor':
        return <AiMentorModule />;
      case 'evaluation':
        return <EvaluationModule />;
      case 'researchNetwork':
        return <ResearchNetworkModule />;
      case 'adminDashboard':
        return <AdminDashboardModule />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        sidebarOpen={sidebarOpen}
        mobileMenuOpen={mobileMenuOpen}
        toggleLanguage={toggleLanguage}
      />

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        {/* Header */}
        <Header 
          currentSection={currentSection}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Main content area */}
        <main className="pt-16 px-4 md:px-6 pb-8 overflow-y-auto h-full">
          {/* Render the appropriate module based on the currentSection */}
          {getModuleComponent()}
        </main>
      </div>
    </div>
  );
} 