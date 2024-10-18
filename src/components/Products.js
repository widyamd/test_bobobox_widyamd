import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { CardText } from "react-bootstrap";
import { FaRegHeart } from "react-icons/fa";
import { Rating } from '@smastrom/react-rating'

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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Container>
        <Row>
          {products.map((item) => {
            return (
              <Col>
                <Card style={{ width: "18rem" }}>
                  <Row>
                    <Col className="text-end">
                      <Button variant="link">
                        <h3>
                          <FaRegHeart />
                        </h3>
                      </Button>
                    </Col>
                  </Row>
                  <Card.Img variant="top" src={item.thumbnail} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <p>{item.category}</p>
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
                      <Col>
                        <CardText>
                          <h4 className="text-end text-secondary">
                            <del>{item.price}</del>
                          </h4>
                        </CardText>
                      </Col>
                    </Row>
                    {item.stock <= 5 && (
                      <p className="text-danger">
                        Only {item.stock} left in stock
                      </p>
                    )}
                   
                    {item.rating}
                    <Rating style={{ maxWidth: 180 }} value={item.rating} readOnly />
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
