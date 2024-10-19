import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { CardText } from "react-bootstrap";
import { FaRegHeart } from "react-icons/fa";
import { Rating, RoundedStar } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

const Products = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=40");
    const data = await response.json();

    if (data && data.products) {
      setProducts(data.products);
      console.log(data);
    }
  };
  const ratingStyle = {
    itemShapes: RoundedStar,
    activeFillColor: '#ffb700',
    inactiveFillColor: '#fbf1a9'
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Container>
        <Row>
          {products.map((item) => {
            return (
              <Col lg="3" className="col-product">
                <Card className="card-product">
                  <Row>
                    <Col className="text-end position-absolute">
                      <Button variant="link">
                        <h3>
                          <FaRegHeart />
                        </h3>
                      </Button>
                    </Col>
                  </Row>
                  <Card.Img variant="top" className="card-img-product" src={item.thumbnail} />
                  <Card.Body>
                    <Card.Title className="text-primary">{item.title}</Card.Title>
                    <p className="text-light">{item.category}</p>
                    <Row>
                      <Col>
                        <Card.Text>
                       
                          <h2 className="text-danger">
                            {(
                              item.price -
                              (item.discountPercentage / 100) * item.price
                            ).toFixed(2)}
                          </h2>
                        </Card.Text>
                      </Col>
                      <Col className="align-content-center">
                        <CardText>
                          <h5 className="text-secondary mb-0" >
                            <del>{item.price}</del>
                          </h5>
                        </CardText>
                      </Col>
                    </Row>
                   <Row>
                    <Col className="mb-3">
                    {item.stock <= 5 && (
                      <small className="text-danger">
                        Only {item.stock} left in stock
                      </small>
                    )}
                    </Col>
                   </Row>
                   
                    <Rating style={{ maxWidth: 180 }} value={item.rating} itemStyles={ratingStyle} readOnly />
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Products;
