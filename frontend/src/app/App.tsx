import React from 'react'
import AppProviders from './AppProviders'
import AppRoutes from './AppRoutes'

/**
 * Main App Component
 * Clean separation of concerns:
 * - Providers handle global state and context
 * - Layout handles UI structure
 * - Routes handle navigation
 */
const App: React.FC = () => {
  return (
    <AppProviders>
        <AppRoutes />
    </AppProviders>
  )
}

export default App
