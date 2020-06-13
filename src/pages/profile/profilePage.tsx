import React from 'react'
import { ProfileInfoContainer } from '../../containers/profile/profileInfoContainer'
import { ProfileQuestionsContainer } from '../../containers/profile/profileQuestionsContainer'

import './styles.sass'

const ProfilePage: React.FC = () => {
  return (
    <main className="profile-page">
      <ProfileInfoContainer />
      <ProfileQuestionsContainer />
    </main>
  )
}

export default ProfilePage