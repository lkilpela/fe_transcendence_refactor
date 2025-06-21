import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import { PageLayout } from '@/components/layout'
import { layouts } from '@/assets/design-system'

const LandingPage: React.FC = () => {
  return (
    <PageLayout 
      showHeader={true} 
      showFooter={true} 
      showPongBackground={true}
      background="primary"
    >
      <section className={layouts.hero.section}>
        <div className={layouts.hero.container}>
          <div className={layouts.hero.buttons}>
            <Link to="/login" className="w-full">
              <Button variant="primary" size="lg" className="w-full">
                LOGIN
              </Button>
            </Link>
            
            <Link to="/register" className="w-full mt-4">
              <Button variant="ghost" size="lg" className="w-full">
                REGISTER
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

export default LandingPage
