'use client';

import React from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Calendar, 
  ChevronDown, 
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentSection: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Header({
  currentSection,
  sidebarOpen,
  setSidebarOpen,
  mobileMenuOpen,
  setMobileMenuOpen
}: HeaderProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  return (
    <>
      {/* Mobile menu toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md bg-white shadow-md text-gray-600"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Header */}
      <header className="bg-white shadow-sm z-10 fixed w-full lg:w-[calc(100%-16rem)]">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:block mr-4 text-gray-600 hover:text-gray-900"
            >
              <Menu size={24} />
            </button>
            
            <h2 className="text-xl font-semibold text-gray-800">
              {t(`nav.${currentSection}`)}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder={t('nav.search')}
                className="w-64 pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            
            {/* Notifications */}
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell size={22} className="text-gray-600" />
              <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
            </button>
            
            {/* Calendar */}
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Calendar size={22} className="text-gray-600" />
            </button>
            
            {/* User dropdown */}
            <div className="relative">
              <button className="flex items-center text-gray-700 hover:text-gray-900">
                <img
                  src="https://media.istockphoto.com/id/1165150697/photo/portrait-of-happy-exchange-student-facing-camera-smiling-while-holding-his-notebook-at-the.jpg?s=612x612&w=0&k=20&c=_2jF1Ql41WqH7HUEtCdg_r16wIC95sjqT27NBaVcVW4="
                  alt="User avatar"
                  className="h-8 w-8 rounded-full mr-2 border-2 border-blue-500"
                />
                <span className="hidden md:block font-medium">
                  {user?.name || ''}
                </span>
                <ChevronDown size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
} 