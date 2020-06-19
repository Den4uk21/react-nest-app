import React from 'react'
import { Collapse, Form, Input, Button } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'

const { Panel } = Collapse

interface NewAnswerProps {
  onSubmitValues: (answer: string) => void
}

export const NewAnswer: React.FC<NewAnswerProps> = ({ onSubmitValues }) => {
  const onFinish = (values: any) => {
    onSubmitValues(values.answer)
  }

  return (
    <section className="new-answer">
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        <Panel header="Answer the question" key="1">
          <Form
            name="new_answer"
            className="new-answer-form"
            onFinish={onFinish}
          >

            <div className="form-item">
              <b>Your answer</b>
              <Form.Item
                name="answer"
                rules={[{ required: true, message: 'Please input answer!' }]}
              >
                <Input.TextArea />
              </Form.Item>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="new-answer-btn">
                Create Answer
              </Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
    </section>
  )
}