import React from 'react'
import { Link } from 'react-router-dom'
import { Result, Button } from 'antd'

const Error404Page: React.FC = () => {
  return (
    <Result 
      status="404"
      title="Page not found!"
      subTitle="Check that the page is correct!"
      extra={[
        <Button
          type="primary"
          key="console"
        >
          <Link to="/">Go to Main page</Link>
        </Button>
      ]}
    />
  )
}

export default Error404Page