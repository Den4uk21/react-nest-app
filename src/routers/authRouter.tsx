import React from 'react'
import { Route } from 'react-router-dom'
import CommonRouter from './commonRouter'

const SettingsPage = React.lazy(() => import('../pages/settings/settingsPage'))
const NewQuestionPage = React.lazy(() => import('../pages/new-question/newQuestionPage'))

const AuthRouter: React.FC = () => {
  return (
    <CommonRouter>
      <Route path="/settings/:setting" component={SettingsPage} />
      <Route path="/new-question" component={NewQuestionPage} />
    </CommonRouter>
  )
}

export default AuthRouter