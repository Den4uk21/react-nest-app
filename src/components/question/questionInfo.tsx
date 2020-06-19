import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tag } from 'antd'

import { DropDownSettings } from '../common/dropDownSettings'
import { DeleteQuestionModal } from '../modals/deleteQuestionModal'
import { ChangeQuestionModal } from '../modals/changeQuestionModal'
import { IQuestion } from '../../types/question-answer/types'

import './styles.sass'

export const QuestionInfo: React.FC<IQuestion> = ({ id, userName, avatarUrl, title, descriptions, categories, date }) => {
  const [changeVisible, setChangeVisible] = useState<boolean>(false)
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false)
  
  const isUser = userName === JSON.parse(localStorage.auth_tokens).userName

  return (
    <section className="question-info">
      <div className="user-info">
        <Link to={`/profile/${userName}`}><img src={avatarUrl} alt="avatar" /></Link>
        
        <div className="info-block">
          <h3>{userName}</h3>
          <time>{date}</time>
        </div>

        {isUser ? (
          <div className="question-settings">
            <DropDownSettings onChangeClick={() => setChangeVisible(true)} onDeleteClick={() => setDeleteVisible(true)} />
          </div>
        ): <></>}
      </div>

      <div className="question-block">
        <h1 className="title">{title}</h1>

        <span className="descriptions">
          {descriptions}
        </span>
      </div>

      <hr />
      
      <div className="categories">
        {categories.map((category, index) => (
          <Tag color="#595959" key={index}>{category}</Tag>
        ))}
      </div>

      <ChangeQuestionModal questionId={id} visible={changeVisible} setVisible={setChangeVisible} />
      <DeleteQuestionModal questionId={id} visible={deleteVisible} setVisible={setDeleteVisible} />
    </section>
  )
}