import {
  CardText,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Button,
} from "reactstrap";
import PropTypes from "prop-types";
import { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md"; // Import the icons

const OrderComponent = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the expansion state
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div key={order.id} className="mb-4">
      <Row className="border-bottom pb-3 mb-3">
        <Col sm="12" md="4">
          <h5>Pedidos #{order.id}</h5>
          <CardText>
            <strong>Data:</strong>{" "}
            {new Date(order.order_date).toLocaleDateString("pt-PT", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
            <br />
            <strong>Total:</strong> {order.price} €
            <br />
            <strong>Status:</strong> {order.status}
          </CardText>
        </Col>
        <Col sm="12" md="8">
          <h6>Produtos:</h6>
          <ListGroup>
            {order.items
              .slice(0, isExpanded ? order.items.length : 3)
              .map((item) => (
                <ListGroupItem
                  key={item.id}
                  className="d-flex justify-content-between"
                >
                  <div>
                    <a
                      href={`/ProductPage/${item.product}`}
                      className="text-dark text-decoration-none fw-bold"
                    >
                      {item.order_product_name}
                    </a>
                    <br />
                    Preço para {item.quantity} produtos: {item.price} €
                  </div>
                </ListGroupItem>
              ))}
          </ListGroup>
          {order.items.length > 3 && (
            <Button color="link" onClick={toggleExpand}>
              {isExpanded ? (
                <MdExpandLess size={24} /> // Up arrow when expanded
              ) : (
                <MdExpandMore size={24} /> // Down arrow when collapsed
              )}
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

OrderComponent.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    order_date: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        order_product_name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        product: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default OrderComponent;
