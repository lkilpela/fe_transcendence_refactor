import { foundation } from '@/assets/design-system'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/utils/cn'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div
        className={cn(
          foundation.colors.text.primary,
          foundation.states.loading,
        )}
      >
        Loading...
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
