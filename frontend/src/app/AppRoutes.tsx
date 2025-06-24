import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LandingPage, LoginPage, RegisterPage, Dashboard, DesignSystemDemo, GamePage, TournamentPage, ProfilePage, SearchResults, SettingsPage, HelpPage } from '@/pages'
import { GoogleCallback } from '@/components/features/auth/GoogleCallback'
import { ProtectedRoute } from '@/components/layout'

/**
 * AppRoutes Component
 * This component defines all the routes in the application
 * It includes both public and protected routes
 */
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/oauth2callback" element={<GoogleCallback />} />
      <Route path="/design-system" element={<DesignSystemDemo />} />
      <Route path="/help" element={<HelpPage />} />
      
      {/* Protected Routes - Only accessible to authenticated users */}
      <Route
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
            <GamePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tournament"
        element={
          <ProtectedRoute>
            <TournamentPage />
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
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      {/* 404 Route - Shows when no matching route is found */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}
