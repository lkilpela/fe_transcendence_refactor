import { layouts } from '@/assets/design-system'
import React from 'react'

const Header: React.FC = () => {
  return (
    <header className={layouts.header.base}>
      <div className={layouts.header.container}>
        <h1 className={layouts.header.title}>Ping.Pong.Play!</h1>
      </div>
    </header>
  )
}

export default Header
