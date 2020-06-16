import React from 'react';
import styled from 'styled-components';

// Styled components
const RootContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url('/images/dashboardImage.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right bottom;
`;

const OverlayContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Logo = styled.img`
  width: 40%;
`;

const Title = styled.h1`
  font-family: Montserrat-Bold, Helvetica, sans-serif;
`;

const Dates = styled.h3`
  font-family: Montserrat, Helvetica, sans-serif;
`;

const Home = () => {
  return (
    <RootContainer>
      <OverlayContainer>
        <Logo src='/images/swamphacksLogo.svg' />
        <Title>SwampHacks VI</Title>
        <Dates>Jan. 31 - Feb. 2, 2020</Dates>
      </OverlayContainer>
    </RootContainer>
  );
};

export default Home;
