import { IAuth } from '../../types/auth/types'
import { AuthUrls } from '../../types/auth/constants'

export const saveTokens = (data: IAuth) => {
  localStorage.setItem('auth_tokens', JSON.stringify(data))
}

const refreshTokens = async (refreshToken: string) => {
  const newTokens = await fetch(AuthUrls.tokensURL,
    {
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    }  
  )

  if(newTokens.status === 200) {
    saveTokens(await newTokens.json())
  }else {
    throw new Error()
  }
}

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const loginUrl = '/login'
  let tokenData = null

  if(localStorage.auth_tokens) {
    tokenData = JSON.parse(localStorage.auth_tokens)
  }else {
    return window.location.replace(loginUrl)
  }

  if(!options.headers) {
    options.headers = {};
  }

  if(tokenData) {
    if(Date.now() >= tokenData.expires_on) {
      try {
        await refreshTokens(tokenData.refreshToken)
        tokenData = JSON.parse(localStorage.auth_tokens)
      }catch (err) { 
        console.log(err)
        removeTokens()
        return window.location.replace(loginUrl);
      }
    }

    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${tokenData.accessToken}`
    }
  }

  return fetch(url, options)
}

export const removeTokens = () => {
  localStorage.removeItem('auth_tokens')
} 