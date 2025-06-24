import { useAuth } from '@/hooks/useAuth'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const GoogleCallback: React.FC = () => {
  const [searchParams] = useSearchParams()
  const { loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const hasProcessed = useRef(false)

  useEffect(() => {
    const handleCallback = async () => {
      // Prevent multiple executions (React StrictMode protection)
      if (processing || hasProcessed.current) return
      
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

      // Mark as processed to prevent re-runs
      hasProcessed.current = true
      setProcessing(true)

      try {
        console.log('Processing Google OAuth code:', code.substring(0, 20) + '...')
        
        // Clear the URL immediately to prevent reuse
        window.history.replaceState({}, document.title, '/oauth2callback')
        
        await loginWithGoogle(code)
        navigate('/dashboard')
      } catch (err) {
        console.error('Google login error:', err)
        setError(err instanceof Error ? err.message : 'Google login failed')
        
        // Reset on error so user can try again
        hasProcessed.current = false
        
        setTimeout(() => navigate('/'), 3000)
      } finally {
        setProcessing(false)
      }
    }

    handleCallback()
  }, [searchParams, loginWithGoogle, navigate, processing])

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
