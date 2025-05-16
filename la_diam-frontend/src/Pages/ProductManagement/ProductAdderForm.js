import { useState } from "react";
import { addNewProduct } from "../../BackendCalls/posters";
import { Form, Button, Container, Modal } from 'react-bootstrap';

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    default_price: "",
    promotion: "",
    type: "Other",
    is_available: true,
  });

  const [imageFile, setImageFile] = useState(null);

  // Modal state
  const [modalShow, setModalShow] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalTitle, setModalTitle] = useState("Aviso");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (imageFile) data.append("image", imageFile);

    try {
      await addNewProduct(data);
      setModalTitle("Sucesso");
      setModalMsg("Produto criado com sucesso!");
      setModalShow(true);
    } catch (err) {
      console.error("Error creating product:", err);
      setModalTitle("Erro");
      setModalMsg("Falha ao criar produto. Por favor, tente novamente.");
      setModalShow(true);
    }
  };

  return (
    <Container>
      <h2 className="my-4">Create New Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Default Price</Form.Label>
          <Form.Control
            type="number"
            name="default_price"
            placeholder="Default Price"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Promotion (optional)</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            name="promotion"
            placeholder="Promotion"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Select name="type" onChange={handleChange}>
            {["Pizza", "Drink", "Dessert", "Appetizer", "Other"].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            name="is_available"
            label="Available"
            checked={formData.is_available}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Product
        </Button>
      </Form>

      {/* Modal para mensagens */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMsg}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CreateProductForm;
