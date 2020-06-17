import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { RootContainer } from '../components';

// Styled components
const StyledForm = styled(Form)`
  max-width: 400px;
`;

const Login: React.FC = () => {
  const onFinish = (values: Store) => {
    console.log(values);
    // Handle login
  };

  return (
    <RootContainer minHeight='400px'>
      <StyledForm name='login' onFinish={onFinish}>
        <Form.Item
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
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            { required: true, message: 'Enter the password for your account.' },
          ]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>

        <Form.Item>
          <a href=''>Forgot password?</a>
        </Form.Item>

        <Form.Item>
          <Button style={{ width: '100%' }} type='primary' htmlType='submit'>
            Log in
          </Button>
        </Form.Item>

        <Form.Item>
          <p style={{ textAlign: 'center' }}>
            Don't have an account? <a href=''>Sign up</a>.
          </p>
        </Form.Item>
      </StyledForm>
    </RootContainer>
  );
};

export default Login;
