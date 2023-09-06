import React, {useEffect, useRef, useState} from "react";
import {axiosClientWithHeaders} from "../../../../libs/axiosClient";
import {LiaTimesSolid} from "react-icons/lia";
import {MdOutlineEmojiEmotions} from "react-icons/md";
import {BsSend} from "react-icons/bs";
import {formatMessageTime} from "../../../../utils/helpers";
import EmojiPicker from "emoji-picker-react";

function SingleChat(props) {
    const [chat, setChat] = useState({});
    const [message, setMessage] = useState("");
    const [toggleEmoji, setToggleEmoji] = useState(false);

    const firstRunRef = useRef(true);
    const chatBodyRef = useRef(null);

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

    const handleEmojiClick = (item) => {
        setMessage(message + item.emoji);
        setToggleEmoji(false);
    };

    useEffect(() => {
        if (Object.keys(chat).length && firstRunRef.current) {
            const socket = new WebSocket(`wss://backend.africanchildprojects.org/ws/chat-messages/${props.item.id}/`);
            socket.onopen = () => {
            };
            socket.onmessage = (event) => {
                const messages = chat?.messages;
                const newMessage = JSON.parse(event.data)?.data;
                console.log(newMessage);
                const message = messages?.findIndex((elt) =>
                    (elt.created_on === newMessage.created_on) &&
                    (elt.message === newMessage.message)
                );
                if (message === -1) {
                    setChat(prev => ({
                        ...prev,
                        messages: [...prev.messages, newMessage]
                    }));
                }
            };

            socket.onerror = () => {
            };
            socket.onclose = () => {
            };

            firstRunRef.current = false;
        }
    }, [chat]);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [chat]);

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
                    <LiaTimesSolid
                        fill="#fff"
                        className="cursor-pointer"
                        onClick={() => props.setIsOpen(false)}
                    />
                </div>
            </div>
            <div className="chat-content">
                <div className="chat-body" ref={chatBodyRef}>
                    {chat?.messages?.map((elt, index) =>
                        elt?.is_sender ?
                            (
                                getMessage(elt, index, "send-message", "message-right")
                            ) : (
                                getMessage(elt, index, "receive-message", "message-left")
                            )
                    )}
                </div>
                {toggleEmoji && (
                    <div>
                        <EmojiPicker onEmojiClick={handleEmojiClick}/>
                    </div>
                )}
                <div className="chat-footer">
                    <div className="flex w-[95%] justify-start items-center">
                        <MdOutlineEmojiEmotions
                            size={22}
                            className="cursor-pointer"
                            onClick={() => setToggleEmoji(prev => !prev)}
                        />
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
