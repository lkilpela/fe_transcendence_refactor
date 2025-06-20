import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '@/pages/DashBoard'
import { LandingPage, RegisterPage, DesignSystemDemo } from '@/pages'
import GoogleCallback from '@/components/features/auth/GoogleCallback'

/**
 * AppRoutes Component
 * This component defines all the routes in the application
 * It includes both public and protected routes
 */
const AppRoutes: React.FC = () => {
  //const { isAuthenticated } = useAuth()

  // Debug info
  // console.log('🚀 AppRoutes rendering, isAuthenticated:', isAuthenticated)

  return (
    <Routes>
      {/* Public Routes - Accessible to everyone */}
      {/* <Route
        path="/"
        element={
          isAuthenticated ? (
            // Temporary placeholder since dashboard is disabled
            <div className="p-8 text-center">
              <h2>✅ Login Successful!</h2>
              <p>Dashboard coming in Phase 2...</p>
              <button onClick={() => window.location.reload()}>
                Logout (Refresh page)
              </button>
            </div>
          ) : (
            <LandingPage />
          )
        }
      /> */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/auth/google/callback" element={<GoogleCallback />} />
      <Route path="/design-system" element={<DesignSystemDemo />} />

      {/* Dashboard route */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      {/* Protected Routes - Only accessible to authenticated users */}
      {/* <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/game"
        element={
          <ProtectedRoute>
            <Pong />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tournament"
        element={
          <ProtectedRoute>
            <Tournament />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <SearchResults />
          </ProtectedRoute>
        }
      />
      <Route path="/help" element={<Help />} />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      /> */}

      {/* 404 Route - Shows when no matching route is found */}
      <Route path="*" element={<div>404 Not Found</div>} />

      {/* <Route path="/oauth2callback" element={<OAuth2Callback />} /> */}
    </Routes>
  )
}

export default AppRoutes
