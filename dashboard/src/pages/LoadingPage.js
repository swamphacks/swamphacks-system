import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingPage = ({ message }) => {
  const text = message ? message : 'Loading...';
  return (
    <Dimmer active>
      <Loader>{text}</Loader>
    </Dimmer>
  );
};

export default LoadingPage;
