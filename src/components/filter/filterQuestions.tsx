import React from 'react'
import { Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'

import { SelectCategories } from './selectCategories'

import './styles.sass'

interface IFilterQuestionsProps {
  addFilterParams: (value: string) => void
}

export const FilterQuestions: React.FC<IFilterQuestionsProps> = ({ addFilterParams }) => {
  const filterParamsChange = (e: RadioChangeEvent) => {
    addFilterParams(e.target.value)
  }

  return (
    <section className="filter-questions">
      <Radio.Group defaultValue="new" buttonStyle="solid" className="filter-params" onChange={filterParamsChange}>
        <Radio.Button value="new">New</Radio.Button>
        <Radio.Button value="popular">Popular</Radio.Button>
        <Radio.Button value="without_answers">Without answers</Radio.Button>
      </Radio.Group>

      <SelectCategories />
    </section>
  )
}