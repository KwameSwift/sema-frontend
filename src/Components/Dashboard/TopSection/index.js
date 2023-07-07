import React, { useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LanguageDropdown from "../../Common/LanguageDropdown";
import { axiosClientWithHeaders } from "../../../libs/axiosClient";
import { setUserInfo } from "../../../Redux/slices/userSlice";
import "./style.scss";

function TopSection() {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <nav className="top-section sticky top-2 z-50 rounded-md bg-[#fff] h-[5vh]">
      <div className="w-full flex items-center mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between bg-[#fff] w-full p-1">
          <div className="flex justify-end w-full h-full">
            <div className="flex ml-[10%] w-[40%] justify-end items-center">
              <div className="relative nav-link" onClick={() => navigate("/")}>
                <button type="button" className="flex items-center">
                  <BsArrowLeft />
                  <span className="ml-2">Go to main page</span>
                </button>
              </div>
              <div className="relative nav-link">
                <LanguageDropdown />
              </div>
              <div className="relative nav-link">
                <img
                  src={user.profile_image}
                  className="w-[30px] h-[30px] rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopSection;
