import React from 'react'
import { Switch, Route } from 'react-router-dom'

const MainPage = React.lazy(() => import('../pages/main/mainPage'))
const QuestionAnswerPage = React.lazy(() => import('../pages/question-answer/question-answerPage'))
const ProfilePage = React.lazy(() => import('../pages/profile/profilePage'))
const Error404Page = React.lazy(() => import('../pages/errors/error404Page'))

const CommonRouter: React.FC = ({ children }) => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/q/:questionId" component={QuestionAnswerPage} />
      <Route path="/profile/:userName" component={ProfilePage} />
      {children}
      <Route path="*" component={Error404Page} />
    </Switch>
  )
}

export default CommonRouter