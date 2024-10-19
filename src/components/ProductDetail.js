import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import '../styles/style.css'; 

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const getProductDetails = useCallback(async () => {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await response.json();
    setProduct(data);
  }, [productId]);

  useEffect(() => {
    getProductDetails();
  }, [getProductDetails]);

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-detail">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <Image src={product.images[0]} alt={product.title} fluid className="product-image" />
          </Col>
          <Col md={6}>
            <h1 className="product-title">{product.title}</h1>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: <span className="text-danger">${product.price.toFixed(2)}</span></p>
            <p className="product-discount">Discount: <span className="text-success">{product.discountPercentage}%</span></p>
            <p className="product-category">Category: <span className="text-muted">{product.category}</span></p>
            <p className="product-rating">Rating: <span className="text-warning">{product.rating}</span></p>
            <p className="product-stock">Stock: <span className={`text-${product.stock > 0 ? 'success' : 'danger'}`}>{product.stock} left</span></p>
            <p className="product-sku">SKU: <span className="text-muted">{product.sku}</span></p>
            <p className="product-brand">Brand: <span className="text-muted">{product.brand}</span></p>
            <Button variant="primary" className="mt-3">Add to Cart</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetail;
