import React from 'react'

import './styles.sass'
import { NavLink } from 'react-router-dom'

export const SettingsSidebar: React.FC = () => {
  return (
    <aside className="settings-sidebar">
      <h2 className="title">Your Settings</h2>

      <nav className="sidebar-links">
        <NavLink to="/settings/profile">Profile</NavLink>
        <NavLink to="/settings/username">Username</NavLink>
        <NavLink to="/settings/email">Email</NavLink>
        <NavLink to="/settings/password">Password</NavLink>
      </nav>
    </aside>
  )
}