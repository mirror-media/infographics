import React from 'react' // eslint-disable-line

import Section from './layout/section'
import QAList from './list/qa-list'

export default function QaList(props) {
  return (
    <Section>
      <QAList title={props.title} questions={props.questions} />
    </Section>
  )
}
