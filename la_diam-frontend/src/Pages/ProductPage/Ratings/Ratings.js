// src/components/RatingSection.js

import React, { useState, useEffect, useContext } from 'react';
import {
  Card, CardBody, CardTitle,
  Button
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
        alert(err.response.data.error);
      } else if (err.response && err.response.status === 403) {
        alert("Sessão expirada. Faça login novamente.");
      } else {
        alert("Erro ao submeter avaliação.");
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
    </Card>
  );
};

export default Ratings;
