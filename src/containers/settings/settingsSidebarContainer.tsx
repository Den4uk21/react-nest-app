import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { SettingsSidebar } from '../../components/settings/settingsSidebar'
import { ProfileActions } from '../../redux/profile/actions'

export const SettingsSidebarContainer: React.FC = () => {
  const dispatch = useDispatch()
  const userName = JSON.parse(localStorage.auth_tokens).userName

  useEffect(() => {
    dispatch(ProfileActions.getProfile(userName))
  }, [dispatch, userName])

  return (
    <SettingsSidebar />
  )
}