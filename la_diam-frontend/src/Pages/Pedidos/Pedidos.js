import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../BackendCalls/getters";
import { Button, Container } from "reactstrap";
import { updateOrderStatus } from "../../BackendCalls/putters";  

const Pedidos = () => {
  const [orders, setOrders] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchOrders();
        setOrders(result);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    console.log("Novo estado:", newStatus);
    setStatusMap((prev) => ({ ...prev, [id]: newStatus }));
    
  };

  const handleSave = async (id) => {
    const updatedStatus = statusMap[id];
    console.log("Estado atualizado:", updatedStatus);
    try {
      await updateOrderStatus(id, updatedStatus);
    } catch (error) {
      alert("Erro ao atualizar o status do pedido", error);
      console.error("Erro ao atualizar o status do pedido:", error);
    }
  };

  const statuses = {
    Pending: "Pendente",
    Accepted: "Em processamento",
    Completed: "Concluído",
    Cancelled: "Cancelado",
  };
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
      <Container className="mb-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border mb-4 p-4 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center justify-between"
          >
            {/* Detalhes da encomenda */}
            <div className="flex-1 mb-4 md:mb-0">
              <h2 className="text-lg font-semibold">Pedido ID: {order.id}</h2>
              <p>Cliente: {order.user}</p>
              <p>
                Data:{" "}
                {new Date(order.order_date).toLocaleDateString("pt-PT", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p>Preço: {order.price} €</p>
              <p>Estado: {statuses[order.status]}</p>
            </div>
            {/* Mostrar os produtos */}
            <div className="flex-1 mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Produtos:</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {order.items.map((item) => (
                  <li key={item.id} className="flex items-center mb-2">
                    <img
                      src={item.order_product_image_link}
                      alt={item.order_product_name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                    {item.order_product_name} - {item.quantity} unidades
                  </li>
                ))}
              </ul>
            </div>
            {/* Menu de seleção de estado */}
            <div className="flex flex-col items-start md:items-end">
              <select
                value={statusMap[order.id] || order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                className="border rounded px-3 py-2 mb-2"
              >
                {Object.entries(statuses).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
              <Button
                color="primary"
                onClick={() => handleSave(order.id)}
                className="mt-2"
              >
                Guardar
              </Button>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Pedidos;
