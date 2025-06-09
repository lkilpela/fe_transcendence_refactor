import { sidebar, states } from '@/assets/design-system'
import { cn } from '@/utils/cn'
import { HelpCircle, Home, Settings, Trophy, User } from 'lucide-react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface SidebarProps {
  isOpen?: boolean
  variant?: keyof typeof sidebar.variants
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  variant = 'glass',
}) => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Trophy, label: 'Tournament', path: '/tournament' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help', path: '/help' },
  ]

  return (
    <aside
      className={cn(
        sidebar.base,
        sidebar.variants[variant],
        isOpen ? states.open : states.closed,
      )}
    >
      <nav className={sidebar.nav.container}>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                sidebar.nav.button.base,
                isActive
                  ? sidebar.nav.button.active
                  : sidebar.nav.button.inactive,
              )}
              title={item.label}
            >
              <Icon className={sidebar.nav.icon} />

              {/* Tooltip */}
              <span className={sidebar.nav.tooltip}>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
 