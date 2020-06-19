import React from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Form, Input, Button } from 'antd'

import { NewAnswerActions } from '../../redux/new-answer/actions'
import './styles.sass'

interface ChangeAnswerModalProps {
  answerId: string,
  visible: boolean,
  setVisible: (visible: boolean) => void
}

export const ChangeAnswerModal: React.FC<ChangeAnswerModalProps> = ({ answerId, visible, setVisible }) => {
  const dispatch = useDispatch()

  const onFinish = (values: any) => {
    dispatch(NewAnswerActions.changeAnswer({ answerId, ...values }))
    setVisible(false)
  }

  const onCancel = () => {
    setVisible(false)
  }

  return (
    <Modal
      visible={visible}
      title="Change answer!"
      className="change-answer change-modal"
      onCancel={onCancel}
      footer={[]}
    >
      <Form
        name="change_answer"
        className="change-answer-form"
        onFinish={onFinish}
      >

        <div className="form-item">
          <b>Your answer</b>
          <Form.Item
            name="answer"
            rules={[{ required: true, message: 'Please input answer!' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </div>

        <Form.Item>
          <Button key="cansel" onClick={onCancel}>
            Cansel
          </Button>
          <Button key="submit" type="primary" htmlType="submit" className="change-answer-btn">
            Change Answer
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}