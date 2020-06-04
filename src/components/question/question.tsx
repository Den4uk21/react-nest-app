import React from 'react'
import { Link } from 'react-router-dom'
import { Tag } from 'antd'

import { ILinkQuestion } from '../../types/main/types'

export const Question: React.FC<ILinkQuestion> = ({ id, categories, title, date }) => {
  return (
    <div className="question">
      <div className="categories">
        {categories.map((category, index) => (
          <Tag color="#595959" key={index}>{category}</Tag>
        ))}
      </div>
      
      <h3 className="title">
        <Link to={`/q/${id}`}>{title}</Link>
      </h3>

      <time>{date}</time>
    </div>
  )
}