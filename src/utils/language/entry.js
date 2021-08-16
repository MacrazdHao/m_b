export default {
  zh: {
    school: '学校',
    student: '学生',
    consultant: '咨询师',
    login: {
      adminLoginTitle: '管理员登陆',
      loginTitle: '登录账号',
      registerButton: '注册',
      parentsButton: '家长账号登陆',
      school: {
        usernamePlaceholder: '请输入账号',
        passwordPlaceholder: '请输入密码',
      },
      student: {
        usernamePlaceholder: '请输入邮箱账号',
        passwordPlaceholder: '请输入密码',
      },
      parents: {
        usernamePlaceholder: '请输入家长账号',
        passwordPlaceholder: '请输入密码',
      },
      consultant: {
        usernamePlaceholder: '请输入邮箱账号',
        passwordPlaceholder: '请输入密码',
      },
      admin: {
        usernamePlaceholder: '请输入账号',
        passwordPlaceholder: '请输入密码',
      },
      rememberTips: '保持登录状态7天',
      forgetTips: '忘记密码？',
      forgetButton: '找回密码',
      loginButton: '登陆',
      alertTips: {
        loginErrorTips: '账号或密码错误，请重试',
        usernameErrorTips: '请输入有效的账号或邮箱地址',
        passwordErrorTips: '请输入有效的密码',
      }
    },
    register: {
      registerTitle: '注册账号',
      emailPlaceholder: '请输入邮箱',
      nextButton: '下一步',
      registerButton: '注册',
      sendEmailTips: '我们已向您的邮箱 {email}',
      sendEmailTips2: '发送了一封邮件验证码，请您注意接收邮件',
      codePlaceholder: '请输入验证码',
      passwordPlaceholder: '请输入密码，长度8-20位',
      cPasswordPlaceholder: '请确认密码',
      student: {
        iCodePlaceholder: '请输入学校邀请码',
      },
      consultant: {
        iCodePlaceholder: '请输入咨询师邀请码',
      },
      errorTips: {
        password: '密码长度8-20位，包含大小写字母，并且至少包含数字和符号中的一种',
        cPassword: '密码不一致',
        iCode: '邀请码错误',
      },
      alertTips: {
        emailEmptyTips: '请输入有效的邮箱地址',
        codeEmptyTips: '请输入有效的验证码',
        passwordEmptyTips: '请输入有效的密码',
        cPasswordEmptyTips: '请输入再次输入您的密码',
        iCodeEmptyTips: '请输入有效的邀请码'
      }
    },
    forget: {
      forgetTitle: '忘记密码',
      nextButton: '下一步',
      school: {
        emailPlaceholder: '请输入绑定的邮箱',
        contactTips: '如没有绑定的邮箱',
        contactButton: '点击联系管理员',
      },
      student: {
        emailPlaceholder: '请输入邮箱',
      },
      consultant: {
        emailPlaceholder: '请输入邮箱',
      },
      alertTips: {
        emailEmptyTips: '请输入有效的邮箱地址',
      },
      sendingCodeErrorTips: '稍安勿躁，验证码正在发送中',
      sendCodeSuccessTips: '发送验证码成功',
      sendCodeFailTips: '发送验证码失败，请重试'
    },
    reset: {
      resetTitle: '重置密码',
      sendEmailTips: '我们已向您的邮箱 {email}',
      sendEmailTips2: '发送了一封邮件验证码，请您注意接收邮件',
      codePlaceholder: '请输入验证码',
      passwordPlaceholder: '请输入密码，长度8-20位',
      cPasswordPlaceholder: '请确认密码',
      errorTips: {
        password: '密码长度8-20位，包含大小写字母，并且至少包含数字和符号中的一种',
        cPassword: '密码不一致'
      },
      school: {
        contactTips: '普通用户重置密码，信息将反馈给到管理员；',
        contactTips2: '如是超级管理员重置密码，请与技术人员联系',
        usernamePlaceholder: '请输入账号'
      },
      alertTips: {
        emailEmptyTips: '请输入有效的邮箱地址',
        usernameEmptyTips: '请输入有效的账号',
        codeEmptyTips: '请输入有效的验证码',
        passwordEmptyTips: '请输入有效的密码',
        cPasswordEmptyTips: '请输入再次输入您的密码',
      },
      resetButton: '重置',
      resetSuccessTips: '密码已重置，请进行登录',
      resetFailTips: '密码重置失败，请重试',
      contactAdminSuccessTips: '已为您向管理员反馈，请留意后续通知',
      contactAdminFailTips: '反馈失败，请重试',
    }
  },
  en: {
    school: 'school',
    student: 'student',
    consultant: 'counselor',
    login: {
      adminLoginTitle: 'Admin Log In',
      loginTitle: 'Account Login',
      registerButton: 'Register',
      parentsButton: 'Parental Account Log In',
      school: {
        usernamePlaceholder: 'Please Enter Your Account',
        passwordPlaceholder: 'Please Enter Password',
      },
      student: {
        usernamePlaceholder: 'Please Enter Your Email',
        passwordPlaceholder: 'Please Enter Password',
      },
      parents: {
        usernamePlaceholder: 'Please Enter Your Parent\'s Account',
        passwordPlaceholder: 'Please Enter Password',
      },
      consultant: {
        usernamePlaceholder: 'Please Enter Your Email',
        passwordPlaceholder: 'Please Enter Password',
      },
      admin: {
        usernamePlaceholder: 'Please Enter Your Account',
        passwordPlaceholder: 'Please Enter Password',
      },
      rememberTips: 'Stay Logged In For 7 Days',
      forgetTips: 'Forgot Your Password?',
      forgetButton: 'Find Your Password',
      loginButton: 'Login',
      alertTips: {
        loginErrorTips: 'Wrong Account/Password, Please Retry',
        usernameErrorTips: 'Please Enter Your Account/Email Address Correctly',
        passwordErrorTips: 'Please Enter Valid Password',
      }
    },
    register: {
      registerTitle: 'register account',
      emailPlaceholder: 'please enter email',
      nextButton: 'next step',
      registerButton: 'Register',
      sendEmailTips: 'Email Sent To {email}',
      sendEmailTips2: 'Verification email sent successfully',
      codePlaceholder: 'Please Enter Verification Code',
      passwordPlaceholder: 'Please Enter Password, 8-20 characters long',
      cPasswordPlaceholder: 'Please Confirm Password',
      student: {
        iCodePlaceholder: 'please enter your invitation code',
      },
      consultant: {
        iCodePlaceholder: 'Please enter counselor invitation code',
      },
      errorTips: {
        password: 'The password is 8-20 characters long, contains uppercase and lowercase letters, and contains at least one of numbers and symbols',
        cPassword: 'inconsistent',
        iCode: 'invitation code error',
      },
      alertTips: {
        emailEmptyTips: 'Please Enter Valid Email Address',
        codeEmptyTips: 'Please Enter Valid Verification Code',
        passwordEmptyTips: 'Please Enter Valid Password',
        cPasswordEmptyTips: 'Please Retype Your Password',
        iCodeEmptyTips: 'please enter valid verification code'
      }
    },
    forget: {
      forgetTitle: 'forget password',
      nextButton: 'next step',
      school: {
        emailPlaceholder: 'please enter bound email',
        contactTips: 'If there is no bound email',
        contactButton: 'click to contact admin',
      },
      student: {
        emailPlaceholder: 'please enter email',
      },
      consultant: {
        emailPlaceholder: 'please enter email',
      },
      alertTips: {
        emailEmptyTips: 'Please Enter Valid Email Address',
      },
      sendingCodeErrorTips: 'please wait, the verification code is being processed',
      sendCodeSuccessTips: 'verification code sent successfully',
      sendCodeFailTips: 'Send verify code error, please try again'
    },
    reset: {
      resetTitle: 'Reset Password',
      sendEmailTips: 'Email Sent To {email}',
      sendEmailTips2: 'verification email sent successfully',
      codePlaceholder: 'Please Enter Verification Code',
      passwordPlaceholder: 'Please Enter Password, 8-20 characters long',
      cPasswordPlaceholder: 'Please Confirm Password',
      errorTips: {
        password: 'The password is 8-20 characters long, contains uppercase and lowercase letters, and contains at least one of numbers and symbols',
        cPassword: 'inconsistent'
      },
      school: {
        contactTips: 'User Reset Password, Will Contact Admin',
        contactTips2: 'Admin Reset Password, Please Contact Tech Support',
        usernamePlaceholder: 'Please Enter Your Account'
      },
      alertTips: {
        emailEmptyTips: 'Please Enter Valid Email Address',
        usernameEmptyTips: 'Please Enter Valid Account',
        codeEmptyTips: 'Please Enter Valid Verification Code',
        passwordEmptyTips: 'Please Enter Valid Password',
        cPasswordEmptyTips: 'Please Retype Your Password',
      },
      resetButton: 'Reset',
      resetSuccessTips: 'Password Reset Successfully, Please Login',
      resetFailTips: 'Reset Password Failed, Please Retry',
      contactAdminSuccessTips: 'Contact Admin Succesfully, Please Wait For Further Contact',
      contactAdminFailTips: 'Contact Admin Failed, Please Retry',
    }
  }
}