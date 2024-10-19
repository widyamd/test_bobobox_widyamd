import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import CustomNavbar from "./Navbar";
import "../styles/style.css";
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
          <Row>
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
                        <MdOutlineDiscount /> &nbsp; $
                        {(
                          product.price -
                          (product.discountPercentage / 100) * product.price
                        ).toFixed(2)}
                      </h3>
                    </Col>
                  
                  </Row>
                 
                </p>

                <p className="product-discount">
                  <Row>
                    <Col lg="2">
                      <h4 className="text-light mb-0">
                       $ <del>{product.price}</del>
                      </h4>
                    </Col>
                    <Col className="align-content-center">
                      <p className="mb-0 text-start fw-bold">
                        {product.discountPercentage}%
                      </p>
                    </Col>
                  </Row>
                </p>
                <Row>
                  <div className="product-rating">
                       <Row>
                         <Col className="d-flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="#ffb700"
                              viewBox="0 0 256 256"
                            >
                              <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"></path>
                            </svg>
                            &nbsp; <p>{product.rating.toFixed(1)}</p>
                          </Col>
                       </Row>
                       
                      </div>
                  </Row>
                <p className="product-stock">
                  <Row>
                    <Col className="mb-1">
                      {product.stock <= 5 ? (
                        <small className="text-danger">
                          Only {product.stock} left in stock
                        </small>
                      ) : (
                        <span className="text-success">
                         stock : {product.stock} left
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
