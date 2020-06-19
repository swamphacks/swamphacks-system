import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import ApplicationTypeParams from './types/ApplicationTypeParams';

const ApplicationRouteResolver: React.FC = () => {
  const { applicationType } = useParams<ApplicationTypeParams>();

  return (
    <div>
      <h1>{applicationType}</h1>
    </div>
  );
};

export default ApplicationRouteResolver;
