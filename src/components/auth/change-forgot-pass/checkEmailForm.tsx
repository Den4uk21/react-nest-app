import React from 'react'
import { Form, Input, Button } from 'antd'
import { MailOutlined } from '@ant-design/icons'

import '../styles.sass'

interface CheckEmailFormProps {
  onSubmitValues: (email: string) => void
}

export const CheckEmailForm: React.FC<CheckEmailFormProps> = ({ onSubmitValues }) => {
  const onFinish = (values: any) => {
    onSubmitValues(values.email)
  }

  return (
    <Form
      name="check_email"
      className="change-email-form auth"
      onFinish={onFinish}
    >
      <Form.Item
        className="main-label"
      >
        <h2>Check Email</h2>
      </Form.Item>

      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" type="email" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="check-email-btn">
          Send email verification
        </Button>
      </Form.Item>
    </Form>
  )
}