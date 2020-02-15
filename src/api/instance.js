import axios from 'axios'
import { Notification, MessageBox } from 'element-ui'

const CancelToken = axios.CancelToken
const pendingMap = {}

function errorTip(title) {
  Notification.error({ title, duration: 2000 })
}

function handleError({ code, message = '未知错误' }) {
  switch (code) {
    case 401:
      MessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        console.log(401)
      })
      break
    case 403:
      console.log(403)
      break
    default:
      errorTip(message)
      break
  }
  return Promise.reject(new Error({ code, message }))
}

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL || '/',
  timeout: 10000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(config => {
  removePending(config)
  config.cancelToken = new CancelToken(c => {
    pendingMap[`${config.url}~${config.method}`] = c
  })
  localStorage.token && (config.headers.Authorization = localStorage.token)
  return config
})

instance.interceptors.response.use(
  res => {
    removePending(res.config)
    const {
      data: { code, message, data }
    } = res
    return code
      ? code === 200
        ? data
        : handleError({ code, message })
      : res.data
  },
  error => {
    try {
      const { data, status: code, statusText: message } = error.response
      return handleError(data || { code, message })
    } catch (e) {
      error.toString().indexOf('Error: timeout') !== -1 &&
        errorTip('网络请求超时')
    }
  }
)

export function removePending(config) {
  Object.keys(pendingMap).forEach(key => {
    if (key === `${config.url}~${config.method}`) {
      pendingMap[key]()
      delete pendingMap[key]
    }
  })
}

export function createCrud(uri) {
  return {
    create: data => instance.post(`${uri}`, data),
    remove: id => instance.delete(`${uri}/${id}`),
    update: data => instance.put(`${uri}/${data.id || data._id}`, data),
    list: params => instance.get(`${uri}`, params),
    find: id => instance.get(`${uri}/${id}`)
  }
}

export default instance
