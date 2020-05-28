import React from 'react'
import { Link } from 'react-router-dom'

import { ILinkQuestion } from '../../types/main/types'

export const Question: React.FC<ILinkQuestion> = ({ id, categories, title, date }) => {
  return (
    <div className="question">
      <i>{categories.join(' -- ')}</i>
      
      <h3 className="title">
        <Link to={`/q/${id}`}>{title}</Link>
      </h3>

      <time>{date}</time>
    </div>
  )
}