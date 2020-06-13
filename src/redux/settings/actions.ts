import { createAction } from 'redux-actions'
import { IUpdateProfile } from '../../types/settings/types'

enum Type {
  UPDATE_PROFILE = 'UPDATE_PROFILE'
}

const updateProfile = createAction<IUpdateProfile>(Type.UPDATE_PROFILE)

export const SettingsActions = {
  Type,
  
  updateProfile
}

export type SettingsActions = Omit<typeof SettingsActions, 'Type'>