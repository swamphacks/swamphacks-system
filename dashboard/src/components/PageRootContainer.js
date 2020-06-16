import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
  padding-top: 140px;
  @media screen and (min-width: 1200px) {
    padding-top: 40px;
    min-height: 100vh;
  }
`;

const PageRootContainer = ({children}) => {
  document.body.style = 'background: #5e765e;';
  return <Container>{children}</Container>;
};

export {PageRootContainer};
