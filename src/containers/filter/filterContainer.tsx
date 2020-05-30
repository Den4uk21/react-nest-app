import React from 'react'
import { useDispatch } from 'react-redux'

import { FilterQuestions } from '../../components/filter/filterQuestions'
import { MainActions } from '../../redux/main/actions'

export const FilterContainer: React.FC = () => {
  const dispatch = useDispatch()

  const addFilterParams = (value: string) => {
    dispatch(MainActions.getAllQuestions({ type: value }))
  }

  return (
    <FilterQuestions addFilterParams={addFilterParams} />
  )
}