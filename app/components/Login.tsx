'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Globe, User, Users, ShieldCheck, BookOpen, Lightbulb, GraduationCap, PenTool } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { UserRole } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Role selection handler
  const handleRoleSelection = (role: UserRole) => {
    setSelectedRole(role);
  };
  
  return (
    <motion.div 
      className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background with gradient instead of video */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1972&auto=format&fit=crop')] bg-cover bg-center"></div>
        </div>
      </div>
      
      {/* Floating education-themed icons */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute top-1/4 left-1/4 text-white/30"
          animate={{ 
            y: [0, -15, 0],
            x: [0, 15, 0],
            rotate: [-5, 5, -5]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <BookOpen size={32} />
        </motion.div>
        <motion.div className="absolute top-1/3 right-1/4 text-white/30"
          animate={{ 
            y: [0, 15, 0],
            x: [0, -15, 0],
            rotate: [5, -5, 5]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <GraduationCap size={48} />
        </motion.div>
        <motion.div className="absolute bottom-1/4 left-1/3 text-white/30"
          animate={{ 
            y: [0, -15, 0],
            x: [0, -10, 0],
            rotate: [-5, 5, -5]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Lightbulb size={36} />
        </motion.div>
        <motion.div className="absolute top-2/3 right-1/3 text-white/30"
          animate={{ 
            y: [0, 10, 0],
            x: [0, 10, 0],
            rotate: [5, -5, 5]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <PenTool size={28} />
        </motion.div>
      </div>
      
      <motion.div 
        className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row z-10 relative"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Left side - image and title */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 md:w-1/2 flex flex-col justify-center items-center text-center">
          <motion.div 
            className="mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img src="https://cdn.elearningindustry.com/wp-content/uploads/2022/02/shutterstock_1112381495.jpg" alt="University Logo" className="mx-auto h-24 w-24 rounded-full border-4 border-white/30 shadow-lg" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">{t('login.title')}</h1>
          <p className="text-blue-100 mb-8">{t('login.subtitle')}</p>
          <div className="mt-6 w-full space-y-4">
            <motion.button 
              onClick={() => handleRoleSelection('student')}
              className={`w-full ${selectedRole === 'student' ? 'bg-white text-blue-600' : 'bg-blue-700/80 text-white border border-white/30'} py-3 rounded-lg font-medium hover:bg-blue-50 hover:text-blue-600 transition flex items-center justify-center shadow-md`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <User size={18} className="mr-2" />
              {t('login.studentLogin')}
            </motion.button>
            <motion.button
              onClick={() => handleRoleSelection('instructor')}
              className={`w-full ${selectedRole === 'instructor' ? 'bg-white text-blue-600' : 'bg-blue-700/80 text-white border border-white/30'} py-3 rounded-lg font-medium hover:bg-blue-50 hover:text-blue-600 transition flex items-center justify-center shadow-md`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Users size={18} className="mr-2" />
              {t('login.instructorLogin')}
            </motion.button>
            <motion.button
              onClick={() => handleRoleSelection('admin')}
              className={`w-full ${selectedRole === 'admin' ? 'bg-white text-blue-600' : 'bg-blue-700/80 text-white border border-white/30'} py-3 rounded-lg font-medium hover:bg-blue-50 hover:text-blue-600 transition flex items-center justify-center shadow-md`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShieldCheck size={18} className="mr-2" />
              {t('login.adminLogin')}
            </motion.button>
          </div>
        </div>
        
        {/* Right side - login form */}
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {selectedRole === 'student' ? t('login.studentLogin') : 
             selectedRole === 'instructor' ? t('login.instructorLogin') : 
             t('login.adminLogin')}
          </h2>
          <motion.form 
            className="space-y-6" 
            onSubmit={handleLogin}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div 
              className="transform transition-all duration-300"
              whileHover={{ y: -2 }}
            >
              <label className="block text-gray-700 mb-2" htmlFor="email">
                {t('login.emailLabel')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="user@hust.edu.cn"
                required
              />
            </motion.div>
            <motion.div 
              className="transform transition-all duration-300"
              whileHover={{ y: -2 }}
            >
              <label className="block text-gray-700 mb-2" htmlFor="password">
                {t('login.passwordLabel')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
            </motion.div>
            
            <AnimatePresence>
              {error && (
                <motion.div 
                  className="text-red-500 text-sm p-2 bg-red-50 rounded-md border border-red-100"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  {t('login.rememberMe')}
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                {t('login.forgotPassword')}
              </a>
            </div>
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-70 shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
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
            </motion.button>
          </motion.form>
          <div className="mt-6 text-center">
            <motion.button 
              onClick={toggleLanguage} 
              className="text-sm text-gray-500 hover:text-blue-600 flex items-center justify-center mx-auto p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Globe size={16} className="mr-1" />
              {language === 'en' ? '切换到中文' : 'Switch to English'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 