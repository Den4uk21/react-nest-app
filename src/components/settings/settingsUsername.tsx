import React from 'react'
import { Form, Input, Button } from 'antd'

import { IUpdateUsername } from '../../types/settings/types'
import './styles.sass'

interface SettingsUsernameProps {
  userName: string,
  onSubmitValues: (values: IUpdateUsername) => void
}

export const SettingsUsername: React.FC<SettingsUsernameProps> = ({ userName, onSubmitValues }) => {
  const onFinish = (values: any) => {
    onSubmitValues(values)
  }

  return (
    <section className="settings-username settings">
      <h1 className="title">Update Username</h1>
      <hr />
      <span className="username">Your name: {userName}</span>

      <Form
        name="update_username"
        className="update-username-form"
        onFinish={onFinish}
      >
        <div className="form-item">
          <b>Username</b>
          <Form.Item name="userName" rules={[{ required: true, message: 'Please input your name!' }]}>
            <Input />
          </Form.Item>
        </div>

        <Form.Item>
          <Button htmlType="submit" className="updated-username-btn">
            Update Username
          </Button>
        </Form.Item>
      </Form>
    </section>
  )
}