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

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                    permissions: data.permissions
                };
                dispatch(setUserData(payload));
                setLoading(false);
                toast.success("Login successful");
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
                        <h1 className="mb-2">Login to your account</h1>
                        <SocialLoginButtons/>
                        <p>
                            Don&apos;t have an account?
                            <span onClick={() => navigate("/register")}>Sign up!</span>
                        </p>
                    </div>
                    <div className="input-group">
                        <UnBorderedInput
                            type="email"
                            placeholder="Email Address"
                            iconName="BsMailbox"
                            onChange={handleChange}
                            name="email"
                            autoFocus
                        />
                        {userType !== "Guest" && <UnBorderedInput
                            type="password"
                            placeholder="Password"
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
                                Guest
                            </div>
                            <div
                                className={`type-item ${
                                    userType === "Content Creator" ? "selected" : ""
                                }`}
                                onClick={() => changeUserType("Content Creator")}
                            >
                                Content Creator
                            </div>
                        </div>
                    </div>
                    <div className="other-input-group">
            <span>
              <input type="checkbox"/> Remember me
            </span>
                        <span onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </span>
                    </div>
                    <div className="submit-btn">
                        <CustomButton
                            type="button"
                            onClick={handleLogin}
                            loading={loading}
                            disabled={loading || btnDisabled}
                            text="Login"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
