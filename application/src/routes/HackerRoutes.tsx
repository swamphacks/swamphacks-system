import React from 'react';
import { Route } from 'react-router-dom';

const HackerRoutes: React.FC = () => {
  return (
    <React.Fragment>
      <Route exact path='/application/hacker/1' />
    </React.Fragment>
  );
};

export default HackerRoutes;
