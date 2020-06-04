import React, { useState } from 'react'
import { Select, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { SelectValue } from 'antd/lib/select'

const { Option } = Select

interface ISelectCategoriesProps {
  setCategories: (categories: string[]) => void
  onSearchClick: (value: string[]) => void
} 

export const SelectCategories: React.FC<ISelectCategoriesProps> = ({ onSearchClick, setCategories }) => {
  const [value, setValue] = useState<string[]>([])
  const allCategories = ['Math', 'Technology']

  const onSelectChange = (value: SelectValue) => {
    setValue(value as string[])
  }

  const onSelectCategories = () => {
    setCategories(value)
    onSearchClick(value)
  }

  return (
    <div className="select-categories">
      <Select
        mode="multiple"
        placeholder="Select categories..."
        onChange={onSelectChange}
      >
        {allCategories.map((item, index) => (
          <Option key={index} value={item}>{item}</Option>
        ))}
      </Select>

      <Button type="primary" shape="circle" icon={<SearchOutlined />} className="search-questions" onClick={onSelectCategories} />
    </div>
  )
}