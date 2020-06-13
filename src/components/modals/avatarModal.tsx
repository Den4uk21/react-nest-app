import React, { useState } from 'react'
import { Button, Modal, Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { uploadAvatar } from '../../redux/settings/api'
import './styles.sass'

interface UploadAvatarProps {
  getFile: (file: Blob) => void
}

const UploadAvatar: React.FC<UploadAvatarProps> = ({ getFile }) => {
  const [imageUrl, setImageUrl] = useState<any>(null)

  const getBase64 = (img: Blob, callback: (imageUrl: string | ArrayBuffer | null) => any) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const beforeUpload = (file: Blob) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }else if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }else {
      getBase64(file, (imageUrl) => {
        setImageUrl(imageUrl)
      })

      getFile(file)
    }

    return false
  }
  
  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
    >
      {imageUrl 
        ? 
        <img src={imageUrl} alt="avatar" className="upload-img" /> 
        : 
        <div className="upload-form">
          <PlusOutlined />
          <div className="ant-upload-text">Upload</div>
        </div>
      }
    </Upload>
  )
}

interface AvatarModalProps {
  avatarUrl: string,
}

export const AvatarModal: React.FC<AvatarModalProps> = ({ avatarUrl }) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [file, setFile] = useState<Blob | null>(null)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const getFile = (file: Blob) => {
    setFile(file)
  }

  const handleOk = async () => {
    setLoading(true)

    if(!file) {
      message.error('File not found!')
      setLoading(false)
      return
    }

    const response = await uploadAvatar(file)
    setLoading(false)

    if(response) {
      if(response.status === 201) {
        setVisible(false)
        window.location.reload()
        message.success(response.data.message)
      }else {
        message.error(response.data.message)
      }
    }else {
      message.error('Don`t work!')
    }
  }

  return (
    <div className="avatar-modal">
      <img src={avatarUrl} alt="avatar" onClick={showModal} className="avatar-img" />
      
      <Modal
        title="Change Avatar"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Change
          </Button>,
        ]}
      >

        <UploadAvatar getFile={getFile} />
      </Modal>
    </div>
  )
}