import React from 'react'

import { IProfile } from '../../types/profile/types'
import './styles.sass'

export const ProfileInfo: React.FC<IProfile> = ({ avatarUrl, userName, email, bio, motto, status }) => {
  return (
    <section className="profile-info">
      <picture className="user-avatar">
        <img src={avatarUrl} alt="avatar" />
      </picture>

      <div className="info">
        <h1 className="user-name">{userName}</h1>

        <ul className="user-info">
          <li className="email">
            <span><b>Email:</b> {email}</span>
          </li>
          
          {bio ? (
            <li className="bio">
              <b>Bio:</b>
              <span>{bio}</span>
            </li>
          ): <></>}

          {motto ? (
            <li className="motto">
              <b>Motto:</b>
              <span>{motto}</span>
            </li>
          ): <></>}

          <li className="status">
            <span><b>Status:</b> {status}</span>
          </li>
        </ul>
      </div>
    </section>
  )
}