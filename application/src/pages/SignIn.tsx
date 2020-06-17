import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Space } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { RootContainer } from '../components';

// Styled components
const StyledForm = styled(Form)`
  max-width: 300px;
  width: 100%;
`;

const SignIn: React.FC = () => {
  const onFinish = (values: Store) => {
    console.log(values);
    // Handle login
  };

  return (
    <RootContainer minHeight='400px'>
      <StyledForm name='login' onFinish={onFinish} layout='vertical'>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Enter a valid email address.',
              type: 'email',
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder='example@swamphacks.com'
          />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={[
            { required: true, message: 'Enter the password for your account.' },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type='password'
            placeholder='StrongPassword123'
          />
        </Form.Item>

        <Form.Item>
          <a href=''>Forgot password?</a>
        </Form.Item>

        <Form.Item>
          <Button style={{ width: '100%' }} type='primary' htmlType='submit'>
            Sign In
          </Button>
        </Form.Item>

        <Form.Item>
          <p style={{ textAlign: 'center' }}>
            New here? <Link to='/signup'>Create an account</Link>.
          </p>
        </Form.Item>
      </StyledForm>
    </RootContainer>
  );
};

export default SignIn;
