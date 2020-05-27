import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'

import { IRegister } from '../../../types/auth/types'
import './styles.sass'

interface RegisterFormProps {
  onSubmitValues: (values: IRegister) => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmitValues }) => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    if(form.getFieldValue('password') !== form.getFieldValue('confirm-password')) {
      message.error('Two passwords are different!')
    }else {
      onSubmitValues(values)
    }
  }

  return (
    <Form
      name="normal_register"
      className="register-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      form={form}
    >
      <Form.Item className="main-label">
        <h2>Sign Up</h2>
      </Form.Item>

      <Form.Item
        name="userName"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="confirm-password"
        rules={[
          { required: true, message: 'Please confirm your Password!' },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="register-form-button ">
          Sign Up
        </Button>
        Or <Link to="/login">Login now!</Link>
      </Form.Item>
    </Form>
  )
}