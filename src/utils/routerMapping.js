
/*
{
  '远程路由': {
    path: "本地路由",
    name: "路由名称",
    component: "页面路径",
    meta: {
      // 附加信息
      title: "标题",
      enTitle: "英文标题",
      icon: "index目录下的icon",
      hideHeaderTitle: 是否隐藏头部的菜单（需要完全自定义头部时使用）
      notShowInMenu: 是否在菜单下显示该路由,
      notShowChildren: 是否在菜单下显示子菜单,
      notShowThisChild: 作为子子级是否显示在父级的子菜单中
      group: （自定义）子子级特殊分组标识，和notShowThisChild配合使用（B作为A子级，但实际路由级别又与A同级的情况下使用）
      groupParent: （自定义）同一分组下的主路由（入口）,
      type: 一模多用时，用于区分使用该模板的不同页面的特殊标识,
      defaultPrevPath: （数组）默认上级页面的路径，用于无历史操作时的$router返回操作
      defaultPrevName: （数组）默认上级页面的名称，用于无历史操作时的$router返回操作
      showTopParentTitleInHeader: 用于子子级页面，可以添加于子级页面统一设置子子级，也可添加于子子级页面单独设置，访问子子级页面时标题栏显示最上级（子级）路由的title，可以添加于子级页面统一设置子子级，也可添加于子子级页面单独设置
      showChildTitleInHeaderWithParentTitle: 用于子子级页面，可以添加于子级页面统一设置子子级，也可添加于子子级页面单独设置，与showTopParentTitleInHeader联用，访问子子级页面时标题栏显示最上级（子级）路由的title，同时后续会并接当前子子级页面的标题
    }
  }
}

注：请尽量避免使用group参数，含有group结构的一系列页面将互相绑定，不可以将之随意拆分来组建路由，会影响全局动态路由的耦合度
*/

// 路由映射表(一级结构，单元化，预留可自定义菜单功能——即可编辑子菜单的父级关系)
export default {
  // 顶级
  '/reportModule': {
    path: "/reportModule",
    name: "reportModule",
    component: "ReportModule",
    // redirect: 'base',
    meta: {
      // defaultPrevPath: ["", "/counseling", "/live"],
      defaultPrevName: ["index", "counseling", "live"],
    }
  },
  // 顶级
  '/living': {
    path: '/living',
    name: 'living',
    component: 'Living',
    meta: {
      // defaultPrevPath: ["", "/consultLive", "/live"],
      defaultPrevName: ["index", "consultLive", "live"],
    }
    // redirect: 'dashboard',
  },
  // 顶级
  '/estuaryLiving': {
    path: '/estuaryLiving',
    name: 'estuaryLiving',
    component: 'EstuaryLiving',
    meta: {
      // defaultPrevPath: ["", "/consultLive", "/live"],
      defaultPrevName: ["index"],
    }
    // redirect: 'dashboard',
  },
  // 顶级
  '/index': {
    path: '/index',
    name: 'index',
    component: 'index',
    meta: {

    }
    // redirect: 'dashboard',
  },
  // 子级
  '/dashboard': {
    path: "dashboard",
    name: "dashboard",
    component: "Dashboard",
    meta: {
      title: '工作台',
      enTitle: 'Dashboard',
      icon: "icon_workbench",
      notShowChildren: true
    }
  },
  // 子子级
  '/studentDashboard': {
    path: "studentDashboard",
    name: "studentDashboard",
    component: "pages/student",
    meta: {
      title: '工作台',
      enTitle: 'Dashboard',
      icon: "icon_workbench",
    }
  },
  // 子子级
  '/schoolDashboard': {
    path: "schoolDashboard",
    name: "schoolDashboard",
    component: "pages/school",
    meta: {
      title: '工作台',
      enTitle: 'Dashboard',
      icon: "icon_workbench",
    }
  },
  // 子子级
  '/adminDashboard': {
    path: "adminDashboard",
    name: "adminDashboard",
    component: "pages/admin",
    meta: {
      title: '工作台',
      enTitle: 'Dashboard',
      icon: "icon_workbench",
    }
  },
  // 子子级
  '/schedules': {
    path: "schedules",
    name: "schedules",
    component: "pages/schedules",
    meta: {
      title: '工作台',
      enTitle: 'Dashboard',
      icon: "icon_workbench",
    }
  },
  // 子级
  '/counseling': {
    path: "counseling",
    name: "counseling",
    component: "Counseling",
    meta: {
      title: '生涯辅导',
      enTitle: 'Career Consultation',
      icon: "icon_counseling",
      notShowChildren: true
    }
  },
  // 子子级
  '/baseInfo': {
    path: "baseInfo",
    name: "baseInfo",
    component: "pages/baseInfo",
    meta: {
      title: '生涯辅导',
      enTitle: 'Career Consultation',
      icon: "icon_counseling",
    }
  },
  // 子子级
  '/onlineTest': {
    path: "onlineTest",
    name: "onlineTest",
    component: "pages/test",
    meta: {
      title: '生涯辅导',
      enTitle: 'Career Consultation',
      icon: "icon_counseling",
    }
  },
  // 子子级
  '/consultLive': {
    path: "consultLive",
    name: "consultLive",
    component: "pages/match",
    meta: {
      title: '生涯辅导',
      enTitle: 'Career Consultation',
      icon: "icon_counseling",
    }
  },
  // 子子级
  '/getReport': {
    path: "getReport",
    name: "getReport",
    component: "pages/report",
    meta: {
      title: '生涯辅导',
      enTitle: 'Career Consultation',
      icon: "icon_counseling",
    }
  },
  // 子级
  '/knowledge': {
    path: "knowledge",
    name: "knowledge",
    component: "Knowledge",
    meta: {
      title: '知识中心',
      enTitle: 'Knowledge Center',
      icon: "icon_knowledge",

    }
  },
  // 子级
  '/students': {
    path: "students",
    name: "students",
    component: "Students",
    meta: {
      title: '学生管理',
      enTitle: 'Student Management',
      icon: "icon_student",
      notShowChildren: true
    }
  },
  // 子子级
  '/studentsList': {
    path: "studentsList",
    name: "studentsList",
    component: "pages/list",
    meta: {
      title: '学生管理',
      enTitle: 'Student Management',
      icon: "icon_student",
    }
  },
  // 子子级
  '/studentsDetail': {
    path: "studentsDetail",
    name: "studentsDetail",
    component: "pages/detail",
    meta: {
      title: '学生管理',
      enTitle: 'Student Management',
      icon: "icon_student",
    }
  },
  // 子子级
  '/studentsProcess': {
    path: "studentsProcess",
    name: "studentsProcess",
    component: "pages/process",
    meta: {
      title: '学生管理',
      enTitle: 'Student Management',
      icon: "icon_student",
    }
  },
  // 子级
  '/archives': {
    path: "archives",
    name: "archives",
    component: "Archives",
    meta: {
      title: '生涯档案',
      enTitle: 'Career Profile',
      icon: "icon_archives",
      notShowChildren: true
    }
  },
  // 子子级
  '/archivesList': {
    path: "archivesList",
    name: "archivesList",
    component: "pages/list",
    meta: {
      title: '生涯档案',
      enTitle: 'Career Profile',
      icon: "icon_archives",
    }
  },
  // 子子级
  '/archivesDetail': {
    path: "archivesDetail",
    name: "archivesDetail",
    component: "pages/detail",
    meta: {
      title: '生涯档案',
      enTitle: 'Career Profile',
      icon: "icon_archives",
    }
  },
  // 子级
  '/messages': {
    path: "messages",
    name: "messages",
    component: "Messages",
    meta: {
      title: '系统通知',
      enTitle: 'System Messages',
      icon: "icon_knowledge",
      notShowInMenu: true,
    }
  },
  // 子级
  '/personal': {
    path: "personal",
    name: "personal",
    component: "Personal",
    // redirect: 'base',
    meta: {
      title: '个人中心',
      enTitle: 'Personal Center',
      icon: "icon_knowledge",
      notShowInMenu: true,
      showTopParentTitleInHeader: true,
    }
  },
  // 子子级
  '/studentBase': {
    path: "base",
    name: "base",
    component: "pages/base",
    meta: {
      title: "基本设置",
      enTitle: "Base Setting",
    }
  },
  // 子子级
  '/schoolBase': {
    path: "sbase",
    name: "sbase",
    component: "pages/sbase",
    meta: {
      title: "基本设置",
      enTitle: "Base Setting",
    }
  },
  // 子子级
  '/consultantBase': {
    path: "cbase",
    name: "cbase",
    component: "pages/cbase",
    meta: {
      title: "基本设置",
      enTitle: "Base Setting",
    }
  },
  // 子子级
  '/adminBase': {
    path: "abase",
    name: "abase",
    component: "pages/abase",
    meta: {
      title: "基本设置",
      enTitle: "Base Setting",
    }
  },
  // 子子级
  '/account': {
    path: "account",
    name: "account",
    component: "pages/account",
    meta: {
      title: "账号设置",
      enTitle: "Account Setting",
    }
  },
  // 子子级
  '/safe': {
    path: "safe",
    name: "safe",
    component: "pages/safe",
    meta: {
      title: "安全设置",
      enTitle: "Safe Setting",
    }
  },
  // 子级
  '/accounts': {
    path: "accounts",
    name: "accounts",
    component: "Accounts",
    // redirect: 'base',
    meta: {
      title: '账号管理',
      enTitle: 'Account Management',
      icon: "icon_accounts",
      notShowChildren: true,
      showTopParentTitleInHeader: true,
    }
  },
  // 子子级
  '/schoolaccount': {
    path: "schoolaccount",
    name: "schoolaccount",
    component: "pages/school",
    meta: {
      title: "学校设置",
      enTitle: "School Setting",
    }
  },
  // 子子级
  '/admin': {
    path: "admin",
    name: "admin",
    component: "pages/admin",
    meta: {
      title: "管理员设置",
      enTitle: "Admin Setting",
    }
  },
  // 子子级
  '/teacher': {
    path: "teacher",
    name: "teacher",
    component: "pages/teacher",
    meta: {
      title: "老师账号",
      enTitle: "Teacher Account",
    }
  },
  // 子子级
  '/accountlist': {
    path: "accountlist",
    name: "accountlist",
    component: "pages/accountlist",
    meta: {
      title: "账号管理",
      enTitle: "Account Management",
      type: "teacher"
    }
  },
  // 子子级
  '/adminaccountlist': {
    path: "adminaccountlist",
    name: "adminaccountlist",
    component: "pages/accountlist",
    meta: {
      title: "管理员账号管理",
      enTitle: "Account Management",
      type: "admin"
    }
  },
  // 子子级
  '/schoolaccountlist': {
    path: "schoolaccountlist",
    name: "schoolaccountlist",
    component: "pages/accountlist",
    meta: {
      title: "学校账号管理",
      enTitle: "Account Management",
      type: "school"
    }
  },
  // 子子级
  '/invitation': {
    path: "invitation",
    name: "invitation",
    component: "pages/invitation",
    meta: {
      title: "邀请码",
      enTitle: "Invitation Code",
    }
  },
  // 子级
  '/live': {
    path: "live",
    name: "live",
    component: "Live",
    // redirect: 'testing1',
    meta: {
      title: "直播咨询",
      enTitle: 'Live Consultation',
      icon: "icon_live",
    }
  },
  // 子级
  '/files': {
    path: "files",
    name: "files",
    component: "Files",
    // redirect: 'testing1',
    meta: {
      title: "学生档案",
      enTitle: 'Student Profile',
      icon: "icon_files",
      notShowChildren: true
    }
  },
  // 子子级
  '/filesList': {
    path: "filesList",
    name: "filesList",
    component: "pages/list",
    meta: {
      title: "学生档案",
      enTitle: 'Student Profile',
      icon: "icon_files",
    }
  },
  // 子子级
  '/filesDetail': {
    path: "filesDetail",
    name: "filesDetail",
    component: "pages/detail",
    meta: {
      title: "学生档案",
      enTitle: 'Student Profile',
      icon: "icon_files",
    }
  },
  // 子级
  '/management': {
    path: "management",
    name: "management",
    component: "Management",
    // redirect: 'testing1',
    meta: {
      title: "档案管理",
      enTitle: 'File Management',
      icon: "icon_management",
      showTopParentTitleInHeader: true,
      showChildTitleInHeaderWithParentTitle: true,
    }
  },
  // 子子级
  '/counselinglist': {
    path: "counselinglist",
    name: "counselinglist",
    component: "pages/counselingList",
    meta: {
      title: "生涯档案",
      enTitle: "Career Profile",
      group: "counseling",
      groupParent: true
    }
  },
  // 子子级
  '/counselingDetail': {
    path: "counselingDetail",
    name: "counselingDetail",
    component: "pages/counselingDetail",
    meta: {
      title: "生涯档案",
      enTitle: "Career Profile",
      notShowThisChild: true,
      group: "counseling",
      groupParent: false,
      // defaultPrevPath: ["/management/counselinglist"],
      defaultPrevName: ["counselinglist"],
    }
  },
  // 子子级
  '/careerlist': {
    path: "careerlist",
    name: "careerlist",
    component: "pages/careerList",
    meta: {
      title: "职业发展咨询",
      enTitle: "Career Consult",
      group: "career",
      groupParent: true
    }
  },
  // 子子级
  '/careerDetail': {
    path: "careerDetail",
    name: "careerDetail",
    component: "pages/careerDetail",
    meta: {
      title: "职业发展咨询",
      enTitle: "Career Consult",
      notShowThisChild: true,
      group: "career",
      groupParent: false,
      defaultPrevName: ["careerlist"],
    }
  },
  // 子子级
  '/courselist': {
    path: "courselist",
    name: "courselist",
    component: "pages/courseList",
    meta: {
      title: "大学课程和学科咨询",
      enTitle: "Course&Subject Consult",
      group: "course",
      groupParent: true
    }
  },
  // 子子级
  '/courseDetail': {
    path: "courseDetail",
    name: "courseDetail",
    component: "pages/courseDetail",
    meta: {
      title: "大学课程和学科咨询",
      enTitle: "Course&Subject Consult",
      notShowThisChild: true,
      group: "course",
      groupParent: false,
      defaultPrevName: ["courselist"],
    }
  },
  // 子级
  '/school': {
    path: "school",
    name: "school",
    component: "School",
    // redirect: 'testing1',
    meta: {
      title: "学校管理",
      enTitle: 'School Management',
      icon: "icon_school",
      notShowChildren: true

    }
  },
  // 子子级
  '/schoollist': {
    path: "schoollist",
    name: "schoollist",
    component: "pages/school",
    meta: {
      title: "学校管理",
      enTitle: 'School Management',
    }
  },
  // 子子级
  '/student': {
    path: "student",
    name: "student",
    component: "pages/students",
    meta: {
      title: "学校管理",
      enTitle: "School Management",
      // defaultPrevPath: ["/school/schoollist"],
      defaultPrevName: ["schoollist"],
    }
  },
  // 子子级
  '/sdetail': {
    path: "sdetail",
    name: "sdetail",
    component: "pages/detail",
    meta: {
      title: "学校管理",
      enTitle: "School Management",
      // defaultPrevPath: ["/school/student"],
      defaultPrevName: ["student"],
    }
  },
  // 子子级
  '/templateList': {
    path: "templateList",
    name: "templateList",
    component: "pages/templateList",
    meta: {
      title: "学校管理",
      enTitle: "School Management",
      // defaultPrevPath: ["/school/student"],
      defaultPrevName: ["schoollist"],
    }
  },
  // 子子级
  '/templateAllocate': {
    path: "templateAllocate",
    name: "templateAllocate",
    component: "pages/templateAllocate",
    meta: {
      title: "学校管理",
      enTitle: "School Management",
      // defaultPrevPath: ["/school/student"],
      defaultPrevName: ["schoollist"],
    }
  },
  // 子级
  '/modules': {
    path: "modules",
    name: "modules",
    component: "Modules",
    // redirect: 'testing1',
    meta: {
      title: "模板设置",
      enTitle: 'Modules Management',
      icon: "icon_modules",
      notShowChildren: true
    }
  },
  // 子子级
  '/modulelist': {
    path: "modulelist",
    name: "modulelist",
    component: "pages/list",
    meta: {
      title: "模板设置",
      enTitle: 'Modules Management',
    }
  },
  // 子子级
  '/editModule': {
    path: "editModule",
    name: "editModule",
    component: "pages/edit",
    meta: {
      title: "模板设置",
      enTitle: 'Modules Management',
      // defaultPrevPath: ["/school/schoollist"],
      defaultPrevName: ["modulelist"],
    }
  },
  // 子级
  '/consultant': {
    path: "consultant",
    name: "consultant",
    component: "Consultant",
    meta: {
      title: "咨询师管理",
      enTitle: 'Counselor Management',
      icon: "icon_consultant",
    }
  },
  // 子级
  '/estuaryConsultant': {
    path: "estuaryConsultant",
    name: "estuaryConsultant",
    component: "EstuaryConsultant",
    meta: {
      title: "菁英计划",
      enTitle: 'Estuary',
      icon: "icon_estuary",
    }
  },
  // 子级
  '/estuaryStudent': {
    path: "estuaryStudent",
    name: "estuaryStudent",
    component: "EstuaryStudent",
    meta: {
      title: "菁英计划",
      enTitle: 'Estuary',
      icon: "icon_estuary",
      showTopParentTitleInHeader: true,
      showChildTitleInHeaderWithParentTitle: true,
    }
  },
  // 子子级
  '/estuaryStudentBase': {
    path: "estuaryStudentBase",
    name: "estuaryStudentBase",
    component: "pages/base",
    meta: {
      title: "基本信息",
      enTitle: 'Basic Info',
      icon: "icon_estuary",
    }
  },
  // 子子级
  '/estuaryStudentLive': {
    path: "estuaryStudentLive",
    name: "estuaryStudentLive",
    component: "pages/live",
    meta: {
      title: "菁英咨询",
      enTitle: 'Estuary Consult',
      icon: "icon_estuary",
    }
  },
  // 子级
  '/estuary': {
    path: "estuary",
    name: "estuary",
    component: "Estuary",
    meta: {
      title: "菁英计划",
      enTitle: 'Estuary',
      icon: "icon_estuary",
    }
  },
  // 子子级
  '/estuaryStudents': {
    path: "estuaryStudents",
    name: "estuaryStudents",
    component: "pages/students",
    meta: {
      title: "学生信息",
      enTitle: ' Consultation Students',
      icon: "icon_estuary",
      showTopParentTitleInHeader: true,
      showChildTitleInHeaderWithParentTitle: true,
    }
  },
  // 子子级
  '/estuaryRecords': {
    path: "estuaryRecords",
    name: "estuaryRecords",
    component: "pages/records",
    meta: {
      title: "咨询记录",
      enTitle: ' Consultation Records',
      icon: "icon_estuary",
      showTopParentTitleInHeader: true,
      showChildTitleInHeaderWithParentTitle: true,
    }
  },
  // 子级
  '/playback': {
    path: "playback",
    name: "playback",
    component: "Playback",
    meta: {
      title: "咨询回看",
      enTitle: 'Consultation Playback',
      icon: "icon_playback",
    }
  },
  // 子级
  '/testing': {
    path: "testing",
    name: "testing",
    component: "Testing",
    // redirect: 'testing1',
    meta: {
      title: "测试主页",
      enTitle: 'Test Index',
      icon: "icon_workbench",

    }
  },
  // 子子级
  '/testing1': {
    path: "testing1",
    name: "testing1",
    component: "pages/testing1",
    meta: {
      title: "测试子页1",
      enTitle: "Test Page1",
    }
  },
  // 子子级
  '/testing2': {
    path: "testing2",
    name: "testing2",
    component: "pages/testing2",
    meta: {
      title: "测试子页2",
      enTitle: "Test Page2",
    }
  },
  // 顶级
  '/error': {
    path: "*",
    name: "error",
    component: "Error",
  },
  // 子级
  '/404': {
    path: "/Error404",
    name: "Error404",
    component: "Error404",
  }
}