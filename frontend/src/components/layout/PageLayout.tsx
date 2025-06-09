import {
  layouts,
  sidebar,
  structure,
  tokens,
  utils,
} from '@/assets/design-system'
import { PongBackground } from '@/components/ui'
import { cn } from '@/utils/cn'
import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

interface PageLayoutProps {
  children: React.ReactNode
  showHeader?: boolean
  showFooter?: boolean
  showSidebar?: boolean
  showPongBackground?: boolean
  isLoading?: boolean
  sidebarProps?: {
    variant?: keyof typeof sidebar.variants
  }
  className?: string
  background?: 'primary' | 'dark' | 'glass'
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  showSidebar = false,
  showPongBackground = true,
  isLoading = false,
  sidebarProps = { variant: 'glass' },
  className,
  background = 'primary',
}) => {
  const spacing = utils.sidebarSpacing(showSidebar)

  const renderSidebar = () => showSidebar && <Sidebar {...sidebarProps} />
  const renderPong = () =>
    showPongBackground && (
      <div className={layouts.pong.container}>
        <PongBackground />
      </div>
    )

  if (isLoading) {
    return (
      <div className={structure.sidebarWrapper}>
        {renderSidebar()}
        <div className={cn(structure.loadingContainer, className)}>
          {renderPong()}
          <div className={structure.contentWrapper}>{children}</div>
        </div>
      </div>
    )
  }

  const backgroundClass =
    background === 'primary'
      ? tokens.colors.bg.primary
      : background === 'dark'
        ? tokens.colors.bg.dark
        : tokens.colors.bg.glass

  return (
    <div className={cn(structure.pageBase, backgroundClass)}>
      {renderSidebar()}
      {renderPong()}
      {showHeader && <Header />}
      <main className={cn(structure.main, spacing.main)}>{children}</main>
      {showFooter && <Footer />}
    </div>
  )
}

export default PageLayout
