// src/components/Footer.js
import React from "react";
import "../styles/style.css"; // Optional: Create a separate CSS file for footer styles

const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start mt-5">
             
            <div className="text-center p-3" style={{ backgroundColor: "#f8f9fa" }}>
                © {new Date().getFullYear()} Widya Mustika Dewi
            </div>
        </footer>
    );
};

export default Footer;
