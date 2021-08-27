# utils文件说明
| 文件名           | 说明                                               |
| ---------------- | -------------------------------------------------- |
| language         | i18n语言包                                         |
| auth.js          | 认证信息Cookie管理                                 |
| config.js        | 服务端信息管理                                     |
| date.js          | 日期相关函数                                       |
| default.js       | 全局使用的默认值                                   |
| dynamic.js       | 动态路由生成中间件                                 |
| enum.js          | 服务端枚举值管理                                   |
| html2pdf.js      | 网页转pdf工具                                      |
| languageJSON.js  | 获取语言JSON文件                                   |
| others.js        | 其他（未分类）工具，如字母、数字、中文数字互转函数 |
| permission.js    | 用户(页面)权限管理中间件                           |
| regExp.js        | 正则表达式管理                                     |
| request.js       | 网络请求封装包                                     |
| routerMapping.js | 页面路由表                                         |
| validate.js      | 暂为冗余文件                                       |
| vcodeTimer.js    | 全局手机/邮箱验证码发送及其计时器管理              |

* 附带工具：

  json转xml：
  https://www.json-xls.com/edit/Index

  languageJSON生成文件配合使用

# 注意事项

  * 翻译文案中的key不要使用和语言key相同的字符串，否则会引起测试工具中的语言文案筛选工具的生成结果