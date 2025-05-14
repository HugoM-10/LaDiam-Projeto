import  { useState } from 'react';
import AddProductForm from './ProductAdderForm';
import EditDeleteProductForm from './EditDeleteProductForm';
import { Container, Button, ButtonGroup } from 'react-bootstrap';

const ProductManager = () => {
    const [selectedOption, setSelectedOption] = useState('add');

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

return (
  <Container className="my-4">
    <h1 className="mb-4">Product Management</h1>

    <ButtonGroup className="mb-4">
                  
      <Button variant={selectedOption === "add" ? "primary" : "secondary"} onClick={() => handleOptionChange('add')}>
        Add Product
      </Button>
      <Button variant={selectedOption === "editDelete" ? "primary" : "secondary"} onClick={() => handleOptionChange('editDelete')}>
        Edit/Delete Product
      </Button>
    </ButtonGroup>

    <div>
      {selectedOption === 'add' && <AddProductForm />}
      {selectedOption === 'editDelete' && <EditDeleteProductForm />}
    </div>
  </Container>
);
};

export default ProductManager;