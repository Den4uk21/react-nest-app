import React from 'react'
import { Link } from 'react-router-dom'
import { Tag } from 'antd'

import { IGetQuestion } from '../../types/question-answer/types'
import './styles.sass'

export const QuestionInfo : React.FC<IGetQuestion> = ({ id, userName, avatarUrl, title, descriptions, categories, date }) => {
  return (
    <section className="question-info">
      <div className="user-info">
        <Link to={`/profile/${userName}`}><img src={avatarUrl} alt="avatar" /></Link>
        
        <div className="info-block">
          <h3>{userName}</h3>
          <time>{date}</time>
        </div>
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
    </section>
  )
}