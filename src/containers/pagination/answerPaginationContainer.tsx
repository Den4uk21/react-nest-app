import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { PagesPagination } from '../../components/pagination/pagesPagination'
import { IRootReducer } from '../../redux/store/rootReducer'
import { QuestionAnswerActions } from '../../redux/question-answer/actions'

export const AnswerPaginationContainer: React.FC = () => {
  const dispatch = useDispatch()
  const total = useSelector((state: IRootReducer) => state.question_answer.answers.amount)
  const [page, setPage] = useState<number>(1)
  const { questionId } = useParams()

  const onPageChange = (page: number) => {
    dispatch(QuestionAnswerActions.getAnswers({ questionId, page }))
    setPage(page)
  }

  return (
    <PagesPagination current={page} onPageChange={onPageChange} total={total} />
  )
}