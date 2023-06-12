import React from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { FaUserShield, FaEdit } from 'react-icons/fa';
import { FiHome, FiLock, FiLogOut } from 'react-icons/fi';
import Logo from "../../../Assets/images/logo-small.png";
import './style.scss';
import { BsPeople } from 'react-icons/bs';


function LeftSidebar({ isOpen }) {

  return (
    <div className="flex h-screen">
      {isOpen && (
        <div className="sidebar overflow-auto bg-[#fff] w-64 flex-shrink-0 flex flex-col justify-start items-start">
          {/* Sidebar Content */}
          <div className='sticky top-0 bg-[#fff] py-2 mt-4 px-4 flex items-center justify-start'>
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
              <div className='mt-8'>
                <span className='font-bold text-[15px]'>USERS</span>
                <li className="px-6 py-2 mt-1 text-gray-200 nav-item flex justify-start items-center">
                  <BsPeople size={25} className="mr-2" />
                  {isOpen && <span>Managing Users</span>}
                </li>
              </div>
              <div className='mt-8'>
                <span className='font-bold text-[15px]'>ROLES</span>
                <li className="px-6 py-2 mt-1 text-gray-200 nav-item flex justify-start items-center">
                  <BiUserCircle size={25} className="mr-2" />
                  {isOpen && <span>Managing Roles</span>}
                </li>
                <li className="px-6 py-2 mt-1 text-gray-200 nav-item flex justify-start items-center">
                  <FaUserShield size={25} className="mr-2" />
                  {isOpen && <span>Assigning Roles</span>}
                </li>
              </div>
              <div className='mt-8'>
                <span className='font-bold text-[15px]'>PROFILE</span>
                <li className="px-6 py-2 mt-1 text-gray-200 nav-item flex justify-start items-center">
                  <FaEdit size={20} className="mr-2" />
                  {isOpen && <span>Update Bio</span>}
                </li>
                <li className="px-6 py-2 mt-1 text-gray-200 nav-item flex justify-start items-center">
                  <FiLock size={20} className="mr-2" />
                  {isOpen && <span>Change Password</span>}
                </li>
                <li className="px-6 py-2 mt-1 text-gray-200 nav-item flex justify-start items-center">
                  <FiLogOut size={20} className="mr-2" />
                  {isOpen && <span>Logout</span>}
                </li>
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeftSidebar;
