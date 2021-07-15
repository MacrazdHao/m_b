import moment from "moment";
export default {
  getMonthDays: (date) => {
    let today = moment(date).format("YYYY-MM-DD");
    return moment(today).daysInMonth();
  },
  getMonthCalendar: (date) => {
    let today = moment(date).format("YYYY-MM-DD");
    let curMonthWeekday = moment(today).date(1).isoWeekday();
    let lastMonthDays = moment(today).subtract(1, "month").daysInMonth();
    let curMonthDays = moment(today).daysInMonth();
    let calendar = [];
    for (let i = curMonthWeekday - 2; i >= 0; i--) {
      calendar.push(lastMonthDays - i);
    }
    for (let i = 1; i <= curMonthDays; i++) {
      calendar.push(i);
    }
    let surDays = 42 - calendar.length;
    for (let i = 1; i <= surDays; i++) {
      calendar.push(i);
    }
    return calendar;
  },
  getDateString: (timestamp, format = "YYYY-MM-DD hh:MM") => {
    return moment(timestamp).format(format);
  },
}