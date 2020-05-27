import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import './styles.sass'

export const Fallback: React.FC = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
    
    return (
        <div className="router-lazy-spin">
            <Spin indicator={antIcon} tip="Loading..." />
        </div>
    )
}