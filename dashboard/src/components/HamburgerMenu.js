import React, { useState } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-spring/renderprops';
import { Link } from 'react-router-dom';

import HamburgerButton from './HamburgerButton';

const Drawer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #8daa90;
  z-index: 40;
  @media screen and (min-width: 1200px) {
    width: 30%;
  }
`;

const LinkContainer = styled.div`
  padding: 2px 0px;
  @media screen and (min-width: 1200px) {
    padding: 10px 0px;
  }
`;

const DrawerLink = styled(Link)`
  font-size: 1.25rem;
  color: white;
  text-decoration: none;
  :hover {
    text-decoration: underline;
    cursor: pointer;
    color: white;
  }
  font-family: Montserrat-Bold, Helvetica, sans-serif;
  @media screen and (min-width: 1200px) {
    font-size: 1.75rem;
  }
`;

const ExitLink = styled.a`
  font-size: 1.25rem;
  color: white;
  text-decoration: none;
  :hover {
    text-decoration: underline;
    cursor: pointer;
    color: white;
  }
  font-family: Montserrat-Bold, Helvetica, sans-serif;
  @media screen and (min-width: 1200px) {
    font-size: 1.75rem;
  }
`;

const LogoutLink = styled.div`
  font-size: 1.25rem;
  color: white;
  text-decoration: none;
  :hover {
    text-decoration: underline;
    cursor: pointer;
    color: white;
  }
  font-family: Montserrat-Bold, Helvetica, sans-serif;
  @media screen and (min-width: 1200px) {
    font-size: 1.75rem;
  }
`;

const HamburgerMenu = ({ paths, logout, buttonStyle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <React.Fragment>
      <HamburgerButton
        onClick={() => setMenuOpen(!menuOpen)}
        color='white'
        style={{
          position: 'absolute',
          top: 30,
          right: 30,
          zIndex: 41,
          ...buttonStyle
        }}
        open={menuOpen}
      />
      <Transition
        items={menuOpen}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {menuOpen =>
          menuOpen &&
          (props => (
            <Drawer style={props}>
              {paths.map(({ label, path }, index) => (
                <LinkContainer
                  onClick={() => setMenuOpen(false)}
                  key={label + index}
                >
                  <DrawerLink to={path}>{label}</DrawerLink>
                </LinkContainer>
              ))}
              <LinkContainer>
                <ExitLink href='http://2020.swamphacks.com'>
                  Exit Dashboard
                </ExitLink>
              </LinkContainer>
              <LinkContainer>
                <LogoutLink onClick={logout}>Logout</LogoutLink>
              </LinkContainer>
            </Drawer>
          ))
        }
      </Transition>
    </React.Fragment>
  );
};

export default HamburgerMenu;
