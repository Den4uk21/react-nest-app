import { BE_APP_URL } from '../constants'

const uploadAvatarURL = `${BE_APP_URL}/profile/avatar`
const updateProfileURL = `${BE_APP_URL}/profile/update`
const updateUsernameURL = `${BE_APP_URL}/profile/update-username`
const sendChangeEmailURL = `${BE_APP_URL}/profile/send-change-email`
const changePassURL = `${BE_APP_URL}/profile/change-password`

export const SettingsUrls = {
  uploadAvatarURL,
  updateProfileURL,
  updateUsernameURL,
  sendChangeEmailURL,
  changePassURL
}