import React from 'react'
import { Route } from 'react-router-dom'

import { SettingsSidebarContainer } from '../../containers/settings/settingsSidebarContainer'
import { SettingsProfileContainer } from '../../containers/settings/settingsProfileContainer'

import './styles.sass'

const SettingsPage: React.FC = () => {
  return (
    <main className="settings-page">
      <SettingsSidebarContainer />

      <Route exact path="/settings/profile" component={SettingsProfileContainer} />
    </main>
  )
}

export default SettingsPage