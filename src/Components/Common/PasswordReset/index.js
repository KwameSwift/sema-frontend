import React, {useEffect, useState} from "react";
import "./style.scss";
import {isRequiredFieldsPassed} from "../../../utils/helpers";
import {toast} from "react-toastify";
import {axiosClientWithHeaders} from "../../../libs/axiosClient";
import {useTranslation} from "react-i18next";

function PasswordReset() {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [state, setState] = useState({});
    const {t} = useTranslation();

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const changePassword = async () => {
        setLoading(true);
        if (state.confirm_password !== state.new_password) {
            setLoading(false);
            toast.error(t('alerts.passwordsDoNotMatch'));
            return;
        }
        try {
            await axiosClientWithHeaders.put("/auth/change-password/", state);
            setLoading(false);
            toast.success(t('alerts.passwordChanged'));
        } catch (e) {
            setLoading(false);
            console.error(e);
        }
    }

    useEffect(() => {
        setDisabled(!isRequiredFieldsPassed(state, 3, 'eq'));
    }, [state]);

    return (
        <div className="bg-[#fff] p-4 min-w-[400px]">
            <h1>{t('admin.changePassword')}</h1>
            <div className="flex flex-col mt-4">
                <label className="mb-3">{t('admin.oldPassword')}</label>
                <input
                    type="password"
                    className="border p-2"
                    onChange={handleChange}
                    name="old_password"
                    placeholder={t('admin.enterOldPassword')}
                />
            </div>
            <div className="flex flex-col mt-4">
                <label className="mb-3">{t('auth.newPassword')}</label>
                <input
                    type="password"
                    placeholder={t('auth.enterNewPassword')}
                    className="border p-2"
                    name="new_password"
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col mt-4">
                <label className="mb-3">{t('auth.confirmPassword')}</label>
                <input
                    type="password"
                    placeholder={t('auth.enterConfirmNewPassword')}
                    className="border p-2"
                    name="confirm_password"
                    onChange={handleChange}
                />
            </div>
            <div className="mt-4 flex justify-center">
                <button
                    className="profile-save py-2 px-4 text-[#fff]"
                    disabled={disabled || loading}
                    onClick={changePassword}
                >
                    {loading ? `${t('modal.loading')}...` : t('modal.save')}
                </button>
            </div>
        </div>
    );
}

export default PasswordReset;
