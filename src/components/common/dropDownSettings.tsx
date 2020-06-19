import React from 'react'
import { Menu, Dropdown } from 'antd'
import { ControlTwoTone, DeleteTwoTone, EditTwoTone } from '@ant-design/icons'

interface DropDownSettingsProps {
  onChangeClick: () => void,
  onDeleteClick: () => void
}

export const DropDownSettings: React.FC<DropDownSettingsProps> = ({ onChangeClick, onDeleteClick }) => {
  const menu = (
    <Menu>
      <Menu.Item icon={<EditTwoTone />} onClick={onChangeClick}>
        Change
      </Menu.Item>
      <Menu.Item icon={<DeleteTwoTone twoToneColor="#ff0000" />} onClick={onDeleteClick}>
        Delete
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']} placement="topLeft">
      <ControlTwoTone twoToneColor="#262626" />
    </Dropdown>
  )
}