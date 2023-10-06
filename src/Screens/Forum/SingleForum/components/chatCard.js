import React from "react";
import {BsPersonCircle} from "react-icons/bs";

function ChatCard({setSelectedChat, ...props}) {
    return (
        <div className="chat-card bg-white pt-3 pb-2 p-3 flex flex-row justify-between cursor-pointer"
             onClick={() => setSelectedChat(props)}>
            <div>
                <h3>{props.room_name}</h3>
                <p>{props.description}</p>
            </div>
            <div className="flex flex-row members-stats items-end h-full">
                <div className="flex justify-start">
                    <BsPersonCircle/>
                    <p className="text-[14px] ml-1">{props.total_members}</p>
                </div>
            </div>
        </div>
    )
}

export default ChatCard;
