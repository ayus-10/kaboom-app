import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { API_BASE_URL } from './constants'

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window === 'undefined') return config

  const token = localStorage.getItem('access_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

let isRefreshing = false
let failedQueue: {
  resolve: (token: string) => void
  reject: (error: unknown) => void
}[] = []

function processQueue(error: unknown, token?: string) {
  failedQueue.forEach(p => {
    if (token) p.resolve(token)
    else p.reject(error)
  })
  failedQueue = []
}

async function rotateAccessToken() {
  const res = await axios.post<{ access_token?: string }>(
    `${API_BASE_URL}/auth/rotate`,
    undefined,
    { withCredentials: true }
  )

  const access_token = res.data?.access_token
  if (!access_token) return

  localStorage.setItem('access_token', access_token)

  return access_token
}

api.interceptors.response.use(
  res => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: token => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(api(originalRequest))
          },
          reject,
        })
      })
    }

    isRefreshing = true

    try {
      const newToken = await rotateAccessToken()
      processQueue(null, newToken)

      originalRequest.headers.Authorization = `Bearer ${newToken}`
      return api(originalRequest)
    } catch (err) {
      processQueue(err, undefined)

      localStorage.removeItem('access_token')

      if (typeof window !== 'undefined') {
        window.location.href = '/'
      }

      return Promise.reject(err)
    } finally {
      isRefreshing = false
    }
  }
)
