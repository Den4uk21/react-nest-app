import { IRegister, ILogin, IChangeEmail, IChangeForgotPass } from '../../types/auth/types'
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

export const confirmApi = async (token: string) => {
  const data = await fetch(AuthUrls.confirmURL + token, 
    { 
      method: 'PUT' 
    }
  )

  return {
    status: await data.status,
    data: await data.json()
  }
}

export const changeEmailApi = async ({ token, email }: IChangeEmail) => {
  const data = await fetch(AuthUrls.changeEmailURL + token,
    {
      method: 'PUT',
      headers: {
        'Content-Type': ContentType.APPLICATION_JSON
      },
      body: JSON.stringify({ email })
    }
  )

  return {
    status: await data.status,
    data: await data.json()
  }
}

export const sendChangePassApi = async (email: string) => {
  const data = await fetch(AuthUrls.sendChangePassURL,
    {
      method: 'POST',
      headers: {
        'Content-Type': ContentType.APPLICATION_JSON
      },
      body: JSON.stringify({ email })
    }
  )

  return {
    status: await data.status,
    data: await data.json()
  }
}

export const changeForgotPassApi = async ({ token, password }: IChangeForgotPass) => {
  const data = await fetch(AuthUrls.changeForgotPassURL + token,
    {
      method: 'PUT',
      headers: {
        'Content-Type': ContentType.APPLICATION_JSON
      },
      body: JSON.stringify({ password })
    }
  )

  return {
    status: await data.status,
    data: await data.json()
  }
}