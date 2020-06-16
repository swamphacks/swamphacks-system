const config = {
  CURR_YEAR: 'testing',
  MAILCHIMP_LIST_ID: 'id',
  MAILCHIMP_TAGS: {
    HACKER: { id: '######', label: 'Applicant' },
    MENTOR: { id: '######', label: 'Mentor' },
    VOLUNTEER: { id: '######', label: 'Volunteer' },
    STANDBY: { id: '######', label: 'Standby Applicant' },
    STANDBY_ACCEPTED: { id: '######', label: 'Standby Accepted' },
    ACCEPTED: { id: '######', label: 'Accepted' },
    REJECTED: { id: '######', label: 'Rejected' },
    CONFIRMED: { id: '######', label: 'Confirmed' },
    ATTENDED: { id: '######', label: 'Attended' },
  },
  APPLICATION_TYPES: {
    hacker: true,
    mentor: true,
    volunteer: true,
    standby: true,
  },
};

export default config;
