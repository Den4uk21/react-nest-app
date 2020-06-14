import { SettingsUrls } from '../../types/settings/constants'
import { IUpdateProfile, IChangePassword, IUpdateUsername } from '../../types/settings/types'
import { fetchWithAuth } from '../assets/authApi'
import { ContentType } from '../assets/utils'

export const uploadAvatar = async (file: Blob) => {
  const formData = new FormData()
  formData.append('avatar', file)

  const data = await fetchWithAuth(SettingsUrls.uploadAvatarURL, {
    method: 'POST',
    body: formData
  })

  if(data) {
    return {
      status: await data.status,
      data: await data.json()
    }
  }
}

export const updateProfileApi = async (payload: IUpdateProfile) => {
  const bio = payload.bio === '' ? null : payload.bio
  const motto = payload.motto === '' ? null : payload.motto

  const data = await fetchWithAuth(SettingsUrls.updateProfileURL, {
    method: 'PUT',
    headers: {
      'Content-Type': ContentType.APPLICATION_JSON
    },
    body: JSON.stringify({ bio, motto })
  })

  if(data) {
    return {
      status: await data.status,
      data: await data.json()
    }
  }
}

export const updateUsernameApi = async (payload: IUpdateUsername) => {
  const data = await fetchWithAuth(SettingsUrls.updateUsernameURL, {
    method: 'PUT',
    headers: {
      'Content-Type': ContentType.APPLICATION_JSON
    },
    body: JSON.stringify(payload)
  })

  if(data) {
    return {
      status: await data.status,
      data: await data.json()
    }
  }
}

export const changePassApi = async (payload: IChangePassword) => {
  const data = await fetchWithAuth(SettingsUrls.changePassURL, {
    method: 'PUT',
    headers: {
      'Content-Type': ContentType.APPLICATION_JSON
    },
    body: JSON.stringify(payload)
  })

  if(data) {
    return {
      status: await data.status,
      data: await data.json()
    }
  }
}