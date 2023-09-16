import React, {useEffect, useState} from 'react';
import {LiaTimesSolid} from "react-icons/lia";
import {getTransString, isRequiredFieldValuesPassed} from "../../../../utils/helpers";
import {useTranslation} from "react-i18next";
import {axiosClient, axiosClientWithHeaders} from "../../../../libs/axiosClient";
import {toast} from "react-toastify";

function RegisterMeetingFormModal(props) {
    const {t} = useTranslation();
    const [isDisabled, setIsDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState([]);
    const [state, setState] = useState({});

    const getCountries = async () => {
        try {
            const response = await axiosClient.get("utilities/dropdowns/2/");
            const data = response.data.data;
            setCountries(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const registerMeeting = async () => {
        setLoading(true);
        try {
            await axiosClientWithHeaders.post(`/forum/register-virtual-meeting/${props.meetingId}/`, state);
            toast.success("Meeting registered, please check your email for the meeting information");
            props.setIsOpen(false);
            props.refetch(prev => !prev);
        } catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        console.log(state);
        const requiredFields = [
            "first_name",
            "last_name",
            "email",
            "mobile_number",
            "country_id"
        ];
        setIsDisabled(!isRequiredFieldValuesPassed(state, requiredFields, "eq"));
    }, [state]);

    useEffect(() => {
        getCountries();
    }, []);

    return (
        <>{
            props?.isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

                    <div
                        className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content p-4">
                            <div className="flex justify-between">
                                <h3 className="font-bold">Register Meeting</h3>
                                <LiaTimesSolid size={20} className="cursor-pointer"
                                               onClick={() => props?.setIsOpen(false)}/>
                            </div>
                            <div className="flex flex-col pb-3 mb-3 overflow-x-auto mt-3">
                                <div className="flex">
                                    <div className="form-field half">
                                        <label className="mt-3 mb-3">First Name</label>
                                        <input
                                            type="text"
                                            onChange={handleInputChange}
                                            placeholder="Enter first name"
                                            name="first_name"
                                        />
                                    </div>
                                    <div className="form-field half">
                                        <label className="mt-3 mb-3">Last Name</label>
                                        <input
                                            type="text"
                                            onChange={handleInputChange}
                                            placeholder="Enter last name"
                                            name="last_name"
                                        />
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="form-field half">
                                        <label className="mt-3 mb-3">Email Address</label>
                                        <input
                                            type="email"
                                            onChange={handleInputChange}
                                            placeholder="Enter email address"
                                            name="email"
                                        />
                                    </div>
                                    <div className="form-field half">
                                        <label className="mt-3 mb-3">Mobile Number</label>
                                        <input
                                            type="text"
                                            onChange={handleInputChange}
                                            placeholder="Enter mobile numbers"
                                            name="mobile_number"
                                        />
                                    </div>
                                </div>
                                <div className="form-field">
                                    <label className="mt-3 mb-2">Country</label>
                                    <select name="country_id" onChange={handleInputChange}>
                                        <option>Select Country</option>
                                        {countries.map((elt, index) =>
                                            <option value={elt.id} key={index}>{elt.name}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="flex mt-8 justify-end items-center">
                                <button
                                    className="text-[14px] border rounded px-3 py-2"
                                    onClick={() => props.setIsOpen(false)}
                                >
                                    {t("modal.cancel")}
                                </button>
                                <button
                                    className="text-[14px] ml-2 text-white px-3 py-2 rounded bg-[#001253]"
                                    onClick={registerMeeting}
                                    disabled={isDisabled}
                                >
                                    {loading
                                        ? `${t(getTransString("Loading"))}...`
                                        : "Register"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }</>
    )
}

export default RegisterMeetingFormModal;
