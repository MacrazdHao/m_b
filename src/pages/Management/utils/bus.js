let studentInfo_counseling = JSON.parse(localStorage.getItem('studentsInfo-management-counseling'));
let studentInfo_career = JSON.parse(localStorage.getItem('studentsInfo-management-career'));
export default {
  setStudentInfo_counseling: (info) => {
    localStorage.setItem('studentsInfo-management-counseling', JSON.stringify(info));
    studentInfo_counseling = info;
  },
  getStudentInfo_counseling: () => {
    return studentInfo_counseling;
  },
  clearStudentInfo_counseling: () => {
    localStorage.removeItem('studentsInfo-management-counseling');
    studentInfo_counseling = null;
  },
  setStudentInfo_career: (info) => {
    localStorage.setItem('studentsInfo-management-career', JSON.stringify(info));
    studentInfo_career = info;
  },
  getStudentInfo_career: () => {
    return studentInfo_career;
  },
  clearStudentInfo_career: () => {
    localStorage.removeItem('studentsInfo-management-career');
    studentInfo_career = null;
  }
}