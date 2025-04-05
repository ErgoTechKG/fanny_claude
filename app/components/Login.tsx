'use client';

import React, { useState } from 'react';
import { Globe, User, Users, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { UserRole } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };
  
  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Call login from auth context
      const success = await login(email, password, selectedRole);
      
      if (!success) {
        setError(language === 'en' ? 'Invalid credentials' : '无效的凭据');
      }
    } catch (err) {
      setError(language === 'en' ? 'An error occurred' : '发生错误');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        {/* Left side - image and title */}
        <div className="bg-blue-600 text-white p-8 md:w-1/2 flex flex-col justify-center items-center text-center">
          <div className="mb-6">
            <img src="https://placehold.co/150x150" alt="University Logo" className="mx-auto h-24 w-24" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{t('login.title')}</h1>
          <p className="text-blue-100">{t('login.subtitle')}</p>
          <div className="mt-10 w-full">
            <button 
              onClick={() => setSelectedRole('student')}
              className={`w-full ${selectedRole === 'student' ? 'bg-white text-blue-600' : 'bg-blue-700 text-white border border-white'} py-3 rounded-lg font-medium hover:bg-blue-50 hover:text-blue-600 transition mb-4 flex items-center justify-center`}
            >
              <User size={18} className="mr-2" />
              {t('login.studentLogin')}
            </button>
            <button
              onClick={() => setSelectedRole('instructor')}
              className={`w-full ${selectedRole === 'instructor' ? 'bg-white text-blue-600' : 'bg-blue-700 text-white border border-white'} py-3 rounded-lg font-medium hover:bg-blue-50 hover:text-blue-600 transition mb-4 flex items-center justify-center`}
            >
              <Users size={18} className="mr-2" />
              {t('login.instructorLogin')}
            </button>
            <button
              onClick={() => setSelectedRole('admin')}
              className={`w-full ${selectedRole === 'admin' ? 'bg-white text-blue-600' : 'bg-blue-700 text-white border border-white'} py-3 rounded-lg font-medium hover:bg-blue-50 hover:text-blue-600 transition flex items-center justify-center`}
            >
              <ShieldCheck size={18} className="mr-2" />
              {t('login.adminLogin')}
            </button>
          </div>
        </div>
        
        {/* Right side - login form */}
        <div className="p-8 md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {selectedRole === 'student' ? t('login.studentLogin') : 
             selectedRole === 'instructor' ? t('login.instructorLogin') : 
             t('login.adminLogin')}
          </h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                {t('login.emailLabel')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="user@hust.edu.cn"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="password">
                {t('login.passwordLabel')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember" type="checkbox" className="h-4 w-4 text-blue-600" />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  {t('login.rememberMe')}
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                {t('login.forgotPassword')}
              </a>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {language === 'en' ? 'Logging in...' : '正在登录...'}
                </span>
              ) : t('login.loginButton')}
            </button>
          </form>
          <div className="mt-4 text-center">
            <button onClick={toggleLanguage} className="text-sm text-gray-500 hover:text-blue-600 flex items-center justify-center mx-auto">
              <Globe size={16} className="mr-1" />
              {language === 'en' ? '切换到中文' : 'Switch to English'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 