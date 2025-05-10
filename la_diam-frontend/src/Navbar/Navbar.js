import React from 'react';
import { 
  Navbar, 
  Nav, 
  NavItem, 
  NavLink
} from 'reactstrap';
import './Navbar.css';

export default function CenteredNavbar() {
  return (
    <>
      <div className="top-bar"></div>
      <Navbar className="navbar-custom" expand="md">
        <Nav navbar className="mx-auto"> {/* mx-auto centraliza horizontalmente */}
          <NavItem>
            <NavLink href="#home" className="navbar-btn">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#faq" className="navbar-btn">FAQ</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#sobre-nos" className="navbar-btn">Sobre Nós</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#footer" className="navbar-btn">Footer</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
}