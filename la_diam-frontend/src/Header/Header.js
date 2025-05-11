import React from "react";
import "./Header.css";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

function Header({isLoggedIn}) {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/">
          <img src="Logo-LaDiam.png" alt="Logo" className="logo-image" />
        </Link>

        <Button>Encomendar Agora!</Button>

        <Button>Promoções</Button>

        <Button>Sobre nós!</Button>

        {isLoggedIn ? (
          <div className="header-icons">
            <FaShoppingCart size={30} color="white" />
            <MdOutlineEmail size={30} color="white" />
            <FaRegUserCircle size={30} color="white" />
            <IoLogOutOutline size={30} color="white" />
          </div>
        ) : (
          <div>
            <Link to="/login">
              <Button color="danger">Área de Cliente</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
