import React from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Button } from 'antd'

import { NewAnswerActions } from '../../redux/new-answer/actions'

interface DeleteAnswerModalProps {
  questionId: string,
  visible: boolean,
  setVisible: (visible: boolean) => void
}

export const DeleteAnswerModal: React.FC<DeleteAnswerModalProps> = ({ questionId, visible, setVisible }) => {
  const dispatch = useDispatch()

  const onDeleteClick = () => {
    dispatch(NewAnswerActions.deleteAnswer(questionId))
  }

  const onCancel = () => {
    setVisible(false)
  }

  return (
    <Modal
      visible={visible}
      title="Warning!"
      className="delete-answer"
      onCancel={onCancel}
      footer={[
        <Button key="cansel" onClick={onCancel}>
          Cansel
        </Button>,
        <Button key="submit" type="primary" onClick={onDeleteClick}>
          Delete answer
        </Button>,
      ]}
    >
      <span>Clicking "Delete Answer" will delete the answer without the possibility of recovery.</span>
    </Modal>
  )
}