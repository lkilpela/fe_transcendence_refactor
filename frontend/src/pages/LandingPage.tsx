import { content, foundation, layouts } from '@/assets/design-system'
import { LoginForm, TwoFactorForm, useAuth } from '@/components/features/auth'
import { PageLayout } from '@/components/layout'
import { cn } from '@/utils/cn'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage: React.FC = () => {
  const { login, verify2FA, requires2FA, tempToken, isLoading } = useAuth()
  const navigate = useNavigate()

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
    // Google OAuth handled by SocialButton component automatically
    console.log('Google sign in clicked')
  }

  // Show 2FA form if required
  if (requires2FA && tempToken) {
    return (
      <PageLayout
        showSidebar={true}
        showHeader={false}
        showFooter={true}
        showPongBackground={true}
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
      showSidebar={true}
      showHeader={false}
      showFooter={true}
      showPongBackground={true}
      background="primary"
    >
      <div className={layouts.hero.section}>
        <div className={layouts.hero.container}>
          <h1 className={cn(foundation.typography.h1, layouts.hero.title)}>
            {content.landing.welcome.title}
          </h1>
          <p className={cn(foundation.typography.body, layouts.hero.subtitle)}>
            {content.landing.welcome.subtitle}
          </p>
          <p
            className={cn(foundation.typography.body, layouts.hero.description)}
          >
            {content.landing.welcome.description}
          </p>
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

export default LandingPage
