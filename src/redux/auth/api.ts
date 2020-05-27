import { IRegister, ILogin } from '../../types/auth/types'
import { AuthUrls } from '../../types/auth/constants'
import { ContentType } from '../assets/utils'

export const signUpApi = async (payload: IRegister) => {
  const data = await fetch(AuthUrls.registerURL,
    {
      method: 'POST',
      headers: {
        'Content-Type': ContentType.APPLICATION_JSON
      },
      body: JSON.stringify(payload)
    }
  )

  return {
    status: await data.status,
    data: await data.json()
  }
}

export const signInApi = async (payload: ILogin) => {
  const data = await fetch(AuthUrls.loginURL,
    {
      method: 'POST',
      headers: {
        'Content-Type': ContentType.APPLICATION_JSON
      },
      body: JSON.stringify(payload)
    }
  )

  return {
    status: await data.status,
    data: await data.json()
  }
}

export const confirmApi = async (payload: string) => {
  const data = await fetch(AuthUrls.confirmURL + payload, { method: 'PUT' })

  return {
    status: await data.status,
    data: await data.json()
  }
}