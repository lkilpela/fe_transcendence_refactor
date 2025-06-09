import { content, foundation, layouts } from '@/assets/design-system'
import { LoginForm, useAuth } from '@/components/features/auth'
import { PageLayout } from '@/components/layout'
import { cn } from '@/utils/cn'
import React from 'react'

const LandingPage: React.FC = () => {
  const { login } = useAuth()

  const handleLoginSubmit = async (data: {
    username: string
    password: string
    rememberMe: boolean
  }) => {
    // Use email field for login (backend expects email)
    await login(data.username, data.password)
  }

  const handleGoogleSignIn = async () => {
    // TODO: Implement Google OAuth
    console.log('Google sign in clicked')
  }

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
          />
        </div>
      </div>
    </PageLayout>
  )
}

export default LandingPage
