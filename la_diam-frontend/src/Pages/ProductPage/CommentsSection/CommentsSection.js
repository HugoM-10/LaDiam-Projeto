// src/components/CommentsSection.js

import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import {
  Card, CardBody, CardTitle,
  ListGroup, ListGroupItem,
  Form, FormGroup, Input, Button,
  Modal, ModalHeader, ModalBody, ModalFooter
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

  // Modal state
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    fetchProductComments(productId)
      .then(rawComments => {
        const mapped = rawComments.map(c => ({
          id: c.id,
          author: c.user,
          text: c.texto,
          date: c.data_publicacao,
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
            date: response.data_publicacao,
          }
        ]);
        setNewComment("");
      } catch (error) {
        setModal(true); // Mostra o modal se não estiver logado
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
            <ListGroupItem>Ainda não houve comentários.</ListGroupItem>
          )}
          {comments.map(comment => (
            <ListGroupItem key={comment.id}>
              <strong>{comment.author}:</strong> {comment.text}
              <div className="text-muted" style={{ fontSize: "0.85em" }}>
                {new Date(comment.date).toLocaleDateString("pt-PT", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
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
        {/* Modal para não autenticado */}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Inicie sessão</ModalHeader>
          <ModalBody>
            Para comentar, por favor inicie sessão na sua conta.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => { toggle(); window.location.href = "/login"; }}>
              Ir para login
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </CardBody>
    </Card>
  );
};

export default CommentsSection;
