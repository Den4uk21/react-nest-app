import React, { Suspense } from 'react'
import { Router } from 'react-router-dom'

import { history } from './redux/store/store'
import { Fallback } from './components/common/fallback'

import 'antd/dist/antd.css'

import { Header } from './components/header/header'

import AuthRouter from './routers/authRouter'
import NoAuthRouter from './routers/no-authRouter'

const App: React.FC = () => {
  const isAuth = localStorage.auth_tokens

  return (
    <Router history={history}>
      <Header isAuth={isAuth} />
      <Suspense fallback={<Fallback />}>
        {
          isAuth
            ? (
              <AuthRouter />
            )
            : (
              <NoAuthRouter />
            )
        }
      </Suspense>
    </Router>
  )
}

export default App