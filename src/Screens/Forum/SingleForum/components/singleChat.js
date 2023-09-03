import React, {useEffect, useState} from "react";
import {axiosClientWithHeaders} from "../../../../libs/axiosClient";
import {LiaTimesSolid} from "react-icons/lia";
import {MdOutlineEmojiEmotions} from "react-icons/md";
import {BsSend} from "react-icons/bs";
import {formatMessageTime} from "../../../../utils/helpers";

function SingleChat(props) {
    const [chat, setChat] = useState({});
    const [message, setMessage] = useState("");

    const getSingleChat = async () => {
        try {
            const resp = await axiosClientWithHeaders.get(`/chats/get-chat-room/${props.item.id}/`);
            setChat(resp.data.data);
        } catch (err) {
            console.error(err);
        }
    }

    const getMessage = (elt, index, cls, align) => {
        return (
            <div className={align}>
                <div key={index} className={`message-body ${cls}`}>
                    <h3>{elt.sender__first_name} {elt.sender__last_name}</h3>
                    <p className="message">{elt?.message}</p>
                    <p className="message-time">{formatMessageTime(elt?.created_on)}</p>
                </div>
            </div>
        )
    }

    const sendMessage = async () => {
        try {
            await axiosClientWithHeaders.post(`/chats/send-message/${props.item.id}/`, {
                message
            });
            setMessage("");
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
                    {chat?.messages?.map((elt, index) =>
                        elt?.is_sender ?
                            (
                                getMessage(elt, index, "send-message", "message-right")
                            ) : (
                                getMessage(elt, index, "receive-message", "message-left")
                            )
                    )}
                </div>
                <div className="chat-footer">
                    <div className="flex w-[95%] justify-start items-center">
                        <MdOutlineEmojiEmotions size={22}/>
                        <input
                            type="text"
                            placeholder="Send message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <BsSend
                        size={22}
                        className="cursor-pointer"
                        onClick={sendMessage}
                        fill={message.length && "#001253"}
                        disabled={message?.trim() === ""}
                    />
                </div>
            </div>
        </div>
    )
}

export default SingleChat;
