import React, {useState} from "react";
import ChatCard from "./chatCard";
import AddChatRoom from "../../../../../Forum/SingleForum/components/addChatRoom";
import {toast} from "react-toastify";
import NoChatRooms from "../../../../../../Assets/images/no-chats.png";
import EditChatRoomModal from "./editChat";
import DeleteChatRoom from "./deleteChat";

function AdminChatsTab({chatRooms, selectedChat, setSelectedChat, user, setRefetch, forumId}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editChat, setEditChat] = useState(false);
    const [deleteChat, setDeleteChat] = useState(false);

    const setStatus = (status) => {
        if (status === "Completed") {
            toast.success("Chat added successfully");
            setRefetch(prev => !prev);
        }
    }

    const returnChatMessages = () => {
        if (user?.tokens?.access && chatRooms?.length) {
            return chatRooms?.map((elt, index) =>
                <ChatCard
                    {...elt}
                    key={index}
                    setSelectedChat={setSelectedChat}
                    setEditChat={setEditChat}
                    setDeleteChat={setDeleteChat}
                />
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
                    {user?.user?.is_admin &&
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
            </div>
            <AddChatRoom
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                setStatus={setStatus}
                forumId={forumId}
            />
            <EditChatRoomModal
                isOpen={editChat}
                setIsOpen={setEditChat}
                setStatus={setStatus}
                chat={selectedChat}
                refetch={setRefetch}
            />
            <DeleteChatRoom
                isOpen={deleteChat}
                setIsOpen={setDeleteChat}
                chatId={selectedChat?.id}
                refetch={setRefetch}
            />
        </>
    )
}

export default AdminChatsTab;
