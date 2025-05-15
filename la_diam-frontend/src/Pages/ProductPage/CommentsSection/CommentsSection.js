// src/components/CommentsSection.js

import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import {
  Card, CardBody, CardTitle,
  ListGroup, ListGroupItem,
  Form, FormGroup, Input, Button
} from 'reactstrap';
import { fetchProductComments } from '../../../BackendCalls/getters';
import { createComment } from '../../../BackendCalls/posters';

const CommentsSection = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const productId = product?.id;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    fetchProductComments(productId)
      .then(rawComments => {
        const mapped = rawComments.map(c => ({
          id: c.id,
          author: c.user,
          text: c.texto,
          date: c.data_publicacao, // <-- Adiciona a data
        }));
        setComments(mapped);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  const handleAddComment = async () => {
    if (newComment.trim() !== "" && productId) {
      try {
        setLoading(true);
        const response = await createComment(productId, newComment);
        setComments(prev => [
          ...prev,
          {
            id: response.id,
            author: response.user,
            text: response.texto,
            date: response.data_publicacao, // <-- Adiciona a data
          }
        ]);
        setNewComment("");
      } catch (error) {
        alert("Inicie sessão para comentar.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Função para formatar a data (opcional, para PT-PT)
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("pt-PT", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle tag="h4">Comentários</CardTitle>
        <ListGroup className="mb-3">
          {comments.length === 0 && !loading && (
            <ListGroupItem>Ainda não houve comentários.</ListGroupItem>
          )}
          {comments.map(comment => (
            <ListGroupItem key={comment.id}>
              <strong>{comment.author}:</strong> {comment.text}
              <div className="text-muted" style={{ fontSize: "0.85em" }}>
                {formatDate(comment.date)}
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
        <Form onSubmit={e => { e.preventDefault(); handleAddComment(); }}>
          <FormGroup className="d-flex">
            <Input
              type="text"
              placeholder="Escreva um comentário..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              disabled={loading}
            />
            <Button color="primary" onClick={handleAddComment} className="ms-2" disabled={loading}>
              Comentar
            </Button>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CommentsSection;
