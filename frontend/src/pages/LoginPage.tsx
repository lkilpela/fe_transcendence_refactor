import { foundation, layouts, patterns } from '@/assets/design-system'
import { LoginForm, TwoFactorForm } from '@/components/features'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui'
import { PageLayout } from '@/components/layout'
import { authService } from '@/services/authService'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/utils/cn'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const LoginPage: React.FC = () => {
  const { login, verify2FA, requires2FA, tempToken, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleBackToHome = () => {
    navigate('/')
  }

  const handleLoginSubmit = async (data: {
    username: string
    password: string
    rememberMe: boolean
  }) => {
    try {
      await login(data.username, data.password, data.rememberMe)
      // If 2FA not required, navigate to dashboard
      if (!requires2FA) {
        navigate('/dashboard')
      }
      // If 2FA required, form will show below
    } catch (error) {
      // Error is already handled by AuthProvider
      console.error('Login failed:', error)
    }
  }

  const handle2FASuccess = (token: string) => {
    verify2FA(token)
    navigate('/dashboard')
  }

  const handleGoogleSignIn = async () => {
    // Redirect to Google OAuth
    const googleUrl = authService.getGoogleAuthUrl()
    console.log('Google OAuth URL:', googleUrl)
    window.location.href = googleUrl
  }

  // Show 2FA form if required
  if (requires2FA && tempToken) {
    return (
      <PageLayout
        showHeader={true}
        showFooter={true}
        showPongBackground={false}
        background="primary"
      >
        <div className={layouts.hero.section}>
          <div className={layouts.hero.container}>
            <h1 className={cn(foundation.typography.h1, layouts.hero.title)}>
              Two-Factor Authentication
            </h1>
            <p
              className={cn(foundation.typography.body, layouts.hero.subtitle)}
            >
              Complete your secure login
            </p>
          </div>

          <div className="w-full">
            <TwoFactorForm
              tempToken={tempToken}
              onSuccess={handle2FASuccess}
              onBackToLogin={() => window.location.reload()}
            />
          </div>
        </div>
      </PageLayout>
    )
  }

  // Show login form (default)
  return (
    <PageLayout
      showHeader={true}
      showFooter={true}
      showPongBackground={false}
      background="primary"
    >
      <div className="w-full">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToHome}
            className={patterns.button.back} 
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        </div>
        
        {/* Login Form */}
        <div className="w-full">
          <LoginForm
            onSubmit={handleLoginSubmit}
            onForgotPassword={() => console.log('Forgot password')}
            onSignUp={() => console.log('Sign up')}
            onGoogleSignIn={handleGoogleSignIn}
            isLoading={isLoading}
          />
        </div>
      </div>
    </PageLayout>
  )
}
