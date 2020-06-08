import React from 'react'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'antd'

interface AuthWarningModalProps {
  visible: boolean,
  setVisible: (visible: boolean) => void
}

export const AuthWarningModal: React.FC<AuthWarningModalProps> = ({ visible, setVisible }) => {
  const onCancel = () => {
    setVisible(false)
  }

  return (
    <Modal
      visible={visible}
      title="Warning!"
      onCancel={onCancel}
      footer={[
        <Button key="cansel" onClick={onCancel}>
          Cansel
        </Button>,
        <Button key="submit" type="primary">
          <Link to="/login">Go to Login</Link>
        </Button>,
      ]}
    >
      <span>To increase the rating you must log in</span>
    </Modal>
  )
}