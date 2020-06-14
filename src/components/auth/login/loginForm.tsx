import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'

import { ILogin } from '../../../types/auth/types'
import '../styles.sass'

interface LoginFormProps {
  onSubmitValues: (values: ILogin) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmitValues }) => {
  const onFinish = (values: any) => {
    onSubmitValues(values)
  }

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="main-label"
        className="main-label"
      >
        <h2>Sign In</h2>
      </Form.Item>

      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" type="email" />
      </Form.Item>
      
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign in
        </Button>
        Or <Link to="/register" className="link">Register now!</Link>
      </Form.Item>
    </Form>
  )
}