// ImageOverlay.js
import React, {useState} from 'react';
import {BsEye} from "react-icons/bs";

const ImageOverlay = ({image}) => {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        console.log("yh");
        setShowSidebar(!showSidebar);
    };

    return (
        <div className="relative group">
            <div className="mb-3">
                <img
                    src={image}
                    alt="Image"
                    className="w-[150px] h-[150px m-3 cursor-pointer"
                    onFocus={toggleSidebar}
                />
            </div>
            <div
                className="eye-overlay absolute opacity-100 inset-0 bg-orange-500 bg-opacity-70 items-center justify-center text-white transition-opacity duration-300"
            >
                <BsEye size={25} className="cursor-pointer"/>
                <span>View</span>
            </div>
            {/*<div*/}
            {/*    className={`fixed inset-y-0 right-0 w-64 bg-gray-800 transform transition-transform duration-300 ${*/}
            {/*        showSidebar ? 'translate-x-0' : 'translate-x-full'*/}
            {/*    }`}*/}
            {/*>*/}
            {/*    /!* Sidebar content goes here *!/*/}
            {/*    <button*/}
            {/*        className="absolute top-0 right-0 p-4 text-white"*/}
            {/*        onClick={toggleSidebar}*/}
            {/*    >*/}
            {/*        Close*/}
            {/*    </button>*/}
            {/*</div>*/}
            {/*<div*/}
            {/*    className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300 ${*/}
            {/*        showSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'*/}
            {/*    }`}*/}
            {/*    onClick={toggleSidebar}*/}
            {/*></div>*/}
        </div>
    );
};

export default ImageOverlay;
