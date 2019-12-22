import axios from 'axios'
import { Message } from 'element-ui'

const CancelToken = axios.CancelToken
const pendingMap = {}

const baseURLMap = {
  development: '/',
  production: 'http://api.123dailu.com'
}

const mode = process.env.NODE_ENV

const Instance = axios.create({
  baseURL: baseURLMap[mode],
  timeout: 10000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
})

export function removePending(config) {
  Object.keys(pendingMap).forEach(key => {
    if (key === `${config.url}~${config.method}`) {
      pendingMap[key]()
      delete pendingMap[key]
    }
  })
}

Instance.interceptors.request.use(
  config => {
    // if (config.method === 'post') {
    //   if (localStorage.token) {
    //     config.headers.Authorization = localStorage.token
    //   }
    // }
    removePending(config)
    config.cancelToken = new CancelToken(c => {
      pendingMap[`${config.url}~${config.method}`] = c
    })
    return config
  },
  error => {
    error.message &&
      Message({
        showClose: true,
        message: error.message,
        type: 'error'
      })
  }
)

Instance.interceptors.response.use(
  res => {
    removePending(res.config)
    return res.data
  },
  error => {
    error.message &&
      Message({
        showClose: true,
        message: error.message,
        type: 'error'
      })
  }
)

export default Instance
