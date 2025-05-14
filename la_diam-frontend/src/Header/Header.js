import { useState, useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { Cart } from "../Components/Cart/Cart";

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
import { CartContext } from "../CartContext";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { isLoggedIn, logout, userGroup } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(true);
  const { clearCart } = useContext(CartContext);

  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  console.log("User Group:", userGroup);
  return (
    <header className="app-header">
      <Navbar className="navbar" expand="md">
        <NavbarBrand href="/">
          <img src="Logo-LaDiam.png" alt="Logo" className="logo-image" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="nav-items" navbar>
            {userGroup !== "Vendedor" && userGroup !== "Gestor" && (
              <>
                <NavItem>
                  <NavLink href="/menu">
                    <Button color="danger" className="nav-button">
                      Encomendar agora!
                    </Button>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="">
                    <Button color="danger" className="nav-button">
                      Promoções
                    </Button>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/#footer">
                    <Button color="danger" className="nav-button">
                      Sobre nós!
                    </Button>
                  </NavLink>
                </NavItem>
              </>
            )}
            {userGroup === "Vendedor" || userGroup === "Gestor" ? (
              <NavItem>
                <NavLink href="/pedidos">
                  <Button color="success" className="nav-button">
                    Pedidos recebidos
                  </Button>
                </NavLink>
              </NavItem>
            ) : null}
            {userGroup === "Gestor" ? (
              <>
              <NavItem>
                <NavLink href="/estatisticas">
                  <Button color="success" className="nav-button">
                    Estatísticas
                  </Button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/gestaoProdutos">
                  <Button color="success" className="nav-button">
                    Gestão de produtos
                  </Button>
                </NavLink>
              </NavItem>
              </>
              
            ) : null}

            {isLoggedIn ? (
              <div className="header-icons">
                <NavItem>
                  <Cart />
                </NavItem>

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <FaRegUserCircle className="icon" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag="a" href="/profile">
                      Perfil
                    </DropdownItem>
                    <DropdownItem tag="a" href="/history">
                      Histórico
                    </DropdownItem>
                    <DropdownItem tag="a" href="/wallet">
                      Carteira
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                <NavItem>
                  <IoLogOutOutline
                    className="icon"
                    onClick={() => {
                      clearCart();
                      logout();
                      navigate("/");
                    }}
                  />
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
