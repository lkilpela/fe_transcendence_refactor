import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import { PageLayout } from '@/components/layout'
import { cn } from '@/utils/cn'
import { layouts, foundation, content, forms } from '@/assets/design-system'

export const LandingPage: React.FC = () => {
  return (
    <PageLayout 
      showHeader={false} 
      showFooter={true} 
      showPongBackground={true}
      background="primary"
    >
      <section className={layouts.hero.section}>
        <div className={layouts.hero.container}>
          <h1 className={cn(foundation.typography.h1, layouts.hero.title)}>
            {content.landing.welcome.title}
          </h1>
          <p className={cn(foundation.typography.body, layouts.hero.subtitle)}>
            {content.landing.welcome.subtitle}
          </p>
          <p className={cn(foundation.typography.body, layouts.hero.description)}>
            {content.landing.welcome.description}
          </p>

          <div className={layouts.hero.buttons}>
            <Link to="/login" className={layouts.hero.buttonLink}>
              <Button variant="primary" size="lg" className={forms.auth.fullWidth}>
                Get Started
              </Button>
            </Link>
            
            <Link to="/register" className={layouts.hero.buttonLink}>
              <Button variant="ghost" size="lg" className={forms.auth.fullWidth}>
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
