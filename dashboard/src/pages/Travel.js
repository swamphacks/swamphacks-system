import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import PageTitle from '../components/PageTitle';
import { PageRootContainer as RootContainer } from '../components/PageRootContainer';
import { withFirebase } from '../components/Firebase';

import busEmailList from '../busList.json';

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

const LinkText = styled.a`
  font-family: Montserrat-Bold, Helvetica, sans-serif;
  color: white;
  :hover {
    color: white;
    text-decoration: underline;
  }
`;

const EmailLinkText = styled.div`
  display: inline;
  font-family: Montserrat-Bold, Helvetica, sans-serif;
  color: white;
  :hover {
    color: white;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ButtonLink = styled.a`
  background-color: rgba(141, 170, 144, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-decoration: none;
  color: white;
  :hover {
    color: white;
    cursor: pointer;
    background-color: rgba(141, 170, 144, 0.8);
  }
  :active {
    color: white;
    background-color: rgba(141, 170, 144, 1);
  }
  border-radius: 4px;
`;

const Travel = ({ firebase }) => {
  const [busEligible, setBusEligible] = useState(false);
  useEffect(() => {
    const email = firebase.getUserEmail();
    if (email !== null) {
      setBusEligible(busEmailList[email]);
    }
  }, []);

  return (
    <RootContainer>
      <PageTitle title='Travel Information' />
      <ContentContainer>
        {busEligible && (
          <Section>
            <LabelText>Bus</LabelText>
            <ContentLabel>How do I get on the bus?</ContentLabel>
            <ContentText>
              In order to get on the bus, you must show the bus captain:
              <ul>
                <li>Student/Government issued ID</li>
                <li>
                  Confirmation proof from SwampHacks (either through the
                  dashboard or email)
                </li>
                <li>Bus Ticket</li>
              </ul>
              Don't have a bus ticket yet? Use the button below to get one!
            </ContentText>
            <ButtonLink
              href='https://www.eventbrite.com/e/swamphacks-vi-georgia-tech-bus-tickets-89109166917?utm-medium=discovery&utm-campaign=social&utm-content=attendeeshare&aff=escb&utm-source=cp&utm-term=listing'
              target='_blank'
            >
              Get Ticket
            </ButtonLink>
            <ContentLabel>Where is the bus leaving?</ContentLabel>
            <ContentText>
              Atlanta to Gainesville: 266 4th St NW, Atlanta, GA 30313
              <br />
              Gainesville to Atlanta: 1765 Stadium Rd, Gainesville, FL 32608
            </ContentText>
            <ContentLabel>When is the bus leaving?</ContentLabel>
            <ContentText>
              <ul>
                <li>
                  Bus Arrives in Atlanta on Friday January 31st at 11:30 AM
                </li>
                <li>
                  Bus Departs from Atlanta on Friday January 31st at 12:00 PM
                </li>
                <li>
                  Bus Departs from Gainesville on Sunday February 2nd at 4:00 PM
                </li>
              </ul>
            </ContentText>
            <ContentLabel>
              If I don't have a ticket or am not a confirmed hacker, can I still
              get on the bus?
            </ContentLabel>
            <ContentText>
              At 11:50 AM the bus will allow "walk-on" hackers to fill any empty
              seats on the bus. Walk-on hackers come in 2 categories:
              <ul>
                <li>Confirmed hackers without a bus ticket</li>
                <li>
                  Unconfirmed hackers who have not submitted an application to
                  SwampHacks*
                </li>
              </ul>
              *Unconfirmed hackers will be required to give their e-mails to the
              bus captain.
            </ContentText>
          </Section>
        )}
        <Section>
          <LabelText>Carpooling</LabelText>
          <ContentLabel>How do I find someone to carpool with?</ContentLabel>
          <ContentText>
            You can use our #carpooling channel on our Slack to find someone
            driving in your area! We have people driving from FIU, UCF, USF, and
            more. Additionally you can interact on any of our social media
            platforms to meet fellow hackers traveling to the Swamp. If you need
            additional help finding someone who can drive you, email us at{' '}
            <EmailLinkText
              onClick={() => {
                window.location.href = 'mailto:info@swamphacks.com';
              }}
            >
              info@swamphacks.com
            </EmailLinkText>
            !
          </ContentText>
          <ContentLabel>
            How and when will I receive a reimbursement?
          </ContentLabel>
          <ContentText>
            Come see us at the help desk on Sunday and once we confirm you’re at
            the event, you will receive a reimbursement two to three weeks after
            the event ends on February 2nd. It will arrive at the address you
            listed on the application in the form of a check from the University
            of Florida.
          </ContentText>
          <ContentLabel>For how much will I be reimbursed?</ContentLabel>
          <ContentText>
            We’ll be sending out an email with this and more information when we
            get closer to the event. So be on the lookout for an email from us
            in January!
          </ContentText>
        </Section>
        <Section>
          <LabelText>Parking and Directions</LabelText>
          <ContentLabel>Where is SwampHacks VI?</ContentLabel>
          <ContentText>
            SwampHacks VI is held at the University of Florida Marston Science
            Library. The official address is: 444 Newell Dr, Gainesville, FL
            32611. Check back closer to the event to see a detailed map with
            walking directions from the Commuter Lot to Marston Science Library.
          </ContentText>
          <ContentLabel>Where do we park?</ContentLabel>
          <ContentText>
            You can park in the{' '}
            <LinkText
              target='_blank'
              href='https://www.google.com/maps/place/Commuter+Lot,+Gainesville,+FL+32603/@29.6419425,-82.3536721,17z/data=!3m1!4b1!4m5!3m4!1s0x88e8a37392f00873:0xec204b1c7b6802dc!8m2!3d29.6420037!4d-82.3512503'
            >
              Commuter lot
            </LinkText>{' '}
            (Commuter Lot 2016 Gale Lemrand Dr Gainesville, FL 32603) or in{' '}
            <LinkText
              target='_blank'
              href='https://www.google.com/maps/place/Garage+4/@29.6455899,-82.3440011,17.97z/data=!4m5!3m4!1s0x88e8a39dae2803f5:0xc8caebf6f1dec8c!8m2!3d29.6453107!4d-82.3429002'
            >
              Garage 4
            </LinkText>
            .
          </ContentText>
          <ContentLabel>When is parking lifted?</ContentLabel>
          <ContentText>
            Parking will be lifted after 4:30 PM at the University of Florida on
            January 31st. Parking will remain lifted until February 3rd 7:30 AM.
          </ContentText>
        </Section>
        <Section>
          <LabelText>Have more questions?</LabelText>
          <ContentText>
            Email us at{' '}
            <EmailLinkText
              onClick={() => {
                window.location.href = 'mailto:info@swamphacks.com';
              }}
            >
              info@swamphacks.com
            </EmailLinkText>
            !
          </ContentText>
        </Section>
      </ContentContainer>
    </RootContainer>
  );
};

export default withFirebase(Travel);
