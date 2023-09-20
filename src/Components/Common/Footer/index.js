import React from 'react';
import Logo from "../../../Assets/images/logo-small.png";

const Footer = () => {
    return (
        <footer className="bg-[#001253] text-white py-6">
            <div className="container mx-auto flex flex-wrap justify-between">
                {/* Logo and Organization Name */}
                <div className="w-full md:w-1/4 mb-4 md:mb-0">
                    <img src={Logo} alt="Logo" className="w-12 h-12 mb-2"/>
                    <span className="text-lg font-semibold">SEMA</span>
                </div>

                {/* Pages */}
                <div className="w-full md:w-1/4">
                    <h3 className="text-xl font-semibold mb-2">Pages</h3>
                    <ul>
                        <li className="mb-1"><a href="/">Home</a></li>
                        <li className="mb-1"><a href="/about">Feed</a></li>
                        <li className="mb-1"><a href="/services">Forums</a></li>
                    </ul>
                </div>

                {/* Copyright and Other Info */}
                <div className="w-full md:w-1/2">
                    <p className="mb-4">© {new Date().getFullYear()} SEMA. All rights reserved.</p>
                    <p>1234 Main Street, City, State, Zip Code</p>
                    <p>Email: info@example.com</p>
                    <p>Phone: +1 (123) 456-7890</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
