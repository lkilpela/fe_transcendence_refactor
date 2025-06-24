import React from 'react'
import { PageLayout } from '@/components/layout'
import { foundation, patterns } from '@/assets/design-system'
import useTranslate from '@/hooks/useTranslate'

export const HelpPage: React.FC = () => {
  const t = useTranslate()
  return (
    <PageLayout showSidebar showHeader showFooter background="primary">
      <div className="max-w-3xl mx-auto p-6">
        
        <h1 className={foundation.typography.h2}>{t('Help & Game Rules')}</h1>

        {/* How to Play */}
        <section className={patterns.spacing.section}>
          <h2 className={foundation.typography.h3}>{t('How to Play')}</h2>
          <ol className={`list-decimal list-inside ${patterns.spacing.stack.sm} ${foundation.colors.text.primary}`}>
            <li>{t('Create at least 2 players in Dashboard')}</li>
            <li>Start a match using Quick Play</li>
            <li>Use keyboard controls to move your paddle</li>
            <li>Score points by hitting the ball past your opponent</li>
          </ol>
        </section>

        {/* Controls */}
        <section className={patterns.spacing.section}>
          <h2 className={foundation.typography.h3}>Controls</h2>
          <div className={`grid grid-cols-2 gap-4 ${foundation.typography.small} ${foundation.colors.text.primary}`}>
            <div>
              <div className={`font-medium mb-1 ${foundation.colors.text.primary}`}>Player 1 (Left)</div>
              <div>W - Move Up</div>
              <div>S - Move Down</div>
            </div>
            <div>
              <div className={`font-medium mb-1 ${foundation.colors.text.primary}`}>Player 2 (Right)</div>
              <div>↑ - Move Up</div>
              <div>↓ - Move Down</div>
            </div>
          </div>
          <div className={`mt-3 ${foundation.typography.small} ${foundation.colors.text.primary}`}>
            <div><strong>SPACE</strong> - Pause/Resume</div>
            <div><strong>ESC</strong> - Exit Game</div>
          </div>
        </section>

        {/* Rules */}
        <section className={patterns.spacing.section}>
          <h2 className={foundation.typography.h3}>Rules</h2>
          <ul className={`list-disc list-inside ${patterns.spacing.stack.sm} ${foundation.colors.text.primary}`}>
            <li>Ball bounces off top and bottom walls</li>
            <li>Score when ball passes opponent's paddle</li>
            <li>First to reach target score wins</li>
          </ul>
        </section>

        {/* Tournaments */}
        <section className={patterns.spacing.section}>
          <h2 className={foundation.typography.h3}>Tournaments</h2>
          <p className={`${foundation.colors.text.primary} mb-2`}>Need 4+ players for elimination-style tournaments.</p>
          <ul className={`list-disc list-inside ${patterns.spacing.stack.sm} ${foundation.colors.text.primary}`}>
            <li>Single elimination - lose once, you're out</li>
            <li>Winners advance to next round</li>
          </ul>
        </section>

        {/* Tips */}
        <section className={patterns.spacing.section}>
          <h2 className={foundation.typography.h3}>Tips</h2>
          <ul className={`list-disc list-inside ${patterns.spacing.stack.sm} ${foundation.colors.text.primary}`}>
            <li>Stay centered to cover more area</li>
            <li>Anticipate ball trajectory</li>
            <li>Hit with different paddle parts for angles</li>
          </ul>
        </section>

      </div>
    </PageLayout>
  )
} 