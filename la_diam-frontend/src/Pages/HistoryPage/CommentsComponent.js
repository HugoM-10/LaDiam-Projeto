import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import PropTypes from "prop-types";

const CommentComponent = ({ comments }) => {
  return (
    <div className="mb-4">
      <Card>
        <CardBody>
          <CardTitle tag="h4">User Comments</CardTitle>
          <ListGroup flush>
            {comments.map((comment) => (
              <ListGroupItem key={comment.id}>
                <CardText>
                  <a
                    href={`/ProductPage/${comment.product}`}
                    className="text-dark text-decoration-none fw-bold"
                  >
                    {comment.product_name}
                  </a>
                  <br />
                  {comment.texto}
                  <br />
                  <small className="text-muted">
                    {new Date(comment.data_publicacao).toLocaleString()}
                  </small>
                </CardText>
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </div>
  );
};

CommentComponent.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      texto: PropTypes.string.isRequired,
      product_name: PropTypes.string.isRequired,
      data_publicacao: PropTypes.string.isRequired,
      product: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CommentComponent;
