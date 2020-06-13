import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { SettingsProfile } from '../../components/settings/settingsProfile'
import { SettingsActions } from '../../redux/settings/actions'

import { IUpdateProfile } from '../../types/settings/types'
import { IRootReducer } from '../../redux/store/rootReducer'

export const SettingsProfileContainer: React.FC = () => {
  const dispatch = useDispatch()
  const profileInfo = useSelector((state: IRootReducer) => state.profile.profileInfo)

  const onSubmitValues = (values: IUpdateProfile) => {
    dispatch(SettingsActions.updateProfile(values))
  }

  return (
    <>
      {profileInfo ? (
        <SettingsProfile 
          onSubmitValues={onSubmitValues} 
          bio={profileInfo.bio} 
          motto={profileInfo.motto} 
          avatarUrl={profileInfo.avatarUrl} />
      ): <></>}
    </>
  )
}