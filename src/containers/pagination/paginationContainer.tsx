import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'react-router-redux'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

import { PagesPagination } from '../../components/pagination/pagesPagination'
import { IRootReducer } from '../../redux/store/rootReducer'

export const PaginationContainer: React.FC = () => {
  const dispatch = useDispatch()
  const total = useSelector((state: IRootReducer) => state.main.questions.amount)
  const location = useLocation()
  const query = queryString.parse(location.search)

  const onPageChange = (page: number) => {
    if(query.type) {
      dispatch(push(location.pathname + `?page=${page}&type=${query.type}&categories=${query.categories}`))
    }else {
      dispatch(push(location.pathname + `?page=${page}`))
    }
  }

  return (
    <PagesPagination current={Number(query.page)} onPageChange={onPageChange} total={total} />
  )
}