import { useEffect, useState } from "react";
import { fetchMessages } from "../../BackendCalls/getters";
import { clearMessages } from "../../BackendCalls/putters";
import { Container, Button, Spinner } from "reactstrap";

const AllMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);
      try {
        const msgs = await fetchMessages();
        setMessages(msgs);
      } catch (err) {
        console.error("Erro ao buscar mensagens:", err);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, []);

  const handleReadAll = async () => {
    await clearMessages();
    window.location.href = window.location.href;
  };

  return (
  <Container className="p-4">
    <h2 className="mb-4 text-primary">Todas as Mensagens</h2>

    {loading && (
      <div className="text-center py-5">
        <Spinner color="primary" />
      </div>
    )}

    {!loading && messages.length === 0 && (
      <p className="text-muted">Sem mensagens para mostrar.</p>
    )}

    {!loading && messages.length > 0 && (
      <>
        <div
          style={{
            maxHeight: "70vh",
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                backgroundColor: msg.new ? "#e6f2ff" : "#f9f9f9",
                borderLeft: msg.new ? "5px solid #007bff" : "5px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "4px",
              }}
            >
              <h5 className="mb-1">{msg.title}</h5>
              <small className="text-muted">
                {new Date(msg.created_at).toLocaleDateString("pt-PT", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
              <p className="mt-2 mb-0">{msg.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 text-end">
          <Button color="danger" onClick={handleReadAll}>
            Marcar todas como lidas
          </Button>
        </div>
      </>
    )}
  </Container>
);
};

export default AllMessages;