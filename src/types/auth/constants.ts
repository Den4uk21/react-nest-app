import { BE_APP_URL } from "../constants"

const loginURL = `${BE_APP_URL}/auth/login`
const registerURL = `${BE_APP_URL}/auth/register`
const tokensURL = `${BE_APP_URL}/auth/update-tokens`
const confirmURL = `${BE_APP_URL}/auth/confirm`
const sendConfirmURL = `${BE_APP_URL}/auth/send-confirm`

const changeEmailURL = `${BE_APP_URL}/profile/change-email`
const sendChangePassURL = `${BE_APP_URL}/profile/send-change-pass`
const changeForgotPassURL = `${BE_APP_URL}/profile/change-forgot-pass`

export const AuthUrls = {
  loginURL,
  registerURL,
  tokensURL,
  confirmURL,
  sendConfirmURL,
  changeEmailURL,
  sendChangePassURL,
  changeForgotPassURL
}