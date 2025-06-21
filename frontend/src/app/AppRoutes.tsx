import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LandingPage, LoginPage, RegisterPage, Dashboard, DesignSystemDemo, GamePage } from '@/pages'
import { GoogleCallback } from '@/components/features/auth/GoogleCallback'

/**
 * AppRoutes Component
 * This component defines all the routes in the application
 * It includes both public and protected routes
 */
export const AppRoutes: React.FC = () => {
  // Uncomment when authentication is ready
  // const { isAuthenticated } = useAuth()

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/auth/google/callback" element={<GoogleCallback />} />
      <Route path="/design-system" element={<DesignSystemDemo />} />
      
      {/* Protected Routes - Add ProtectedRoute wrapper when auth is ready */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/game" element={<GamePage />} />

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
