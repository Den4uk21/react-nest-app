import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'react-router-redux'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

import { FilterQuestions } from '../../components/filter/filterQuestions'
import { MainActions } from '../../redux/main/actions'

export const FilterContainer: React.FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const query = queryString.parse(location.search)

  useEffect(() => {
    dispatch(MainActions.getAllQuestions({ type: query.type as string, categories: query.categories as string, page: query.page as string }))
  })

  const addFilterParams = (type: string, categories: string[]) => {
    if(query.page) {
      dispatch(push(location.pathname + `?page=${query.page}&type=${type}&categories=${categories}`))
    }else {
      dispatch(push(location.pathname + `?type=${type}&categories=${categories}`))
    }
  }

  return (
    <FilterQuestions addFilterParams={addFilterParams} />
  )
}