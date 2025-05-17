import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import CustomModal from "../../Components/Modal";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, user } = useContext(UserContext);

  // Modal state
  const [modalShow, setModalShow] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalTitle, setModalTitle] = useState("Aviso");

  // Redirect to main page if user already exists
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      const result = await login(username, password);
      if (result.success) {
        setModalTitle("Sucesso");
        setModalMsg("Login efetuado com sucesso!");
        setModalShow(true);
        setTimeout(() => {
          setModalShow(false);
          navigate("/");
        }, 1200);
      } else {
        setModalTitle("Erro");
        setModalMsg("Login falhou: " + result.message);
        setModalShow(true);
      }
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <Container className="pt-5 d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>

              <hr className="my-4" />

              <div className="text-center">
                <p>Don't have an account?</p>
                <Button
                  variant="outline-secondary"
                  onClick={handleSignupRedirect}
                >
                  Sign Up
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <CustomModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        modalTitle={modalTitle}
        modalMsg={modalMsg}
      />
    </Container>
  );
}

export default Login;
