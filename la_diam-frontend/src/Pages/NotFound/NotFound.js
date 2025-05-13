import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';

const NotFound = () => {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => {
      clearInterval(countdown);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <main>
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: '80vh', textAlign: 'center' }}
      >
        <h1 className="display-4">404 - Nada por aqui 🍽️</h1>
        <p className="lead">A página que você está procurando não foi encontrada.</p>
        <p>Redirecionando para a página inicial em {secondsLeft} segundo{secondsLeft !== 1 ? 's' : ''}...</p>
      </Container>
    </main>
  );
};

export default NotFound;
