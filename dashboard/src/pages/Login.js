import React, { useState, useLayoutEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useMediaQuery from 'react-use-media-query-hook';
import { Button, Form, Input } from 'formik-semantic-ui';
import {
  Label,
  Transition,
  Button as SUIButton,
  Modal,
  Divider
} from 'semantic-ui-react';
import styled from 'styled-components';
import * as yup from 'yup';
import LoadingPage from './LoadingPage';
import { withFirebase } from '../components/Firebase';

// Styled components
const RootContainer = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1200px) {
    flex-direction: row;
    height: 100vh;
  }
`;

const StyledForm = styled(Form)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const InputContainer = styled.div`
  padding: 20px 40px;
  width: 100%;
  max-width: 400px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: flex-end;
  padding-top: 20px;
`;

const CustomLink = styled.p`
  color: black;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ApplyContainer = styled.div`
  height: auto;
  padding: 40px 0;
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media screen and (min-width: 1200px) {
    width: 50%;
  }
`;

const FormContainer = styled.div`
  padding: 40px 0;
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media screen and (min-width: 1200px) {
    width: 50%;
  }
`;

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email.')
    .required('This field is required.'),
  password: yup.string().required('This field is required.')
});

const resetSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email.')
    .required('This field is required.')
});

const errorComponent = ({ message }) => (
  <Label basic color='red' pointing>
    {message}
  </Label>
);

const LoginPage = ({ firebase }) => {
  const isComputer = useMediaQuery('(min-width: 1200px)');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [applicationsOpen, setApplicationsOpen] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  document.body.style = 'background: white;';

  useLayoutEffect(() => {
    const fetchConfig = async () => {
      const { data } = await firebase.getYearConfig();
      const { hackerAppsOpen } = data;
      setApplicationsOpen(hackerAppsOpen);
    };
    fetchConfig();
  }, []);

  const _handleSubmit = async (values, formikApi) => {
    const { email, password } = values;
    try {
      await firebase.signIn(email, password);
      formikApi.setSubmitting(false);
      history.replace(from);
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/user-not-found') {
        formikApi.setFieldError(
          'email',
          'There is no account associated with this email.'
        );
      } else if (error.code === 'auth/wrong-password') {
        formikApi.setFieldError(
          'password',
          'The password associated with this account is incorrect.'
        );
      } else {
        formikApi.setFieldError(
          'email',
          `Unexpected error. Code: [${error.code}].`
        );
      }
      formikApi.setSubmitting(false);
    }
  };

  const _handleResetPassword = async (values, formikApi) => {
    const { email } = values;
    try {
      await firebase.sendPasswordResetEmail(email);
      formikApi.setSubmitting(false);
      setForgotPassword(false);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        formikApi.setFieldError(
          'email',
          'There is no account associated with this email.'
        );
      } else {
        formikApi.setFieldError(
          'email',
          `Unexpected error. Code: [${error.code}].`
        );
      }
      formikApi.setSubmitting(false);
    }
  };

  if (applicationsOpen === null) {
    return <LoadingPage />;
  }

  return (
    <RootContainer>
      <Transition visible={forgotPassword} animation='scale' duration={500}>
        <Modal open={forgotPassword}>
          <Modal.Header>Forgot your password?</Modal.Header>
          <Modal.Content>
            <StyledForm
              onSubmit={_handleResetPassword}
              validationSchema={resetSchema}
              ignoreLoading
              initialValues={{ email: '' }}
              style={{ display: 'contents' }}
              validateOnBlur={false}
              validateOnChange={false}
            >
              {formikProps => (
                <React.Fragment>
                  <Modal.Description>
                    <p>
                      It's okay, it happens. Just type in the email you used to
                      apply and we'll send you a password reset link. When the
                      window closes, check your email for the reset link.
                    </p>
                    <Input
                      name='email'
                      label='Email'
                      inputProps={{ placeholder: 'Email', type: 'email' }}
                      fieldProps={{
                        required: true
                      }}
                      errorComponent={errorComponent}
                    />
                  </Modal.Description>
                  <div style={{ width: '100%' }}>
                    <ButtonGroup>
                      <SUIButton onClick={() => setForgotPassword(false)}>
                        Close
                      </SUIButton>
                      <Button.Submit
                        loading={formikProps.isSubmitting}
                        disabled={formikProps.isSubmitting}
                      >
                        Submit
                      </Button.Submit>
                    </ButtonGroup>
                  </div>
                </React.Fragment>
              )}
            </StyledForm>
          </Modal.Content>
        </Modal>
      </Transition>
      <FormContainer applicationsOpen={applicationsOpen}>
        <h1 style={{ color: 'black' }}>Login</h1>
        <StyledForm
          onSubmit={_handleSubmit}
          validationSchema={schema}
          ignoreLoading
          initialValues={{ email: '', password: '' }}
        >
          {formikProps => (
            <InputContainer>
              <Input
                name='email'
                label='Email'
                inputProps={{ placeholder: 'Email', type: 'email' }}
                fieldProps={{
                  required: true
                }}
                errorComponent={errorComponent}
              />
              <Input
                name='password'
                label='Password'
                inputProps={{ type: 'password', placeholder: 'Password' }}
                fieldProps={{
                  required: true
                }}
                errorComponent={errorComponent}
              />
              <div onClick={() => setForgotPassword(true)}>
                <CustomLink>Forgot your password?</CustomLink>
              </div>
              <ButtonGroup>
                <SUIButton as='a' href='https://2020.swamphacks.com'>
                  Back
                </SUIButton>
                <Button.Submit
                  loading={formikProps.isSubmitting}
                  disabled={formikProps.isSubmitting}
                >
                  Login
                </Button.Submit>
              </ButtonGroup>
            </InputContainer>
          )}
        </StyledForm>
      </FormContainer>
      {/* <Divider vertical={isComputer} horizontal={!isComputer}>
        OR
      </Divider> */}
      {/* <ApplyContainer>
        <p style={{ color: 'black', maxWidth: 400 }}>
          {applicationsOpen
            ? "Haven't applied? Need an account?"
            : 'Missed out on applying to SwampHacks? You can still participate as a volunteer!'}
        </p>
        <SUIButton
          primary
          as='a'
          href={
            applicationsOpen
              ? 'https://2020.swamphacks.com/application'
              : 'https://2020.swamphacks.com/mvapplication'
          }
        >
          {applicationsOpen ? 'Apply Now' : 'Volunteer Now'}
        </SUIButton>
      </ApplyContainer> */}
    </RootContainer>
  );
};

export default withFirebase(LoginPage);
