import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { CheckCircleTwoTone } from '@ant-design/icons'

import { IAnswer } from '../../types/question-answer/types'

interface IAnswerProps extends IAnswer {
  onIncreaseRating: (answerId: string) => void
}

export const Answer: React.FC<IAnswerProps> = ({ id, userName, avatarUrl, answer, rating, isAnswer, date, onIncreaseRating }) => {
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

      <div className="rating">
        <div className="amount">{rating}</div>

        <Button type="ghost" onClick={() => onIncreaseRating(id)}>
          Increase
        </Button>
      </div>

      {isAnswer ? (
        <CheckCircleTwoTone twoToneColor="#52c41a" className="is-answer-icon" />
      ): <></>}
    </div>
  )
}