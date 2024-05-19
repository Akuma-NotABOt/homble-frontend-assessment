import React, { useState } from 'react';
import { Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import axios from '../axios';
import Layout from './Layout';

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productAllergens, setProductAllergens] = useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAddProduct = async () => {
    try {
      await axios.post('/products', {
        name: productName,
        description: productDescription,
        allergens: productAllergens,
      });
      setShow(false);
    } catch (err) {
      console.error('Something went wrong');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <Button onClick={handleShow} className="mb-3">Add Product</Button>
      <Row xs={1} md={2} lg={3}>
        {products.map(product => (
          <Col key={product.id} className="mb-3">
            <Link to={`/product/${product.id}`} className="text-decoration-none">
              <div className="product-tile border p-3 h-100">
                <h4>{product.name}</h4>
                <p>Price: {product.selling_price}rs</p>
              </div>
            </Link>
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName" className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="productDescription" className="mb-3">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="productAllergens" className="mb-3">
              <Form.Label>Product Allergen Info</Form.Label>
              <Form.Control
                type="text"
                value={productAllergens}
                onChange={(e) => setProductAllergens(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddProduct}>
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Layout>
  );
};

export default ProductList;
