import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import CustomNavbar from "./Navbar";
import "../styles/style.css";
import { FaStar } from "react-icons/fa";
import { MdOutlineDiscount } from "react-icons/md";

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
    <>
      <CustomNavbar /> {/* Render CustomNavbar at the top */}
      <div className="product-detail py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <Image
                src={product.images[0]}
                alt={product.title}
                fluid
                className="product-image rounded border"
              />
            </Col>
            <Col md={6}>
              <div className="product-info">
                <h1 className="product-title">{product.title}</h1>
                <p className="product-description">{product.description}</p>
                <p className="product-price">
                  <Row>
                    <Col lg="3" className="align-content-center">
                      <h3 className="text-danger mb-0">
                        <MdOutlineDiscount /> &nbsp;
                        {(
                          product.price -
                          (product.discountPercentage / 100) * product.price
                        ).toFixed(2)}
                      </h3>
                    </Col>
                    <Col className="align-content-center">
                      <div className="product-rating">
                        <span className="text-warning">
                          {Array.from({ length: 5 }, (_, index) => (
                            <FaStar
                              key={index}
                              className={
                                index < Math.round(product.rating)
                                  ? "filled-star"
                                  : ""
                              }
                            />
                          ))}
                        </span>
                        <span className="ms-2">
                          {product.rating.toFixed(1)}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </p>

                <p className="product-discount">
                  <Row>
                    <Col lg="2">
                      <h4 className="text-light">
                        <del>{product.price}</del>
                      </h4>
                    </Col>
                    <Col className="align-content-center">
                      <p className="mb-0 text-start fw-bold">
                        {product.discountPercentage}%
                      </p>
                    </Col>
                  </Row>
                </p>

                <p className="product-stock">
                  <Row>
                    <Col className="mb-1">
                      {product.stock <= 5 ? (
                        <small className="text-danger">
                          Only {product.stock} left in stock
                        </small>
                      ) : (
                        <span className="text-success">
                          {product.stock} left
                        </span>
                      )}
                    </Col>
                  </Row>
                </p>

                <Button variant="primary" className="my-3">
                  Add to Cart
                </Button>

                <p className="product-category">
                  <small>
                    Category:{" "}
                    <span className="text-muted">{product.category}</span>
                  </small>
                </p>

                <p className="product-sku">
                  <small>
                    SKU: <span className="text-muted">{product.sku}</span>
                  </small>
                </p>
                <p className="product-brand">
                  <small>
                    Brand: <span className="text-muted">{product.brand}</span>
                  </small>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ProductDetail;
