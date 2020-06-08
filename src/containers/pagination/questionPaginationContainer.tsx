import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PagesPagination } from '../../components/pagination/pagesPagination'
import { IRootReducer } from '../../redux/store/rootReducer'
import { MainActions } from '../../redux/main/actions'

export const QuestionPaginationContainer: React.FC = () => {
  const dispatch = useDispatch()
  const { filter, questions } = useSelector((state: IRootReducer) => state.main)

  const onPageChange = (page: number) => {
    dispatch(MainActions.getAllQuestions({ page }))
  }

  return (
    <PagesPagination current={filter.page} onPageChange={onPageChange} total={questions.amount} />
  )
}