import React from 'react' // eslint-disable-line
import styled from 'styled-components'

const ColorSpan = styled.span`
  color: ${(props) => props.color};
`

function findColorTextEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'COLORTEXT'
    )
  }, callback)
}

export const colorTextDecorator = {
  strategy: findColorTextEntities,
  component: ColorText,
}

function ColorText(props) {
  const { color } = props.contentState.getEntity(props.entityKey).getData()
  return <ColorSpan color={color}>{props.children}</ColorSpan>
}
