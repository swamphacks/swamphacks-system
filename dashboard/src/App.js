import React, { useState, useLayoutEffect } from 'react';
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom';
import styled from 'styled-components';
import { withFirebase } from './components/Firebase';
import useMediaQuery from 'react-use-media-query-hook';

// Pages
import HomeComponent from './components/HomeComponent';
import Home from './pages/Home';
import Event from './pages/Event';
import Schedule from './pages/Schedule';
import Checklist from './pages/Checklist';
import Help from './pages/Help';
import Travel from './pages/Travel';
import LoadingPage from './pages/LoadingPage';
import LoginPage from './pages/Login';
import JamzPage from './pages/Jamz';

// Components
import HamburgerMenu from './components/HamburgerMenu';

// Styled components
const RootContainer = styled.div`
  color: white;
  font-family: Montserrat-Bold, Helvetica, sans-serif;
  height: auto;
  @media screen and (min-width: 1200px) {
    height: 100vh;
  }
`;

const SidebarContainer = styled.div`
  background-color: #8daa90;
  display: inline-block;
  vertical-align: top;
  height: 100%;
  width: 30%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const ContentContainer = styled.div`
  vertical-align: top;
  display: inline-block;
  height: auto;
  width: 100%;
  overflow-y: auto;
  background-color: #5e765e;
  -webkit-overflow-scrolling: touch;
  @media screen and (min-width: 1200px) {
    width: 70%;
    height: 100%;
    float: right;
  }
`;

const App = ({ firebase }) => {
  const [signedIn, setSignedIn] = useState(null);
  const isComputer = useMediaQuery('(min-width: 1200px)');

  useLayoutEffect(() => {
    const unsubscribe = firebase.checkSignedIn(val => {
      setSignedIn(val);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (signedIn === null) {
    return <LoadingPage message='Signing in...' />;
  }

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          signedIn === true ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: rest.path }
              }}
            />
          )
        }
      />
    );
  };

  const HomePage = isComputer
    ? () => <Home />
    : () => <HomeComponent paths={paths} />;

  // Routes
  const routes = [
    {
      label: 'Home',
      path: '/',
      exact: true,
      main: HomePage
    },
    {
      label: 'Jamz',
      path: '/jamz',
      exact: false,
      main: JamzPage
    },
    {
      label: 'Event',
      path: `/event`,
      exact: false,
      main: Event
    },
    {
      label: 'Travel Info',
      path: `/travel-info`,
      exact: false,
      main: Travel
    },
    {
      label: 'Schedule',
      path: `/schedule`,
      exact: false,
      main: Schedule
    },
    {
      label: 'Checklist',
      path: `/checklist`,
      exact: false,
      main: Checklist
    },
    {
      label: 'Help',
      path: `/help`,
      exact: false,
      main: Help
    }
  ];

  // Paths
  const paths = [
    ...routes.map(({ label, path }) => ({
      label: label,
      path: path
    }))
  ];

  const MainContainer = signedIn ? ContentContainer : React.Fragment;

  return (
    <RootContainer>
      {signedIn && (
        <React.Fragment>
          {isComputer && (
            <SidebarContainer>
              <HomeComponent paths={paths} />
            </SidebarContainer>
          )}
          {!isComputer && (
            <HamburgerMenu
              paths={paths}
              logout={async () => await firebase.signOut()}
              buttonStyle={{ left: 30, position: 'fixed' }}
            />
          )}
        </React.Fragment>
      )}
      <MainContainer id='ContentContainer'>
        <Switch>
          {routes.map((route, index) => (
            <PrivateRoute
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.main />}
            />
          ))}
          <Route exact path='/login' children={<LoginPage />} />
        </Switch>
      </MainContainer>
    </RootContainer>
  );
};

export default withFirebase(App);
