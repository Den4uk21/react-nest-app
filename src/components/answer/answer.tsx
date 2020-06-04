import React from 'react'
import { Link } from 'react-router-dom'
import { InfoCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons'

import { IGetAnswer } from '../../types/question-answer/types'

export const Answer: React.FC<IGetAnswer> = ({ id, userName, avatarUrl, answer, isAnswer, date }) => {
  return (
    <div className="answer">
      <picture className="user-avatar">
        <Link to={`/profile/${userName}`}><img src={avatarUrl} alt="avatar" /></Link>
      </picture>

      <div className="answer-block">
        <div className="info-block">
          <h3>{userName}</h3>
          <time>{date}</time>
        </div>

        <span>{answer}</span>
      </div>

      {isAnswer ? (
        <CheckCircleTwoTone twoToneColor="#52c41a" className="is-answer-icon" />
      ): (
        <InfoCircleTwoTone className="is-answer-icon" />
      )}
    </div>
  )
}