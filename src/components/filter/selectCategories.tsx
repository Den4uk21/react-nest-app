import React from 'react'
import { Select } from 'antd'

const { Option } = Select

export const SelectCategories: React.FC = () => {
  const categories = ['Math', 'Technology']

  return (
    <Select
      mode="multiple"
      placeholder="Select categories..."
      className="select-categories"
    >
      {categories.map((item, index) => (
        <Option key={index} value={item}>{item}</Option>
      ))}
    </Select>
  )
}