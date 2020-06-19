import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import ApplicationRouteResolver from './lib/ApplicationRouteResolver';

// Pages
import { SignIn, SignUp, Portal, Application } from './pages';

const App: React.FC = () => {
  return (
    <Layout style={{ height: '100%', minHeight: 400 }}>
      <Layout.Header>
        <Space>
          <Typography.Text style={{ color: '#ffffff' }}>
            SwampHacks Application
          </Typography.Text>
        </Space>
      </Layout.Header>
      <Layout.Content style={{ height: '100%' }}>
        <Router>
          <Route
            exact
            path='/application/:applicationType'
            component={ApplicationRouteResolver}
          />
          <Route exact path='/application/*/general'>
            <Application.General />
          </Route>
          <Route exact path='/portal'>
            <Portal />
          </Route>
          <Route exact path='/signin'>
            <SignIn />
          </Route>
          <Route exact path='/signup'>
            <SignUp />
          </Route>
          <Route exact path='/'>
            <Redirect to='/portal' />
          </Route>
        </Router>
      </Layout.Content>

      <Layout.Footer>
        <Typography.Text>Copyright SwampHacks 2021.</Typography.Text>
      </Layout.Footer>
    </Layout>
  );
};

export default App;
