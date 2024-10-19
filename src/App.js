import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail"; // Import your ProductDetail component
import Footer from "./components/Footer";


const App = () => {
    return (
      <>
        <Router>
            <Routes> {/* Use Routes here instead of Switch */}
                <Route path="/" element={<Products />} /> {/* Update this line */}
                <Route path="/product/:productId" element={<ProductDetail />} /> {/* Update this line */}
            </Routes>
        </Router>
        <Footer/>


      </>
      
    );
};

export default App;
