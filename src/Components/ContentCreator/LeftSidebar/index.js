import React, {  } from "react";
import { useDispatch } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiLock, FiLogOut } from "react-icons/fi";
import {
  BsBarChartFill,
  BsCalendar2Event,
  BsChatDots,
  BsCheckCircleFill,
  BsFileLock2,
  BsFillHeartFill,
  BsPencilSquare,
} from "react-icons/bs";
import AccordionItem from "../../Common/Accordion";
import { resetUserData } from "../../../Redux/slices/userSlice";
import Avatar from "../../../Assets/images/person-img.png";

import "./style.scss";

function LeftSidebar({ isOpen, user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  const logout = () => {
    dispatch(resetUserData());
    navigate("/");
  };

  return (
    <div className="flex h-full content-creator-bg">
      {isOpen && (
        <div className="sidebar overflow-auto bg-[#001253] flex-shrink-0 flex flex-col justify-start items-start">
          {/* Sidebar Content */}
          <div className="sticky top-0 w-full bg-[#001253] py-2 mt-4 px-4 flex flex-col items-center justify-start">
            <div className="profile-pic-cover">
              <img src={Avatar} className="w-[90px] h-[90px]" />
            </div>
            <h2 className="ml-2 mt-3 font-bold flex items-center text-[#fff] text-[17px]">
              <span>{user.first_name} {user.last_name}</span>
              <span><BsCheckCircleFill className="ml-1" fill="#fff" /></span>
            </h2>
            <p className="text-[#fff] text-[15px]">{user.email}</p>
          </div>
          <div className="w-full">
            <ul className="py-4 px-4 w-full">
              {/* Sidebar Items */}
              <li className={`px-6 py-2 nav-item ${location.pathname.startsWith("/admin/dashboard") && "selected"} text-gray-200 hover:bg-gray-700 flex items-center`} onClick={() => navigate('/admin/dashboard')}>
                <FiHome size={20} className="mr-2" />
                {isOpen && <span>Home</span>}
              </li>
              <div className="mt-6">
                <AccordionItem icon="BsGrid" title="APPS" bg="#001253">
                  <li
                    className={`px-6 text-gray-200 ${location.pathname.startsWith("/admin/blogs") && "selected"} nav-item flex justify-start items-center`}
                    onClick={() => navigate("/creator/blogs")}
                  >
                    <BsPencilSquare size={20} className="mr-2" />
                    {isOpen && <span>Blogs</span>}
                  </li>
                  <li className="px-6 text-gray-200 nav-item flex justify-start items-center">
                    <BsBarChartFill size={20} className="mr-2" />
                    {isOpen && <span>Polls</span>}
                  </li>
                  <li className="px-6 text-gray-200 nav-item flex justify-start items-center">
                    <BsCalendar2Event size={20} className="mr-2" />
                    {isOpen && <span>Events</span>}
                  </li>
                  <li className="px-6 py-2 text-gray-200 nav-item flex justify-start items-center">
                    <BsFillHeartFill size={20} className="mr-2" />
                    {isOpen && <span>Donations</span>}
                  </li>
                  <li className="px-6 py-2 text-gray-200 nav-item flex justify-start items-center">
                    <BsFileLock2 size={20} className="mr-2" />
                    {isOpen && <span>Document Vault</span>}
                  </li>
                  <li className="px-6 py-2 text-gray-200 nav-item flex justify-start items-center">
                    <BsChatDots size={20} className="mr-2" />
                    {isOpen && <span>Forums</span>}
                  </li>
                </AccordionItem>
              </div>
              <div className="mt-6">
                <AccordionItem icon="BsPeople" title="PROFILE" bg="#001253">
                  <li className="px-6 text-gray-200 nav-item flex justify-start items-center">
                    <FaEdit size={20} className="mr-2" />
                    {isOpen && <span>Update Profile</span>}
                  </li>
                  <li className="px-6 text-gray-200 nav-item flex justify-start items-center">
                    <FiLock size={20} className="mr-2" />
                    {isOpen && <span>Change Password</span>}
                  </li>
                  <li
                    className="px-6 text-gray-200 nav-item flex justify-start items-center"
                    onClick={logout}
                  >
                    <FiLogOut size={20} className="mr-2" />
                    {isOpen && <span>Logout</span>}
                  </li>
                </AccordionItem>
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeftSidebar;
