'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  Clock, 
  BarChart2, 
  PlusCircle,
  Calendar,
  Edit,
  Trash,
  Eye
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Mock data types
interface Student {
  id: string;
  name: string;
  avatar: string;
  department: string;
  email: string;
}

interface Instructor {
  id: string;
  name: string;
  avatar: string;
  department: string;
  email: string;
  expertise: string[];
}

interface Meeting {
  id: string;
  studentId: string;
  instructorId: string;
  title: string;
  startTime: Date;
  duration: number; // in minutes
  status: 'scheduled' | 'inProgress' | 'completed';
  notes?: string;
}

// Mock data
const mockStudents: Student[] = [
  {
    id: 's1',
    name: 'Zhang Wei',
    avatar: 'https://placehold.co/40x40',
    department: 'Mechanical Engineering',
    email: 'zhang.wei@hust.edu.cn'
  },
  {
    id: 's2',
    name: 'Lin Mei',
    avatar: 'https://placehold.co/40x40',
    department: 'Computer Science',
    email: 'lin.mei@hust.edu.cn'
  },
  {
    id: 's3',
    name: 'Wang Tao',
    avatar: 'https://placehold.co/40x40',
    department: 'Electrical Engineering',
    email: 'wang.tao@hust.edu.cn'
  },
  {
    id: 's4',
    name: 'Chen Yu',
    avatar: 'https://placehold.co/40x40',
    department: 'Materials Science',
    email: 'chen.yu@hust.edu.cn'
  },
  {
    id: 's5',
    name: 'Liu Fang',
    avatar: 'https://placehold.co/40x40',
    department: 'Mechanical Engineering',
    email: 'liu.fang@hust.edu.cn'
  }
];

const mockInstructors: Instructor[] = [
  {
    id: 'i1',
    name: 'Prof. Li Ming',
    avatar: 'https://placehold.co/40x40',
    department: 'Mechanical Engineering',
    email: 'li.ming@hust.edu.cn',
    expertise: ['Robotics', 'Manufacturing', 'Design']
  },
  {
    id: 'i2',
    name: 'Dr. Zhao Jian',
    avatar: 'https://placehold.co/40x40',
    department: 'Computer Science',
    email: 'zhao.jian@hust.edu.cn',
    expertise: ['Artificial Intelligence', 'Machine Learning', 'Data Analysis']
  },
  {
    id: 'i3',
    name: 'Prof. Wu Hong',
    avatar: 'https://placehold.co/40x40',
    department: 'Electrical Engineering',
    email: 'wu.hong@hust.edu.cn',
    expertise: ['Power Systems', 'Control Theory', 'Electronics']
  },
  {
    id: 'i4',
    name: 'Dr. Chen Ling',
    avatar: 'https://placehold.co/40x40',
    department: 'Materials Science',
    email: 'chen.ling@hust.edu.cn',
    expertise: ['Nanomaterials', 'Material Characterization', 'Composites']
  }
];

const mockMeetings: Meeting[] = [
  {
    id: 'm1',
    studentId: 's1',
    instructorId: 'i1',
    title: 'Research Proposal Review',
    startTime: new Date('2023-08-01T10:00:00'),
    duration: 60,
    status: 'scheduled'
  },
  {
    id: 'm2',
    studentId: 's2',
    instructorId: 'i2',
    title: 'Algorithm Discussion',
    startTime: new Date('2023-08-01T11:00:00'),
    duration: 45,
    status: 'inProgress'
  },
  {
    id: 'm3',
    studentId: 's3',
    instructorId: 'i3',
    title: 'Circuit Design Review',
    startTime: new Date('2023-08-01T09:00:00'),
    duration: 30,
    status: 'completed'
  },
  {
    id: 'm4',
    studentId: 's4',
    instructorId: 'i4',
    title: 'Material Selection',
    startTime: new Date('2023-08-02T10:00:00'),
    duration: 60,
    status: 'scheduled'
  },
  {
    id: 'm5',
    studentId: 's5',
    instructorId: 'i1',
    title: 'CAD Model Review',
    startTime: new Date('2023-08-02T14:00:00'),
    duration: 45,
    status: 'scheduled'
  },
  {
    id: 'm6',
    studentId: 's2',
    instructorId: 'i3',
    title: 'Electronics Discussion',
    startTime: new Date('2023-08-03T11:00:00'),
    duration: 30,
    status: 'inProgress'
  }
];

export default function AdminDashboardModule() {
  const { t, language } = useLanguage();
  const [meetings, setMeetings] = useState<{
    scheduled: Meeting[];
    inProgress: Meeting[];
    completed: Meeting[];
  }>({
    scheduled: [],
    inProgress: [],
    completed: []
  });
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [instructors, setInstructors] = useState<Instructor[]>(mockInstructors);
  const [draggedMeeting, setDraggedMeeting] = useState<Meeting | null>(null);
  
  // Format date based on language
  const formatDate = (date: Date) => {
    return date.toLocaleString(language === 'en' ? 'en-US' : 'zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get student name by ID
  const getStudentName = (id: string) => {
    const student = students.find(s => s.id === id);
    return student ? student.name : 'Unknown Student';
  };
  
  // Get instructor name by ID
  const getInstructorName = (id: string) => {
    const instructor = instructors.find(i => i.id === id);
    return instructor ? instructor.name : 'Unknown Instructor';
  };
  
  // Organize meetings into columns on component mount
  useEffect(() => {
    const scheduled = mockMeetings.filter(m => m.status === 'scheduled');
    const inProgress = mockMeetings.filter(m => m.status === 'inProgress');
    const completed = mockMeetings.filter(m => m.status === 'completed');
    
    setMeetings({
      scheduled,
      inProgress,
      completed
    });
  }, []);
  
  // Handle drag start
  const handleDragStart = (e: React.DragEvent, meeting: Meeting) => {
    setDraggedMeeting(meeting);
    e.dataTransfer.setData('text/plain', meeting.id);
    
    // Set a ghost image for dragging
    const ghost = document.createElement('div');
    ghost.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md', 'border', 'border-blue-500');
    ghost.style.width = '200px';
    ghost.style.height = '100px';
    ghost.style.position = 'absolute';
    ghost.style.top = '-1000px';
    ghost.textContent = meeting.title;
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 0, 0);
    
    setTimeout(() => {
      document.body.removeChild(ghost);
    }, 0);
  };
  
  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  // Handle drop
  const handleDrop = (e: React.DragEvent, dropStatus: 'scheduled' | 'inProgress' | 'completed') => {
    e.preventDefault();
    
    if (draggedMeeting) {
      // Create a copy of the meetings
      const newMeetings = { ...meetings };
      
      // Find and remove the meeting from its current status list
      const sourceStatus = draggedMeeting.status;
      const meetingIndex = newMeetings[sourceStatus].findIndex(m => m.id === draggedMeeting.id);
      
      if (meetingIndex !== -1) {
        // Remove from source
        const [removedMeeting] = newMeetings[sourceStatus].splice(meetingIndex, 1);
        
        // Update status
        removedMeeting.status = dropStatus;
        
        // Add to destination
        newMeetings[dropStatus].push(removedMeeting);
        
        // Update state
        setMeetings(newMeetings);
      }
      
      setDraggedMeeting(null);
    }
  };
  
  // Render meeting card
  const renderMeetingCard = (meeting: Meeting) => {
    return (
      <div
        key={meeting.id}
        draggable
        onDragStart={(e) => handleDragStart(e, meeting)}
        className="bg-white p-4 mb-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition cursor-move"
      >
        <div className="font-medium mb-2">{meeting.title}</div>
        <div className="flex items-center mb-2 text-sm text-gray-600">
          <Clock size={16} className="mr-1" />
          <span>{formatDate(meeting.startTime)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">{t('admin.studentName')}:</span>
            <span className="ml-1">{getStudentName(meeting.studentId)}</span>
          </div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">{t('admin.instructorName')}:</span>
            <span className="ml-1">{getInstructorName(meeting.instructorId)}</span>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-1" />
            <span>{meeting.duration} min</span>
          </div>
          <div className="flex space-x-2">
            <button className="text-blue-600 hover:text-blue-800">
              <Eye size={16} />
            </button>
            <button className="text-green-600 hover:text-green-800">
              <Edit size={16} />
            </button>
            <button className="text-red-600 hover:text-red-800">
              <Trash size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{t('admin.title')}</h2>
        <p className="text-blue-100">
          {language === 'en'
            ? 'Monitor and manage student-instructor meetings and activities'
            : '监控和管理学生-教师会议和活动'
          }
        </p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full mr-4">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{t('admin.activeMeetings')}</p>
              <h3 className="text-2xl font-bold text-gray-800">{meetings.scheduled.length + meetings.inProgress.length}</h3>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div 
              className="h-2 bg-purple-500 rounded-full" 
              style={{ width: `${(meetings.inProgress.length / (meetings.scheduled.length + meetings.inProgress.length)) * 100}%` }}
            ></div>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            {meetings.inProgress.length} {t('admin.inProgress')}, {meetings.scheduled.length} {t('admin.scheduled')}
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-4">
              <UserCheck size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{t('admin.activeInstructors')}</p>
              <h3 className="text-2xl font-bold text-gray-800">{instructors.length}</h3>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div 
              className="h-2 bg-blue-500 rounded-full" 
              style={{ width: '75%' }}
            ></div>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            {Math.round(instructors.length * 0.75)} {language === 'en' ? 'currently mentoring' : '正在指导学生'}
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{t('admin.activeStudents')}</p>
              <h3 className="text-2xl font-bold text-gray-800">{students.length}</h3>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div 
              className="h-2 bg-green-500 rounded-full" 
              style={{ width: '60%' }}
            ></div>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            {Math.round(students.length * 0.6)} {language === 'en' ? 'meeting with instructors' : '与导师会面中'}
          </p>
        </div>
      </div>
      
      {/* Trello-style board */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-800">{t('admin.studentInstructorMeetings')}</h3>
          <p className="text-sm text-gray-500">{t('admin.dragAndDrop')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Scheduled column */}
          <div 
            className="bg-gray-50 rounded-lg p-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'scheduled')}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-700">{t('admin.scheduled')}</h4>
              <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                {meetings.scheduled.length}
              </span>
            </div>
            <div className="min-h-[200px]">
              {meetings.scheduled.map(meeting => renderMeetingCard(meeting))}
            </div>
            <button className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800">
              <PlusCircle size={16} className="mr-1" />
              <span>{language === 'en' ? 'Add Meeting' : '添加会议'}</span>
            </button>
          </div>
          
          {/* In Progress column */}
          <div 
            className="bg-gray-50 rounded-lg p-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'inProgress')}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-700">{t('admin.inProgress')}</h4>
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                {meetings.inProgress.length}
              </span>
            </div>
            <div className="min-h-[200px]">
              {meetings.inProgress.map(meeting => renderMeetingCard(meeting))}
            </div>
          </div>
          
          {/* Completed column */}
          <div 
            className="bg-gray-50 rounded-lg p-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'completed')}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-700">{t('admin.completed')}</h4>
              <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                {meetings.completed.length}
              </span>
            </div>
            <div className="min-h-[200px]">
              {meetings.completed.map(meeting => renderMeetingCard(meeting))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Active user sessions tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active instructors */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4">{t('admin.activeInstructors')}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.instructorName')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'en' ? 'Department' : '部门'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'en' ? 'Active Sessions' : '活跃会话'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {instructors.map((instructor) => {
                  const activeMeetings = [...meetings.scheduled, ...meetings.inProgress].filter(m => m.instructorId === instructor.id);
                  return (
                    <tr key={instructor.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={instructor.avatar} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{instructor.name}</div>
                            <div className="text-sm text-gray-500">{instructor.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{instructor.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {activeMeetings.length}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Active students */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4">{t('admin.activeStudents')}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.studentName')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'en' ? 'Department' : '部门'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'en' ? 'Meeting With' : '会议对象'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => {
                  const activeMeeting = [...meetings.scheduled, ...meetings.inProgress].find(m => m.studentId === student.id);
                  const meetingInstructor = activeMeeting ? instructors.find(i => i.id === activeMeeting.instructorId) : null;
                  
                  return (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={student.avatar} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {meetingInstructor ? (
                          <div className="text-sm text-gray-900">{meetingInstructor.name}</div>
                        ) : (
                          <span className="text-sm text-gray-500">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 