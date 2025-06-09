import { RegisterForm } from '@/components/features'
import { PageLayout } from '@/components/layout'
import { Button } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const { register, isLoading, error } = useAuth()

  const handleBackToHome = () => {
    navigate('/')
  }

  const handleRegisterSubmit = async (data: {
    username: string
    email: string
    password: string
    confirmPassword: string
  }) => {
    try {
      await register(data.username, data.email, data.password)
      // Registration successful - navigate to login
      navigate('/login')
    } catch {
      // Error is already handled by AuthProvider
      // Component can add additional error handling here if needed
    }
  }

  const handleGoogleSignUp = async () => {
    // TODO: Implement Google OAuth
    console.log('Google sign up clicked')
  }

  return (
    <PageLayout
      showHeader={true}
      showFooter={true}
      showPongBackground={true}
      background="primary"
    >
      <div className="w-full">
          {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToHome}
            className="flex items-center gap-2 text-white hover:text-gray-200"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        </div>

        <RegisterForm
          onSubmit={handleRegisterSubmit}
          onGoogleSignUp={handleGoogleSignUp}
          isLoading={isLoading}
        />

        {/* Error Display */}
        {error && <div className="mt-4 text-center text-red-400">{error}</div>}
      </div>
    </PageLayout>
  )
}

export default RegisterPage
