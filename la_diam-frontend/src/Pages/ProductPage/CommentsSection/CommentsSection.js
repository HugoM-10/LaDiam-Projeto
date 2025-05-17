// src/components/CommentsSection.js

import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import {
  Card, CardBody, CardTitle,
  ListGroup, ListGroupItem,
  Form, FormGroup, Input, Button,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { fetchProductComments } from '../../../BackendCalls/getters';
import { createComment } from '../../../BackendCalls/posters';

const PAGE_SIZE = 5;

const CommentsSection = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const productId = product?.id;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [modal, setModal] = useState(false);
  const listRef = useRef();

  const toggle = () => setModal(!modal);

  useEffect(() => {
    if (!productId) return;
    setComments([]);
    setPage(1);
    setHasMore(true);
  }, [productId]);

  useEffect(() => {
    if (!productId || !hasMore) return;
    setLoading(true);
    fetchProductComments(productId, page, PAGE_SIZE)
      .then(data => {
        const mapped = (data.results || []).map(c => ({
          id: c.id,
          author: c.user,
          text: c.texto,
          date: c.data_publicacao,
        }));
        setComments(prev => {
          // Remove duplicados por id
          const all = [...prev, ...mapped];
          const unique = Array.from(new Map(all.map(item => [item.id, item])).values());
          return unique;
        });
        setHasMore(Boolean(data.next));
      })
      .finally(() => setLoading(false));
  }, [productId, page, hasMore]);

  // Infinite scroll handler
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 20 && hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() !== "" && productId) {
      try {
        setLoading(true);
        const response = await createComment(productId, newComment);
        setComments(prev => {
          // Garante que o novo comentário não duplica
          const all = [
            {
              id: response.id,
              author: response.user,
              text: response.texto,
              date: response.data_publicacao,
            },
            ...prev,
          ];
          return Array.from(new Map(all.map(item => [item.id, item])).values());
        });
        setNewComment("");
      } catch (error) {
        setModal(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle tag="h4">Comentários</CardTitle>
        <div
          style={{ maxHeight: 250, overflowY: "auto" }}
          onScroll={handleScroll}
          ref={listRef}
        >
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
            {loading && <ListGroupItem>Carregando...</ListGroupItem>}
            {!hasMore && comments.length > 0 && (
              <ListGroupItem className="text-center text-muted" style={{ fontSize: "0.9em" }}>
                Todos os comentários carregados.
              </ListGroupItem>
            )}
          </ListGroup>
        </div>
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
