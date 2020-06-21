import React from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Button } from 'antd'

import { NewQuestionActions } from '../../redux/new-question/actions'

interface DeleteQuestionModalProps {
  questionId: string,
  visible: boolean,
  setVisible: (visible: boolean) => void
}

export const DeleteQuestionModal: React.FC<DeleteQuestionModalProps> = ({ questionId, visible, setVisible }) => {
  const dispatch = useDispatch()

  const onDeleteClick = () => {
    dispatch(NewQuestionActions.deleteQuestion(questionId))
  }

  const onCancel = () => {
    setVisible(false)
  }

  return (
    <Modal
      visible={visible}
      title="Warning!"
      className="delete-question"
      onCancel={onCancel}
      footer={[
        <Button key="cansel" onClick={onCancel}>
          Cansel
        </Button>,
        <Button key="submit" type="primary" onClick={onDeleteClick}>
          Delete question
        </Button>,
      ]}
    >
      <span>Clicking "Delete question" will delete the question without the possibility of recovery.</span>
    </Modal>
  )
}