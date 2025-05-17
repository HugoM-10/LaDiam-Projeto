import { useEffect, useState } from "react";
import { Container, Button, ButtonGroup } from "reactstrap";
import { fetchUserOrders, fetchUserComments } from "../../BackendCalls/getters";
import OrderComponent from "./OrderComponent";
import CommentComponent from "./CommentsComponent";

const HistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [comments, setComments] = useState([]);
  const [view, setView] = useState("orders");

  useEffect(() => {
    const getOrders = async () => {
      const data = await fetchUserOrders();
      setOrders(data);
    };

    const getComments = async () => {
      const data = await fetchUserComments();
      setComments(data);
    };

    getOrders();
    getComments();
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="mb-4">
        {view === "orders"
          ? "Histórico de Compras"
          : "Histórico de Comentários"}
      </h1>

      <ButtonGroup className="mb-4">
        <Button
          color={view === "orders" ? "primary" : "secondary"}
          onClick={() => setView("orders")}
        >
          Pedidos
        </Button>
        <Button
          color={view === "comments" ? "primary" : "secondary"}
          onClick={() => setView("comments")}
        >
          Comentários
        </Button>
      </ButtonGroup>

      {view === "orders" &&
        orders.map((order) => <OrderComponent key={order.id} order={order} />)}

      {view === "comments" && <CommentComponent comments={comments} />}
    </Container>
  );
};

export default HistoryPage;
