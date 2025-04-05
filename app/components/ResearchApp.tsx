'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Login from './Login';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';

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
          {/* Dashboard is the default view */}
          {currentSection === 'dashboard' && <Dashboard />}

          {/* Placeholder for other sections */}
          {currentSection !== 'dashboard' && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Coming Soon
              </h3>
              <p className="text-gray-600">
                This section is under development.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 