export default {
  zh: {
    title: '学生管理',
    list: {
      statusPlaceholder: '状态',
      searchPlaceholder: '请输入搜索的内容',
      searchButton: '搜索',
      distributeButton: '咨询分配',
      exportExcelButton: '导入Excel',
      getTemplateListErrorTips: '获取模板列表失败，请重试',
      setTemplateErrorTips: '编号 {code} 学生 {name} 分配失败，请重试',
      setTemplateSuccessTips: '编号 {code} 学生 {name} 分配成功',
      selectNoTemplateTips: '请至少选择一个模板',
      selectNoStudentsTips: '请至少选择一名学生',
      table: {
        school: "学校",
        schoolCode: "学校编号",
        code: '编号',
        name: "姓名",
        grade: "年级",
        sex: "性别",
        country: "国籍",
        score:
          "各科成绩",
        selfAssess:
          "自我评价",
        extraStudy: "课外学习",
        books:
          "看书类目",
        sports: "运动爱好",
        status: "状态",
        consultStatusText0: '未开始',
        consultStatusText1: '职业发展咨询',
        consultStatusText2: '大学课程和学科咨询',
        consultStatusText3: '大学建议和偏好咨询',
        consultStatusText4: '完成生涯档案',
        options: "操作",
        moreButton: "更多",
        watchButton: '查看',
        editButton: '编辑',
        optionsMenu: {
          watchButton: '查看信息',
          processButton: '阶段分配'
        }
      }
    },
    detail: {
      studentCode: "学生编号",
      getStudentInfoFail: '获取学生信息失败，请重试',
      noScoreTips: '暂无该学生的成绩信息',
      backButton: '返回',
      careerConsult: '生涯咨询',
      consultLabel0: '职业发展咨询',
      consultLabel1: '大学课程和学科咨询',
      consultLabel2: '大学建议和偏好咨询',
    },
    process: {
      processTitle: '阶段分配',
      processLabel: '阶段设置',
      step1: '职业发展咨询',
      step2: '大学课程和学科咨询',
      step3: '大学建议和偏好咨询',
      cancelButton: '取消',
      saveButton: '保存'
    }
  },
  en: {
    title: 'student management',
    list: {
      statusPlaceholder: 'status',
      searchPlaceholder: 'Please enter your search',
      searchButton: 'search',
      distributeButton: 'Consultancy Allocation',
      exportExcelButton: 'Import Excel',
      getTemplateListErrorTips: 'Failed To Obtain Template List, Please Retry',
      setTemplateErrorTips: '{Code}{Name) Matched Unsuccessfully, Please Retry',
      setTemplateSuccessTips: '{Code} {Name) Matched Successfully',
      selectNoTemplateTips: 'Please Select Your Template',
      selectNoStudentsTips: 'Please Select Your Student',
      table: {
        school: "school",
        schoolCode: "school code",
        code: "No.",
        name: "name",
        grade: "grade",
        sex: "gender",
        country: "country",
        score:
          "academic scoresheet",
        selfAssess:
          "Self-evaluation",
        extraStudy: "Extra-curricular program",
        books:
          "reading type",
        sports: "sporting hobbies",
        status: "status",
        consultStatusText0: 'Not started',
        consultStatusText1: 'Career Consultation',
        consultStatusText2: 'Acadmic Advisory',
        consultStatusText3: 'University exploration and suggestions',
        consultStatusText4: 'Complete career profile',
        options: "Operation",
        moreButton: "more",
        watchButton: 'View',
        editButton: 'edit',
        optionsMenu: {
          watchButton: 'View information',
          processButton: 'process allocation'
        }
      }
    },
    detail: {
      studentCode: "学生编号",
      getStudentInfoFail: '获取学生信息失败，请重试',
      noScoreTips: '暂无该学生的成绩信息',
      backButton: 'return',
      careerConsult: '生涯咨询',
      consultLabel0: 'Career Consultation',
      consultLabel1: 'Acadmic Advisory',
      consultLabel2: 'University exploration and suggestions',
    },
    process: {
      processTitle: 'process allocation',
      processLabel: 'phase settings',
      step1: 'Career Consultation',
      step2: 'Acadmic Advisory',
      step3: 'University exploration and suggestions',
      cancelButton: 'cancel',
      saveButton: 'save'
    }
  }
}