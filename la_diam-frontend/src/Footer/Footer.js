import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export default function Footer() {
  return (
    <footer id="footer" className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md="6" className="mb-3">
            <h5>Contatos</h5>
            <p className="mb-1">📞 Telemóvel: 969 696 969</p>
            <p className="mb-1">📞 Telefone: 212 345 678</p>
            <p>
              📍 Morada:{' '}
              <a
                href="https://maps.app.goo.gl/Zw1DvUrch9iL5HUT8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-info"
              >
                Av. das Forças Armadas, 1649-026 Lisboa
              </a>
            </p>
          </Col>
          <Col md="6" className="text-md-end">
            <h5>LaDiam 🍕</h5>
            <p className="mb-0">Sabor e qualidade desde 2025.</p>
            <p className="mb-0">
              Siga-nos no Instagram: {' '}
              <a
                href="https://www.instagram.com/iscte_iul/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-info"
              >

                @la_diam
              </a>
              
            </p>


          </Col>
        </Row>
        <hr className="bg-light my-3" />
        <p className="text-center mb-0">&copy; 2025 La Diam - Todos os direitos reservados</p>
      </Container>
    </footer>
  );
}
