import React, {useEffect, useState} from "react";
import {IoCloseOutline} from "react-icons/io5";
import {useTranslation} from "react-i18next";

import "./style.scss";
import {axiosClientWithHeaders} from "../../../../libs/axiosClient";
import {isRequiredFieldValuesPassed} from "../../../../utils/helpers";

const ChatRoomModal = ({
                           isOpen,
                           setIsOpen,
                           className,
                           forumId,
                           setStatus
                       }) => {
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

    const saveChatRoom = async () => {
        setLoading(true);
        try {
            await axiosClientWithHeaders.post(`/chats/create-chat-room/${forumId}/`, state);
            setLoading(false);
            setStatus("Completed");
            toggleModal();
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        const reqFields = ["room_name", "description"];
        setDisabled(!isRequiredFieldValuesPassed(state, reqFields, "eq"));
    }, [state]);

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
                                    Add Chat Room
                                </h2>
                                <span className="close-btn" onClick={toggleModal}>
                                  <IoCloseOutline size={20} fill="#eee"/>
                                </span>
                            </div>
                            <div>
                                <div className="form-field">
                                    <label>Room name</label>
                                    <input type="text" placeholder="Enter room name" name="room_name"
                                           onChange={handleChange}/>
                                </div>
                                <div className="form-field">
                                    <label>Description</label>
                                    <input type="text" placeholder="Enter description" name="description"
                                           onChange={handleChange}/>
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
                                    onClick={saveChatRoom}
                                    disabled={loading || disabled}
                                >
                                    {loading ? "Loading..." : "Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatRoomModal;
