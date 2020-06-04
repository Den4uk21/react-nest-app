import React, { Suspense } from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import { history } from './redux/store/store'
import { Fallback } from './components/common/fallback'

import 'antd/dist/antd.css'

import { Header } from './components/header/header'

const MainPage = React.lazy(() => import('./pages/main/mainPage'))
const QuestionAnswerPage = React.lazy(() => import('./pages/question-answer/question-answerPage'))

const LoginPage = React.lazy(() => import('./pages/auth/login/loginPage'))
const RegisterPage = React.lazy(() => import('./pages/auth/register/registerPage'))
const RegisterSuccessPage = React.lazy(() => import('./pages/auth/register/registerSuccessPage'))
const ConfirmPage = React.lazy(() => import('./pages/auth/confirm/confirmPage'))

const Error404Page = React.lazy(() => import('./pages/errors/error404Page'))

const App: React.FC = () => {
  const isAuth = localStorage.auth_tokens

  return (
    <Router history={history}>
      <Header isAuth={isAuth} />
      <Suspense fallback={<Fallback />}>
        {
          isAuth
            ? (
              <div>Main</div>
            )
            : (
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/q/:questionId" component={QuestionAnswerPage} />

                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/auth/success" component={RegisterSuccessPage} />
                <Route exact path="/auth/confirm" component={ConfirmPage} />
                <Route path="*" component={Error404Page} />
              </Switch>
            )
        }
      </Suspense>
    </Router>
  )
}

export default App