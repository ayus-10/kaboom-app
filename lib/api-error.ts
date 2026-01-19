import axios from 'axios'

export class ApiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.status = status
  }
}

export function handleApiError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.detail || 'Something went wrong'

    throw new ApiError(message, error.response?.status)
  }

  throw new ApiError('Unexpected error')
}
