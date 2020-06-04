import React, { useState } from 'react'
import { Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'

import { SelectCategories } from './selectCategories'

import './styles.sass'

interface IFilterQuestionsProps {
  addFilterParams: (type: string, categories: string[]) => void
}

export const FilterQuestions: React.FC<IFilterQuestionsProps> = ({ addFilterParams }) => {
  const [type, setType] = useState<string>('new')
  const [categories, setCategories] = useState<string[]>([])

  const filterTypeChange = (e: RadioChangeEvent) => {
    setType(e.target.value)
    addFilterParams(e.target.value, categories)
  }

  const onSearchClick = (value: string[]) => {
    addFilterParams(type, value)
  }

  return (
    <section className="filter-questions">
      <Radio.Group defaultValue="new" buttonStyle="solid" className="filter-params" onChange={filterTypeChange}>
        <Radio.Button value="new">New</Radio.Button>
        <Radio.Button value="popular">Popular</Radio.Button>
        <Radio.Button value="without_answers">Without answers</Radio.Button>
      </Radio.Group>

      <SelectCategories onSearchClick={onSearchClick} setCategories={setCategories} />
    </section>
  )
}