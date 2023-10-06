import React, {useEffect, useRef, useState} from "react";
import {axiosClientWithHeaders} from "../../../../libs/axiosClient";
import {LiaTimesSolid} from "react-icons/lia";
import {MdOutlineEmojiEmotions} from "react-icons/md";
import {BsSend} from "react-icons/bs";
import {formatMessageTime, returnFileFormat} from "../../../../utils/helpers";
import EmojiPicker from "emoji-picker-react";
import {GrAttachment} from "react-icons/gr";
import AttachmentModal from "./attachmentModal";
import {useTranslation} from "react-i18next";

function SingleChat(props) {
    const [chat, setChat] = useState({});
    const [message, setMessage] = useState("");
    const [toggleEmoji, setToggleEmoji] = useState(false);
    const [files, setFiles] = useState([]);
    const [previewFiles, setPreviewFiles] = useState([]);
    const [attachmentOpen, setAttachmentOpen] = useState(false);

    const firstRunRef = useRef(true);
    const chatBodyRef = useRef(null);
    const filesRef = useRef(null);

    const {t} = useTranslation();

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
                    <div className="flex flex-wrap mt-3">
                        {elt?.media_files?.map((file, index) =>
                            <img src={!elt?.file_type ? file : returnFileFormat(file)}
                                 className="w-[100px] h-[100px] mr-1 mb-3" alt=""
                                 key={index}/>
                        )}
                        {elt.file_type}
                    </div>
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

    const handleFileChange = (e) => {
        setFiles(e.target.files);
        setPreviewFiles(Array.from(e.target.files).map((elt) => URL.createObjectURL(elt)));
        setAttachmentOpen(true);
    }

    useEffect(() => {
        if (Object.keys(chat).length && firstRunRef.current) {
            const socket = new WebSocket(`wss://backend.africanchildprojects.org/ws/chat-messages/${props.item.id}/`);
            socket.onopen = () => {
            };
            socket.onmessage = (event) => {
                const messages = chat?.messages;
                const newMessage = JSON.parse(event.data)?.data;
                const message = messages?.findIndex((elt) =>
                    (elt.created_on === newMessage.created_on) &&
                    (elt.message === newMessage.message)
                );
                if (message === -1) {
                    console.log(newMessage);
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
                    <p>
                        {chat?.total_members} {" "}
                        {t("member".getPlural(chat?.total_members).getTranslationKey())}
                    </p>
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
                        elt?.sender_id === props?.user?.user_key ?
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
                            className="cursor-pointer mr-1"
                            onClick={() => setToggleEmoji(prev => !prev)}
                        />
                        <GrAttachment
                            size={20}
                            className="cursor-pointer mr-1"
                            onClick={() => filesRef.current.click()}
                        />
                        <input
                            type="text"
                            placeholder={t('forum.sendMessage')}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <input
                            type="file"
                            ref={filesRef}
                            onChange={handleFileChange}
                            multiple
                            hidden
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
            <AttachmentModal
                isOpen={attachmentOpen}
                previewFiles={previewFiles}
                setIsOpen={setAttachmentOpen}
                sendMessage={sendMessage}
                message={message}
                files={files}
                id={props.item.id}
                setMessage={setMessage}
            />
        </div>
    )
}

export default SingleChat;
