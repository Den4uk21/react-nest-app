import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { CheckCircleTwoTone } from '@ant-design/icons'

import { DropDownSettings } from '../common/dropDownSettings'
import { DeleteAnswerModal } from '../modals/deleteAnswerModal'
import { ChangeAnswerModal } from '../modals/changeAnswerModal'
import { IAnswer } from '../../types/question-answer/types'

interface IAnswerProps extends IAnswer {
  onIncreaseRating: (answerId: string) => void
}

export const Answer: React.FC<IAnswerProps> = ({ id, userName, avatarUrl, answer, rating, isAnswer, date, onIncreaseRating }) => {
  const [changeVisible, setChangeVisible] = useState<boolean>(false)
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false)

  const isUser = userName === JSON.parse(localStorage.auth_tokens).userName

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

      {isUser ? (
        <div className="answer-settings">
          <DropDownSettings onChangeClick={() => setChangeVisible(true)} onDeleteClick={() => setDeleteVisible(true)} />
        </div>
      ): <></>}

      {isAnswer ? (
        <CheckCircleTwoTone twoToneColor="#52c41a" className="is-answer-icon" />
      ): <></>}

      <ChangeAnswerModal answerId={id} visible={changeVisible} setVisible={setChangeVisible} />
      <DeleteAnswerModal questionId={id} visible={deleteVisible} setVisible={setDeleteVisible} />
    </div>
  )
}