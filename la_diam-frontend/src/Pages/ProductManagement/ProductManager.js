import { useState, useContext, useEffect } from "react";
import AddProductForm from "./ProductAdderForm";
import { Container, Button, ButtonGroup } from "react-bootstrap";
import ProductList from "./ProductList";
import EditDeleteProductForm from "./EditDeleteProductForm";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../Components/Modal";

const ProductManager = () => {
  const [selectedOption, setSelectedOption] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const { userGroup ,user} = useContext(UserContext);

  // Modal state
  const [modalShow, setModalShow] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalTitle, setModalTitle] = useState("Aviso");
  useEffect(() => {
    console.log(userGroup);
    if (userGroup !== "Gestor") {
      setModalTitle("Atenção");
      setModalMsg("É preciso ser gestor para aceder a esta página.");
      setModalShow(true);
      setTimeout(() => {
        setModalShow(false);
        navigate("/");
      }, 1800);
    }
  }, [user]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option !== "editDelete") {
      setSelectedProduct(null);
    }
  };
  const returnToProductList = () => {
    setSelectedOption("editDelete");
    setSelectedProduct(null);
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Gestão de Produtos</h1>

      <ButtonGroup className="mb-4">
        <Button
          variant={selectedOption === "add" ? "primary" : "secondary"}
          onClick={() => handleOptionChange("add")}
        >
          Adicionar Produto
        </Button>
        <Button
          variant={selectedOption === "editDelete" ? "primary" : "secondary"}
          onClick={() => handleOptionChange("editDelete")}
        >
          Editar/Apagar Produto
        </Button>
      </ButtonGroup>

      <div>
        {selectedOption === "add" && (
          <AddProductForm onProductChanged={returnToProductList} />
        )}
        {selectedOption === "editDelete" && (
          <div>
            {!selectedProduct ? (
              <ProductList onEditSelect={setSelectedProduct} />
            ) : (
              <EditDeleteProductForm
                product={selectedProduct}
                onProductChanged={returnToProductList}
              />
            )}
          </div>
        )}
      </div>
      <CustomModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        modalTitle={modalTitle}
        modalMsg={modalMsg}
      />
    </Container>
  );
};

export default ProductManager;
