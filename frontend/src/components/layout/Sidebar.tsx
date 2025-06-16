import { foundation, layouts } from '@/assets/design-system'
import { cn } from '@/utils/cn'
import { BarChart3, HelpCircle, Home, Settings, Trophy, User } from 'lucide-react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface SidebarProps {
  isOpen?: boolean
  variant?: keyof typeof layouts.sidebar.variants
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  variant = 'glass',
}) => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Trophy, label: 'Tournament', path: '/tournament' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help', path: '/help' },
  ]

  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path)
    navigate(path)
  }

  return (
    <aside
      className={cn(
        layouts.sidebar.base,
        layouts.sidebar.variants[variant],
        isOpen ? foundation.states.open : foundation.states.closed,
      )}
    >
      <nav className={layouts.sidebar.nav.container}>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                layouts.sidebar.nav.button.base,
                isActive
                  ? layouts.sidebar.nav.button.active
                  : layouts.sidebar.nav.button.inactive,
              )}
              title={item.label}
            >
              <Icon className={layouts.sidebar.nav.icon} />

              {/* Tooltip */}
              <span className={layouts.sidebar.nav.tooltip}>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
