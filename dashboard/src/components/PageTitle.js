import React from 'react';
import styled from 'styled-components';

// Styled components
const RootContainer = styled.div`
  width: 100%;
  padding-bottom: 40px;
`;

const Title = styled.h1`
  font-family: Montserrat-Bold, Helvetica, sans-serif;
`;

const PageTitle = ({title}) => {
  return (
    <RootContainer>
      <Title>{title}</Title>
    </RootContainer>
  );
};

export default PageTitle;
