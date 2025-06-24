import { RegisterForm } from '@/components/features'
import { PageLayout } from '@/components/layout'
import { Button } from '@/components/ui'
import { authService } from '@/services/authService'
import { patterns } from '@/assets/design-system'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()

  const handleBackToHome = () => {
    navigate('/')
  }

  const handleRegistrationSuccess = () => {
    // Navigate to login page after successful registration
    navigate('/dashboard')
  }

  const handleGoogleSignUp = async () => {
    // Redirect to Google OAuth
    window.location.href = authService.getGoogleAuthUrl()
  }

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

        <RegisterForm
          onSuccess={handleRegistrationSuccess}
          onGoogleSignUp={handleGoogleSignUp}
        />
      </div>
    </PageLayout>
  )
}
