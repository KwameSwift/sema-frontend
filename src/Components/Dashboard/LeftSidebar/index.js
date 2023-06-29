import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { useDispatch } from "react-redux";
import Logo from "../../../Assets/images/logo-small.png";
import AccordionItem from "../../Common/Accordion";
import { resetUserData } from "../../../Redux/slices/userSlice";
import {
  blogLinks,
  profileLinks,
  roleLinks,
  userLinks,
} from "../../../utils/appData/admin/leftNavData";

import "./style.scss";
import { FaBars } from "react-icons/fa";
import { BsChevronBarRight } from "react-icons/bs";

function LeftSidebar({ isOpen, setIsOpen, user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  const logout = () => {
    dispatch(resetUserData());
    navigate("/");
  };

  const getSelectedMenu = (route, category) => {
    const linksRoutes = category.reduce((prev, curr) => {
      prev.push(curr.route);
      return prev;
    }, []);
    return linksRoutes.some(
      (currentRoute) => currentRoute === route || route.startsWith(currentRoute)
    );
  };

  const isModuleAllowed = (name) => {
    const currentModule = user.permissions.find(
      (elt) => elt.module__name === name
    );
    return currentModule?.access_level > 0;
  };

  return (
    <div className="flex h-screen">
      <div
        className={`sidebar ${
          !isOpen && "minimized"
        } overflow-auto bg-[#fff] flex-shrink-0 flex flex-col justify-start items-start`}
      >
        {/* Sidebar Content */}
        <div className="sticky top-0 w-full bg-[#fff] py-2 mt-4 px-4 flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center">
              <img src={Logo} className="w-[50px] h-[50px]" />
              <h2 className="ml-2 font-bold text-[20px]">SEMA</h2>
            </div>
          )}
          <div
            className="flex items-center flex-col justify-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <FaBars size={18} fill={"#FC8A2B"} className="cursor-pointer" />
            ) : (
              <BsChevronBarRight
                size={18}
                fill={"#FC8A2B"}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
        <div className="w-full">
          <ul className="py-4 px-3 w-full">
            {/* Sidebar Items */}
            <li
              className={`nav-item ${!isOpen && "minimized"} ${
                location.pathname.startsWith("/admin/dashboard") && "selected"
              } text-gray-200 hover:bg-gray-700 flex items-center`}
              onClick={() => navigate("/admin/dashboard")}
            >
              <FiHome size={20} className="mr-2" />
              {isOpen && <span>HOME</span>}
            </li>
            <div className="mt-6">
              <AccordionItem
                isDropOpen={getSelectedMenu(location.pathname, blogLinks)}
                icon="BsGrid"
                title={isOpen && "APPS"}
                pClassName="nav-item-wrapper"
              >
                {blogLinks.map(
                  (elt) =>
                    isModuleAllowed(elt.name) && (
                      <li
                        className={`px-6 text-gray-200 ${
                          location.pathname.startsWith(elt.route) && "selected"
                        } nav-item ${
                          !isOpen && "minimized"
                        } flex justify-start items-center`}
                        onClick={() => navigate(elt.route)}
                        key={elt.id}
                      >
                        {elt.icon}
                        {isOpen && <span>{elt.name}</span>}
                      </li>
                    )
                )}
              </AccordionItem>
            </div>
            <div className="mt-6">
              <AccordionItem
                isDropOpen={getSelectedMenu(location.pathname, userLinks)}
                icon="BsPeople"
                pClassName="nav-item-wrapper"
                title={isOpen && "USERS"}
              >
                {userLinks.map((elt) => (
                  <li
                    className={`px-6 text-gray-200 ${
                      location.pathname.startsWith(elt.route) && "selected"
                    } nav-item ${
                      !isOpen && "minimized"
                    } flex justify-start items-center`}
                    onClick={() => navigate(elt.route)}
                    key={elt.id}
                  >
                    {elt.icon}
                    {isOpen && <span>{elt.name}</span>}
                  </li>
                ))}
              </AccordionItem>
            </div>
            <div className="mt-6">
              <AccordionItem
                isDropOpen={getSelectedMenu(location.pathname, roleLinks)}
                icon="BsPersonGear"
                pClassName="nav-item-wrapper"
                title={isOpen && "ROLES"}
              >
                {roleLinks.map((elt) => (
                  <li
                    className={`px-6 text-gray-200 ${
                      location.pathname.startsWith(elt.route) && "selected"
                    } nav-item ${
                      !isOpen && "minimized"
                    } flex justify-start items-center`}
                    onClick={() => navigate(elt.route)}
                    key={elt.id}
                  >
                    {elt.icon}
                    {isOpen && <span>{elt.name}</span>}
                  </li>
                ))}
              </AccordionItem>
            </div>
            <div className="mt-6">
              <AccordionItem
                isDropOpen={getSelectedMenu(location.pathname, profileLinks)}
                icon="BsPersonDash"
                pClassName="nav-item-wrapper"
                title={isOpen && "PROFILE"}
              >
                {profileLinks.map((elt) => (
                  <li
                    className={`px-6 text-gray-200 ${
                      location.pathname.startsWith(elt.route) && "selected"
                    } nav-item ${
                      !isOpen && "minimized"
                    } flex justify-start items-center`}
                    onClick={
                      elt.id === "logout" ? logout : () => navigate(elt.route)
                    }
                    key={elt.id}
                  >
                    {elt.icon}
                    {isOpen && <span>{elt.name}</span>}
                  </li>
                ))}
              </AccordionItem>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
