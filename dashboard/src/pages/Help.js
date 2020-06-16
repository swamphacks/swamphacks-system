import React, {useEffect} from 'react';
import styled from 'styled-components';

import PageTitle from '../components/PageTitle';
import {PageRootContainer as RootContainer} from '../components/PageRootContainer';

// Styled components
const ContentContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const QuestionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  max-width: 680px;
`;

const LabelText = styled.h3`
  font-family: Montserrat-Bold, Helvetica, sans-serif;
`;

const ContentText = styled.p`
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

const Help = () => {
  return (
    <RootContainer>
      <PageTitle title='Help' />
      <ContentContainer>
        {faq.map(q => (
          <QuestionContainer key={q.title}>
            <LabelText>{q.title}</LabelText>
            {q.content}
          </QuestionContainer>
        ))}
      </ContentContainer>
    </RootContainer>
  );
};

const faq = [
  {
    title: 'What is a hackathon?',
    content: (
      <ContentText>
        A hackathon is a weekend long event where students come together to
        build computer science projects. Hackathons teach students about
        software development by letting them make their own products. They
        create a space for students to learn new skills and eliminate coding
        road-blocks. Swamphacks VI provides resources such as hardware,
        workshops, and mentors to support all student endeavors.
      </ContentText>
    )
  },
  {
    title: 'Where is Swamphacks?',
    content: (
      <ContentText>
        Collaboration Commons in the Marston Science Library at the University
        of Florida. Address is 444 Newell Dr, Gainesville, FL 32611.
      </ContentText>
    )
  },
  {
    title: 'What should I bring?',
    content: (
      <ContentText>
        Any hacking gear you need (laptop, hardware, chargers, batteries, etc.),
        comfortable clothes, toiletries (toothpaste, toothbrush, deodorant,
        etc.), a photo ID for registration, a government ID to rent hardware,
        and most importantly, yourself!
      </ContentText>
    )
  },
  {
    title: 'Help, this is my first hackathon!',
    content: (
      <ContentText>
        Amazing! SwampHacks VI welcomes everyone regardless of major or skill
        level. So long as you have a passion for development and a willingness
        to learn we can guide you with our numerous mentors and beginner
        workshops.
      </ContentText>
    )
  },
  {
    title: 'How much will I spend?',
    content: (
      <ContentText>
        Swamphacks VI is free! Everything from the food, swag, and prizes has
        been covered by our generous sponsors.
      </ContentText>
    )
  },
  {
    title: 'Who is Swamphacks for?',
    content: (
      <ContentText>
        Swamphacks VI is for everyone! All students currently enrolled in
        university and interested in development are eligible.
      </ContentText>
    )
  },
  {
    title: 'Can high school students attend?',
    content: (
      <ContentText>
        Our venue does not allow minors to stay overnight. High school students
        and others below legal age are unable to participate.
      </ContentText>
    )
  },
  {
    title: 'How can I volunteer or mentor?',
    content: (
      <ContentText>
        We start volunteer and mentor recruitment in December. Please note that
        if you choose to either mentor or volunteer, you cannot participate in
        the hackathon or submit a project.
      </ContentText>
    )
  },
  {
    title: 'What happens after I apply?',
    content: (
      <ContentText>
        After we receive your application, you should see a pop-up that tell you
        that your application has been received. Just hold tight, when
        applications close, we send an email regarding your participant status.
        That email will contain instructions to access your dashboard account.
        This account will contain your event registration information. Your
        dashboard will also indicate your application status.
      </ContentText>
    )
  },
  {
    title: 'What if I don’t have a team?',
    content: (
      <ContentText>
        Swamphacks VI allows you plus a max of 3 others (4 total) to form a team
        and participate. You can either form your own team or attend our team
        formation workshop at the beginning of the hackathon. You can also work
        by yourself. We strive to let students forge new connections with people
        from other states and encourage you to work with people you don’t know.
      </ContentText>
    )
  },
  {
    title: 'How do I get there?',
    content: (
      <ContentText>
        We provide a charter bus to and from the Georgia Institute of
        Technology. We also provide travel reimbursements for applications that
        request travel support before December 1st. Additional travel routes and
        buses may be announced depending on interest.
      </ContentText>
    )
  },
  {
    title: 'Will I be sitting at my computer all weekend?',
    content: (
      <ContentText>
        The event will have many activities for participants including
        networking sessions, tech talks, engineering workshops, and much more.
        Feel free to attend as many or as few of these activities as you want in
        addition to coding your project.
      </ContentText>
    )
  },
  {
    title: 'Will Swamphacks provide travel reimbursement?',
    content: (
      <ContentText>
        SwampHacks VI provides a limited number of travel reimbursements. The
        deadline for applications seeking travel reimbursement is December 1st,
        2019.
      </ContentText>
    )
  },
  {
    title: 'When do applications close?',
    content: <ContentText>Applications will close on January 12th.</ContentText>
  },
  {
    title: 'When do I need to confirm by?',
    content: (
      <ContentText>
        The last day to confirm your acceptance is January 22nd.
      </ContentText>
    )
  },
  {
    title: 'Is there a Code of Conduct?',
    content: (
      <ContentText>
        All hackers must adhere to the{' '}
        <LinkText
          href='https://static.mlh.io/docs/mlh-code-of-conduct.pdf'
          target='_blank'
        >
          MLH Code of Conduct
        </LinkText>
        .
      </ContentText>
    )
  },
  {
    title: "My question isn't listed!",
    content: (
      <ContentText>
        It's okay. Take a deep breath. If your question isn't listed or you are
        encountering any technical difficulties, please send a message to the
        SwampHacks directors via the{' '}
        <LinkText href='https://www.facebook.com/SwampHacks/' target='_blank'>
          SwampHacks facebook page
        </LinkText>
        .
      </ContentText>
    )
  }
];

export default Help;
