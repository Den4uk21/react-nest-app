import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'

import { IChangePassword } from '../../types/settings/types'
import './styles.sass'

interface SettingsPasswordProps {
  onSubmitValues: (values: IChangePassword) => void
}

export const SettingsPassword: React.FC<SettingsPasswordProps> = ({ onSubmitValues }) => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    if(form.getFieldValue('newPassword') !== form.getFieldValue('confirmPassword')) {
      message.error('Two passwords are different!')
    }else {
      onSubmitValues(values)
    }
  }

  return (
    <section className="settings-password settings">
      <h1 className="title">Change Password</h1>
      <hr />

      <Form
        name="change_pass"
        className="change-pass-form"
        onFinish={onFinish}
        form={form}
      >
        <div className="form-item">
          <b>Old password</b>
          <Form.Item name="oldPassword" rules={[{ required: true, message: 'Please input your old Password!' }]}>
            <Input.Password />
          </Form.Item>
        </div>

        <div className="form-item">
          <b>New password</b>
          <Form.Item name="newPassword" rules={[{ required: true, message: 'Please input your new Password!' }]}>
            <Input.Password />
          </Form.Item>
        </div>

        <div className="form-item">
          <b>Confirm password</b>
          <Form.Item name="confirmPassword" rules={[{ required: true, message: 'Please confirm your Password!' }]}>
            <Input.Password />
          </Form.Item>
        </div>

        <Form.Item>
          <Button htmlType="submit" className="change-pass-btn">
            Change Password
          </Button>
          <Link to="/auth/check-email" className="link">I forgot my password!</Link>
        </Form.Item>
      </Form>
    </section>
  )
}