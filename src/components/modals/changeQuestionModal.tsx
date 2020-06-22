import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Form, Input, Button, Select } from 'antd'

import { AllCategories } from '../../types/constants'
import { IRootReducer } from '../../redux/store/rootReducer'
import { NewQuestionActions } from '../../redux/new-question/actions'

import './styles.sass'

const { Option } = Select

interface ChangeQuestionModalProps {
  questionId: string,
  visible: boolean,
  setVisible: (visible: boolean) => void
}

export const ChangeQuestionModal: React.FC<ChangeQuestionModalProps> = ({ questionId, visible, setVisible }) => {
  const dispatch = useDispatch()
  const previousChanges = useSelector((state: IRootReducer) => state.question_answer.questionsInfo)
  const validCategories = previousChanges?.categories.find((item) => item === 'All') ?
    [] : previousChanges?.categories

  const onFinish = (values: any) => {
    dispatch(NewQuestionActions.changeQuestion({ questionId, ...values}))
    setVisible(false)
  }

  const onCancel = () => {
    setVisible(false)
  }

  return (
    <Modal
      visible={visible}
      title="Change question!"
      className="change-question change-modal"
      onCancel={onCancel}
      footer={[]}
    >
      <Form
        name="change"
        className="change-question-form"
        onFinish={onFinish}
        initialValues={previousChanges ? 
          {...previousChanges, categories: validCategories } 
          : undefined
        }
      >
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
          <Button key="cansel" onClick={onCancel}>
            Cansel
          </Button>
          <Button type="primary" htmlType="submit" className="change-question-btn">
            Change Question
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}