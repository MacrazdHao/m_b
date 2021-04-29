let studentInfo = JSON.parse(localStorage.getItem('studentsInfo-students'));
export default {
  setStudentInfo: (info) => {
    localStorage.setItem('studentsInfo-students', JSON.stringify(info));
    studentInfo = info;
  },
  getStudentInfo: () => {
    return studentInfo;
  },
  clearStudentInfo: () => {
    localStorage.removeItem('studentsInfo-students');
    studentInfo = null;
  }
}