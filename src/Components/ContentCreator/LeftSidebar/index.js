import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { BsArrowLeft, BsCheckCircleFill } from "react-icons/bs";
import AccordionItem from "../../Common/Accordion";
import { resetUserData, setUserInfo } from "../../../Redux/slices/userSlice";
import Avatar from "../../../Assets/images/person-img.png";
import { creatorBlogLinks, creatorProfileLinks } from "../../../utils/appData/admin/leftNavData";
import { axiosClientWithHeaders } from "../../../libs/axiosClient";

import "./style.scss";

function LeftSidebar({ isOpen, user }) {
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

  const getMyData = async () => {
    try {
      const resp = await axiosClientWithHeaders.get("/users/my-profile/");
      const respObj = { ...resp.data.data };
      dispatch(setUserInfo(respObj));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMyData();
  }, []);

  return (
    <div className="flex h-full content-creator-bg">
      {isOpen && (
        <div className="sidebar overflow-auto bg-[#001253] flex-shrink-0 flex flex-col justify-start items-start">
          {/* Sidebar Content */}
          <div className="sticky top-0 w-full bg-[#001253] py-2 mt-4 px-4 flex flex-col items-center justify-start">
            <div className="profile-pic-cover">
              <img src={user.user.profile_image ? `${process.env.REACT_APP_BACKEND_DOMAIN}${user.user.profile_image}` : Avatar} className="rounded-full w-[90px] h-[90px]" />
            </div>
            <h2 className="ml-2 mt-3 font-bold flex items-center text-[#fff] text-[17px]">
              <span>
                {user.user.first_name} {user.user.last_name}
              </span>
              {user.user.is_verified && (
                <span>
                  <BsCheckCircleFill className="ml-1" fill="#fff" />
                </span>
              )}
            </h2>
            <p className="text-[#fff] text-[15px]">{user.user.email}</p>
          </div>
          <div className="w-full flex justify-end flex-col">
            <ul className="py-4 px-4 w-full">
              {/* Sidebar Items */}
              <li
                className={`px-6 py-2 nav-item ${
                  location.pathname.startsWith("/creator/dashboard") && "selected"
                } text-gray-200 hover:bg-gray-700 flex items-center`}
                onClick={() => navigate("/creator/dashboard")}
              >
                <FiHome size={20} className="mr-2" />
                {isOpen && <span>HOME</span>}
              </li>
              <div className="mt-6">
                <AccordionItem
                  isDropOpen={getSelectedMenu(
                    location.pathname,
                    creatorBlogLinks
                  )}
                  icon="BsGrid"
                  title="APPS"
                  bg="#001253"
                >
                  {creatorBlogLinks.map(
                    (elt) =>
                      isModuleAllowed(elt.name) && (
                        <li
                          className={`px-6 text-gray-200 ${
                            location.pathname.startsWith(elt.route) &&
                            "selected"
                          } nav-item flex justify-start items-center`}
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
                <AccordionItem isDropOpen={getSelectedMenu(location.pathname, creatorProfileLinks)} icon="BsPersonDash" title="PROFILE"  bg="#001253">
                  {creatorProfileLinks.map((elt) =>
                    <li
                      className={`px-6 text-gray-200 ${
                        location.pathname.startsWith(elt.route) && "selected"
                      } nav-item flex justify-start items-center`}
                      onClick={elt.id === "logout" ? logout : () => navigate(elt.route)}
                      key={elt.id}
                    >
                      {elt.icon}
                      {isOpen && <span>{elt.name}</span>}
                    </li>
                  )}
                </AccordionItem>
              </div>
            </ul>
            <button type="button" className="flex py-4 px-4 items-center" onClick={() => navigate('/')}>
              <BsArrowLeft fill="#fff" />
              <span className="ml-2 text-[#fff]">Go to main page</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeftSidebar;
