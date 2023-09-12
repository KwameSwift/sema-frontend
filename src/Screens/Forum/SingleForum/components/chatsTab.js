import React, {useState} from "react";
import ChatCard from "./chatCard";
import AddChatRoom from "./addChatRoom";
import {toast} from "react-toastify";
import SingleChat from "./singleChat";
import NoChatRooms from "../../../../Assets/images/no-chats.png";
import {GoDot} from "react-icons/go";

function ChatsTab({chatRooms, user, setRefetch, forumId, suggestedForums, joinForum}) {
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
                <div className="info-sect">
                    <div className="about p-3 bg-white">
                        <h3 className="font-bold">Suggested Forums</h3>
                        <hr className="mt-2"></hr>
                        {suggestedForums?.map((elt, index) =>
                            <div key={index} className="flex justify-between">
                                <div>
                                    <p className="font-bold">{elt?.topic}</p>
                                    <p className="flex items-center">{elt?.is_public ? "Public" : "Private"}
                                        <GoDot/> {elt?.total_members} members</p>
                                </div>
                                <p className="underline cursor-pointer"
                                   onClick={() => joinForum(elt?.id, false)}>Join</p>
                            </div>
                        )}
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
                user={user.user}
            />}
        </>
    )
}

export default ChatsTab;
