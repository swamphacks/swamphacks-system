const internalConfig = {
  firebaseConfig: {
    apiKey: 'abc012',
    authDomain: 'project-name.firebaseapp.com',
    databaseURL: 'https://project-name.firebaseio.com',
    projectId: 'project-name',
    storageBucket: 'project-name.appspot.com',
    messagingSenderId: '####',
    appId: '#####',
  },
};

const dashboardConfig = {
  firebaseConfig: {
    apiKey: 'abc012',
    authDomain: 'project-name.firebaseapp.com',
    databaseURL: 'https://project-name.firebaseio.com',
    projectId: 'project-name',
    storageBucket: 'project-name.appspot.com',
    messagingSenderId: '####',
    appId: '#####',
  },
};

const functionsConfig = {
  serviceAccount: {
    type: 'service_account',
    project_id: 'project-name',
    private_key_id: 'abc012',
    private_key: 'private_key',
    client_email: 'abc012',
    client_id: '####',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: 'url',
  },
  CURR_YEAR: 'testing',
  MAILCHIMP_LIST_ID: 'listId',
  MAILCHIMP_TAGS: {
    HACKER: { id: 'num', label: 'Applicant' },
    MENTOR: { id: 'num', label: 'Mentor' },
    VOLUNTEER: { id: 'num', label: 'Volunteer' },
    STANDBY: { id: 'num', label: 'Standby Applicant' },
    STANDBY_ACCEPTED: { id: 'num', label: 'Standby Accepted' },
    ACCEPTED: { id: 'num', label: 'Accepted' },
    REJECTED: { id: 'num', label: 'Rejected' },
    CONFIRMED: { id: 'num', label: 'Confirmed' },
    ATTENDED: { id: 'num', label: 'Attended' },
  },
  APPLICATION_TYPES: {
    hacker: true,
    mentor: true,
    volunteer: true,
    standby: true,
  },
};

export { internalConfig, dashboardConfig, functionsConfig };
