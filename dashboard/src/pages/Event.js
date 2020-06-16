import React, { useEffect } from 'react';
import styled from 'styled-components';

import PageTitle from '../components/PageTitle';
import { PageRootContainer as RootContainer } from '../components/PageRootContainer';

// Maps
import ciseFirstFloor from '../maps/ciseFirstFloor.svg';
import ciseSecondFloor from '../maps/ciseSecondFloor.svg';
import marstonBreezeway from '../maps/marstonBreezeway.svg';
import marstonBasement from '../maps/marstonBasement.png';
import marstonSecondFloor from '../maps/marstonSecondFloor.png';

// Icons
import devpostIcon from '../icons/devpostIcon.png';
import mentorIcon from '../icons/mentorIcon.png';
import wifiIcon from '../icons/wifiIcon.png';

// Maps list
const maps = [
  {
    src: marstonBreezeway,
    label: 'Marston Breezeway'
  },
  {
    src: ciseFirstFloor,
    label: 'CISE First Floor'
  },
  {
    src: ciseSecondFloor,
    label: 'CISE Second Floor'
  },
  {
    src: marstonSecondFloor,
    label: 'Marston Second Floor (Entrance Level)'
  },
  {
    src: marstonBasement,
    label: 'Marston First Floor (Basement Level)'
  }
];

// Locations list
const locations = [
  {
    title: 'Check-In',
    description: 'Marston Breezeway'
  },
  {
    title: 'Standby Line',
    description: 'Marston Breezeway'
  },
  {
    title: 'Opening Ceremony',
    description: 'Carleton Auditorium'
  },
  {
    title: 'Closing Ceremony',
    description: 'Carleton Auditorium'
  },
  {
    title: 'Help Desk',
    description: 'Marston Basement Elevator Lobby'
  },
  {
    title: 'Mentor Lounge',
    description: 'Marston Basement Made@UF Lab'
  },
  {
    title: 'Sleeping Room',
    description: 'CISE E221'
  }
];

// Styled components
const ContentContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  max-width: 680px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  column-gap: 20px;
  row-gap: 20px;
  justify-items: center;
  align-items: stretch;
  @media only screen and (min-width: 600px) {
    grid-template-columns: repeat(3, 33%);
  }
  @media only screen and (min-width: 992px) {
    grid-template-columns: repeat(4, 25%);
  }
`;

const GridItem = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: rgba(141, 170, 144, 1);
  padding: 20px;
  box-sizing: border-box;
  border-radius: 4px;
  overflow-x: hidden;
  justify-content: flex-end;
`;

const LinkButton = styled.a`
  background-color: rgba(94, 118, 94, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-top: 20px;
  text-decoration: none;
  color: white;
  :hover {
    color: white;
    cursor: pointer;
    background-color: rgba(94, 118, 94, 1);
  }
  :active {
    color: white;
    background-color: rgba(94, 118, 94, 0.8);
  }
  border-radius: 4px;
`;

const LabelText = styled.h2`
  font-family: Montserrat-Bold, Helvetica, sans-serif;
  text-decoration: underline;
`;

const ContentLabel = styled.h4`
  font-family: Montserrat-Bold, Helvetica, sans-serif;
`;

const ContentText = styled.div`
  font-family: Montserrat, Helvetica, sans-serif;
`;

const MapImage = styled.img`
  width: 100%;
`;

const Event = () => {
  return (
    <RootContainer>
      <PageTitle title='Event' />
      <ContentContainer>
        <div>
          <LabelText>Guides</LabelText>
          <Grid>
            <GridItem>
              <img style={{ width: '100%' }} src={devpostIcon} />
              <ContentLabel style={{ textAlign: 'center' }}>
                How to Use DevPost
              </ContentLabel>
              <LinkButton
                href='https://drive.google.com/file/d/1gFZjcasSa7V4SCJCq6lGm3AURVw9zGpG/view?usp=sharing'
                target='_blank'
              >
                Link
              </LinkButton>
            </GridItem>
            <GridItem>
              <img
                style={{ width: '90%', alignSelf: 'center' }}
                src={mentorIcon}
              />
              <ContentLabel style={{ textAlign: 'center' }}>
                Mentor Availability
              </ContentLabel>
              <LinkButton
                href='https://docs.google.com/spreadsheets/d/16BQ4fqDWUpzs1_Gpg-58guC5x68t5cm6kvjDWDIT3Xg/'
                target='_blank'
              >
                Link
              </LinkButton>
            </GridItem>
            <GridItem>
              <img
                style={{ width: '90%', alignSelf: 'center' }}
                src={wifiIcon}
              />
              <ContentLabel style={{ textAlign: 'center' }}>
                Guest WiFi Instructions
              </ContentLabel>
              <LinkButton
                href='https://it.ufl.edu/ict/documentation/network-infrastructure/uf-guest-wireless/'
                target='_blank'
              >
                Link
              </LinkButton>
            </GridItem>
          </Grid>
        </div>
        <Section>
          <LabelText>Locations</LabelText>
          {locations.map(loc => (
            <React.Fragment>
              <ContentLabel>{loc.title}</ContentLabel>
              <ContentText>{loc.description}</ContentText>
            </React.Fragment>
          ))}
        </Section>
        <Section>
          <LabelText>Maps</LabelText>
          {maps.map(mp => (
            <React.Fragment>
              <ContentLabel>{mp.label}</ContentLabel>
              <MapImage src={mp.src} />
            </React.Fragment>
          ))}
        </Section>
      </ContentContainer>
    </RootContainer>
  );
};

export default Event;
