import React from 'react'
import { Route } from 'react-router-dom'
import CommonRouter from './commonRouter'

const SettingsPage = React.lazy(() => import('../pages/settings/settingsPage'))

const AuthRouter: React.FC = () => {
  return (
    <CommonRouter>
      <Route path="/settings/:setting" component={SettingsPage} />
    </CommonRouter>
  )
}

export default AuthRouter