import React from 'react';
import { Container, Row, Col } from 'reactstrap';


export default function SobreNos() {
  return (
    <section className="sobre-nos-section" id="sobre-nos">
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="section-title text-center">Sobre Nós</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className="sobre-nos-content">
              <p className="lead text-justify">
                A história da <strong>La Diam</strong> começou de forma inesperada — com três estudantes de Engenharia Informática
                que, entre aulas, projetos e muitas noites em claro, descobriram uma paixão em comum: pizza.
              </p>
              <p className="text-justify">
                Durante o curso, uma das cadeiras mais importantes foi <strong>DIAM</strong> — Desenvolvimento para a Internet e Aplicações Móveis.
                Nela, o grupo teve de programar um site completo como projeto final. Foi ali que surgiu a primeira ideia: "e se fosse um site... de pizzaria?".
                O projeto tornou-se brincadeira, e a brincadeira tornou-se um sonho.
              </p>
              <p className="text-justify">
                Em 2025, decidiram transformar essa paixão em realidade e abriram a <strong>La Diam</strong> no coração de Lisboa.
                Mantendo o espírito criativo, o nome é uma homenagem à cadeira da faculdade onde tudo começou.
              </p>
              <p className="text-justify">
                Hoje, a La Diam combina tecnologia, sabor e amizade — com pizzas artesanais feitas com ingredientes frescos, carinho e um toque de programação.
                Mais do que pizzas, queremos oferecer experiências memoráveis.
              </p>
              <p className="fw-bold text-center mt-4">
                De um projeto académico para a vida real — venha descobrir o sabor da La Diam! 🍕
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
