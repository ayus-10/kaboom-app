import axios from 'axios'

export class ApiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.status = status
  }
}

export function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.detail || 'Something went wrong'
    return new ApiError(message, error.response?.status)
  }
  return new ApiError('Unexpected error')
}
