import React from 'react'
import { Switch, Route } from 'react-router-dom'

const MainPage = React.lazy(() => import('../pages/main/mainPage'))
const QuestionAnswerPage = React.lazy(() => import('../pages/question-answer/question-answerPage'))
const ProfilePage = React.lazy(() => import('../pages/profile/profilePage'))

const ConfirmPage = React.lazy(() => import('../pages/auth/confirm/confirmPage'))
const ChangeEmailPage = React.lazy(() => import('../pages/auth/change-email/changeEmailPage'))
const CheckEmailPage = React.lazy(() => import('../pages/auth/change-forgot-pass/checkEmailPage'))
const ChangeForgotPassPage = React.lazy(() => import('../pages/auth/change-forgot-pass/changeForgotPassPage'))

const Error404Page = React.lazy(() => import('../pages/errors/error404Page'))

const CommonRouter: React.FC = ({ children }) => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/q/:questionId" component={QuestionAnswerPage} />
      <Route path="/profile/:userName" component={ProfilePage} />

      <Route exact path="/auth/confirm" component={ConfirmPage} />
      <Route exact path="/auth/change-email" component={ChangeEmailPage} />
      <Route exact path="/auth/check-email" component={CheckEmailPage} />
      <Route exact path="/auth/change-password" component={ChangeForgotPassPage} />

      {children}
      <Route path="*" component={Error404Page} />
    </Switch>
  )
}

export default CommonRouter