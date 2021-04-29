let studentInfo = JSON.parse(localStorage.getItem('studentsInfo-archives'));
export default {
  setStudentInfo: (info) => {
    localStorage.setItem('studentsInfo-archives', JSON.stringify(info));
    studentInfo = info;
  },
  getStudentInfo: () => {
    return studentInfo;
  },
  clearStudentInfo: () => {
    localStorage.removeItem('studentsInfo-archives');
    studentInfo = null;
  }
}