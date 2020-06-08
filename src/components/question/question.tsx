import React from 'react'
import { Link } from 'react-router-dom'
import { Tag } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'

import { ILinkQuestion } from '../../types/main/types'

export const Question: React.FC<ILinkQuestion> = ({ id, categories, title, date, answersAmount }) => {
  return (
    <div className="question">
      <div className="question-info">
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
      
      <div className="answers-amount">
        <UpOutlined />
        <span className="amount">{answersAmount}</span>
        <DownOutlined />
      </div>
    </div>
  )
}