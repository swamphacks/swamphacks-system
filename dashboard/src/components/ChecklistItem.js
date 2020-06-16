import React, {useState} from 'react';
import styled from 'styled-components';

import {withPageContext} from './PageContext';

// Styled components
const RootContainer = styled.div`
  display: flex;
  align-items: center;
  --inner-opacity: 0;
  :hover {
    text-decoration: underline;
    cursor: pointer;
    --inner-opacity: 0.5;
  }
`;

const OuterBubble = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  outline-width: 1px;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const InnerBubble = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: white;
  opacity: var(--inner-opacity);
`;

const Text = styled.p`
  margin-left: 15px;
  font-family: Montserrat, Helvetica, sans-serif;
  display: inline;
`;

const ChecklistItem = ({pageC, label, defaultState, index, ...props}) => {
  const [clicked, setClicked] = useState(defaultState);
  const textStyle = clicked ? {textDecoration: 'line-through'} : {};
  const innerStyle = clicked ? {opacity: 1} : {};
  const _handleClick = () => {
    pageC.updateChecklistState(!clicked, index);
    setClicked(!clicked);
  };
  return (
    <RootContainer onClick={_handleClick} {...props}>
      <OuterBubble>
        <InnerBubble style={innerStyle} />
      </OuterBubble>
      <Text style={textStyle}>{label}</Text>
    </RootContainer>
  );
};

export default withPageContext(ChecklistItem);
