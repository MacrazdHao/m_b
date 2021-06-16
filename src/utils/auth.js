import Cookies from 'js-cookie'

const TokenKey = 'token'
const UsertypeKey = 'usertype'

// console.log('token',Cookies.get(TokenKey))

export function getToken() {
  console.log(Cookies.get(TokenKey))
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  removeToken(TokenKey)
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUsertype() {
  console.log(Cookies.get(UsertypeKey))
  return Cookies.get(UsertypeKey)
}

export function setUsertype(token) {
  removeUsertype(UsertypeKey)
  return Cookies.set(UsertypeKey, token)
}

export function removeUsertype() {
  return Cookies.remove(UsertypeKey)
}
