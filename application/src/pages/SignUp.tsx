import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Space } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { RootContainer } from '../components';

// Styled components
const StyledForm = styled(Form)`
  max-width: 300px;
  width: 100%;
`;

const SignUp: React.FC = () => {
  const onFinish = (values: Store) => {
    console.log(values);
    // Handle sign up
  };

  return (
    <RootContainer minHeight='400px'>
      <StyledForm name='login' onFinish={onFinish} layout='vertical'>
        <Form.Item
          label='Name'
          name='name'
          rules={[
            {
              required: true,
              message: 'Enter your first and last name.',
              type: 'string',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder='Swamp Hacks' />
        </Form.Item>
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
          rules={[{ required: true, message: 'Enter a strong password.' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type='password'
            placeholder='StrongPassword123'
          />
        </Form.Item>
        <Form.Item
          label='Confirm Password'
          name='confirmPassword'
          rules={[{ required: true, message: 'Passwords must match.' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type='password'
            placeholder='StrongPassword123'
          />
        </Form.Item>

        <Form.Item>
          <Button style={{ width: '100%' }} type='primary' htmlType='submit'>
            Sign Up
          </Button>
        </Form.Item>

        <Form.Item>
          <p style={{ textAlign: 'center' }}>
            Already have an account? <Link to='/signin'>Sign in</Link>.
          </p>
        </Form.Item>
      </StyledForm>
    </RootContainer>
  );
};

export default SignUp;
