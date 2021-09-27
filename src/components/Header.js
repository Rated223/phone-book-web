import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';

const NavbarTitle = styled.div`
  font-size: 2rem;
  color: #ffffff;
  margin-right: 25px;
  padding: 5px;
`;

const NavLinkStyled = styled(NavLink)`
  padding: 20px 12px 0 12px;
  color: #ffffff;
  font-size: 100%;
  text-decoration: none;

  &:hover {
    color: #bcbcbc;
  }

  &.active {
    border-bottom: 5px solid #ffffff;
  }
`;

const NavbarStyled = styled(Navbar)`
  background: #000000;
  border-bottom: 1px solid #ffffff;
  padding: 0 5px;
`;

const Header = () => {
  const history = useHistory();
  const { isAuth, setAuth } = useContext(AuthContext);

  const onLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    history.push('/');
  };

  return (
    <header className="header">
      <NavbarStyled>
        <Container>
          <Nav className="mr-auto d-inline-grid w-100">
            <NavbarTitle>Phone Book App</NavbarTitle>
            {!isAuth ? (
              <>
                <NavLinkStyled to="/" activeClassName="active" exact={true}>
                  Login
                </NavLinkStyled>
                <NavLinkStyled
                  to="/signup"
                  activeClassName="active"
                  exact={true}
                >
                  Sign up
                </NavLinkStyled>
              </>
            ) : (
              <Button className="h-80 my-auto ms-auto" onClick={onLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Container>
      </NavbarStyled>
    </header>
  );
};

export default Header;
