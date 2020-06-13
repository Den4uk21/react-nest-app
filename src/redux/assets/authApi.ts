import { IAuth } from '../../types/auth/types'
import { AuthUrls } from '../../types/auth/constants'

export const saveTokens = (data: IAuth) => {
  localStorage.setItem('auth_tokens', JSON.stringify(data))
}

const refreshTokens = async (refreshToken: string) => {
  const userName = JSON.parse(localStorage.auth_tokens).userName
  const newTokens = await fetch(AuthUrls.tokensURL,
    {
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    }  
  )

  if(newTokens.status === 200) {
    const tokensData = await newTokens.json()
    saveTokens({ userName, ...tokensData })
  }else {
    throw new Error()
  }
}

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const loginUrl = '/login'
  let tokensData = null

  if(localStorage.auth_tokens) {
    tokensData = JSON.parse(localStorage.auth_tokens)
  }else {
    window.location.replace(loginUrl)
  }

  if(!options.headers) {
    options.headers = {}
  }

  if(tokensData) {
    if(Date.now() >= tokensData.expiresOn) {
      try {
        await refreshTokens(tokensData.refreshToken)
        tokensData = JSON.parse(localStorage.auth_tokens)
      }catch (err) { 
        console.log(err)
        removeTokens()
        window.location.replace(loginUrl)
      }
    }

    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${tokensData.accessToken}`
    }
  }

  return fetch(url, options)
}

export const removeTokens = () => {
  localStorage.removeItem('auth_tokens')
} 