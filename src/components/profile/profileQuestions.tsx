import React, { useState } from 'react'
import { Tabs } from 'antd'
import { QuestionsList } from '../question/questionsList'
import { ILinkQuestionResponse } from '../../types/main/types'
import { PagesPagination } from '../pagination/pagesPagination'

const { TabPane } = Tabs

interface ProfileQuestionsProps {
  questionsWithAnswers: ILinkQuestionResponse,
  questionsNoAnswers: ILinkQuestionResponse,
  onPageChangeWithAnswer: (page: number) => void,
  onPageChangeNoAnswer: (page: number) => void
}

export const ProfileQuestions: React.FC<ProfileQuestionsProps> = ({ questionsWithAnswers, questionsNoAnswers, onPageChangeWithAnswer, onPageChangeNoAnswer }) => {
  const [current, setCurrent] = useState<number>(1)
  const [total, setTotal] = useState<number>(questionsWithAnswers.amount)
  const [key, setKey] = useState<string>('WITH')

  const onTabClick = (key: string) => {
    switch (key) {
      case 'WITH':
        setCurrent(1)
        setTotal(questionsWithAnswers.amount)  

        setKey(key)
        break

      case 'WITHOUT':
        setCurrent(1)
        setTotal(questionsNoAnswers.amount)

        setKey(key)
        break
    }
  }

  const onPageChange = (page: number) => {
    switch (key) {
      case 'WITH':
        onPageChangeWithAnswer(page)
        break

      case 'WITHOUT':
        onPageChangeNoAnswer(page)
        break
    }

    setCurrent(page)
  }

  return (
    <div className="profile-questions">
      <Tabs type="card" onTabClick={onTabClick}>
        <TabPane tab="Questions with answers" key="WITH">
          <QuestionsList questionsList={questionsWithAnswers.questionsList} />
        </TabPane>
        <TabPane tab="Questions without answers" key="WITHOUT">
          <QuestionsList questionsList={questionsNoAnswers.questionsList} />
        </TabPane>
      </Tabs>

      <PagesPagination current={current} onPageChange={onPageChange} total={total} />
    </div>
  )
}