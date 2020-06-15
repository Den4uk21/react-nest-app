import React from 'react'
import { Route } from 'react-router-dom'
import CommonRouter from './commonRouter'

const LoginPage = React.lazy(() => import('../pages/auth/login/loginPage'))
const RegisterPage = React.lazy(() => import('../pages/auth/register/registerPage'))
const RegisterSuccessPage = React.lazy(() => import('../pages/auth/register/registerSuccessPage'))

const NoAuthRouter: React.FC = () => {
  return (
    <CommonRouter>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/auth/success" component={RegisterSuccessPage} />
    </CommonRouter>
  )
}

export default NoAuthRouter