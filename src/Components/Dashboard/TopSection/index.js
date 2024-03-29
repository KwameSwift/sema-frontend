import React, {useEffect} from "react";
// import { useNavigate } from 'react-router-dom';
import {BsArrowLeft} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import LanguageDropdown from "../../Common/LanguageDropdown";
import {axiosClientWithHeaders} from "../../../libs/axiosClient";
import {setUserInfo} from "../../../Redux/slices/userSlice";
import "./style.scss";
import {useTranslation} from "react-i18next";

function TopSection() {
    const user = useSelector((store) => store.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const getMyData = async () => {
        try {
            const resp = await axiosClientWithHeaders.get("/users/my-profile/");
            const respObj = {...resp.data.data};
            dispatch(setUserInfo(respObj));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getMyData();
    }, []);

    return (
        <nav className="top-section sticky top-0 p-3 z-50 rounded-md bg-[#fff] h-[5vh]">
            <div className="w-full flex items-center mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between w-full p-1">
                    <div className="flex justify-end w-full h-full">
                        <div className="flex items-center cursor-pointer" onClick={() => navigate(-1)}>
                            <BsArrowLeft fill="#000" size={18}/>
                            <span className="ml-1 back-txt">
                              {t('admin.back')}
                            </span>
                        </div>
                        <div className="flex ml-[10%] w-full justify-end items-center">
                            <div className="relative nav-link" onClick={() => navigate("/")}>
                                <button type="button" className="flex items-center">
                                    <BsArrowLeft/>
                                    <span className="ml-2">
                                      {t('admin.goToMainPage')}
                                    </span>
                                </button>
                            </div>
                            <div className="relative nav-link">
                                <LanguageDropdown/>
                            </div>
                            <div className="relative nav-link">
                                <img
                                    src={user.profile_image}
                                    className="w-[30px] h-[30px] rounded-full"
                                    alt=""
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
