import React from 'react'
import { NewQuestionFormContainer } from '../../containers/question/newQuestionFormContainer'

import './styles.sass'

const NewQuestionPage: React.FC = () => {
  return (
    <main className="new-question-page">
      <NewQuestionFormContainer />
    </main>
  )
}

export default NewQuestionPage