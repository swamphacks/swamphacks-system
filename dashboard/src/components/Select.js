import React from 'react';
import styled from 'styled-components';

const RootContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #8daa90;
  border-radius: 5px;
  padding: 10px;
  -webkit-box-shadow: 0px 4px 20px 2px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 20px 2px rgba(0, 0, 0, 0.25);
`;

const Title = styled.label`
  font-family: Montserrat-Bold, Helvetica, sans-serif;
  font-size: 1.2rem;
  margin: 10px;
`;

const Sel = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
  background-color: rgba(94, 118, 94, 0.8);
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  font-family: Montserrat, Helvetica, sans-serif;
  color: white;
  padding: 10px;
  margin: 10px;
  :hover {
    cursor: pointer;
  }
`;

const Select = ({ title, options, style, onChange }) => {
  return (
    <RootContainer style={style}>
      <Title>{title}</Title>
      <Sel onChange={e => onChange(e.target.value)} defaultValue={undefined}>
        <option value={''}>None</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </Sel>
    </RootContainer>
  );
};

export default Select;
