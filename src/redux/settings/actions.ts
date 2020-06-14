import { createAction } from 'redux-actions'
import { IUpdateProfile, IChangePassword, IUpdateUsername } from '../../types/settings/types'

enum Type {
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  UPDATE_USERNAME = 'UPDATE_USERNAME',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD'
}

const updateProfile = createAction<IUpdateProfile>(Type.UPDATE_PROFILE)
const updateUsername = createAction<IUpdateUsername>(Type.UPDATE_USERNAME)
const changePassword = createAction<IChangePassword>(Type.CHANGE_PASSWORD)

export const SettingsActions = {
  Type,
  
  updateProfile,
  updateUsername,
  changePassword
}

export type SettingsActions = Omit<typeof SettingsActions, 'Type'>