import React from 'react'
import { Form, Input, Button } from 'antd'

import { AvatarModal } from '../modals/avatarModal'

import { IUpdateProfile } from '../../types/settings/types'
import './styles.sass'

interface SettingsProfileProps {
  onSubmitValues: (values: IUpdateProfile) => void,
  bio: string | null,
  motto: string | null,
  avatarUrl: string
}

export const SettingsProfile: React.FC<SettingsProfileProps> = ({ onSubmitValues, bio = '', motto = '', avatarUrl }) => {
  const onFinish = (values: any) => {
    onSubmitValues(values)
  }

  return (
    <section className="settings-profile settings">
      <h1 className="title">Update Profile</h1>
      <hr />

      <AvatarModal avatarUrl={avatarUrl} />

      <Form
        name="update_profile"
        className="update-profile-form"
        initialValues={{
          bio,
          motto
        }}
        onFinish={onFinish}
      >
        <div className="form-item">
          <b>Bio</b>
          <Form.Item name="bio">
            <Input.TextArea />
          </Form.Item>
        </div>

        <div className="form-item">
          <b>Motto</b>
          <Form.Item name="motto">
            <Input />
          </Form.Item>
        </div>

        <Form.Item>
          <Button htmlType="submit" className="update-profile-btn ">
            Update profile
          </Button>
        </Form.Item>
      </Form>
    </section>
  )
}