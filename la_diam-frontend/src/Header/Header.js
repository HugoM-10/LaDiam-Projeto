import React from 'react';
import './Header.css'; // We'll create this CSS file next


function Header() {
  return (
    <header className="app-header">
      <div className="header-logo">
        <img src="pizza.png" alt="Logo" className="logo-image" />
      </div>
      
      <h1 className="header-title">La Diam</h1>
      
      <div className="header-actions">
        <button className="login-button">Entrar</button>
      </div>
    </header>
  );
}

export default Header;