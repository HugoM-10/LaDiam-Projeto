import { useState } from "react";
import PropTypes from "prop-types";
import { updateProduct } from "../../BackendCalls/putters";
import { deleteProduct } from "../../BackendCalls/deleters";
import { Container, Form, Button, Row, Col, Modal } from "react-bootstrap";
import { getImageDjango } from "../../Utils/Utils";

const EditDeleteProductForm = ({ product, onProductChanged }) => {
    const [formData, setFormData] = useState(product);
    const [imageFile, setImageFile] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMsg, setModalMsg] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        if (imageFile) data.append("image", imageFile);

        try {
            await updateProduct(data);
            setModalTitle("Sucesso");
            setModalMsg("Produto editado com sucesso!");
            setModalShow(true);
        } catch (err) {
            console.error("Erro ao editar o produto:", err);
            setModalTitle("Erro");
            setModalMsg("Falha ao editar produto. Por favor, tente novamente.");
            setModalShow(true);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteProduct(product);
            setModalTitle("Sucesso");
            setModalMsg("Produto apagado com sucesso!");
            setModalShow(true);
        } catch (err) {
            setModalTitle("Erro");
            setModalMsg("Falha ao apagar o produto. Por favor, tente novamente.");
            setModalShow(true);
            console.error("Erro ao apagar o produto:", err);
        }
    };

    const handleModalClose = () => {
        setModalShow(false);
        if (modalTitle === "Sucesso" && onProductChanged) {
            onProductChanged();
        }
    };

    return (
        <Container className="mt-4">
            <Form onSubmit={handleEdit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Preço:</Form.Label>
                    <Form.Control
                        name="default_price"
                        type="number"
                        value={formData.default_price}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Descrição:</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Promoção:</Form.Label>
                    <Form.Control name="promotion" type="text" value={formData.promotion || ""} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tipo:</Form.Label>
                    <Form.Select name="type" value={formData.type} onChange={handleChange}>
                        <option value="Pizza">Pizza</option>
                        <option value="Drink">Bebida</option>
                        <option value="Dessert">Sobremesa</option>
                        <option value="Appetizer">Entrada</option>
                        <option value="Other">Outro</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nova Imagem:</Form.Label>
                    <Form.Control type="file" name="image" accept="image/*" onChange={handleImageChange} />
                </Form.Group>

                <div className="mb-3">
                    <Form.Label>Imagem Atual:</Form.Label>
                    <div>
                        <img
                            src={getImageDjango(product.image)}
                            alt={`Imagem de ${product.name}`}
                            style={{
                                maxWidth: "200px",
                                maxHeight: "200px",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                </div>

                <Row className="mt-4">
                    <Col>
                        <Button variant="primary" type="submit" className="w-100">
                            Editar
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="danger" type="button" className="w-100" onClick={handleDelete}>
                            Apagar
                        </Button>
                    </Col>
                </Row>
            </Form>

            <Modal show={modalShow} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMsg}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

EditDeleteProductForm.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        default_price: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        promotion: PropTypes.string,
        type: PropTypes.string,
    }).isRequired,
    onProductChanged: PropTypes.func,
};

export default EditDeleteProductForm;
