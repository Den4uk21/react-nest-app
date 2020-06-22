import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Input, Button } from 'antd'

import { NewAnswerActions } from '../../redux/new-answer/actions'
import { IRootReducer } from '../../redux/store/rootReducer'
import './styles.sass'

interface ChangeAnswerModalProps {
  answerId: string,
  visible: boolean,
  setVisible: (visible: boolean) => void
}

export const ChangeAnswerModal: React.FC<ChangeAnswerModalProps> = ({ answerId, visible, setVisible }) => {
  const dispatch = useDispatch()
  const previousChanges = useSelector((state: IRootReducer) => state.question_answer.answers.answersList)
    .find((answer) => answer.id === answerId)

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
        initialValues={previousChanges ? previousChanges : undefined}
      >

        <div className="form-item">
          <b>Your answer</b>
          <Form.Item
            name="answer"
            rules={[{ required: true, message: 'Please input Answer!' }]}
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