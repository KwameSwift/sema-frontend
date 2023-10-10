import React, {useEffect, useState} from 'react';
import {LiaTimesSolid} from "react-icons/lia";
import {getTransString, isRequiredFieldValuesPassed} from "../../../../utils/helpers";
import {useTranslation} from "react-i18next";
import {axiosClientWithHeaders} from "../../../../libs/axiosClient";
import {toast} from "react-toastify";

function VirtualMeetingFormModal(props) {

    const {t} = useTranslation();
    const [isDisabled, setIsDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({});

    const createMeeting = async () => {
        setLoading(true);
        const payload = {...state}
        payload.scheduled_start_time = `${payload.scheduled_start_date}T${payload.scheduled_start_time}:00`;
        payload.scheduled_end_time = `${payload.scheduled_end_date}T${payload.scheduled_end_time}:00`;

        // delete payload times
        delete payload.scheduled_end_date
        delete payload.scheduled_start_date

        try {
            await axiosClientWithHeaders.post(`/forum/create-virtual-meeting/${props.forumId}/`, payload);
            setLoading(false);
            toast.success(t('alerts.meetingCreated'));
            props.setIsOpen(false);
            props.refetch(prev => !prev);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }

    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }


    useEffect(() => {
        const requiredFields = [
            "meeting_agenda",
            "scheduled_start_date",
            "scheduled_end_time",
            "scheduled_start_time",
            "scheduled_end_date"
        ];
        setIsDisabled(!isRequiredFieldValuesPassed(state, requiredFields, "eq"));
    }, [state]);

    return (
        <>{
            props?.isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

                    <div
                        className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content p-4">
                            <div className="flex justify-between">
                                <h3 className="font-bold">{t('admin.new')} {t('admin.meeting')}</h3>
                                <LiaTimesSolid size={20} className="cursor-pointer"
                                               onClick={() => props?.setIsOpen(false)}/>
                            </div>
                            <div className="flex flex-col pb-3 mb-3 overflow-x-auto mt-3">
                                <div className="form-field">
                                    <label className="mt-3 mb-2">{t('admin.meetingAgenda')}</label>
                                    <textarea
                                        rows={3}
                                        name="meeting_agenda"
                                        placeholder={t('admin.enterMeetingAgenda')}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <label className="mt-3 mb-2">{t('admin.meetingLink')}</label>
                                    <input
                                        type="text"
                                        name="meeting_url"
                                        placeholder={t('admin.enterMeetingLink')}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex">
                                    <div className="mr-1">
                                        <label className="mt-3 mb-3">{t('admin.startDate')}</label>
                                        <input
                                            type="date"
                                            onChange={handleInputChange}
                                            name="scheduled_start_date"
                                            style={{minWidth: "50%"}}
                                            className="border p-2"
                                        />
                                    </div>
                                    <div className="border-gray-200">
                                        <label className="mt-3 mb-3">{t('admin.startTime')}</label>
                                        <input
                                            type="time"
                                            onChange={handleInputChange}
                                            name="scheduled_start_time"
                                            className="border p-2"
                                        />
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="mr-1">
                                        <label className="mt-3 mb-3">{t('admin.endDate')}</label>
                                        <input
                                            type="date"
                                            onChange={handleInputChange}
                                            name="scheduled_end_date"
                                            className="border p-2"
                                        />
                                    </div>
                                    <div className="">
                                        <label className="mt-3 mb-3">{t('admin.endTime')}</label>
                                        <input
                                            type="time"
                                            onChange={handleInputChange}
                                            name="scheduled_end_time"
                                            className="border p-2"
                                        />
                                    </div>
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
                                    onClick={createMeeting}
                                    disabled={isDisabled}
                                >
                                    {loading
                                        ? `${t(getTransString("Loading"))}...`
                                        : "Create"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }</>
    )
}

export default VirtualMeetingFormModal;
