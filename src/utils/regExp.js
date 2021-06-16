// const password = /^(?![A-Za-z]+$)(?![A-Z0-9]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![A-Z\W_]+$)(?![0-9\W_]+$)[\w\S]{8,20}$/
const password = /^(?![A-Za-z]+$)(?![A-Z0-9]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![A-Z\W_]+$)(?![0-9\W_]+$)(?![A-Z0-9\W_]+$)(?![a-z0-9\W_]+$)[\w\S]{8,20}$/
const email =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
export const checkPassword = (val) => password.test(val);
export const checkEmail = (val) => email.test(val);