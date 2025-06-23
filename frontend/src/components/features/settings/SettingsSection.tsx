import React from 'react'
import { foundation, patterns } from '@/assets/design-system'
import { cn } from '@/utils/cn'

interface SettingsSectionProps {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  icon,
  children,
}) => (
  <div className={cn(foundation.glass.light, "p-6 rounded-2xl border border-white/20")}>
    <h2 className={cn(patterns.flex.rowGap.sm, "mb-6")}>
      {icon && <span className="text-white">{icon}</span>}
      <span className={foundation.typography.h3}>{title}</span>
    </h2>
    <div className={patterns.spacing.stack.md}>{children}</div>
  </div>
) 