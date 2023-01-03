import React from 'react'; // eslint-disable-line
import { EmbeddedCodeBlock } from './embedded-code';
import { ImageBlock } from './image';

const AtomicBlock = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));

  const entityType = entity.getType();
  // eslint-disable-next-line
  switch (entityType) {
    case 'image': {
      return ImageBlock(entity);
    }
    case 'EMBEDDEDCODE': {
      return EmbeddedCodeBlock(entity);
    }
  }
  return null;
};

export function atomicBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: AtomicBlock,
      editable: false,
    };
  }

  return null;
}
