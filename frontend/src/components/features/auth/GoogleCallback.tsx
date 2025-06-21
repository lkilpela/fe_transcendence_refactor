import { useAuth } from '@/hooks/useAuth'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const GoogleCallback: React.FC = () => {
  const [searchParams] = useSearchParams()
  const { loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code')
      const error = searchParams.get('error')

      if (error) {
        setError('Google authentication was cancelled or failed')
        setTimeout(() => navigate('/'), 3000)
        return
      }

      if (!code) {
        setError('No authorization code received')
        setTimeout(() => navigate('/'), 3000)
        return
      }

      try {
        await loginWithGoogle(code)
        navigate('/dashboard')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Google login failed')
        setTimeout(() => navigate('/'), 3000)
      }
    }

    handleCallback()
  }, [searchParams, loginWithGoogle, navigate])

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-bold text-red-400">
            Authentication Failed
          </h2>
          <p className="text-gray-300">{error}</p>
          <p className="mt-2 text-sm text-gray-400">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
        <p className="text-gray-300">Completing Google sign-in...</p>
      </div>
    </div>
  )
}
