import React from 'react';
import { Navbar, Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';

const CustomNavbar = ({ searchTerm, setSearchTerm, suggestions, setSuggestions, categories, selectedCategories, setSelectedCategories, handleSearchChange }) => {
  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Product Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Row className="w-100">
            <Col md={8}>
              <InputGroup className="ms-auto">
                <FormControl
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Button variant="outline-secondary" onClick={() => console.log("Searching...")}>
                  Search
                </Button>
              </InputGroup>
              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => setSearchTerm(suggestion)}>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </Col>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
