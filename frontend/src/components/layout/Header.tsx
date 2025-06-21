import { layouts } from '@/assets/design-system'
import { UserMenu } from '@/components/ui'
import React from 'react'

const Header: React.FC = () => {
  return (
    <header className={layouts.header.base}>
      <div className={layouts.header.container}>
        <h1 className={layouts.header.title}>Ping.Pong.Play!</h1>
        <div className="absolute right-0">
          <UserMenu />
        </div>
      </div>
    </header>
  )
}

export default Header
