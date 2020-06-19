import React from 'react'
import { Form, Input, Button, Select } from 'antd'

import { INewQuestion } from '../../types/new-question/types'
import { AllCategories } from '../../types/constants'
import './styles.sass'

const { Option } = Select

interface NewQuestionFormProps {
  onSubmitValues: (values: INewQuestion) => void
}

export const NewQuestionForm: React.FC<NewQuestionFormProps> = ({ onSubmitValues }) => {
  const onFinish = (values: any) => {
    onSubmitValues(values)
  }

  return (
    <Form
      name="new_question"
      className="new-question-form"
      onFinish={onFinish}
    >
      <Form.Item
        className="main-label"
      >
        <h2>Ask a Question</h2>
      </Form.Item>

      <div className="form-item">
        <b>Title</b>
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Please input Title!' }]}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="form-item">
        <b>Categories</b>
        <Form.Item
          name="categories"
        >
          <Select
            mode="multiple"
            placeholder="Select categories..."
          >
            {AllCategories.map((item, index) => (
              <Option key={index} value={item}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <div className="form-item">
        <b>Descriptions</b>
        <Form.Item
          name="descriptions"
          rules={[{ required: true, message: 'Please input Descriptions!' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="new-question-btn">
          Create Question
        </Button>
      </Form.Item>
    </Form>
  )
}