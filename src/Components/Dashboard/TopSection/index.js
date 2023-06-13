import React from 'react'
// import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import "./style.scss";

function TopSection({ isOpen, setIsOpen }) {

  // const navigate = useNavigate();

  return ( 
    <nav className="top-section sticky top-2 mx-3 z-50 rounded-md bg-[#fff] h-[5vh]">
      <div className="w-full flex items-center mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className='flex justify-between bg-[#fff] w-full p-2'>
          <div className="flex justify-start w-full h-full">
            <div
              className="flex items-center flex-col justify-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaBars size={18} fill={'#FC8A2B'} className='cursor-pointer' />
            </div>
            <div className="flex ml-[10%] w-[40%] justify-between items-center">
              <div className="relative nav-link">
                <button className="hidden sm:flex items-center nav-item selected focus:outline-none">
                  <span className="mr-1">HOME</span>
                </button>
              </div>
              <div className="relative nav-link">
                <button className="hidden sm:flex items-center nav-item selected focus:outline-none">
                  <span className="mr-1">APPS</span>
                </button>
              </div>
              <div className="relative nav-link">
                <button className="hidden sm:flex items-center nav-item focus:outline-none">
                  <span className="mr-1">USERS</span>
                </button>
              </div>
              <div className="relative nav-link">
                <button className="hidden sm:flex items-center nav-item focus:outline-none">
                  <span className="mr-1">ROLES</span>
                </button>
              </div>
              <div className="relative nav-link">
                <button className="hidden sm:flex items-center nav-item focus:outline-none">
                  <span className="mr-1">PROFILE</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopSection;