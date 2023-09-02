import React, {useEffect, useState} from "react";
import {axiosClientWithHeaders} from "../../../../libs/axiosClient";
import {LiaTimesSolid} from "react-icons/lia";
import {MdOutlineEmojiEmotions} from "react-icons/md";
import {BsSend} from "react-icons/bs";

function SingleChat(props) {
    const [chat, setChat] = useState({});

    const getSingleChat = async () => {
        try {
            const resp = await axiosClientWithHeaders.get(`/chats/get-chat-room/${props.item.id}/`);
            setChat(resp.data.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getSingleChat();
    }, [props.item.id]);

    return (
        <div className="mx-8 single-chat">
            <div className="chat-head">
                <div>
                    <h3>{chat?.room_name}</h3>
                    <p>{chat?.total_members} members</p>
                </div>
                <div>
                    <LiaTimesSolid fill="#fff" className="cursor-pointer" onClick={() => props.setIsOpen(false)}/>
                </div>
            </div>
            <div className="chat-content">
                <div className="chat-body">
                    <div>hy</div>
                    <div>hy</div>
                    <div>hy</div>
                    <div>hy</div>
                    <div>hy</div>
                    <div>hy</div>
                    <div>hy</div>
                    <div>hy</div>
                    <div>hy</div>
                    <div>hy</div>
                    <div>hy</div>
                    <div>hy</div>
                    <div>hy</div>
                    <div>hy</div>
                    <div>hy</div>
                </div>
                <div className="chat-footer">
                    <div className="flex w-[95%] justify-start items-center">
                        <MdOutlineEmojiEmotions size={22}/>
                        <input type="text" placeholder="Send message"/>
                    </div>
                    <BsSend size={22} className="cursor-pointer"/>
                </div>
            </div>
        </div>
    )
}

export default SingleChat;
