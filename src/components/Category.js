// Category.js
import React from 'react';
import { Col } from 'react-bootstrap';

const Category = ({ categories, selectedCategories, setSelectedCategories }) => {

    const handleCategoryChange = (category) => {
        setSelectedCategories(prevSelectedCategories => {
            if (prevSelectedCategories.includes(category)) {
                return prevSelectedCategories.filter(c => c !== category); // Remove category if already selected
            } else {
                return [...prevSelectedCategories, category]; // Add category if not selected
            }
        });
    };

    return (
        <Col>
            <h5>Filter by Category:</h5>
            {categories.map((category) => (
                <div key={category}>
                    <input
                        type="checkbox"
                        id={category}
                        value={category}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                    />
                    <label htmlFor={category} className="ms-2">{category}</label>
                </div>
            ))}
        </Col>
    );
};

export default Category;
