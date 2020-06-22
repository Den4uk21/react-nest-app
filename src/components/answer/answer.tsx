import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { CheckCircleTwoTone, CloseCircleTwoTone, CheckOutlined } from '@ant-design/icons'

import { DropDownSettings } from '../common/dropDownSettings'
import { DeleteAnswerModal } from '../modals/deleteAnswerModal'
import { ChangeAnswerModal } from '../modals/changeAnswerModal'
import { IAnswer } from '../../types/question-answer/types'

interface IAnswerProps extends IAnswer {
  onIncreaseRating: (answerId: string) => void,
  onIsAnswerClick: (answerId: string) => void,
  userNameQuestion: string | undefined
}

export const Answer: React.FC<IAnswerProps> = ({ 
  id, userName, avatarUrl, answer, rating, isAnswer, date, onIncreaseRating, onIsAnswerClick, userNameQuestion 
}) => {
  const [changeVisible, setChangeVisible] = useState<boolean>(false)
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false)

  const isAuth = localStorage.auth_tokens
  const isYourQuestion = isAuth ? userNameQuestion === JSON.parse(isAuth).userName : false
  const isUser = isAuth ? userName === JSON.parse(isAuth).userName : false

  return (
    <div className="answer">
      <div className="status-block">
        <Link to={`/profile/${userName}`}><img src={avatarUrl} alt="avatar" /></Link>

        {isAnswer ? (
          <div className="is-answer icon">
            <CheckOutlined />
          </div>
        ): <></>}

        {isYourQuestion ? (
          <div className="is-answer btn">
            {isAnswer ? 
              <CloseCircleTwoTone twoToneColor="#ff0000" onClick={() => onIsAnswerClick(id)} /> : 
              <CheckCircleTwoTone twoToneColor="#52c41a" onClick={() => onIsAnswerClick(id)} />
            }
          </div>
        ): <></>}
      </div>

      <div className="answer-block">
        <div className="info-block">
          <h3>{userName}</h3>
          <time>{date}</time>
        </div>

        <span>{answer}</span>
      </div>

      <div className="settings-block">

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
      </div>

      <ChangeAnswerModal answerId={id} visible={changeVisible} setVisible={setChangeVisible} />
      <DeleteAnswerModal questionId={id} visible={deleteVisible} setVisible={setDeleteVisible} />
    </div>
  )
}