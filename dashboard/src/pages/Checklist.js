import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import PageTitle from '../components/PageTitle';
import {PageRootContainer as RootContainer} from '../components/PageRootContainer';
import ChecklistItem from '../components/ChecklistItem';
import {withPageContext} from '../components/PageContext';

// Styled components
const ContentContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ChecklistContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  max-width: 680px;
`;

const Checklist = ({pageC}) => {
  const items = pageC.getChecklistItems();
  const state = pageC.getChecklistState();
  return (
    <RootContainer>
      <PageTitle title='Checklist' />
      <ContentContainer>
        {items.map((item, index) => (
          <ChecklistContainer key={index}>
            <ChecklistItem
              label={item}
              index={index}
              defaultState={state[index]}
            />
          </ChecklistContainer>
        ))}
      </ContentContainer>
    </RootContainer>
  );
};

export default withPageContext(Checklist);
