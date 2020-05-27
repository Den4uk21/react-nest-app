import { BE_APP_URL } from "../constants"

const loginURL = `${BE_APP_URL}/auth/login`
const registerURL = `${BE_APP_URL}/auth/register`
const tokensURL = `${BE_APP_URL}/auth/update-tokens`
const confirmURL = `${BE_APP_URL}/auth/confirm`

export const AuthUrls = {
  loginURL,
  registerURL,
  tokensURL,
  confirmURL
}