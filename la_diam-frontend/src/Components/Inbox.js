import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import "./Cart/Cart.css";
import { fetchMessages } from "../BackendCalls/getters";
import { clearMessages } from "../BackendCalls/putters";

export const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchMessages()
        .then((msgs) => setMessages(msgs.filter((msg) => msg.new)))
        .catch(() => setMessages([]));
    }
  }, [isOpen]);

  const handleClearMessages = async (e) => {
    e.stopPropagation();
    await clearMessages();
    setMessages([]);
  };

  const renderMessages = () => {
    if (messages.length === 0) {
      return <p className="empty-cart">Sem mensagens</p>;
    }
    return messages.map((msg) => (
      <div key={msg.id} className="cart-item">
        <div className="cart-item-details">
          <p className="product-name mb-1">{msg.title}</p>
          <div className="text-muted" style={{ fontSize: "0.9em" }}>
            {new Date(msg.created_at).toLocaleDateString("pt-PT", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
          </div>
          <div style={{ fontSize: "0.95em" }}>{msg.content}</div>
        </div>
      </div>
    ));
  };

  return (
    <div className="cart-container">
  <button 
    aria-label="Mensagens"
    onClick={() => setIsOpen(!isOpen)}
    aria-expanded={isOpen}
    aria-haspopup="true"
  >
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
  {isOpen && (
    <div 
      className="cart-menu"
      role="menu"
      aria-labelledby="messages-button"
    >
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
