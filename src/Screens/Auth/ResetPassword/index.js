import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import AuthSidebar from "../../../Components/Auth/Sidebar";
import UnBorderedInput from "../../../Components/Common/UnBorderedInput";
import CustomButton from "../../../Components/Common/CustomButton";
import logo from "../../../Assets/images/logo-small.png"
import {isRequiredFieldsPassed} from "../../../utils/helpers";
import {axiosClient} from "../../../libs/axiosClient";

import "../style.scss";
import {useTranslation} from "react-i18next";

function ResetPasswordPage() {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const {t} = useTranslation();

    const handlePasswordChange = async () => {
        setLoading(true);
        try {
            await axiosClient.post("auth/reset-password/", {
                ...state,
                email: user.email,
            });
            setLoading(false);
            toast.success(t('alerts.passwordReset'));
            await new Promise((r) => setTimeout(r, 2000));
            navigate("/login");
        } catch (err) {
            console.error(err);
            setLoading(false);
            toast.error(err.response.data.detail);
        }
    };

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        setBtnDisabled(!isRequiredFieldsPassed(state, 2, "eq"));
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
                        <h1>{t('auth.resetPassword')}</h1>
                        <p>
                            {t('auth.resetPasswordMessage')}`
                        </p>
                    </div>
                    <div className="input-group">
                        <UnBorderedInput
                            type="password"
                            placeholder={t('auth.newPassword')}
                            iconName="BsKey"
                            name="new_password"
                            onChange={handleChange}
                            autoFocus
                        />
                        <UnBorderedInput
                            type="password"
                            placeholder={t('auth.confirmPassword')}
                            iconName="BsKey"
                            name="confirm_password"
                            onChange={handleChange}
                            autoFocus
                        />
                    </div>

                    <div className="submit-btn">
                        <CustomButton
                            type="button"
                            onClick={handlePasswordChange}
                            loading={loading}
                            disabled={loading || btnDisabled}
                            text={t('auth.recoverYourAccount')}
                        />
                    </div>
                    <div className="auth-bottom-text non-hover column">
            <span onClick={() => navigate("/login")}>
              {t('auth.alreadyHaveAnAccount')}
            </span>
                        <span onClick={() => navigate("/register")}>
                {t('auth.dontHaveAnAccount')}
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
