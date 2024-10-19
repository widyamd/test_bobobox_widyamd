import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { CardText } from "react-bootstrap";
import { FaRegHeart } from "react-icons/fa";
import Navbar from "react-bootstrap/Navbar";
import CustomRating from "./Rating"; // Import the CustomRating component
import Filter from "./Filter"; // Import the Filter component
import Category from "./Category";

const Products = () => {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input
  const [categories, setCategories] = useState([]); // State for unique categories
  const [selectedCategories, setSelectedCategories] = useState([]); // State for selected categories
  const [suggestions, setSuggestions] = useState([]); // State for search suggestions

  const getProducts = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=40");
    const data = await response.json();

    if (data && data.products) {
      setProducts(data.products);
      // Extract unique categories
      const uniqueCategories = [
        ...new Set(data.products.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
      console.log(data);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Filter products based on the search term and selected categories
  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Product Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Filter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <Row>
          <Col lg="2">
            <Category
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </Col>
          <Col>
            <Row>
              {filteredProducts.map((item) => {
                return (
                  <Col lg="4" className="col-product" key={item.id}>
                    <Card className="card-product">
                      <Row>
                        <Col className="text-end position-absolute p-0">
                          <Button variant="link" className="pe-0">
                            <h3>
                              <FaRegHeart />
                            </h3>
                          </Button>
                        </Col>
                      </Row>
                      <Card.Img
                        variant="top"
                        className="card-img-product"
                        src={item.thumbnail}
                      />
                      <Card.Body>
                        <Card.Title className="text-primary">
                          {item.title}
                        </Card.Title>
                        <p className="text-light">{item.category}</p>
                        <Row>
                          <Col>
                            <Card.Text>
                              <h3 className="text-danger">
                                {(
                                  item.price -
                                  (item.discountPercentage / 100) * item.price
                                ).toFixed(2)}
                              </h3>
                            </Card.Text>
                          </Col>
                          <Col className="align-content-center">
                            <CardText>
                              <h5 className="text-secondary mb-0">
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
                        <CustomRating value={item.rating} />
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Products;
