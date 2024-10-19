import React, { useState } from 'react';
import { Navbar, Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';

const CustomNavbar = ({ searchTerm, setSearchTerm, suggestions, setSuggestions, handleSearchChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Local state to manage navbar collapse

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion); // Set the search term to the clicked suggestion
    setSuggestions([]); // Clear suggestions
    setIsCollapsed(true); // Collapse the navbar
  };

  return (
    <Navbar bg="light" expand="lg" expanded={!isCollapsed}>
      <Container>
        <Row className='w-100'>
          <Col lg="2">
            <Navbar.Brand href="#home">Product Store</Navbar.Brand>
          </Col>
          <Col>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsCollapsed(!isCollapsed)} />
            <Navbar.Collapse id="basic-navbar-nav">
              <Row className="w-100">
                <Col>
                  <InputGroup className="ms-auto">
                    <FormControl
                      placeholder="Search for products..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      onFocus={() => setIsCollapsed(false)} // Expand navbar when focusing on the input
                    />
                    <Button variant="outline-secondary" onClick={() => console.log("Searching...")}>
                      Search
                    </Button>
                  </InputGroup>
                  {/* Suggestions Dropdown */}
                  {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                      {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </Col>
              </Row>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
