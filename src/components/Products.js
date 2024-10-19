import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { CardText } from "react-bootstrap";
import { FaRegHeart } from "react-icons/fa";
import CustomNavbar from "./Navbar"; // Ensure the path is correct
import CustomRating from "./Rating";
import Category from "./Category";
import { Link } from "react-router-dom"; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Number of items per page

  const getProducts = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=40");
    const data = await response.json();

    if (data && data.products) {
      setProducts(data.products);
      const uniqueCategories = [
        ...new Set(data.products.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    return matchesSearchTerm && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filteredSuggestions = products
        .filter((product) =>
          product.title.toLowerCase().includes(value.toLowerCase())
        )
        .map((product) => product.title);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle Next and Previous button clicks
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
          <CustomNavbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            handleSearchChange={handleSearchChange}
          />
       
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
              {currentProducts.map((item) => (
                <Col lg="4" className="col-product" key={item.id}>
                  <Link to={`/product/${item.id}`}>
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
                  </Link>
                </Col>
              ))}
            </Row>
            {/* Pagination Controls */}
            <Row className="mt-4">
              <Col className="d-flex justify-content-center">
                <Button
                  variant="outline-primary"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <Button
                    key={index + 1}
                    variant={currentPage === index + 1 ? "primary" : "outline-primary"}
                    className="mx-1"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button
                  variant="outline-primary"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Products;
