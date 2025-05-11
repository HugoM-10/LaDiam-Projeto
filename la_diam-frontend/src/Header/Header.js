import React from "react";
import "./Header.css"; // We'll create this CSS file next
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <header className="app-header">
      <div className="header-logo">
        <Link to="/">
          <img src="Logo-LaDiam.png" alt="Logo" className="logo-image" />
        </Link>
      </div>

      <div className="header-actions">
        <button className="login-button" onClick={handleLoginClick}>
          Entrar
        </button>
      </div>
    </header>
  );
}

export default Header;
