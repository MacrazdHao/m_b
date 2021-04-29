let schoolInfo = JSON.parse(localStorage.getItem('schoolInfo-school'));
let studentInfo = JSON.parse(localStorage.getItem('studentInfo-school'));
export default {
  setSchoolInfo: (info) => {
    localStorage.setItem('schoolInfo-school', JSON.stringify(info));
    schoolInfo = info;
  },
  setStudentInfo: (info) => {
    localStorage.setItem('studentInfo-school', JSON.stringify(info));
    studentInfo = info;
  },
  getSchoolInfo: () => {
    return schoolInfo;
  },
  getStudentInfo: () => {
    return studentInfo;
  },
  clearSchoolInfo: () => {
    localStorage.removeItem('schoolInfo-school');
    schoolInfo = null;
  },
  clearStudentInfo: () => {
    localStorage.removeItem('studentInfo-school');
    studentInfo = null;
  }
}