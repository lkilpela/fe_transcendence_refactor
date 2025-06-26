import React from 'react'
import { PageLayout } from '@/components/layout'
import { foundation, patterns } from '@/assets/design-system'
import { useTranslate } from '@/hooks'

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
            <li>{t('Start a match using Quick Play')}</li>
            <li>{t('Use keyboard controls to move your paddle')}</li>
            <li>{t('Score points by hitting the ball past your opponent')}</li>
          </ol>
        </section>

        {/* Controls */}
        <section className={patterns.spacing.section}>
          <h2 className={foundation.typography.h3}>{t('Controls')}</h2>
          <div className={`grid grid-cols-2 gap-4 ${foundation.typography.small} ${foundation.colors.text.primary}`}>
            <div>
              <div className={`font-medium mb-1 ${foundation.colors.text.primary}`}>{t('Player 1 (Left)')}</div>
              <div>{t('W - Move Up')}</div>
              <div>{t('S - Move Down')}</div>
            </div>
            <div>
              <div className={`font-medium mb-1 ${foundation.colors.text.primary}`}>{t('Player 2 (Right)')}</div>
              <div>{t('↑ - Move Up')}</div>
              <div>{t('↓ - Move Down')}</div>
            </div>
          </div>
          <div className={`mt-3 ${foundation.typography.small} ${foundation.colors.text.primary}`}>
            <div><strong>{t('SPACE')}</strong> - {t('Pause/Resume')}</div>
            <div><strong>{t('ESC')}</strong> - {t('Exit Game')}</div>
          </div>
        </section>

        {/* Rules */}
        <section className={patterns.spacing.section}>
          <h2 className={foundation.typography.h3}>{t('Rules')}</h2>
          <ul className={`list-disc list-inside ${patterns.spacing.stack.sm} ${foundation.colors.text.primary}`}>
            <li>{t('Ball bounces off top and bottom walls')}</li>
            <li>{t("Score when ball passes opponent's paddle")}</li>
            <li>{t('First to reach target score wins')}</li>
          </ul>
        </section>

        {/* Tournaments */}
        <section className={patterns.spacing.section}>
          <h2 className={foundation.typography.h3}>{t('Tournaments')}</h2>
          <p className={`${foundation.colors.text.primary} mb-2`}>{t('Need 4+ players for elimination-style tournaments.')}</p>
          <ul className={`list-disc list-inside ${patterns.spacing.stack.sm} ${foundation.colors.text.primary}`}>
            <li>{t("Single elimination - lose once, you're out")}</li>
            <li>{t("Winners advance to next round")}</li>
          </ul>
        </section>

        {/* Tips */}
        <section className={patterns.spacing.section}>
          <h2 className={foundation.typography.h3}>{t('Tips')}</h2>
          <ul className={`list-disc list-inside ${patterns.spacing.stack.sm} ${foundation.colors.text.primary}`}>
            <li>{t('Stay centered to cover more area')}</li>
            <li>{t('Anticipate ball trajectory')}</li>
            <li>{t('Hit with different paddle parts for angles')}</li>
          </ul>
        </section>
      </div>
    </PageLayout>
  )
} 