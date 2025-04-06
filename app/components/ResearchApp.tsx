'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { usePathname, useRouter } from 'next/navigation';
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
import BulkEmailModule from './modules/BulkEmailModule';
import MessagingModule from './modules/MessagingModule';
import Cookies from 'js-cookie';

export default function ResearchApp() {
  const { isAuthenticated, userRole } = useAuth();
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  // State for UI
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(userRole === 'admin' ? 'adminDashboard' : 'dashboard');

  // Initialize default section based on user role and stored cookie
  useEffect(() => {
    if (isAuthenticated) {
      const storedSection = Cookies.get('lastSection');
      
      if (storedSection) {
        // If there's a stored section, use it
        setCurrentSection(storedSection);
      } else {
        // Otherwise set default based on role
        const defaultSection = userRole === 'admin' ? 'adminDashboard' : 'dashboard';
        setCurrentSection(defaultSection);
        Cookies.set('lastSection', defaultSection, { expires: 30 }); // expires in 30 days
      }
    }
  }, [isAuthenticated, userRole]);

  // Save current section to cookie whenever it changes
  useEffect(() => {
    if (currentSection && isAuthenticated) {
      Cookies.set('lastSection', currentSection, { expires: 30 });
    }
  }, [currentSection, isAuthenticated]);

  // Update current section based on URL path
  useEffect(() => {
    if (pathname && isAuthenticated) {
      const path = pathname.split('/')[1]; // Get the first part of the path
      if (path) {
        switch(path) {
          case 'dashboard':
          case 'courses':
          case 'projects':
          case 'publications':
          case 'collaborators':
          case 'aiMentor':
          case 'evaluation':
          case 'researchNetwork':
          case 'adminDashboard':
          case 'bulkEmail':
          case 'messaging':
            setCurrentSection(path);
            break;
          default:
            // Default to role-specific dashboard if path is not recognized
            const defaultSection = userRole === 'admin' ? 'adminDashboard' : 'dashboard';
            setCurrentSection(defaultSection);
        }
      }
    }
  }, [pathname, isAuthenticated, userRole]);

  // Listen for custom module switch events
  useEffect(() => {
    const handleSwitchModule = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.module) {
        setCurrentSection(customEvent.detail.module);
      }
    };

    window.addEventListener('switchModule', handleSwitchModule);

    return () => {
      window.removeEventListener('switchModule', handleSwitchModule);
    };
  }, []);

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  // If not authenticated, redirect to login page
  useEffect(() => {
    if (!isAuthenticated && pathname !== '/login') {
      router.push('/login');
    }
  }, [isAuthenticated, router, pathname]);

  // If not authenticated, render nothing while redirecting
  if (!isAuthenticated) {
    return null;
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
      case 'bulkEmail':
        return <BulkEmailModule />;
      case 'messaging':
        return <MessagingModule />;
      default:
        // Default to role-specific dashboard
        return userRole === 'admin' ? <AdminDashboardModule /> : <Dashboard />;
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