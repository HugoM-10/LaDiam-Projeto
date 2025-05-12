import React, { useState, useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { UserContext } from "../UserContext";

function Header() {
  const { isLoggedIn, logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <header className="app-header">
      <Navbar className="navbar" expand="md">
        <NavbarBrand href="/">
          <img src="Logo-LaDiam.png" alt="Logo" className="logo-image" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="nav-items" navbar>
            <NavItem className="nav-item">
              <NavLink href="/menu">
                <Button color="danger" className="nav-button">
                  Encomendar agora!
                </Button>
              </NavLink>
            </NavItem>
            <NavItem className="nav-item">
              <NavLink href="">
                <Button color="danger" className="nav-button">
                  Promoções
                </Button>
              </NavLink>
            </NavItem>
            <NavItem className="nav-item">
              <NavLink href="#footer">
                <Button color="danger" className="nav-button">
                  Sobre nós!
                </Button>
              </NavLink>
            </NavItem>
            {isLoggedIn ? (
              <div className="header-icons">
                <NavItem>
                  <NavLink>
                    <FaShoppingCart className="icon" />
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="">
                    <MdOutlineEmail className="icon" />
                  </NavLink>
                </NavItem>

                <NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      <FaRegUserCircle className="icon" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <NavItem>
                        <NavLink href="/profile">
                          <DropdownItem>Perfil</DropdownItem>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/history">
                          <DropdownItem>
                            <DropdownItem>Histórico</DropdownItem>
                          </DropdownItem>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/wallet">
                          <DropdownItem>
                            <DropdownItem>Carteira</DropdownItem>
                          </DropdownItem>
                        </NavLink>
                      </NavItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </NavItem>
                <NavItem>
                  <IoLogOutOutline className="icon" onClick={logout} />
                </NavItem>
              </div>
            ) : (
              <div>
                <Link to="/login">
                  <Button className="login-button">Área de Cliente</Button>
                </Link>
              </div>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
