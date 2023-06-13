import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPersonFill, BsSearch } from "react-icons/bs";
import Logo from "../../../Assets/images/logo-small.png";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { resetUserData } from "../../../Redux/slices/userSlice";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  let accountLinks = [];

  const hyperLinks = [
    { id: "feed", name: "Feed", route: "/feed" },
    { id: "events", name: "Events", route: "/events" },
    { id: "donations", name: "Donations", route: "/donations" },
  ];

  const user = useSelector((store) => store.user);

  const logout = () => {
    dispatch(resetUserData());
    navigate("/");
  };

  if (user?.tokens?.access) {
    accountLinks = [
      { id: "profile", name: "Profile", route: "/profile" },
      { id: "logout", name: "Logout", type: "func", func: logout },
    ];
  } else {
    accountLinks = [
      { id: "login", name: "Login", route: "/login" },
      { id: "signup", name: "Signup", route: "/register" },
    ];
  }

  return (
    <nav className="navbar sticky top-0 z-50 bg-[#fff] h-[10vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between h-full">
          <div
            className="flex items-center flex-col justify-center"
            onClick={() => navigate("/")}
          >
            <img src={Logo} width={35} height={35} />
            <p className="font-bold text-[1em] logo-text">SEMA</p>
          </div>
          <div className="flex items-center">
            <div className="relative nav-link">
              <button className="hidden sm:flex items-center nav-item selected focus:outline-none">
                <span className="mr-1">Feed</span>
              </button>
            </div>
            <div className="relative nav-link">
              <button className="hidden sm:flex items-center nav-item focus:outline-none">
                <span className="mr-1">Events</span>
              </button>
            </div>
            <div className="relative nav-link">
              <button className="hidden sm:flex items-center nav-item focus:outline-none">
                <span className="mr-1">Donations</span>
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative flex">
              <button
                className="flex items-center text-black hover:text-gray-300 focus:outline-none sm:hidden"
                onClick={toggleModal}
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12h18M3 6h18M3 18h18"></path>
                </svg>
              </button>
              <button
                className="hidden mr-5 sm:flex items-center nav-link focus:outline-none"
              >
                <BsSearch size={18} className="account-icon" />
              </button>
              <button
                className="hidden sm:flex items-center nav-links text-hover focus:outline-none"
                onMouseEnter={toggleDropdown}
                onClick={toggleDropdown}
              >
                <BsFillPersonFill size={24} className="account-icon" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-8 py-2 w-48 bg-white rounded-md shadow-lg">
                  {accountLinks.map((elt) => (
                    <button
                      onClick={
                        elt?.type
                          ? () => elt.func()
                          : () => navigate(`${elt.route}`)
                      }
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      key={elt.id}
                    >
                      {elt.name}
                    </button>
                  ))}
                </div>
              )}
              {modalOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-90 flex items-center justify-center">
                  <div className="rounded-lg p-6">
                    <button
                      className="absolute top-0 right-0 m-4 text-white hover:text-gray-700 focus:outline-none"
                      onClick={toggleModal}
                    >
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                    <ul className="text-center">
                      {hyperLinks.map((elt) => (
                        <button
                          onClick={() => navigate(`${elt.route}`)}
                          className="block w-full text-left px-4 py-2 text-white text-[30px] hover:bg-[#FC8A2B]"
                          key={elt.id}
                        >
                          {elt.name}
                        </button>
                      ))}
                      {accountLinks.map((elt) => (
                        <button
                          onClick={
                            elt?.type
                              ? () => elt.func()
                              : () => navigate(`${elt.route}`)
                          }
                          className="block w-full text-left px-4 py-2 text-white text-[30px] hover:bg-[#FC8A2B]"
                          key={elt.id}
                        >
                          {elt.name}
                        </button>
                      ))}

                      <button className="underline mt-12 block w-full text-left px-4 py-2 text-white text-[30px] hover:bg-[#FC8A2B]">
                        Search
                      </button>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
