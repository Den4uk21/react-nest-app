import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SettingsEmail } from '../../components/settings/settingsEmail'

import { SettingsActions } from '../../redux/settings/actions'
import { IRootReducer } from '../../redux/store/rootReducer'

export const SettingsEmailContainer: React.FC = () => {
  const dispatch = useDispatch()
  const profileInfo = useSelector((state: IRootReducer) => state.profile.profileInfo)

  const onSendEmailChange = () => {
    dispatch(SettingsActions.sendChangeEmail())
  }

  return (
    <>
      {profileInfo ? (
        <SettingsEmail email={profileInfo.email} status={profileInfo.status} onSendEmailChange={onSendEmailChange} />
      ): <></>}
    </>
  )
}