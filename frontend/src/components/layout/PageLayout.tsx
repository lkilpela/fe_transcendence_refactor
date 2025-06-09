import { foundation, layouts, utils } from '@/assets/design-system'
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
    variant?: keyof typeof layouts.sidebar.variants
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
      <div className={layouts.page.sidebarWrapper}>
        {renderSidebar()}
        <div className={cn(layouts.page.loadingContainer, className)}>
          {renderPong()}
          <div className={layouts.page.contentWrapper}>{children}</div>
        </div>
      </div>
    )
  }

  const backgroundClass =
    background === 'primary'
      ? foundation.colors.bg.primary
      : background === 'dark'
        ? foundation.colors.bg.dark
        : foundation.colors.bg.glass

  return (
    <div className={cn(layouts.page.base, backgroundClass)}>
      {renderSidebar()}
      {renderPong()}
      {showHeader && <Header />}
      <main className={cn(layouts.page.main, spacing.main)}>{children}</main>
      {showFooter && <Footer />}
    </div>
  )
}

export default PageLayout
