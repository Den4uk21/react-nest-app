import React, { Suspense } from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import { history } from './redux/store/store'
import { Fallback } from './components/common/fallback'

import 'antd/dist/antd.css'

const LoginPage = React.lazy(() => import('./pages/auth/login/loginPage'))
const RegisterPage = React.lazy(() => import('./pages/auth/register/registerPage'))
const RegisterSuccessPage = React.lazy(() => import('./pages/auth/register/registerSuccessPage'))

const App: React.FC = () => {
  const isAuth = localStorage.auth_tokens

  return (
    <Router history={history}>
      <Suspense fallback={<Fallback />}>
        <Switch>
          {
            isAuth
              ? (
                <div>Main</div>
              )
              : (
                <>
                  <Route exact path="/login" component={LoginPage} />
                  <Route exact path="/register" component={RegisterPage} />
                  <Route exact path="/auth/success" component={RegisterSuccessPage} />
                </>
              )
          }
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App