import React, {useEffect, useLayoutEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthSidebar from "../../../Components/Auth/Sidebar";
import RegisterFirstStep from "./firstStep";
import RegisterSecondStep from "./secondStep";
import CustomButton from "../../../Components/Common/CustomButton";
import {axiosClient} from "../../../libs/axiosClient";
import {isRequiredFieldsPassed} from "../../../utils/helpers";
import SocialLoginButtons from "../../../Components/SocialLoginButtons";
import {useDispatch} from "react-redux";
import {setUserData} from "../../../Redux/slices/userSlice";
import logo from "../../../Assets/images/logo-small.png"
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

function SignupPage() {
    const [userType, setUserType] = useState("Guest");
    const [progress, setProgress] = useState(0);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [requiredFieldsLength, setRequiredFieldsLength] = useState(3);
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const [state, setState] = useState({});

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const getCountries = async () => {
        try {
            const response = await axiosClient.get("utilities/dropdowns/2/");
            const data = response.data.data;
            setCountries(data);
        } catch (err) {
            console.log(err);
        }
    };


    const createUser = async () => {
        setLoading(true);
        const response = await axiosClient.post("auth/register/", {...state});
        const data = response.data.data;
        const payload = {
            tokens: {
                access: data.access,
                refresh: data.refresh,
            },
            user: data?.user,
            permissions: data.permissions
        };
        dispatch(setUserData(payload));
        setLoading(false);
        toast.success(t('alerts.registerSuccess'));
        await new Promise(r => setTimeout(r, 2000));
        navigate(userType === "Guest" ? "/" : "/creator/dashboard");
    };

    const handleSubmit = async () => {
        try {
            if (userType === "Content Creator") {
                setProgress(1);
                setRequiredFieldsLength(8);
            } else {
                createUser();
            }
        } catch (err) {
            setLoading(false);
            toast.error(err.response.data.detail);
        }
    };

    const changeUserType = (status) => {
        setUserType(status);
    };

    useEffect(() => {
        setBtnDisabled(!isRequiredFieldsPassed(state, requiredFieldsLength, "eq"));
    }, [state, progress]);

    useLayoutEffect(() => {
        getCountries();
    }, [])

    return (
        <div className="auth-login">
            <AuthSidebar/>
            <div className={`login-content ${progress && 'more-details'}`}>
                <div className="content-wrapper">
                    <div className='logo-sect'>
                        <img src={logo} className='logo' alt="sema logo"/>
                        <h1 className='company-header'>SEMA</h1>
                    </div>
                    <div className="head-sect">
                        <h1>{progress ? t('auth.setupAccount') : `${t("navbar.signup")}!`}</h1>
                        {progress === 1 && (
                            <p>
                                <span className="sema">SEMA</span> {t('auth.needMoreInformation')}
                            </p>
                        )}
                        <SocialLoginButtons/>
                    </div>
                    <div className="input-group">
                        {!progress ? (
                            <RegisterFirstStep handleChange={handleChange}/>
                        ) : (
                            <RegisterSecondStep handleChange={handleChange} options={countries}/>
                        )}
                        {progress === 0 && (
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
                        )}
                    </div>
                    <div className="submit-btn">
                        <CustomButton
                            type="button"
                            onClick={progress ? createUser : handleSubmit}
                            loading={loading}
                            disabled={loading || btnDisabled}
                            text={
                                userType === "Content Creator" && !progress
                                    ? t('auth.next')
                                    : t('navbar.signup')
                            }
                        />
                    </div>
                    <div className="auth-bottom-text">
            <span onClick={() => navigate("/login")}>
              {t('auth.alreadyHaveAnAccount')}
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
