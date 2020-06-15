import React from 'react'
import { useDispatch } from 'react-redux'

import { SettingsUsername } from '../../components/settings/settingsUsername'

import { SettingsActions } from '../../redux/settings/actions'
import { IUpdateUsername } from '../../types/settings/types'

export const SettingsUsernameContainer: React.FC = () => {
  const dispatch = useDispatch()
  const { userName } = JSON.parse(localStorage.auth_tokens)

  const onSubmitValues = (values: IUpdateUsername) => {
    dispatch(SettingsActions.updateUsername(values))
  }

  return (
    <SettingsUsername userName={userName} onSubmitValues={onSubmitValues} />
  )
}