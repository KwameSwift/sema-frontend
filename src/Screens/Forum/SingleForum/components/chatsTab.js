import React, {useState} from "react";
import ChatCard from "./chatCard";
import AddChatRoom from "./addChatRoom";
import {toast} from "react-toastify";
import SingleChat from "./singleChat";
import NoChatRooms from "../../../../Assets/images/no-chats.png";
import SuggestionsSection from "./suggestionsSection";

function ChatsTab({chatRooms, user, setRefetch, forumId, suggestedForums}) {
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

    const returnChatMessages = () => {
        if (user?.tokens?.access) {
            return chatRooms?.map((elt, index) =>
                <ChatCard {...elt} key={index} setSelectedChat={handleChatOpen}/>
            )
        } else {
            return (
                <div className="flex justify-center items-center w-full flex-col">
                    <img src={NoChatRooms} alt="No Chat rooms" width={90} height={20}/>
                    <p className="mt-3 font-bold">No Chat Rooms</p>
                </div>
            )
        }
    }

    return (
        <>
            <div className="forum-chats-page flex justify-between h-full">
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
                    <div className="h-full">
                        <div className="chat-sect">
                            <>{returnChatMessages()}</>
                        </div>
                    </div>
                </div>
                <SuggestionsSection
                    suggestedForums={suggestedForums}
                    userTokens={user?.tokens}
                    id={forumId}
                    setRefetch={setRefetch}
                />
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
                user={user.user}
            />}
        </>
    )
}

export default ChatsTab;
