import React from 'react';
import { Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';

const Filter = ({ searchTerm, setSearchTerm, suggestions, setSuggestions, categories, selectedCategories, setSelectedCategories }) => {

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value) {
            const filteredSuggestions = categories
                .filter(category => category.toLowerCase().includes(value.toLowerCase()))
                .map(category => category);
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]); 
        }
    };

    return (
        <Row className="mb-4">
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
    );
};

export default Filter;
