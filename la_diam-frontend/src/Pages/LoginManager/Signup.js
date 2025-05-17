import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../BackendCalls/putters";
import { Container, Card, Form, FormGroup, FormLabel, FormControl, Button, Alert } from 'react-bootstrap';
import ProfileFieldsForm from "../Profile/ProfileForm";
import { UserContext } from "../../UserContext";
import CustomModal from "../../Components/Modal";

const SignupForm = () => {
  const { user, signup } = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalTitle, setModalTitle] = useState("Aviso");

  const navigate = useNavigate();
  const [accountDetails, setAccountDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [profile, setProfile] = useState({
    full_name: "",
    phone_number: "",
    address: "",
    gender: "",
    dateOfBirth: null,
    subscribed_to_newsletter: false,
  });

  const [error, setError] = useState("");

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (user) {
      setModalTitle("Aviso");
      setModalMsg("Você já está logado.");
      setError("You are already logged in.");
      setModalShow(true);
      return;
    }
    if (accountDetails.password !== accountDetails.confirm_password) {
      setModalTitle("Aviso");
      setModalMsg("As senhas não coincidem.");
      setError("Passwords do not match.");
      setModalShow(true);
      return;
    }
    if (
      !accountDetails.username ||
      !accountDetails.email ||
      !accountDetails.password
    ) {
      setModalTitle("Erro");
      setModalMsg("Username, email, and password são precisos.");
      setError("Password, email, and username are required.");
      setModalShow(true);
      return;
    }

    try {
      const result = await signup(
        accountDetails.username,
        accountDetails.email,
        accountDetails.password
      );

      if (result.success) {
        await updateProfile(profile);
       
        setModalTitle("Sucesso");
        setModalMsg("Conta criada com sucesso!");
        setModalShow(true);
        navigate("/");
      } else {
        setModalTitle("Erro");
        setModalMsg("Signup falhou: " + result.message);
        setModalShow(true);
        setError("Signup failed: " + result.message);
      }
    } catch (err) {
      setModalTitle("Erro");
      setModalMsg("Ocorreu um erro durante o signup. +" + err.message);
      setModalShow(true);
      console.error(err);
      setError("An error occurred during signup.");
    }
  };

 return (
  <Container className="my-4 d-flex justify-content-center">
    <Card style={{ width: '100%', maxWidth: '800px' }} className="p-4 shadow-sm">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <h4 className="mb-4">Create Account</h4>

          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          <FormGroup className="mb-3">
            <FormLabel htmlFor="username">Username:</FormLabel>
            <FormControl
              id="username"
              type="text"
              name="username"
              value={accountDetails.username}
              onChange={handleAccountChange}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel htmlFor="email">Email:</FormLabel>
            <FormControl
              id="email"
              type="email"
              name="email"
              value={accountDetails.email}
              onChange={handleAccountChange}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel htmlFor="password">Password:</FormLabel>
            <FormControl
              id="password"
              type="password"
              name="password"
              value={accountDetails.password}
              onChange={handleAccountChange}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel htmlFor="confirm_password">Confirm Password:</FormLabel>
            <FormControl
              id="confirm_password"
              type="password"
              name="confirm_password"
              value={accountDetails.confirm_password}
              onChange={handleAccountChange}
            />
          </FormGroup>

          <ProfileFieldsForm profile={profile} onChange={handleProfileChange} />

          <div className="mt-4">
            <Button type="submit" variant="primary">Signup</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>

    <CustomModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      modalTitle={modalTitle}
      modalMsg={modalMsg}
    />
  </Container>
);
};

export default SignupForm;
