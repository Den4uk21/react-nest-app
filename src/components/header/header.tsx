import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Popconfirm } from 'antd'

import { removeTokens } from '../../redux/assets/authApi'
import './styles.sass'

export const Header: React.FC = () => {
  const isAuth = localStorage.auth_tokens

  const onExitClick = () => {
    removeTokens()
    window.location.replace('/')
  }

  return (
    <header>
      <h2 className="title"><NavLink to="/">React-App Q&A</NavLink></h2>
      <nav className="nav-links" >
        {
          isAuth
            ? (
              <>
                <Button ghost><NavLink to={`/profile/${JSON.parse(isAuth).userName}`}>Profile</NavLink></Button>
                <Button ghost><NavLink to="/new-question">Ask a Questions</NavLink></Button>
                <Button ghost><NavLink to="/settings/profile">Settings</NavLink></Button>

                <Popconfirm
                  title="Do you really want to quit?"
                  onConfirm={onExitClick}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button ghost>Exit</Button>
                </Popconfirm>
              </>
            )
            : ( 
              <>
                <Button ghost><NavLink to="/login">Sign In</NavLink></Button>
                <Button ghost><NavLink to="/register">Sign Up</NavLink></Button>
              </>
            )
        }
      </nav>
    </header>
  )
}