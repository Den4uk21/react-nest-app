import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { LockOutlined } from '@ant-design/icons'

import '../styles.sass'

interface ChangeForgotPassFormProps {
  onSubmitValues: (password: string) => void
}

export const ChangeForgotPassForm: React.FC<ChangeForgotPassFormProps> = ({ onSubmitValues }) => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    if(form.getFieldValue('password') !== form.getFieldValue('confirmPassword')) {
      message.error('Two passwords are different!')
    }else {
      onSubmitValues(values.password)
    }
  }

  return (
    <Form
      name="change_forgot_pass"
      className="change-forgot-pass-form auth"
      onFinish={onFinish}
      form={form}
    >
      <Form.Item
        className="main-label"
      >
        <h2>Change Password</h2>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="New Password"
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        rules={[
          { required: true, message: 'Please confirm your Password!' },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Confirm Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="change-forgot-password-btn">
          Change password
        </Button>
      </Form.Item>
    </Form>
  )
}