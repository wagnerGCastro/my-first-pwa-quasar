import { axiosInstance as request } from 'boot/axios'

export function login(email, password) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: { email, password }
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: '/auth/me',
    method: 'get'
  })
}
