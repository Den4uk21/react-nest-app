const loginURL = `/auth/login`
const registerURL = `/auth/register`
const tokensURL = `/auth/update-tokens`
const confirmURL = (token: string) => `/auth/confirm${token}`
const sendConfirmURL = `/auth/send-confirm`

const changeEmailURL = (token: string) => `/profile/change-email${token}`
const sendChangePassURL = `/profile/send-change-pass`
const changeForgotPassURL = (token: string) => `/profile/change-forgot-pass${token}`

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