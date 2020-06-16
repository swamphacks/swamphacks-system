import React from 'react';
import styled from 'styled-components';

const Icon = styled.svg`
  width: 32px;
  -webkit-transition: transform 0.2s;
  -ms-transition: transform 0.2s;
  transition: transform 0.2s;
  :hover {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
    cursor: pointer;
  }
  :active {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }
`;

const Button = styled.div`
  padding: 10px;
`;

const HamburgerButton = ({color, open, ...props}) => {
  const fill = color || 'black';
  return (
    <Button {...props}>
      <Icon viewBox='0 0 24 24' fill={fill}>
        {!open && (
          <path d='M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z' />
        )}
        {open && (
          <path d='M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z' />
        )}
      </Icon>
    </Button>
  );
};

export default HamburgerButton;
