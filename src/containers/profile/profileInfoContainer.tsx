import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { ProfileInfo } from '../../components/profile/profileInfo'

import { ProfileActions } from '../../redux/profile/actions'
import { IRootReducer } from '../../redux/store/rootReducer'

export const ProfileInfoContainer: React.FC = () => {
  const dispatch = useDispatch()
  const profileInfo = useSelector((state: IRootReducer) => state.profile.profileInfo)
  const { userName } = useParams()

  useEffect(() => {
    dispatch(ProfileActions.getProfile(userName))
  }, [dispatch, userName])

  return (
    <>
      {profileInfo ? (
        <ProfileInfo {...profileInfo} />
      ): <></>}
    </>
  )
}