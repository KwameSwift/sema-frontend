import React, {useEffect, useState} from "react";
import {IoCloseOutline} from "react-icons/io5";
import {axiosClientWithHeaders} from "../../../../../../libs/axiosClient";
import {isRequiredFieldValuesPassed} from "../../../../../../utils/helpers";
import {useTranslation} from "react-i18next";

const EditChatRoomModal = ({isOpen, setIsOpen, className, chat, refetch}) => {
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };


    const {t} = useTranslation();
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const editChatRoom = async () => {
        setLoading(true);
        try {
            await axiosClientWithHeaders.put(`/chats/update-chat-room/${chat?.id}/`, state);
            setLoading(false);
            toggleModal();
            refetch(prev => !prev);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        const reqFields = ["room_name", "description"];
        setDisabled(!isRequiredFieldValuesPassed(state, reqFields, "eq"));
    }, [state]);

    useEffect(() => {
        if (chat) {
            setState({
                room_name: chat?.room_name,
                description: chat?.description
            });
        }
    }, [chat]);

    return (
        <div>
            {isOpen && (
                <div className="modal fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                        <div
                            className={`bg-white max-w-[500px] ${className} rounded-lg p-6`}
                        >
                            <div className="flex justify-between">
                                <h2 className="text-xl font-bold mb-4">
                                    {t('admin.edit')} {t('admin.chatRoom')}
                                </h2>
                                <span className="close-btn" onClick={toggleModal}>
                                  <IoCloseOutline size={20} fill="#eee"/>
                                </span>
                            </div>
                            <div>
                                <div className="form-field">
                                    <label>{t('admin.roomName')}</label>
                                    <input
                                        type="text"
                                        placeholder={t('admin.enterRoomName')}
                                        name="room_name"
                                        onChange={handleChange}
                                        value={state?.room_name}
                                    />
                                </div>
                                <div className="form-field">
                                    <label>{t('editBlogs.description')}</label>
                                    <input
                                        type="text"
                                        placeholder={t('admin.enterDescription')}
                                        name="description"
                                        onChange={handleChange}
                                        value={state?.description}
                                    />
                                </div>
                            </div>
                            <div className="flex mt-8 justify-end items-center">
                                <button
                                    className="text-[14px] border rounded px-3 py-2"
                                    onClick={toggleModal}
                                >
                                    {t("modal.cancel")}
                                </button>
                                <button
                                    className="text-[14px] ml-2 text-white px-3 py-2 rounded bg-[#001253]"
                                    onClick={editChatRoom}
                                    disabled={loading || disabled}
                                >
                                    {loading ? `${t('modal.loading')}...` : t('modal.save')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditChatRoomModal;
