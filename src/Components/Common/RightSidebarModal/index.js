import React from 'react';
import "./style.scss";
import {BsCheckCircleFill, BsX} from "react-icons/bs";
import Avatar from "../../../Assets/images/person-img.png";

const RightSidebarModal = ({isOpen, setIsOpen, user}) => {

    return (
        <div className="flex">
            {/* Modal sidebar */}
            <div
                className={`fixed right-sidebar inset-y-0 right-0 bg-white text-white w-64 p-4 transform ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300 ease-in-out`}
                id="sidebar"
            >

                <div className="flex justify-end">
                    <span className="close-btn bg-gray-200 cursor-pointer"
                          onClick={() => setIsOpen(false)}><BsX/></span>
                </div>
                <div
                    className="sticky top-0 w-full bg-[#001253] py-2 mt-4 px-4 flex flex-col items-center justify-start">
                    <div className="profile-pic-cover">
                        <img src={user?.profile_image ? user?.profile_image : Avatar}
                             className="rounded-full w-[90px] h-[90px]" alt=""/>
                    </div>
                    <h2 className="ml-2 mt-3 font-bold flex items-center text-[#fff] text-[17px]">
                    <span>
                        {user?.first_name} {user?.last_name}
                    </span>
                        {user?.is_verified && (
                            <span>
                              <BsCheckCircleFill className="ml-1" fill="#fff"/>
                            </span>
                        )}
                    </h2>
                    <p className="text-[#fff] text-[15px]">{user?.email}</p>
                </div>

            </div>

        </div>
    );
};

export default RightSidebarModal;
