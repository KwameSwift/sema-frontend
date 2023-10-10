import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import AuthSidebar from "../../../Components/Auth/Sidebar";
import UnBorderedInput from "../../../Components/Common/UnBorderedInput";
import {useNavigate} from "react-router-dom";
import {axiosClient} from "../../../libs/axiosClient";
import {useDispatch} from "react-redux";
import {setUserData} from "../../../Redux/slices/userSlice";
import CustomButton from "../../../Components/Common/CustomButton";
import {isRequiredFieldsPassed} from "../../../utils/helpers";
import SocialLoginButtons from "../../../Components/SocialLoginButtons";
import logo from "../../../Assets/images/logo-small.png"

import "../style.scss";
import {useTranslation} from "react-i18next";

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const [state, setState] = useState({});
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userType, setUserType] = useState("Guest");

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const changeUserType = (status) => {
        setUserType(status);
    };

    const routeUser = (data) => {
        let route = ""
        if (data.user.is_admin) {
            route = "/admin/dashboard";
        } else {
            if (userType === "Guest") {
                route = "/";
            } else {
                route = "/creator/dashboard";
            }
        }
        return route;
    }

    const handleLogin = async () => {
        setLoading(true);
        try {
            const url = userType === "Guest" ? "/auth/guest-login/" : "auth/login/";
            const resp = await axiosClient.post(url, {...state});
            if (resp.status === 200) {
                const data = resp.data.data;
                const payload = {
                    tokens: {
                        access: data.access,
                        refresh: data.refresh,
                    },
                    user: data.user,
                    liked_blogs: data.liked_blogs,
                    liked_discussions: data.liked_discussions,
                    permissions: data.permissions
                };
                dispatch(setUserData(payload));
                setLoading(false);
                toast.success(t('alerts.loginSuccess'));
                await new Promise((r) => setTimeout(r, 2000));
                navigate(routeUser(data));
            } else {
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            toast.error(err.response.data.detail);
        }
    };

    useEffect(() => {
        setBtnDisabled(!isRequiredFieldsPassed(state, userType === "Guest" ? 1 : 2, "eq"));
    }, [state]);

    return (
        <div className="auth-login">
            <AuthSidebar/>
            <div className="login-content">
                <div className="content-wrapper">
                    <div className='logo-sect'>
                        <img src={logo} className='logo' alt="sema logo"/>
                        <h1 className='company-header'>SEMA</h1>
                    </div>
                    <div className="head-sect">
                        <h1 className="mb-2">{t('auth.loginIntoAccount')}</h1>
                        <SocialLoginButtons/>
                        <p>
                            {t('auth.dontHaveAccount')}
                            <span onClick={() => navigate("/register")}>
                                {t('navbar.signup')}!
                            </span>
                        </p>
                    </div>
                    <div className="input-group">
                        <UnBorderedInput
                            type="email"
                            placeholder={t('auth.emailAddress')}
                            iconName="BsMailbox"
                            onChange={handleChange}
                            name="email"
                            autoFocus
                        />
                        {userType !== "Guest" && <UnBorderedInput
                            type="password"
                            placeholder={t('auth.password')}
                            iconName="BsKey"
                            name="password"
                            onChange={handleChange}
                        />}
                    </div>
                    <div className="flex justify-center">
                        <div className="flex user-type-sect">
                            <div
                                className={`type-item ${
                                    userType === "Guest" ? "selected" : ""
                                }`}
                                onClick={() => changeUserType("Guest")}
                            >
                                {t('auth.guest')}
                            </div>
                            <div
                                className={`type-item ${
                                    userType === "Content Creator" ? "selected" : ""
                                }`}
                                onClick={() => changeUserType("Content Creator")}
                            >
                                {t('auth.contentCreator')}
                            </div>
                        </div>
                    </div>
                    <div className="other-input-group">
            <span>
              <input type="checkbox"/> {t('auth.rememberMe')}
            </span>
                        <span onClick={() => navigate("/forgot-password")}>
              {t('auth.forgotPassword')}?
            </span>
                    </div>
                    <div className="submit-btn">
                        <CustomButton
                            type="button"
                            onClick={handleLogin}
                            loading={loading}
                            disabled={loading || btnDisabled}
                            text={t('navbar.login')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
