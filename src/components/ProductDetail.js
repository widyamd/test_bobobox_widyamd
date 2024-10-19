import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom"; 

const ProductDetail = () => {
    const { productId } = useParams(); 
    const [product, setProduct] = useState(null);

    const getProductDetails = useCallback(async () => {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const data = await response.json();
        setProduct(data);
    }, [productId]);

    useEffect(() => {
        getProductDetails();
    }, [getProductDetails]);
    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Discount: {product.discountPercentage}%</p>
            <p>Category: {product.category}</p>
            <p>Rating: {product.rating}</p>
            <p>Stock: {product.stock}</p>
            <p>SKU: {product.sku}</p>
            <p>Brand: {product.brand}</p>
        </div>
    );
};

export default ProductDetail;
