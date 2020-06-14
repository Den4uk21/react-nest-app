import React from 'react'
import { useDispatch } from 'react-redux'

import { SettingsPassword } from '../../components/settings/settingsPassword'

import { SettingsActions } from '../../redux/settings/actions'
import { IChangePassword } from '../../types/settings/types'

export const SettingsPasswordContainer: React.FC = () => {
  const dispatch = useDispatch()

  const onSubmitValues = (values: IChangePassword) => {
    dispatch(SettingsActions.changePassword(values))
  }

  return (
    <SettingsPassword onSubmitValues={onSubmitValues} />
  )
}