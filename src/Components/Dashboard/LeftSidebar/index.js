import React from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { FaUserShield, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiLock, FiLogOut } from 'react-icons/fi';
import { BsBarChartFill, BsCalendar2Event, BsChatDots, BsFileLock2, BsFillHeartFill, BsGear, BsPencilSquare } from 'react-icons/bs';
import Logo from "../../../Assets/images/logo-small.png";
import AccordionItem from '../../Common/Accordion';
import './style.scss';
import { useDispatch } from 'react-redux';
import { resetUserData } from '../../../Redux/slices/userSlice';


function LeftSidebar({ isOpen }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(resetUserData());
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      {isOpen && (
        <div className="sidebar overflow-auto bg-[#fff] w-64 flex-shrink-0 flex flex-col justify-start items-start">
          {/* Sidebar Content */}
          <div className='sticky top-0 w-full bg-[#fff] py-2 mt-4 px-4 flex items-center justify-start'>
            <img src={Logo} className='w-[50px] h-[50px]' />
            <h2 className='ml-2 font-bold text-[20px]'>SEMA</h2>
          </div>
          <div className='w-full'>
            <ul className="py-4 px-4 w-full">
              {/* Sidebar Items */}
              <li className="px-6 py-2 nav-item selected text-gray-200 hover:bg-gray-700 flex items-center">
                <FiHome size={20} className="mr-2" />
                {isOpen && <span>Home</span>}
              </li>
              <div className='mt-6'>
                <AccordionItem icon="BsGrid" title="APPS">
                  <li className="px-6 text-gray-200 nav-item flex justify-start items-center">
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
              <div className='mt-6'>
                <AccordionItem icon="BsPeople" title="USERS">
                  <li className="px-6 text-gray-200 nav-item flex justify-start items-center">
                    <BsGear size={20} className="mr-2" />
                    {isOpen && <span>Managing Users</span>}
                  </li>
                </AccordionItem>
              </div>
              <div className='mt-6'>
                <AccordionItem title="ROLES">
                  <li className="px-6 text-gray-200 nav-item flex justify-start items-center">
                    <BiUserCircle size={25} className="mr-2" />
                    {isOpen && <span>Managing Roles</span>}
                  </li>
                  <li className="px-6 text-gray-200 nav-item flex justify-start items-center">
                    <FaUserShield size={25} className="mr-2" />
                    {isOpen && <span>Assigning Roles</span>}
                  </li>
                </AccordionItem>
              </div>
              <div className='mt-6'>
                <AccordionItem icon="BsPeople" title="PROFILE">
                  <li className="px-6 text-gray-200 nav-item flex justify-start items-center">
                    <FaEdit size={20} className="mr-2" />
                    {isOpen && <span>Update Profile</span>}
                  </li>
                  <li className="px-6 text-gray-200 nav-item flex justify-start items-center">
                    <FiLock size={20} className="mr-2" />
                    {isOpen && <span>Change Password</span>}
                  </li>
                  <li className="px-6 text-gray-200 nav-item flex justify-start items-center" onClick={logout}>
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
