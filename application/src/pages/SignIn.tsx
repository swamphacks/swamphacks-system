import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button, Typography, Space } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { RootContainer } from '../components';

// Styled components
const StyledForm = styled(Form)`
  width: 100%;
`;

const SignIn: React.FC = () => {
  const history = useHistory();

  const onFinish = (values: Store) => {
    console.log(values);
    history.push('/portal');
  };

  return (
    <RootContainer>
      <Space direction='vertical' size='middle' align='center'>
        <Typography.Title level={4}>Returning User</Typography.Title>
        <StyledForm name='signin' onFinish={onFinish} layout='vertical'>
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
              {
                required: true,
                message: 'Enter the password for your account.',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type='password'
              placeholder='StrongPassword123'
            />
          </Form.Item>

          <Form.Item>
            <Typography.Link>Forgot password?</Typography.Link>
          </Form.Item>

          <Form.Item>
            <Button style={{ width: '100%' }} type='primary' htmlType='submit'>
              Sign In
            </Button>
          </Form.Item>

          <Form.Item>
            <p style={{ textAlign: 'center' }}>
              New here?{' '}
              <Link to='/signup' component={Typography.Link}>
                Create an account
              </Link>
              .
            </p>
          </Form.Item>
        </StyledForm>
      </Space>
    </RootContainer>
  );
};

export default SignIn;
