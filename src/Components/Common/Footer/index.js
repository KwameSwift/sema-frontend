import React from 'react';
import Logo from "../../../Assets/images/logo-small.png";
import {useNavigate} from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    return (
        <footer className="bg-[#001253] text-white py-6">
            <div className="container mx-auto flex flex-wrap justify-between">
                {/* Logo and Organization Name */}
                <div className="w-full md:w-1/4 mb-4 md:mb-0 cursor-pointer" onClick={() => navigate('/')}>
                    <img src={Logo} alt="Logo" className="w-12 h-12 mb-2"/>
                    <span className="text-lg font-semibold">SEMA</span>
                </div>

                {/* Pages */}
                <div className="w-full md:w-1/4">
                    <h3 className="text-xl font-semibold mb-2">Pages</h3>
                    <ul>
                        <li className="mb-1"><a href="/">Home</a></li>
                        <li className="mb-1"><a href="/feed">Feed</a></li>
                        <li className="mb-1"><a href="/forums">Forums</a></li>
                    </ul>
                </div>

                {/* Copyright and Other Info */}
                <div className="w-full md:w-1/2">
                    <p className="mb-4">© {new Date().getFullYear()} SEMA. All rights reserved.</p>
                    <p>Mbezi Beach Goigi, Dar es salaam - Tanzania</p>
                    <p>Email: info@africanchildprojects.org</p>
                    <p>Phone: +255 744 622 344 </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
