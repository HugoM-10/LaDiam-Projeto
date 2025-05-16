import { useState } from "react";
import AddProductForm from "./ProductAdderForm";
import { Container, Button, ButtonGroup } from "react-bootstrap";
import ProductList from "./ProductList";
import EditDeleteProductForm from "./EditDeleteProductForm";

const ProductManager = () => {
  const [selectedOption, setSelectedOption] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Product Management</h1>

      <ButtonGroup className="mb-4">
        <Button
          variant={selectedOption === "add" ? "primary" : "secondary"}
          onClick={() => handleOptionChange("add")}
        >
          Add Product
        </Button>
        <Button
          variant={selectedOption === "editDelete" ? "primary" : "secondary"}
          onClick={() => handleOptionChange("editDelete")}
        >
          Edit/Delete Product
        </Button>
      </ButtonGroup>

      <div>
        {selectedOption === "add" && <AddProductForm />}
        {selectedOption === "editDelete" && (
          <div>
            {!selectedProduct ? (
              <ProductList onEditSelect={setSelectedProduct} />
            ) : (
              <EditDeleteProductForm product={selectedProduct} />
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default ProductManager;
