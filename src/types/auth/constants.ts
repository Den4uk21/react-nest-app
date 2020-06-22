import { BE_APP_URL } from "../constants"

const loginURL = `${BE_APP_URL}/auth/login`
const registerURL = `${BE_APP_URL}/auth/register`
const tokensURL = `${BE_APP_URL}/auth/update-tokens`
const confirmURL = (token: string) => `${BE_APP_URL}/auth/confirm${token}`
const sendConfirmURL = `${BE_APP_URL}/auth/send-confirm`

const changeEmailURL = (token: string) => `${BE_APP_URL}/profile/change-email${token}`
const sendChangePassURL = `${BE_APP_URL}/profile/send-change-pass`
const changeForgotPassURL = (token: string) => `${BE_APP_URL}/profile/change-forgot-pass${token}`

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