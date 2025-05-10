import React from "react";
import "./Header.css"; // We'll create this CSS file next
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <header className="app-header">
      <div className="header-logo">
        <img src="Logo-LaDiam.png" alt="Logo" className="logo-image" />
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
