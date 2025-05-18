import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './Home.css';

export default function Home() {
  return (
    <section className="home-section" id="home">
      <Container>
        <Row className="align-items-center text-center">
          <Col md={6}>
            <h1 className="main-title">Sinta o Sabor da Tradição</h1>
            <p className="main-description">
              Pizzas artesanais feitas com ingredientes frescos e um toque especial. Venha descobrir o sabor da La Diam.
            </p>
            <Button className="btn-main" href="/menu">Peça Agora!</Button>
          </Col>
          <Col md={6}>
            <img src="/pizzas_home_img/pizza-home-1.jpg" alt="Pizza deliciosa" className="img-fluid pizza-image" />
          </Col>
        </Row>
        <Row className="text-center mt-5">
          <Col>
            <h2 className="section-title">O Sabor que Vai Encantar Seu Paladar</h2>
            <p className="section-description">
              Cada pizza é uma obra-prima, feita com paixão, criatividade e os melhores ingredientes.
            </p>
          </Col>
        </Row>
        <Row className="image-gallery">
          <Col md={4}>
            <img src="/pizzas_home_img/pizza-home-2.jpg" alt="Pizza saborosa" className="img-fluid gallery-image" />
          </Col>
          <Col md={4}>
            <img src="/pizzas_home_img/pizza-home-1.jpg" alt="Pizza deliciosa" className="img-fluid gallery-image" />
          </Col>
          <Col md={4}>
            <img src="/pizzas_home_img/pizza-home-3.jpg" alt="Pizza fresquinha" className="img-fluid gallery-image" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
