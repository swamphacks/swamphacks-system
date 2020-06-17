import React from 'react';
import styled from 'styled-components';

interface Props {
  centerH?: boolean;
  centerV?: boolean;
  minHeight?: string;
}

// Styled components
const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  ${(props: Props) => (props.centerV ? `align-items: center` : ``)};
  ${(props: Props) => (props.centerH ? `justify-content: center` : ``)};
  ${(props: Props) => (props.minHeight ? `min-height: ${props.minHeight}` : ``)}
`;

const RootContainer: React.FC<Props> = ({
  minHeight,
  centerH = true,
  centerV = true,
  children,
}) => {
  return (
    <StyledDiv minHeight={minHeight} centerH={centerH} centerV={centerV}>
      {children}
    </StyledDiv>
  );
};

export default RootContainer;
