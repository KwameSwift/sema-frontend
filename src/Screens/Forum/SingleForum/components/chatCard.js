import React from "react";
import {BsPersonCircle} from "react-icons/bs";
import {axiosClientWithHeaders} from "../../../../libs/axiosClient";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

function ChatCard({setSelectedChat, setRefetch, ...props}) {

    const {t} = useTranslation();

    const joinChat = async () => {
        try {
            await axiosClientWithHeaders.post(`chats/join-chat-room/${props.id}/`);
            toast.success(t("forum.joinedSuccess"));
            setRefetch(prev => !prev);
        } catch (err) {
            console.log(err);
        }
    }

    const handleClick = async () => {
        if (props?.is_member) {
            setSelectedChat(props);
        } else {
            await joinChat();
        }
    }
    return (
        <div className="chat-card bg-white pt-3 pb-2 p-3 flex flex-col justify-between cursor-pointer"
             onClick={handleClick}>
            <div>
                <h3>{props.room_name}</h3>
                <p>{props.description}</p>
            </div>
            <div className="flex members-stats mt-2 justify-between h-full">
                <div>
                    {!props?.is_member && <p className="underline text-[blue] text-[14px]">Join now</p>}
                </div>
                <div className="flex justify-start">
                    <BsPersonCircle/>
                    <p className="text-[14px] ml-1">{props.total_members}</p>
                </div>
            </div>
        </div>
    )
}

export default ChatCard;
