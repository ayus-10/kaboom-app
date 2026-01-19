'use client'

import { api } from '@/lib/api'
import { useEffect, useState } from 'react'

export const useAuthCheck = () => {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    let cancelled = false

    const checkAuth = async () => {
      try {
        await api.get('/user/me')
        if (!cancelled) setIsAuthenticated(true)
      } catch {
        if (!cancelled) setIsAuthenticated(false)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    checkAuth()

    return () => {
      cancelled = true
    }
  }, [])

  return { loading, isAuthenticated }
}
