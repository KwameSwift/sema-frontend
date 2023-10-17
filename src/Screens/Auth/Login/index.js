import React, {useEffect, useLayoutEffect, useState} from "react";
import {toast} from "react-toastify";
import AuthSidebar from "../../../Components/Auth/Sidebar";
import UnBorderedInput from "../../../Components/Common/UnBorderedInput";
import {useNavigate} from "react-router-dom";
import {axiosClient} from "../../../libs/axiosClient";
import {useDispatch} from "react-redux";
import {setUserData} from "../../../Redux/slices/userSlice";
import CustomButton from "../../../Components/Common/CustomButton";
import {isRequiredFieldsPassed} from "../../../utils/helpers";
import logo from "../../../Assets/images/logo-small.png"

import "../style.scss";
import {useTranslation} from "react-i18next";
import CustomRadioInput from "../../../Components/Common/CustomRadioButton";
import {Dropdown} from "react-bootstrap";

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const [loginType, setLoginType] = useState("Email");
    const [countries, setCountries] = useState([]);
    const [state, setState] = useState({});
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userType, setUserType] = useState("Guest");
    const [country, setCountry] = useState({});

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
        const payload = {...state};
        console.log(userType);
        if (userType === "Guest") {
            if (loginType === "Mobile") {
                const stripZeroMobile = state.mobile_number.replace(/^0+/, '');
                payload.mobile_number = country.calling_code + stripZeroMobile;
            }
            payload.login_type = loginType;
        }
        try {
            const url = userType === "Guest" ? "/auth/guest-login/" : "auth/login/";
            const resp = await axiosClient.post(url, {...payload});
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

    const handleRadioButtonChange = (e) => {
        setState({});
        setLoginType(e.target.value);
    }

    const getCountries = async () => {
        try {
            const response = await axiosClient.get("utilities/dropdowns/2/");
            const data = response.data.data;
            setCountries(data);
            setCountry(data[0]);
        } catch (err) {
            console.log(err);
        }
    };

    const handleMobileData = (data) => {
        setCountry(data);
    }

    useLayoutEffect(() => {
        getCountries();
    }, [])

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
                        {/*<SocialLoginButtons/>*/}
                        <p>
                            {t('auth.dontHaveAccount')}
                            <span onClick={() => navigate("/register")}>
                                {t('navbar.signup')}!
                            </span>
                        </p>
                    </div>
                    <div className="input-group">
                        {userType === "Guest" &&
                            (<>
                                    {loginType === "Email" ?
                                        <UnBorderedInput
                                            type="email"
                                            placeholder={t('auth.emailAddress')}
                                            iconName="BsMailbox"
                                            onChange={handleChange}
                                            name="email"
                                            autoFocus
                                        /> :
                                        <div className="flex mt-2 w-[100%]">
                                            <Dropdown>
                                                <Dropdown.Toggle>
                                                    <span className="country_code">
                                                        <img src={country.flag} width={50} height={50}
                                                             className="mr-1" alt=""/>
                                                        {country.calling_code}
                                                    </span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {countries.map((elt) => (
                                                        <Dropdown.Item
                                                            key={elt.id}
                                                            onClick={() => handleMobileData(elt)}
                                                            className="flex"
                                                        >
                                                            <span className="text-[13px]">{elt.name}</span>
                                                            <img src={elt.flag} width={25} height={25}
                                                                 className="mx-1" alt=""/>
                                                            <span className="mr-2 text-[13px]">{elt.calling_code}</span>
                                                        </Dropdown.Item>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <input
                                                type="text"
                                                className="ml-2 form-control"
                                                name="mobile_number"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    }
                                </>
                            )}
                        {userType === "Guest" && <div className="flex mt-3">
                            <CustomRadioInput
                                optionKey={t('auth.emailAddress')}
                                onChange={handleRadioButtonChange}
                                defaultChecked={true}
                                name={"login_type"}
                                value={"Email"}
                                val={"email"}
                            />
                            <CustomRadioInput
                                optionKey={t('auth.mobileNumber')}
                                onChange={handleRadioButtonChange}
                                name={"login_type"}
                                value={"Mobile"}
                                val={'mobile'}
                            />
                        </div>
                        }
                        {userType !== "Guest" &&
                            (<>
                                <UnBorderedInput
                                    type="email"
                                    placeholder={t('auth.emailAddress')}
                                    iconName="BsMailbox"
                                    onChange={handleChange}
                                    name="email"
                                    autoFocus
                                />
                                <UnBorderedInput
                                    type="password"
                                    placeholder={t('auth.password')}
                                    iconName="BsKey"
                                    name="password"
                                    onChange={handleChange}
                                />
                            </>)
                        }
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
