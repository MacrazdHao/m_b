import Cookies from 'js-cookie'

const TokenKey = 'token'

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
