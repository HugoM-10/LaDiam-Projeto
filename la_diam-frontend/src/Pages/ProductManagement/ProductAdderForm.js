import { useState } from "react";
import { addNewProduct } from "../../BackendCalls/posters";
import { Form, Button, Container } from 'react-bootstrap';
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
      addNewProduct(data);
      alert("Product created successfully!");
    } catch (err) {
        console.error("Error creating product:", err);
        alert("Failed to create product. Please try again.");
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
  </Container>
);
};

export default CreateProductForm;
