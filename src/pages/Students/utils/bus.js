let studentInfo = JSON.parse(localStorage.getItem('studentsInfo'));
export default {
  setStudentInfo: (info) => {
    localStorage.setItem('studentsInfo', JSON.stringify(info));
    studentInfo = info;
  },
  getStudentInfo: () => {
    return studentInfo;
  },
  clearStudentInfo: () => {
    localStorage.removeItem('studentsInfo');
    studentInfo = null;
  }
}