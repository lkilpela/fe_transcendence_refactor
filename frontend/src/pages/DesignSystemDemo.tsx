import {
  ButtonExampleCSS,
  ButtonExampleTS,
  FormExample,
  LoginFormExample,
  MixedApproachExample,
  PongBackgroundExample,
} from '@/assets/design-system.example'
import React from 'react'

export const DesignSystemDemo: React.FC = () => {
  return (
    <div className="bg-app-gradient min-h-screen">
      <div className="container-responsive py-12">
        <div className="mb-12 text-center">
          <h1 className="text-display mb-4">🎨 Design System</h1>
          <p className="text-body text-xl">
            Complete UI component library and design tokens
          </p>
        </div>

        <div className="space-y-16">
          {/* TypeScript Approach */}
          <section className="glass rounded-2xl p-8">
            <ButtonExampleTS />
          </section>

          {/* CSS Utility Approach */}
          <section className="glass rounded-2xl p-8">
            <ButtonExampleCSS />
          </section>

          {/* Mixed Approach */}
          <section>
            <MixedApproachExample />
          </section>

          {/* Form Examples */}
          <section className="glass rounded-2xl p-8">
            <div className="mb-8 text-center">
              <h3 className="text-hero mb-2">Form Components</h3>
              <p className="text-body">
                Complete form styling with validation states
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h4 className="mb-4 text-center text-lg font-semibold text-white">
                  Register Form
                </h4>
                <FormExample />
              </div>
              <div>
                <h4 className="mb-4 text-center text-lg font-semibold text-white">
                  Login Form
                </h4>
                <LoginFormExample />
              </div>
            </div>
          </section>

          {/* Pong Background Example */}
          <section className="glass rounded-2xl p-8">
            <PongBackgroundExample />
          </section>
        </div>
      </div>
    </div>
  )
}
