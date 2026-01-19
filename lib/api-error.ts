import axios from 'axios'

export class ApiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.status = status
  }
}

export const toApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.detail || 'Something went wrong'
    return new ApiError(message, error.response?.status)
  }
  return new ApiError('Unexpected error')
}

export const handleApiError = (err: Error) => {
  if (err instanceof ApiError) {
    alert(err.message)
  }
  alert('An unexpected error occurred')
}
