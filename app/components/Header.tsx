'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Calendar, 
  ChevronDown, 
  X,
  User,
  Settings,
  HelpCircle,
  LogOut,
  BookOpen,
  Users as UsersIcon,
  Shield,
  Edit,
  FileText,
  ChevronLeft,
  ChevronRight,
  Clock
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

interface Meeting {
  id: number;
  title: {
    en: string;
    zh: string;
  };
  date: Date;
  startTime: string;
  endTime: string;
  participants: string[];
  location: {
    en: string;
    zh: string;
  };
  type: 'meeting' | 'deadline' | 'workshop';
}

export default function Header({
  currentSection,
  sidebarOpen,
  setSidebarOpen,
  mobileMenuOpen,
  setMobileMenuOpen
}: HeaderProps) {
  const { t, language } = useLanguage();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const userMenuRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  
  // Example meetings data
  const meetings: Meeting[] = [
    {
      id: 1,
      title: {
        en: 'Weekly Project Update',
        zh: '每周项目更新'
      },
      date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 10, 10, 0),
      startTime: '10:00',
      endTime: '11:00',
      participants: ['Prof. Li', 'Zhang Mei', 'Wang Chen'],
      location: {
        en: 'Building A, Room 305',
        zh: 'A楼305室'
      },
      type: 'meeting'
    },
    {
      id: 2,
      title: {
        en: 'Research Methodology Workshop',
        zh: '研究方法论工作坊'
      },
      date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 15, 14, 0),
      startTime: '14:00',
      endTime: '16:30',
      participants: ['Prof. Wang', 'Department Faculty'],
      location: {
        en: 'Science Building, Conference Room 2',
        zh: '科学楼会议室2'
      },
      type: 'workshop'
    },
    {
      id: 3,
      title: {
        en: 'Thesis Draft Submission',
        zh: '论文草稿提交'
      },
      date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 20, 23, 59),
      startTime: '23:59',
      endTime: '23:59',
      participants: [],
      location: {
        en: 'Online',
        zh: '线上'
      },
      type: 'deadline'
    },
    {
      id: 4,
      title: {
        en: 'Department Meeting',
        zh: '系部会议'
      },
      date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 25, 9, 0),
      startTime: '09:00',
      endTime: '11:00',
      participants: ['All Faculty', 'Student Representatives'],
      location: {
        en: 'Administration Building, Room 401',
        zh: '行政楼401室'
      },
      type: 'meeting'
    }
  ];
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node) && 
          event.target !== document.querySelector('[data-calendar-button]')) {
        setShowCalendar(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get day of week of first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Generate calendar days for current month view
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    // Previous month days to fill first week
    const prevMonthDays = [];
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      prevMonthDays.push({
        day: daysInPrevMonth - firstDayOfMonth + i + 1,
        month: prevMonth,
        year: prevMonthYear,
        isCurrentMonth: false
      });
    }
    
    // Current month days
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push({
        day: i,
        month,
        year,
        isCurrentMonth: true
      });
    }
    
    // Next month days to fill last week
    const nextMonthDays = [];
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;
    const daysNeeded = 42 - (prevMonthDays.length + currentMonthDays.length); // 6 rows of 7 days
    
    for (let i = 1; i <= daysNeeded; i++) {
      nextMonthDays.push({
        day: i,
        month: nextMonth,
        year: nextMonthYear,
        isCurrentMonth: false
      });
    }
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };
  
  // Get meetings for a specific day
  const getMeetingsForDay = (day: number, month: number, year: number) => {
    return meetings.filter(meeting => {
      const meetingDate = meeting.date;
      return meetingDate.getDate() === day && 
             meetingDate.getMonth() === month && 
             meetingDate.getFullYear() === year;
    });
  };
  
  // Format month and year for display
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', {
      year: 'numeric',
      month: 'long'
    });
  };
  
  // Go to previous month
  const goToPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Go to next month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Get meeting type color
  const getMeetingTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-500';
      case 'deadline':
        return 'bg-red-500';
      case 'workshop':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  // Day names
  const dayNames = language === 'en' 
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['日', '一', '二', '三', '四', '五', '六'];
  
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
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setShowCalendar(!showCalendar)}
              data-calendar-button
            >
              <Calendar size={22} className="text-gray-600" />
            </button>
            
            {/* User dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button 
                className="flex items-center text-gray-700 hover:text-gray-900"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
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
              
              {/* User dropdown menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg py-1 z-20">
                  {/* User info */}
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {language === 'en' 
                          ? user?.role === 'student' ? 'Student' : user?.role === 'instructor' ? 'Instructor' : 'Administrator'
                          : user?.role === 'student' ? '学生' : user?.role === 'instructor' ? '导师' : '管理员'
                        }
                      </span>
                    </div>
                  </div>
                  
                  {/* Common options */}
                  <div className="py-1">
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User size={16} className="mr-3 text-gray-500" />
                      {language === 'en' ? 'My Profile' : '个人资料'}
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Settings size={16} className="mr-3 text-gray-500" />
                      {language === 'en' ? 'Settings' : '设置'}
                    </a>
                  </div>
                  
                  {/* Role-specific options */}
                  {user?.role === 'student' && (
                    <div className="py-1 border-t border-gray-100">
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <BookOpen size={16} className="mr-3 text-gray-500" />
                        {language === 'en' ? 'My Courses' : '我的课程'}
                      </a>
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <FileText size={16} className="mr-3 text-gray-500" />
                        {language === 'en' ? 'Submit Research Report' : '提交研究报告'}
                      </a>
                    </div>
                  )}
                  
                  {user?.role === 'instructor' && (
                    <div className="py-1 border-t border-gray-100">
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <UsersIcon size={16} className="mr-3 text-gray-500" />
                        {language === 'en' ? 'My Students' : '我的学生'}
                      </a>
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Edit size={16} className="mr-3 text-gray-500" />
                        {language === 'en' ? 'Manage Assignments' : '管理作业'}
                      </a>
                    </div>
                  )}
                  
                  {user?.role === 'admin' && (
                    <div className="py-1 border-t border-gray-100">
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Shield size={16} className="mr-3 text-gray-500" />
                        {language === 'en' ? 'Admin Dashboard' : '管理员仪表板'}
                      </a>
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <UsersIcon size={16} className="mr-3 text-gray-500" />
                        {language === 'en' ? 'User Management' : '用户管理'}
                      </a>
                    </div>
                  )}
                  
                  {/* Help and logout */}
                  <div className="py-1 border-t border-gray-100">
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <HelpCircle size={16} className="mr-3 text-gray-500" />
                      {language === 'en' ? 'Help & Support' : '帮助与支持'}
                    </a>
                    <button 
                      onClick={() => logout && logout()}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-3 text-red-500" />
                      {language === 'en' ? 'Sign Out' : '退出登录'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-start justify-center z-50 pt-20">
          <div 
            ref={calendarRef}
            className="bg-white rounded-xl shadow-xl w-full max-w-3xl mx-4"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                {language === 'en' ? 'Calendar' : '日历'}
              </h3>
              <button 
                onClick={() => setShowCalendar(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4">
              {/* Month navigation */}
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={goToPrevMonth}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <h4 className="text-lg font-medium text-gray-800">
                  {formatMonthYear(currentMonth)}
                </h4>
                <button 
                  onClick={goToNextMonth}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </div>
              
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Day headers */}
                {dayNames.map((day, index) => (
                  <div 
                    key={index}
                    className="text-center py-2 text-sm font-medium text-gray-500"
                  >
                    {day}
                  </div>
                ))}
                
                {/* Calendar days */}
                {generateCalendarDays().map((day, index) => {
                  const dayMeetings = getMeetingsForDay(day.day, day.month, day.year);
                  const isToday = new Date().getDate() === day.day && 
                                  new Date().getMonth() === day.month && 
                                  new Date().getFullYear() === day.year;
                  
                  return (
                    <div 
                      key={index}
                      className={`
                        relative p-1 min-h-[80px] border rounded
                        ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
                        ${isToday ? 'border-blue-500' : 'border-gray-100'}
                      `}
                    >
                      <div className={`
                        text-right text-sm p-1
                        ${day.isCurrentMonth ? 'text-gray-700' : 'text-gray-400'}
                        ${isToday ? 'font-bold' : ''}
                      `}>
                        {day.day}
                      </div>
                      
                      {/* Meeting indicators */}
                      <div className="mt-1 space-y-1">
                        {dayMeetings.slice(0, 2).map(meeting => (
                          <div 
                            key={meeting.id}
                            className="px-1 py-0.5 rounded text-xs text-white flex items-center truncate"
                            style={{
                              backgroundColor: getMeetingTypeColor(meeting.type),
                              maxWidth: '100%'
                            }}
                          >
                            <Clock size={10} className="mr-1 shrink-0" />
                            <span className="truncate">
                              {meeting.title[language]}
                            </span>
                          </div>
                        ))}
                        
                        {dayMeetings.length > 2 && (
                          <div className="px-1 py-0.5 text-xs text-blue-600 font-medium">
                            +{dayMeetings.length - 2} {language === 'en' ? 'more' : '更多'}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Upcoming meetings section */}
            <div className="border-t p-4">
              <h4 className="text-lg font-medium text-gray-800 mb-4">
                {language === 'en' ? 'Upcoming Meetings' : '即将到来的会议'}
              </h4>
              
              <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                {meetings
                  .filter(meeting => meeting.date >= new Date())
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .slice(0, 4)
                  .map(meeting => (
                    <div 
                      key={meeting.id}
                      className="border rounded-lg p-3 hover:shadow-sm transition flex"
                    >
                      <div className={`${getMeetingTypeColor(meeting.type)} w-1 rounded-full mr-3`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h5 className="font-medium text-gray-800">{meeting.title[language]}</h5>
                          <span className="text-xs text-gray-500">
                            {meeting.startTime} - {meeting.endTime}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-1">
                          {meeting.date.toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}
                          {' • '}
                          {meeting.location[language]}
                        </p>
                        
                        {meeting.participants.length > 0 && (
                          <div className="flex items-center mt-2">
                            <UsersIcon size={14} className="text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">
                              {meeting.participants.join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 