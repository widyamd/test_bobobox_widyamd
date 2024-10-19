import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { CardText } from "react-bootstrap";
import { FaRegHeart } from "react-icons/fa";
import CustomNavbar from "./Navbar"; // Import the new Navbar component
import CustomRating from "./Rating";
import Category from "./Category";
import { Link } from "react-router-dom"; // Import Link for navigation

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const getProducts = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=40");
    const data = await response.json();

    if (data && data.products) {
      setProducts(data.products);
      const uniqueCategories = [...new Set(data.products.map((product) => product.category))];
      setCategories(uniqueCategories);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesSearchTerm && matchesCategory;
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filteredSuggestions = products
        .filter(product => product.title.toLowerCase().includes(value.toLowerCase()))
        .map(product => product.title);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
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
              {filteredProducts.map((item) => (
               
// Inside your return statement of the Products component
<Col lg="4" className="col-product" key={item.id}>
    <Link to={`/product/${item.id}`}> {/* Link to product detail page */}
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
            <Card.Img variant="top" className="card-img-product" src={item.thumbnail} />
            <Card.Body>
                <Card.Title className="text-primary">{item.title}</Card.Title>
                <p className="text-light">{item.category}</p>
                <Row>
                    <Col>
                        <Card.Text>
                            <h3 className="text-danger">
                                {(
                                    item.price - (item.discountPercentage / 100) * item.price
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Products;
