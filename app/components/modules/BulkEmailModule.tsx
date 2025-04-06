'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Search, 
  Filter, 
  Mail, 
  Users, 
  Send, 
  Save,
  FileText,
  Check,
  AlertCircle
} from 'lucide-react';

// Mock data interfaces
interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: 'student' | 'instructor' | 'admin';
}

interface EmailTemplate {
  id: string;
  title: string;
  subject: string;
  content: string;
  lastUsed: Date;
}

interface EmailGroup {
  id: string;
  name: string;
  description: string;
  count: number;
}

// Mock data
const mockStudents: User[] = [
  { id: 's1', name: 'Zhang Wei', email: 'zhang.wei@hust.edu.cn', department: 'Computer Science', role: 'student' },
  { id: 's2', name: 'Lin Mei', email: 'lin.mei@hust.edu.cn', department: 'Computer Science', role: 'student' },
  { id: 's3', name: 'Wang Tao', email: 'wang.tao@hust.edu.cn', department: 'Mechanical Engineering', role: 'student' },
  { id: 's4', name: 'Chen Yu', email: 'chen.yu@hust.edu.cn', department: 'Electrical Engineering', role: 'student' },
  { id: 's5', name: 'Liu Fang', email: 'liu.fang@hust.edu.cn', department: 'Materials Science', role: 'student' }
];

const mockInstructors: User[] = [
  { id: 'i1', name: 'Prof. Li Ming', email: 'li.ming@hust.edu.cn', department: 'Computer Science', role: 'instructor' },
  { id: 'i2', name: 'Dr. Zhao Jian', email: 'zhao.jian@hust.edu.cn', department: 'Computer Science', role: 'instructor' },
  { id: 'i3', name: 'Prof. Wu Hong', email: 'wu.hong@hust.edu.cn', department: 'Mechanical Engineering', role: 'instructor' },
  { id: 'i4', name: 'Dr. Chen Ling', email: 'chen.ling@hust.edu.cn', department: 'Electrical Engineering', role: 'instructor' },
  { id: 'i5', name: 'Prof. Yang Min', email: 'yang.min@hust.edu.cn', department: 'Materials Science', role: 'instructor' }
];

const mockTemplates: EmailTemplate[] = [
  {
    id: 't1',
    title: 'Research Update',
    subject: 'Monthly Research Progress Update',
    content: '<p>Dear [Name],</p><p>This is a reminder to submit your monthly research progress report by the end of this week.</p><p>Best regards,<br>Admin</p>',
    lastUsed: new Date('2023-07-15')
  },
  {
    id: 't2',
    title: 'Conference Announcement',
    subject: 'Upcoming Research Conference',
    content: '<p>Dear [Name],</p><p>We are pleased to announce an upcoming research conference on [Date]. Please find the details below...</p><p>Best regards,<br>Admin</p>',
    lastUsed: new Date('2023-07-20')
  },
  {
    id: 't3',
    title: 'System Maintenance',
    subject: 'Scheduled System Maintenance',
    content: '<p>Dear [Name],</p><p>The research management system will be undergoing scheduled maintenance on [Date] from [Time]. Please save your work before this time.</p><p>Best regards,<br>Admin</p>',
    lastUsed: new Date('2023-06-10')
  }
];

const mockGroups: EmailGroup[] = [
  { id: 'g1', name: 'All Students', description: 'All students in the system', count: 1250 },
  { id: 'g2', name: 'All Instructors', description: 'All instructors and professors', count: 180 },
  { id: 'g3', name: 'Computer Science', description: 'CS department members', count: 320 },
  { id: 'g4', name: 'Mechanical Engineering', description: 'ME department members', count: 280 },
  { id: 'g5', name: 'Research Leaders', description: 'Leaders of research projects', count: 45 }
];

export default function BulkEmailModule() {
  const { language } = useLanguage();
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState<'students' | 'instructors' | 'groups'>('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  
  // Combine students and instructors
  const allUsers = [...mockStudents, ...mockInstructors];
  
  // Filter users based on search query and active tab
  const filteredUsers = allUsers
    .filter(user => {
      if (activeTab === 'students' && user.role !== 'student') return false;
      if (activeTab === 'instructors' && user.role !== 'instructor') return false;
      
      return (
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  
  // Filter groups based on search query
  const filteredGroups = mockGroups
    .filter(group => 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  // Toggle recipient selection
  const toggleRecipient = (userId: string) => {
    if (selectedRecipients.includes(userId)) {
      setSelectedRecipients(selectedRecipients.filter(id => id !== userId));
    } else {
      setSelectedRecipients([...selectedRecipients, userId]);
    }
  };
  
  // Toggle group selection
  const toggleGroup = (groupId: string) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter(id => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };
  
  // Use template
  const useTemplate = (template: EmailTemplate) => {
    setSubject(template.subject);
    setContent(template.content);
    setShowTemplates(false);
  };
  
  // Handle send email
  const handleSendEmail = () => {
    // In a real app, this would send an actual email
    console.log('Sending email to:', {
      recipients: selectedRecipients.map(id => allUsers.find(u => u.id === id)),
      groups: selectedGroups.map(id => mockGroups.find(g => g.id === id)),
      subject,
      content
    });
    
    // Show success message
    setSendSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSelectedRecipients([]);
      setSelectedGroups([]);
      setSubject('');
      setContent('');
      setSendSuccess(false);
    }, 3000);
  };
  
  // Calculate total recipients count
  const totalRecipients = selectedRecipients.length + 
    selectedGroups.reduce((sum, groupId) => {
      const group = mockGroups.find(g => g.id === groupId);
      return sum + (group ? group.count : 0);
    }, 0);
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{language === 'en' ? 'Bulk Email System' : '群发邮件系统'}</h2>
        <p className="text-blue-100">
          {language === 'en'
            ? 'Send emails to multiple students, professors, or groups at once'
            : '一次性向多个学生、教授或群组发送电子邮件'
          }
        </p>
      </div>
      
      {/* Success message */}
      {sendSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <div className="flex items-center">
            <Check className="h-5 w-5 mr-2" />
            <span>{language === 'en' ? 'Email sent successfully!' : '邮件发送成功！'}</span>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column: Recipients */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium mb-4">{language === 'en' ? 'Select Recipients' : '选择收件人'}</h3>
            
            {/* Tabs */}
            <div className="flex border-b mb-4">
              <button
                className={`px-4 py-2 ${activeTab === 'students' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => {
                  setActiveTab('students');
                  setSearchQuery('');
                }}
              >
                {language === 'en' ? 'Students' : '学生'}
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'instructors' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => {
                  setActiveTab('instructors');
                  setSearchQuery('');
                }}
              >
                {language === 'en' ? 'Professors' : '教授'}
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'groups' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => {
                  setActiveTab('groups');
                  setSearchQuery('');
                }}
              >
                {language === 'en' ? 'Groups' : '群组'}
              </button>
            </div>
            
            {/* Search */}
            <div className="relative mb-4">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder={language === 'en' ? 'Search...' : '搜索...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            {/* Recipients list */}
            <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-md">
              {activeTab !== 'groups' ? (
                // Users list (students or instructors)
                <div className="divide-y divide-gray-200">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <div key={user.id} className="p-3 hover:bg-gray-50">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`user-${user.id}`}
                            checked={selectedRecipients.includes(user.id)}
                            onChange={() => toggleRecipient(user.id)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <label htmlFor={`user-${user.id}`} className="ml-3 block text-sm cursor-pointer flex-1">
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-gray-500 text-xs">{user.email}</div>
                            <div className="text-gray-400 text-xs">{user.department}</div>
                          </label>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      {language === 'en' ? 'No results found' : '未找到结果'}
                    </div>
                  )}
                </div>
              ) : (
                // Groups list
                <div className="divide-y divide-gray-200">
                  {filteredGroups.length > 0 ? (
                    filteredGroups.map(group => (
                      <div key={group.id} className="p-3 hover:bg-gray-50">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`group-${group.id}`}
                            checked={selectedGroups.includes(group.id)}
                            onChange={() => toggleGroup(group.id)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <label htmlFor={`group-${group.id}`} className="ml-3 block text-sm cursor-pointer flex-1">
                            <div className="font-medium text-gray-900">{group.name}</div>
                            <div className="text-gray-500 text-xs">{group.description}</div>
                            <div className="text-gray-400 text-xs flex items-center mt-1">
                              <Users size={12} className="mr-1" />
                              <span>{group.count} {language === 'en' ? 'recipients' : '个收件人'}</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      {language === 'en' ? 'No results found' : '未找到结果'}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Selected summary */}
            <div className="mt-4 text-sm text-gray-600">
              <p>{language === 'en' ? 'Selected:' : '已选择:'} 
                <span className="font-medium"> {selectedRecipients.length} </span>
                {language === 'en' ? 'individual recipients,' : '个收件人, '}
                <span className="font-medium"> {selectedGroups.length} </span>
                {language === 'en' ? 'groups' : '个群组'}
              </p>
              <p className="mt-1">
                {language === 'en' ? 'Total recipients:' : '总收件人数量:'} 
                <span className="font-medium"> {totalRecipients}</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Right column: Email composition */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{language === 'en' ? 'Compose Email' : '撰写邮件'}</h3>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowTemplates(true)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FileText size={16} className="mr-1" />
                  {language === 'en' ? 'Templates' : '模板'}
                </button>
                
                <button
                  onClick={() => setShowPreview(true)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Mail size={16} className="mr-1" />
                  {language === 'en' ? 'Preview' : '预览'}
                </button>
              </div>
            </div>
            
            {/* Form */}
            <div className="space-y-4">
              <div>
                <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'From:' : '发件人:'}
                </label>
                <select
                  id="from"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="admin@hust.edu.cn">
                    {language === 'en' ? 'HUST Research Admin' : 'HUST科研管理员'} &lt;admin@hust.edu.cn&gt;
                  </option>
                  <option value="research@hust.edu.cn">
                    {language === 'en' ? 'HUST Research Office' : 'HUST科研办公室'} &lt;research@hust.edu.cn&gt;
                  </option>
                </select>
              </div>
              
              <div>
                <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'To:' : '收件人:'}
                </label>
                <div className="w-full px-3 py-2 min-h-[40px] border border-gray-300 rounded-md bg-gray-50">
                  {totalRecipients === 0 ? (
                    <span className="text-sm text-gray-400">
                      {language === 'en' ? 'Select recipients from the left panel' : '从左侧面板选择收件人'}
                    </span>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selectedGroups.map(groupId => {
                        const group = mockGroups.find(g => g.id === groupId);
                        if (!group) return null;
                        return (
                          <div key={group.id} className="bg-blue-100 text-blue-800 text-xs rounded-full px-2 py-1 flex items-center">
                            <span>{group.name}</span>
                            <button 
                              onClick={() => toggleGroup(group.id)}
                              className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                              &times;
                            </button>
                          </div>
                        );
                      })}
                      
                      {selectedRecipients.map(userId => {
                        const user = allUsers.find(u => u.id === userId);
                        if (!user) return null;
                        return (
                          <div key={user.id} className="bg-green-100 text-green-800 text-xs rounded-full px-2 py-1 flex items-center">
                            <span>{user.name}</span>
                            <button 
                              onClick={() => toggleRecipient(user.id)}
                              className="ml-1 text-green-600 hover:text-green-800"
                            >
                              &times;
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'Subject:' : '主题:'}
                </label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder={language === 'en' ? 'Enter email subject' : '输入邮件主题'}
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'Message:' : '正文:'}
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  rows={12}
                  placeholder={language === 'en' ? 'Enter your message' : '输入邮件内容'}
                />
              </div>
              
              <div className="flex justify-between pt-4">
                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Save size={16} className="mr-1" />
                  {language === 'en' ? 'Save Draft' : '保存草稿'}
                </button>
                
                <button
                  onClick={handleSendEmail}
                  disabled={subject === '' || content === '' || totalRecipients === 0}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                    subject === '' || content === '' || totalRecipients === 0
                      ? 'bg-blue-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <Send size={16} className="mr-1" />
                  {language === 'en' ? 'Send Email' : '发送邮件'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Templates modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {language === 'en' ? 'Email Templates' : '邮件模板'}
              </h3>
              <button 
                onClick={() => setShowTemplates(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <div className="divide-y divide-gray-200">
                {mockTemplates.map(template => (
                  <div 
                    key={template.id} 
                    className="py-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => useTemplate(template)}
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-900">{template.title}</h4>
                      <span className="text-xs text-gray-500">
                        {language === 'en' ? 'Last used:' : '上次使用:'}
                        {' '}
                        {template.lastUsed.toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{template.subject}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 border-t border-gray-200 pt-4 flex justify-end">
              <button
                onClick={() => setShowTemplates(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                {language === 'en' ? 'Cancel' : '取消'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Preview modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {language === 'en' ? 'Email Preview' : '邮件预览'}
              </h3>
              <button 
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            {totalRecipients === 0 || subject === '' || content === '' ? (
              <div className="p-4 flex items-center bg-yellow-50 text-yellow-800 rounded-md">
                <AlertCircle size={20} className="mr-2" />
                <p>
                  {language === 'en' 
                    ? 'Please select recipients and complete the email content to preview.' 
                    : '请选择收件人并完成邮件内容以预览。'
                  }
                </p>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="mb-4">
                  <p className="text-sm text-gray-500">{language === 'en' ? 'From:' : '发件人:'}</p>
                  <p className="text-gray-700">
                    {language === 'en' ? 'HUST Research Admin' : 'HUST科研管理员'} &lt;admin@hust.edu.cn&gt;
                  </p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500">{language === 'en' ? 'To:' : '收件人:'}</p>
                  <p className="text-gray-700">
                    {totalRecipients} {language === 'en' ? 'recipients' : '个收件人'}
                  </p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500">{language === 'en' ? 'Subject:' : '主题:'}</p>
                  <p className="text-gray-900 font-medium">{subject}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">{language === 'en' ? 'Message:' : '正文:'}</p>
                  <div 
                    className="mt-2 p-4 bg-white border border-gray-200 rounded-md"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>
              </div>
            )}
            
            <div className="mt-4 border-t border-gray-200 pt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowPreview(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                {language === 'en' ? 'Close' : '关闭'}
              </button>
              
              {totalRecipients > 0 && subject !== '' && content !== '' && (
                <button
                  onClick={() => {
                    setShowPreview(false);
                    handleSendEmail();
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Send size={16} className="mr-1" />
                  {language === 'en' ? 'Send Email' : '发送邮件'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 