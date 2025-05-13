// src/components/CommentsSection.js

import React, { useState, useEffect } from 'react';
import {
  Card, CardBody, CardTitle,
  ListGroup, ListGroupItem,
  Form, FormGroup, Input, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { fetchProductComments } from '../../../BackendCalls/getters';
import { createComment } from '../../../BackendCalls/posters';
import { useParams } from 'react-router-dom';

const CommentsSection = ({ initialComments = [] }) => {
  const { id: productId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Carregar comentários do backend
  useEffect(() => {
    setLoading(true);
    fetchProductComments(productId)
      .then(rawComments => {
        // Mapear para o formato esperado pelo componente
        const mapped = rawComments.map(c => ({
          id: c.id,
          author: c.user,
          text: c.texto
        }));
        setComments(mapped);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  // Adicionar comentário via backend
  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      try {
        setLoading(true);
        const response = await createComment(productId, newComment);
        // Adiciona o novo comentário à lista
        setComments(prev => [
          ...prev,
          {
            id: response.id,
            author: response.user,
            text: response.texto
          }
        ]);
        setNewComment("");
      } catch (error) {
        alert("Erro ao adicionar comentário. Tem sessão iniciada?");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
   

    <Card className="h-100">
      <CardBody>
        <CardTitle tag="h4">Comentários</CardTitle>
        <ListGroup className="mb-3">
          {comments.length === 0 && !loading && (
            <ListGroupItem>Nenhum comentário ainda.</ListGroupItem>
          )}
          {comments.map(comment => (
            <ListGroupItem key={comment.id}>
              <strong>{comment.author}:</strong> {comment.text}
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

CommentsSection.propTypes = {
  initialComments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    author: PropTypes.string,
    text: PropTypes.string
  }))
};

export default CommentsSection;
