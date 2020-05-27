import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { AuthActions } from '../../../redux/auth/actions'

const ConfirmPage: React.FC<RouteComponentProps> = (props) => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(AuthActions.confirm(props.location.search))
  })

  return (
    <main className="confirm-page"></main>
  )
}

export default ConfirmPage