import React, { useEffect, useState } from "react";
import { Pagination, PaginationItem, PaginationLink, Container, Row, Col, Button, ButtonGroup } from "reactstrap";
import Product from "../../Components/Product/Product";
import { fetchProductsPaginated } from "../../BackendCalls/getters";

const PRODUCTS_PER_PAGE = 8;

const PRODUCT_TYPES = [
  { value: "", label: "Todos" },
  { value: "Appetizer", label: "Entrada" },
  { value: "Drink", label: "Bebida" },
  { value: "Pizza", label: "Pizza" },
  { value: "Dessert", label: "Sobremesa" },
  { value: "Other", label: "Outro" },
];

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { products, total } = await fetchProductsPaginated(currentPage, selectedType);
        setProducts(products);
        setTotalPages(Math.ceil(total / PRODUCTS_PER_PAGE));
      } catch {
        setProducts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, selectedType]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Menu</h2>
      <div className="mb-4 d-flex justify-content-center flex-wrap gap-2">
        <ButtonGroup>
          {PRODUCT_TYPES.map((type) => (
            <Button
              key={type.value}
              color={selectedType === type.value ? "warning" : "secondary"}
              onClick={() => handleTypeChange(type.value)}
              active={selectedType === type.value}
            >
              {type.label}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <Row>
        {loading ? (
          <Col>
            <div className="text-center text-muted">A carregar produtos...</div>
          </Col>
        ) : products.length === 0 ? (
          <Col>
            <div className="text-center text-muted">Nenhum produto encontrado.</div>
          </Col>
        ) : (
          products.map((product) => (
            <Col key={product.id} md={3} sm={6} xs={12} className="mb-4">
              <Product product={product} />
            </Col>
          ))
        )}
      </Row>
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink first onClick={() => handlePageChange(1)} />
          </PaginationItem>
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
          </PaginationItem>
          {[...Array(totalPages)].map((_, idx) => (
            <PaginationItem active={currentPage === idx + 1} key={idx}>
              <PaginationLink
                onClick={() => handlePageChange(idx + 1)}
                style={
                  currentPage === idx + 1
                    ? { backgroundColor: "orange", color: "white", borderColor: "orange" }
                    : {}
                }
              >
                {idx + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem disabled={currentPage === totalPages}>
            <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
          </PaginationItem>
          <PaginationItem disabled={currentPage === totalPages}>
            <PaginationLink last onClick={() => handlePageChange(totalPages)} />
          </PaginationItem>
        </Pagination>
      )}
    </Container>
  );
};

export default Menu;