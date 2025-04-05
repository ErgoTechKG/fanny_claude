(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{874:(e,t,n)=>{"use strict";n.d(t,{default:()=>i});var s=n(5155);n(2115);var a=n(3475),r=n(4587);function i(e){let{children:t}=e;return(0,s.jsx)(a.O,{children:(0,s.jsx)(r.I,{children:t})})}},3475:(e,t,n)=>{"use strict";n.d(t,{A:()=>d,O:()=>o});var s=n(5155),a=n(2115);let r={student:{id:"1",name:"Zhang Wei",email:"zhang.wei@hust.edu.cn",role:"student"},instructor:{id:"2",name:"Prof. Li Ming",email:"li.ming@hust.edu.cn",role:"instructor"},admin:{id:"3",name:"Admin Wang Chen",email:"admin@hust.edu.cn",role:"admin"}},i=(0,a.createContext)({isAuthenticated:!1,userRole:null,user:null,login:async()=>!1,logout:()=>{}}),o=e=>{let{children:t}=e,[n,o]=(0,a.useState)(!1),[d,u]=(0,a.useState)(null),[l,c]=(0,a.useState)(null),m=async(e,t,n)=>new Promise(e=>{setTimeout(()=>{o(!0),u(n),c(r[n]||null),e(!0)},500)});return(0,s.jsx)(i.Provider,{value:{isAuthenticated:n,userRole:d,user:l,login:m,logout:()=>{o(!1),u(null),c(null)}},children:t})},d=()=>(0,a.useContext)(i)},3728:(e,t,n)=>{Promise.resolve().then(n.bind(n,874)),Promise.resolve().then(n.t.bind(n,5688,23)),Promise.resolve().then(n.t.bind(n,9432,23)),Promise.resolve().then(n.t.bind(n,9324,23))},4587:(e,t,n)=>{"use strict";n.d(t,{I:()=>o,o:()=>d});var s=n(5155),a=n(2115);let r=(0,a.createContext)({language:"en",setLanguage:()=>{},t:()=>""}),i={en:{"login.title":"Research Project Management System","login.subtitle":"Huazhong University of Science and Technology","login.emailLabel":"University Email","login.passwordLabel":"Password","login.loginButton":"Login","login.forgotPassword":"Forgot Password?","login.studentLogin":"Student Login","login.instructorLogin":"Instructor Login","login.adminLogin":"Admin Login","login.rememberMe":"Remember me","nav.dashboard":"Dashboard","nav.courses":"Research Courses","nav.projects":"Projects","nav.publications":"Publications","nav.collaborators":"Collaborators","nav.aiMentor":"AI Research Mentor","nav.evaluation":"Research Evaluation","nav.researchNetwork":"Research Network","nav.settings":"Settings","nav.logout":"Logout","nav.search":"Search...","dashboard.welcome":"Welcome back","dashboard.overview":"Research Overview","dashboard.activeProjects":"Active Projects","dashboard.completedProjects":"Completed Projects","dashboard.upcomingDeadlines":"Upcoming Deadlines","dashboard.researchProgress":"Research Progress","dashboard.viewAll":"View All","dashboard.inProgress":"In Progress","dashboard.progress":"Progress","dashboard.upcomingEvents":"Upcoming Events","student.projectStatus":"Project Status","student.currentStep":"Current Step","student.nextDeadline":"Next Deadline","student.mentor":"Mentor","student.requestMeeting":"Request Meeting","student.submitWork":"Submit Work","student.step":"Step","student.aiMentorTitle":"AI Research Mentor","student.aiMentorDesc":"Get guidance on research methodology, literature searches, and publishing.","student.askAiMentor":"Ask AI Mentor","instructor.pendingReviews":"Pending Reviews","instructor.studentProgress":"Student Progress","instructor.publishTopic":"Publish New Topic","instructor.grantDeadlines":"Grant Deadlines","instructor.collaborationRequests":"Collaboration Requests","instructor.week":"Week","instructor.createNewTopic":"Create New Topic","instructor.publishTopicDesc":"Create a new research topic for students to explore.","admin.title":"Admin Dashboard","admin.activeMeetings":"Active Meetings","admin.activeInstructors":"Active Instructors","admin.activeStudents":"Active Students","admin.studentInstructorMeetings":"Student-Instructor Meetings","admin.dragAndDrop":"Drag and drop to reassign","admin.overview":"System Overview","admin.usersOnline":"Users Online","admin.pendingApprovals":"Pending Approvals","admin.systemStatus":"System Status","admin.scheduled":"Scheduled","admin.inProgress":"In Progress","admin.completed":"Completed","admin.studentName":"Student Name","admin.instructorName":"Instructor Name","admin.startTime":"Start Time","admin.duration":"Duration","admin.status":"Status","admin.actions":"Actions","admin.viewDetails":"View Details","admin.assignInstructor":"Assign Instructor"},zh:{"login.title":"科研项目管理系统","login.subtitle":"华中科技大学","login.emailLabel":"大学邮箱","login.passwordLabel":"密码","login.loginButton":"登录","login.forgotPassword":"忘记密码？","login.studentLogin":"学生登录","login.instructorLogin":"导师登录","login.adminLogin":"管理员登录","login.rememberMe":"记住我","nav.dashboard":"仪表盘","nav.courses":"科研课堂","nav.projects":"科研项目","nav.publications":"科研发表","nav.collaborators":"合作者","nav.aiMentor":"AI科研导师","nav.evaluation":"科研能力评估","nav.researchNetwork":"科研领英","nav.settings":"设置","nav.logout":"退出","nav.search":"搜索...","dashboard.welcome":"欢迎回来","dashboard.overview":"科研概览","dashboard.activeProjects":"正在进行中的项目","dashboard.completedProjects":"已经完成的项目","dashboard.upcomingDeadlines":"即将到来的截止日期","dashboard.researchProgress":"科研进度","dashboard.viewAll":"查看全部","dashboard.inProgress":"进行中","dashboard.progress":"进度","dashboard.upcomingEvents":"即将到来的事件","student.projectStatus":"项目状态","student.currentStep":"当前步骤","student.nextDeadline":"下一个截止日期","student.mentor":"导师","student.requestMeeting":"预约会议","student.submitWork":"提交作业","student.step":"步骤","student.aiMentorTitle":"AI科研导师","student.aiMentorDesc":"获取有关研究方法、文献检索和发表的指导。","student.askAiMentor":"咨询AI导师","instructor.pendingReviews":"待批改的作业","instructor.studentProgress":"学生进度","instructor.publishTopic":"发布新课题","instructor.grantDeadlines":"项目申请截止日期","instructor.collaborationRequests":"合作邀请","instructor.week":"周","instructor.createNewTopic":"创建新课题","instructor.publishTopicDesc":"创建新的研究课题供学生探索。","admin.title":"管理员仪表盘","admin.activeMeetings":"活跃会议","admin.activeInstructors":"在线导师","admin.activeStudents":"在线学生","admin.studentInstructorMeetings":"学生-导师会议","admin.dragAndDrop":"拖放以重新分配","admin.overview":"系统概览","admin.usersOnline":"在线用户","admin.pendingApprovals":"待批准","admin.systemStatus":"系统状态","admin.scheduled":"已安排","admin.inProgress":"进行中","admin.completed":"已完成","admin.studentName":"学生姓名","admin.instructorName":"导师姓名","admin.startTime":"开始时间","admin.duration":"时长","admin.status":"状态","admin.actions":"操作","admin.viewDetails":"查看详情","admin.assignInstructor":"分配导师"}},o=e=>{let{children:t}=e,[n,o]=(0,a.useState)("en");return(0,s.jsx)(r.Provider,{value:{language:n,setLanguage:o,t:e=>i[n][e]||e},children:t})},d=()=>(0,a.useContext)(r)},5688:e=>{e.exports={style:{fontFamily:"'Geist', 'Geist Fallback'",fontStyle:"normal"},className:"__className_5e7b51",variable:"__variable_5e7b51"}},9324:()=>{},9432:e=>{e.exports={style:{fontFamily:"'Geist Mono', 'Geist Mono Fallback'",fontStyle:"normal"},className:"__className_569121",variable:"__variable_569121"}}},e=>{var t=t=>e(e.s=t);e.O(0,[261,441,684,358],()=>t(3728)),_N_E=e.O()}]);