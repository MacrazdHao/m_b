let schoolInfo = JSON.parse(localStorage.getItem('schoolInfo'));
let studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
export default {
  setSchoolInfo: (info) => {
    localStorage.setItem('schoolInfo', JSON.stringify(info));
    schoolInfo = info;
  },
  setStudentInfo: (info) => {
    localStorage.setItem('studentInfo', JSON.stringify(info));
    studentInfo = info;
  },
  getSchoolInfo: () => {
    return schoolInfo;
  },
  getStudentInfo: () => {
    return studentInfo;
  },
  clearSchoolInfo: () => {
    localStorage.removeItem('schoolInfo');
    schoolInfo = null;
  },
  clearStudentInfo: () => {
    localStorage.removeItem('studentInfo');
    studentInfo = null;
  }
}