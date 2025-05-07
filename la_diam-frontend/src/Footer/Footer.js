import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>
            Contactos
          </a>
          <a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>
            Sobre Nós
          </a>
          <a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>
            Apoio ao Cliente
          </a>
        </div>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} Todos os direitos reservados
        </div>
      </div>
    </footer>
  );
}

export default Footer;