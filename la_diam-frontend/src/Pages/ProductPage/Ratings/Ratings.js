// src/components/RatingSection.js

import React, { useState, useEffect, useContext } from 'react';
import {
  Card, CardBody, CardTitle,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { FaStar } from 'react-icons/fa';
import { useLocation } from "react-router-dom";
import { submitProductRating } from '../../../BackendCalls/posters';
import { fetchProductRatings } from '../../../BackendCalls/getters';
import { UserContext } from '../../../UserContext';

const Ratings = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const productId = product?.id;
  const { user } = useContext(UserContext);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [hasRated, setHasRated] = useState(false);

  // Modal state
  const [modal, setModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const toggle = () => setModal(!modal);

  // Verifica se o user já avaliou ao montar
  useEffect(() => {
    const checkUserRating = async () => {
      if (!productId || !user) return;
      try {
        const ratings = await fetchProductRatings(productId);
        const myRating = ratings.find(r => r.user === user.username);
        if (myRating) {
          setRating(myRating.rating);
          setHasRated(true);
        }
      } catch (e) {
        // ignore
      }
    };
    checkUserRating();
  }, [productId, user]);

  const handleSubmit = async () => {
    if (!productId || rating === 0) return;
    try {
      await submitProductRating(productId, rating);
      setHasRated(true);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setModalMsg(err.response.data.error);
        setModal(true);
      } else if (err.response && err.response.status === 403) {
        setModalMsg("Para avaliar, por favor faça login na sua conta.");
        setModal(true);
      } else {
        setModalMsg("Erro ao submeter avaliação.");
        setModal(true);
      }
    }
  };

  return (
    <Card className="h-100 mt-3">
      <CardBody>
        <CardTitle tag="h4">Avaliação</CardTitle>
        <div className="mb-3">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <FaStar
                key={index}
                size={28}
                className="me-1"
                color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                style={{ cursor: hasRated ? 'not-allowed' : 'pointer' }}
                onClick={() => !hasRated && setRating(starValue)}
                onMouseEnter={() => !hasRated && setHover(starValue)}
                onMouseLeave={() => !hasRated && setHover(null)}
              />
            );
          })}
        </div>
        <Button
          color="warning"
          onClick={handleSubmit}
          disabled={rating === 0 || hasRated}
        >
          {hasRated ? "Avaliado" : "Submeter Avaliação"}
        </Button>
      </CardBody>
      {/* Modal para mensagens */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Aviso</ModalHeader>
        <ModalBody>
          {modalMsg}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Fechar
          </Button>
          {modalMsg.includes("login") && (
            <Button color="secondary" onClick={() => { toggle(); window.location.href = "/login"; }}>
              Ir para login
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </Card>
  );
};

export default Ratings;
