import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'

import { IRegister } from '../../../types/auth/types'
import '../styles.sass'

interface RegisterFormProps {
  onSubmitValues: (values: IRegister) => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmitValues }) => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    if(form.getFieldValue('password') !== form.getFieldValue('confirmPassword')) {
      message.error('Two passwords are different!')
    }else {
      onSubmitValues(values)
    }
  }

  return (
    <Form
      name="register"
      className="register-form auth"
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
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
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
        <Button htmlType="submit" className="register-form-button ">
          Sign Up
        </Button>
        Or <Link to="/login" className="link">Login now!</Link>
      </Form.Item>
    </Form>
  )
}