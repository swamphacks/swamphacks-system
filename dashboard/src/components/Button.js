import React, {useState} from 'react';
import styled from 'styled-components';

// Styled Components
const ActiveRoot = styled.div`
  background-color: rgba(94, 118, 94, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  :hover {
    cursor: pointer;
    background-color: rgba(94, 118, 94, 1);
  }
  :active {
    background-color: rgba(94, 118, 94, 0.8);
  }
  width: 100%;
  border-radius: 4px;
`;

const DisabledRoot = styled(ActiveRoot)`
  color: rgba(255, 255, 255, 0.5);
  :hover {
    cursor: not-allowed;
    background-color: rgba(94, 118, 94, 0.8);
  }
`;

const Text = styled.p`
  font-size: 1.2rem;
  font-family: Montserrat-Bold, Helvetica, sans-serif;
`;

const Button = props => {
  const [isLoading, setIsLoading] = useState(false);
  const Root = props.disabled ? DisabledRoot : ActiveRoot;
  const _handleClick = async () => {
    setIsLoading(true);
    await props.onClick();
    setIsLoading(false);
  };
  return (
    <Root onClick={props.disabled ? undefined : _handleClick}>
      <Text>{isLoading ? '...' : props.children}</Text>
    </Root>
  );
};

export default Button;
