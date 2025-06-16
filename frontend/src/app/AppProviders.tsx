//import { ErrorBoundary } from '@/components'
import { AuthProvider } from '@/contexts/AuthProvider'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

interface AppProvidersProps {
  children: React.ReactNode
}

/**
 * Centralized providers component
 * All global providers and context are configured here
 */
const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      <Router>{children}</Router>
    </AuthProvider>
  )
}

export default AppProviders
