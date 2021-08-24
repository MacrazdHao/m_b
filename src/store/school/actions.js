import types from './types';
import urls from './urls';
import request from '../../utils/request';
import Enum from '../../utils/enum';

export default {
  getSchoolList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.schoolList(data.pageIndex, data.pageSize, data.keyword)).then(res => {
        console.log('获取学校列表成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取学校列表失败', err);
        reject(err);
      });
    });
  },
  getSchoolInfo: ({ commit, state }, orgId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.schoolInfo(orgId)).then(res => {
        console.log('获取学校信息成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取学校信息失败', err);
        reject(err);
      });
    });
  },
  getStudentList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.studentList(data.schoolId, data.pageIndex, data.pageSize, Enum.getLocalNodeType(data.nodeType), data.keyword)).then(res => {
        console.log('获取学生列表成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取学生列表失败', err);
        reject(err);
      });
    });
  },
  deleteSchool: ({ commit, state }, orgId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.deleteSchool(orgId)).then(res => {
        console.log('删除学校成功', res);
        resolve(res);
      }).catch(err => {
        console.log('删除学校失败', err);
        reject(err);
      });
    });
  },
  deleteStudent: ({ commit, state }, userId) => {
    return new Promise((resolve, reject) => {
      request.delete(urls.deleteStudent(userId)).then(res => {
        console.log('删除学生成功', res);
        resolve(res);
      }).catch(err => {
        console.log('删除学生失败', err);
        reject(err);
      });
    });
  },
  getSchoolTemplate: ({ commit, state }, schoolId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.getSchoolTemplate(schoolId)).then(res => {
        console.log('获取学校模板成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取学校模板失败', err);
        reject(err);
      });
    });
  },
  updateSchoolTemplate: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.updateSchoolTemplate, data).then(res => {
        console.log('保存学校模板成功', res);
        resolve(res);
      }).catch(err => {
        console.log('保存学校模板失败', err);
        reject(err);
      });
    });
  },
  getSchoolTemplateList: ({ commit, state }, schoolId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.schoolTemplateList(schoolId)).then(res => {
        console.log('获取学校模板列表成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取学校模板列表失败', err);
        reject(err);
      });
    });
  },
  getSchoolTemplateAllocateList: ({ commit, state }, schoolId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.schoolTemplateAllocateList(schoolId)).then(res => {
        console.log('获取学校模板分配列表成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取学校模板分配列表失败', err);
        reject(err);
      });
    });
  },
  saveSchoolTemplateAllocate: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.saveSchoolTemplateAllocate, data).then(res => {
        console.log('保存学校模板分配列表成功', res);
        resolve(res);
      }).catch(err => {
        console.log('保存学校模板分配列表失败', err);
        reject(err);
      });
    });
  },
  getStudentReportList: ({ commit, state }, userId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.studentReportList(userId)).then(res => {
        console.log('获取学生报告列表成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取学生报告列表失败', err);
        reject(err);
      });
    });
  },
  getStudentReport: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.studentReport(data.userId, data.nodeId)).then(res => {
        console.log('获取学生报告成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取学生报告失败', err);
        reject(err);
      });
    });
  },
}