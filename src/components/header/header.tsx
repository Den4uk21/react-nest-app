import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd'

import './styles.sass'

interface IHeaderProps {
  isAuth: string
}

export const Header: React.FC<IHeaderProps> = ({ isAuth }) => {
  return (
    <header>
      <h2 className="title"><NavLink to="/">React-App Q&A</NavLink></h2>
      {
        isAuth
          ? (
            <div>test</div>
          )
          : (
            <>
              <nav className="nav-links" >
                <Button ghost><NavLink to="/login">Sign In</NavLink></Button>
                <Button ghost><NavLink to="/register">Sign Up</NavLink></Button>
              </nav>
            </>
          )
      }
    </header>
  )
}