import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import "./Menu.css";
import { fetchProducts } from "../../BackendCalls/getters";

const Menu = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    
    fetchData();
}, []);

console.log("Products:",products);
  return (
    <Container className="menu-container">
      <h1>Menu</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </Container>
  );
};

export default Menu;