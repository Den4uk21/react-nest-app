import React from 'react'
import { Form, Input, Button } from 'antd'
import { MailOutlined } from '@ant-design/icons'

import '../styles.sass'

interface ChangeEmailFormProps {
  onSubmitValues: (email: string) => void
}

export const ChangeEmailForm: React.FC<ChangeEmailFormProps> = ({ onSubmitValues }) => {
  const onFinish = (values: any) => {
    onSubmitValues(values.email)
  }

  return (
    <Form
      name="change_email"
      className="change-email-form auth"
      onFinish={onFinish}
    >
      <Form.Item
        name="main-label"
        className="main-label"
      >
        <h2>Change Email</h2>
      </Form.Item>

      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your new Email!' }]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="New Email" type="email" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="change-email-btn">
          Change email
        </Button>
      </Form.Item>
    </Form>
  )
}