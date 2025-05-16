import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import "./Cart/Cart.css"; // Reutiliza o estilo do carrinho

export const Inbox = () => {
  // Mensagens hardcoded para demonstração
  const [messages, setMessages] = useState([
    {
      id: 1,
      title: "Pedido confirmado",
      content: "O seu pedido #123 foi confirmado e está a ser preparado.",
      date: "16/05/2025 19:30"
    },
    {
      id: 2,
      title: "Promoção especial",
      content: "Hoje todas as pizzas têm 10% de desconto!",
      date: "16/05/2025 18:00"
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const handleClearMessages = (e) => {
    e.stopPropagation();
    setMessages([]);
  };

  // Renderiza as mensagens
  const renderMessages = () => {
    if (messages.length === 0) {
      return <p className="empty-cart">Sem mensagens</p>;
    }
    return messages.map((msg) => (
      <div key={msg.id} className="cart-item">
        <div className="cart-item-details">
          <p className="product-name mb-1">{msg.title}</p>
          <div className="text-muted" style={{ fontSize: "0.9em" }}>{msg.date}</div>
          <div style={{ fontSize: "0.95em" }}>{msg.content}</div>
        </div>
      </div>
    ));
  };

  return (
    <div className="cart-container" onClick={() => setIsOpen(!isOpen)}>
      {/* Ícone do sino */}
      <button aria-label="Mensagens">
        <FaBell className="icon" />
        {messages.length > 0 && (
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: "0.8rem" }}
          >
            {messages.length}
          </span>
        )}
      </button>

      {/* Conteúdo do inbox visível apenas quando aberto */}
      {isOpen && (
        <div className="cart-menu">
          {renderMessages()}
          {messages.length > 0 && (
            <button
              className="checkout-button"
              onClick={handleClearMessages}
              aria-label="Limpar mensagens"
              style={{ background: "#888", marginTop: "10px" }}
            >
              Limpar mensagens
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Inbox;