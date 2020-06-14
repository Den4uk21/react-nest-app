import React from 'react'
import { Route } from 'react-router-dom'

import { SettingsSidebarContainer } from '../../containers/settings/settingsSidebarContainer'
import { SettingsProfileContainer } from '../../containers/settings/settingsProfileContainer'
import { SettingsPasswordContainer } from '../../containers/settings/settingsPasswordContainer'
import { SettingsUsernameContainer } from '../../containers/settings/settingsUsernameContainer'

import './styles.sass'

const SettingsPage: React.FC = () => {
  return (
    <main className="settings-page">
      <SettingsSidebarContainer />

      <Route exact path="/settings/profile" component={SettingsProfileContainer} />
      <Route exact path="/settings/password" component={SettingsPasswordContainer} />
      <Route exact path="/settings/username" component={SettingsUsernameContainer} />
    </main>
  )
}

export default SettingsPage