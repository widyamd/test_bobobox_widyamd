// Rating.js
import React from "react";
import { Rating, RoundedStar } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

const ratingStyle = {
    itemShapes: RoundedStar,
    activeFillColor: '#ffb700',
    inactiveFillColor: '#fbf1a9'
};

const CustomRating = ({ value }) => {
    return (
        <Rating 
            style={{ maxWidth: 180 }} 
            value={value} 
            itemStyles={ratingStyle} 
            readOnly 
        />
    );
};

export default CustomRating;
