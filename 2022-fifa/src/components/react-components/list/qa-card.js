import React /* eslint-disable-line */, { useState } from 'react';
import styled from 'styled-components';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import decorators from '../draft/entity-decorator';
import { atomicBlockRenderer } from '../draft/block-redender-fn';

const blockRendererFn = (block) => {
  const atomicBlockObj = atomicBlockRenderer(block);
  return atomicBlockObj;
};

const CardWrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px -2px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  max-width: 600px;
  padding: 12px 16px;
  margin: 0 8px;
  font-family: 'Noto Sans CJK TC', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  @media screen and (min-width: 768px) {
    margin: 0 auto;
    padding: 20px 24px;
    font-size: 18px;
  }
  & + & {
    margin-top: 8px;
  }
`;

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 150%;
  color: #000928;
  opacity: 0.87;
  &:hover {
    cursor: pointer;
  }
`;

const MoreIcon = styled.div`
  margin-left: 16px;
  font-size: 22px;
  line-height: 100%;
  @media screen and (min-width: 768px) {
    font-size: 24px;
  }
`;

const Answer = styled.div`
  display: ${
    /**
     *  @param {Object} props
     *  @param {boolean} props.isOpen
     */
    (props) => {
      return props.isOpen ? 'block' : 'none';
    }
  };
  padding-top: 12px;
  border-top: 1px solid #e0e0e0;
  margin-top: 12px;
  .DraftEditor-root {
    line-height: 200%;
    color: rgba(0, 9, 40, 0.66);
    ul {
      list-style: none;
      padding-left: 0;
      margin-top: 4px;
      .public-DraftStyleDefault-depth1 {
        margin-left: 1.5rem;
      }
      li {
        display: flex;
        align-items: center;
        ::before {
          content: '';
          display: block;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(0, 9, 40, 0.66);
          margin: 0 0.75rem;
        }
      }
    }
  }
`;

export default function QuestionCard({ questionItem, onClick }) {
  const [isOpen, serIsOpen] = useState(false);
  const { title, content } = questionItem;
  const contentState = convertFromRaw(content);
  const editorState = EditorState.createWithContent(contentState, decorators);
  return (
    <CardWrapper>
      <Question
        onClick={() => {
          serIsOpen(!isOpen);
          onClick();
        }}
      >
        {title}
        <MoreIcon>{isOpen ? '-' : '+'}</MoreIcon>
      </Question>
      <Answer isOpen={isOpen}>
        <Editor
          editorState={editorState}
          readOnly
          blockRendererFn={blockRendererFn}
        />
      </Answer>
    </CardWrapper>
  );
}
