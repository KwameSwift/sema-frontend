import React, {useState} from "react";
import ChatCard from "./chatCard";
import AddChatRoom from "./addChatRoom";
import {toast} from "react-toastify";
import SingleChat from "./singleChat";

function ChatsTab({chatRooms, user, setRefetch, forumId}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChatOpened, setIsChatOpened] = useState(false);
    const [selectedChat, setSelectedChat] = useState({});

    const setStatus = (status) => {
        if (status === "Completed") {
            toast.success("Chat added successfully");
            setRefetch(prev => !prev);
        }
    }
    const handleChatOpen = (data) => {
        setSelectedChat(data);
        setIsChatOpened(true);
    }

    return (
        <>
            <div className="forum-chats-page flex justify-between">
                <div className="mr-6 w-full">
                    {user?.is_admin &&
                        <div className="flex justify-end items-start mb-2">
                            <button
                                className="add-chat-btn"
                                onClick={() => setIsModalOpen(true)}
                            >+ New Chat
                            </button>
                        </div>
                    }
                    <div className="chat-sect">
                        {chatRooms?.map((elt, index) =>
                            <ChatCard {...elt} key={index} setSelectedChat={handleChatOpen}/>
                        )}
                    </div>
                </div>
                <div className="info-sect">
                    <div className="about p-3 bg-white">
                        <h3 className="font-bold">About</h3>
                        <p>Welcome, Have a look around.</p>
                    </div>
                    <div className="about mt-3 p-3 bg-white">
                        <h3 className="font-bold">About</h3>
                        <p>Welcome, Have a look around.</p>
                    </div>
                </div>
            </div>
            <AddChatRoom
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                setStatus={setStatus}
                forumId={forumId}
            />
            {isChatOpened && <SingleChat
                setIsOpen={setIsChatOpened}
                item={selectedChat}
            />}
        </>
    )
}

export default ChatsTab;
