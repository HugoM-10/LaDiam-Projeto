import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Container, Pagination } from 'react-bootstrap';
import { fetchProductsPaginated } from '../../BackendCalls/getters'; // Make sure this is paginated
import { getImageDjango } from '../../Utils/Utils';

const PRODUCTS_PER_PAGE = 8;

const ProductList = ({ onEditSelect }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [loading, setLoading] = useState(false);

    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const { products, total } = await fetchProductsPaginated(currentPage,"");
                setProducts(products);
                setTotalProducts(total);
            } catch {
                setProducts([]);
                setTotalProducts(0);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    let productContent;
    if (loading) {
        productContent = (
            <Col>
                <div className="text-center text-muted">Loading products...</div>
            </Col>
        );
    } else if (products.length === 0) {
        productContent = (
            <Col>
                <div className="text-center text-muted">No products found.</div>
            </Col>
        );
    } else {
        productContent = products.map(product => (
            <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                <Card>
                    <Card.Img variant="top" src={getImageDjango(product.image) || 'https://via.placeholder.com/150'} />
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>{product.description}</Card.Text>
                        <Card.Text>
                            <strong>Price:</strong> ${product.default_price}
                            {product.discount_price && (
                                <>
                                    <br />
                                    <strong>Discount:</strong> ${product.discount_price}
                                </>
                            )}
                        </Card.Text>
                        <Button variant="primary" onClick={() => onEditSelect(product)}>
                            Edit This Product
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        ));
    }

    return (
        <Container className="mt-4">
            <Row>
                {productContent}
            </Row>

            {totalPages > 1 && (
                <Pagination className="justify-content-center mt-4">
                    <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    {[...Array(totalPages)].map((_, idx) => (
                        <Pagination.Item
                            key={idx}
                            active={currentPage === idx + 1}
                            onClick={() => handlePageChange(idx + 1)}
                        >
                            {idx + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            )}
        </Container>
    );
};

export default ProductList;
