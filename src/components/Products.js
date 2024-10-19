import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { CardText } from "react-bootstrap";
import { FaRegHeart } from "react-icons/fa";
import CustomNavbar from "./Navbar";
import Category from "./Category";
import { Link } from "react-router-dom";
import { MdOutlineDiscount } from "react-icons/md";
import RatingFilter from "./RatingFilter";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

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
    const matchesRating =
      selectedRating === null || Math.round(product.rating) === selectedRating;

    return matchesSearchTerm && matchesCategory && matchesRating;
  });

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

  const ratingsCount = products.reduce((acc, product) => {
    const roundedRating = Math.round(product.rating);
    acc[roundedRating] = (acc[roundedRating] || 0) + 1;
    return acc;
  }, {});

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
          <Col lg="3">
            <Card className="card-rating">
              <Card.Body>
                <Row className="mb-3 pb-3 border-bottom">
                  <Col>
                    <Category
                      categories={categories}
                      selectedCategories={selectedCategories}
                      setSelectedCategories={setSelectedCategories}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <RatingFilter
                      ratingsCount={ratingsCount}
                      selectedRating={selectedRating}
                      setSelectedRating={setSelectedRating}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Row>
              {currentProducts.map((item) => (
                <Col lg="4" className="col-product" key={item.id}>
                  <Link
                    to={`/product/${item.id}`}
                    className="text-decoration-none"
                  >
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
                        <Row>
                          <Col lg="5">
                            <Card.Text>
                              <h3 className="text-danger">
                                <MdOutlineDiscount /> &nbsp;
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
                          <Col className="align-content-center">
                            <p className="mb-0 fw-bold">
                              {item.discountPercentage}%
                            </p>
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
                        <Row>
                          <Col className="d-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                            width="20" height="20" fill="#ffb700" viewBox="0 0 256 256">
                              <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"></path></svg>
                            &nbsp;  <p>{item.rating.toFixed(1)}</p>

                          </Col>
                          <Col>
                            <p className="text-light text-end">
                              {item.category}
                            </p>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
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
                    variant={
                      currentPage === index + 1 ? "primary" : "outline-primary"
                    }
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
