import React, { useState } from 'react';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Container
} from 'reactstrap';

const faqs = [
  { id: '1', pergunta: 'Quais são os horários de funcionamento?', resposta: 'Funcionamos todos os dias das 18h às 23h, incluindo feriados.' },
  { id: '2', pergunta: 'Vocês fazem entrega?', resposta: 'Sim! Entregamos em toda a região central e bairros próximos com taxa fixa de 2,00$.' },
  { id: '3', pergunta: 'Aceitam que formas de pagamento?', resposta: 'Aceitamos Mbway, cartão de crédito e débito, além de dinheiro.' },
  { id: '4', pergunta: 'É possível personalizar a pizza?', resposta: 'Claro! Você pode escolher até 2 sabores e adicionar ingredientes extras.' },
  { id: '5', pergunta: 'Têm opções vegetarianas?', resposta: 'Sim, temos pizzas como Marguerita, 4 Queijos e Vegetariana Especial.' }
];

export default function Faq() {
  const [open, setOpen] = useState('');

  const toggle = (id) => {
    setOpen(open === id ? '' : id);
  };

  return (
    <Container className="my-5" id="faq">
      <h2 className="text-center mb-4">Perguntas Frequentes</h2>
      <Accordion open={open} toggle={toggle}>
        {faqs.map((faq) => (
          <AccordionItem key={faq.id}>
            <AccordionHeader targetId={faq.id}>{faq.pergunta}</AccordionHeader>
            <AccordionBody accordionId={faq.id}>
              {faq.resposta}
            </AccordionBody>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
}
