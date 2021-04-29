let studentInfo = JSON.parse(localStorage.getItem('studentsInfo-files'));
export default {
  setStudentInfo: (info) => {
    localStorage.setItem('studentsInfo-files', JSON.stringify(info));
    studentInfo = info;
  },
  getStudentInfo: () => {
    return studentInfo;
  },
  clearStudentInfo: () => {
    localStorage.removeItem('studentsInfo-files');
    studentInfo = null;
  }
}