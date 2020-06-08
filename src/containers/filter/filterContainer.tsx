import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { FilterQuestions } from '../../components/filter/filterQuestions'
import { MainActions } from '../../redux/main/actions'

export const FilterContainer: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(MainActions.getAllQuestions({}))
  }, [dispatch])

  const addFilterParams = (type: string, categories: string[]) => {
    dispatch(MainActions.getAllQuestions({ type, categories }))
  }

  return (
    <FilterQuestions addFilterParams={addFilterParams} />
  )
}