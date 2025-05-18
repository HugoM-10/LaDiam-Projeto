import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../BackendCalls/getters";
import { createMessage } from "../../BackendCalls/posters";
import { 
  Button, 
  Container, 
  Card, 
  CardBody, 
  CardHeader, 
  Row, 
  Col, 
  Badge, 
  Spinner, 
  Alert 
} from "reactstrap";
import { updateOrderStatus } from "../../BackendCalls/putters";

const Pedidos = () => {
  const [orders, setOrders] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState({ show: false, message: "", color: "success" });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchOrders();
        setOrders(result);
      } catch (err) {
        console.error("Erro ao buscar pedidos:", err);
        setError("Falha ao carregar os pedidos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setStatusMap((prev) => ({ ...prev, [id]: newStatus }));
  };

  const handleSave = async (id) => {
  const updatedStatus = statusMap[id] || orders.find(o => o.id === id)?.status;
  const oldStatus = orders.find(o => o.id === id)?.status;

  if (!updatedStatus || updatedStatus === oldStatus) {
    setFeedback({ show: true, message: "Nenhuma alteração de status para salvar.", color: "warning" });
    setTimeout(() => setFeedback({ show: false }), 3000);
    return;
  }

  try {
    await updateOrderStatus(id, updatedStatus);
    
    // Atualiza localmente o estado
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === id ? { ...order, status: updatedStatus } : order
      )
    );

    setFeedback({ show: true, message: `Status do Pedido #${id} atualizado com sucesso!`, color: "success" });
  } catch (err) {
    console.error("Erro ao atualizar o status do pedido:", err);
    setFeedback({ show: true, message: `Erro ao atualizar o status do Pedido #${id}.`, color: "danger" });
  } finally {
    setTimeout(() => setFeedback({ show: false }), 3000);
  }
};

  const statuses = {
    PENDING: "Pendente",
    IN_PROGRESS: "Aceite",
    CANCELED: "Rejeitado",
    COMPLETED: "Concluído",
    
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Pending": return "warning";
      case "Accepted": return "info";
      case "Rejected": return "danger";
      case "Completed": return "success";
      case "Cancelled": return "danger";
      default: return "secondary";
    }
  };

  if (loading) {
    return (
      <Container className="text-center p-5">
        <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
        <p className="mt-3">Carregando pedidos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="p-5">
        <Alert color="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <div className="p-3 p-md-4 bg-light min-vh-100">
      <Container fluid>
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-primary">Gestão de Pedidos</h1>
        
        {feedback.show && (
          <Alert color={feedback.color} isOpen={feedback.show} toggle={() => setFeedback({ show: false })} className="position-fixed top-0 end-0 m-3" style={{ zIndex: 1050 }}>
            {feedback.message}
          </Alert>
        )}

        {orders.length === 0 && !loading && (
          <Alert color="info" className="text-center">Nenhum pedido encontrado.</Alert>
        )}

        {orders.map((order) => (
          <Card key={order.id} className="mb-4 shadow-sm hover:shadow-lg transition-shadow duration-300 border-0">
            <CardHeader className="bg-white d-flex flex-column flex-md-row justify-content-between align-items-md-center p-3">
              <h5 className="mb-2 mb-md-0 text-lg font-semibold text-primary">Pedido ID: {order.id}</h5>
              <Badge color={getStatusBadgeColor(order.status)} pill className="px-3 py-1 text-sm">
                {statuses[order.status]}
              </Badge>
            </CardHeader>
            <CardBody className="p-3 p-md-4">
              <Row>
                {/* Detalhes da encomenda */}
                <Col md={4} className="mb-3 mb-md-0 pb-3 pb-md-0 md:border-e border-gray-200">
                  <h6 className="text-md font-semibold mb-2 text-secondary">Detalhes do Pedido</h6>
                  <p className="text-sm mb-1"><strong className="font-medium">Cliente:</strong> {order.user_email}</p>
                  <p className="text-sm mb-1">
                    <strong className="font-medium">Data:</strong>{" "}
                    {new Date(order.order_date).toLocaleDateString("pt-PT", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                  <p className="text-sm mb-0"><strong className="font-medium">Preço Total:</strong> {order.price} €</p>
                </Col>

                {/* Mostrar os produtos */}
                <Col md={5} className="mb-3 mb-md-0 pb-3 pb-md-0 md:border-e border-gray-200">
                  <h6 className="text-md font-semibold mb-2 text-secondary">Produtos</h6>
                  <ul className="list-unstyled mb-0" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                    {order.items.map((item) => (
                      <li key={item.id} className="d-flex align-items-center mb-2 pb-2 border-bottom border-gray-100 last:border-bottom-0">
                        <img
                          src={item.order_product_image_link}
                          alt={item.order_product_name}
                          className="rounded me-2"
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="text-sm">
                          <span className="font-medium">{item.order_product_name}</span>
                          <small className="d-block text-muted">Qtd: {item.quantity}</small>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Col>

                {/* Menu de seleção de estado */}
                <Col md={3} className="d-flex flex-column justify-content-center">
                  <h6 className="text-md font-semibold mb-2 text-secondary">Alterar Status</h6>
                  <select
                    value={statusMap[order.id] || order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="form-select form-select-sm mb-2 border rounded px-3 py-2"
                  >
                    {Object.entries(statuses).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => handleSave(order.id)}
                    className="w-100"
                    disabled={!statusMap[order.id] || statusMap[order.id] === order.status}
                  >
                    Guardar Alteração
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default Pedidos;