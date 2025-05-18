import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "reactstrap";
import { createOrder } from "../../BackendCalls/posters";
import { CartContext } from "../../CartContext";

// Função para agrupar produtos por tipo
function groupByType(cart) {
  const grouped = {};
  cart.forEach((item) => {
    const type = item.product.type || "Outros";
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push(item);
  });
  return grouped;
}

const FinalizarPedido = () => {
  const location = useLocation();
  const cart = location.state?.cart || [];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const { clearCart } = useContext(CartContext);

  // Agrupa os produtos por tipo
  const groupedCart = groupByType(cart);

  // Calcula o total do carrinho
  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.product.discount_price ?? item.product.default_price) *
        item.quantity,
    0
  );

  // Função para criar o pedido
  const handlePagar = async () => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      await createOrder(cart);

      setSuccessMsg(
        "O seu pedido chegou à loja, por favor aguarde a nossa confirmação. Bom apetite!"
      );
      clearCart();
    } catch (err) {
      console.error("Order creation failed:", err);
      setError("Erro ao criar pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Finalizar Pedido</h2>
      {Object.keys(groupedCart).map((type) => (
        <div key={type} className="mb-3">
          <h5>{type}</h5>
          <ul className="list-group">
            {groupedCart[type].map((item) => (
              <li className="list-group-item" key={item.product.id}>
                {item.product.name} — {item.quantity} x{" "}
                {Number(
                  item.product.discount_price ?? item.product.default_price
                ).toFixed(2)}
                €
              </li>
            ))}
          </ul>
        </div>
      ))}
      {error && <div className="text-danger mb-2">{error}</div>}
      {successMsg && (
        <div className="alert alert-success mt-3">{successMsg}</div>
      )}
      {!successMsg && (
        <div className="d-flex align-items-center gap-3 mt-3">
          <Button color="success" onClick={handlePagar} disabled={loading}>
            {loading ? "A processar..." : "Pagar"}
          </Button>
          <span className="fw-bold fs-5">Total: {total.toFixed(2)} €</span>
        </div>
      )}
    </div>
  );
};

export default FinalizarPedido;
