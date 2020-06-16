import React, { useState } from 'react';
import styled from 'styled-components';

// Not currently used

const MapImage = styled.img`
  width: 100%;
`;

const MapComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <MapImage />
    </div>
  );
};

export default MapComponent;
