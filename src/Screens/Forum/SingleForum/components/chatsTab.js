import React, {useState} from "react";
import ChatCard from "./chatCard";
import AddChatRoom from "./addChatRoom";
import {toast} from "react-toastify";
import SingleChat from "./singleChat";
import NoChatRooms from "../../../../Assets/images/no-chats.png";
import SuggestionsSection from "./suggestionsSection";
import {useTranslation} from "react-i18next";

function ChatsTab({chatRooms, user, setRefetch, forumId, suggestedForums, isMember}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChatOpened, setIsChatOpened] = useState(false);
    const [selectedChat, setSelectedChat] = useState({});

    const {t} = useTranslation();

    const setStatus = (status) => {
        if (status === "Completed") {
            toast.success(t('forum.chatAdded'));
            setRefetch(prev => !prev);
        }
    }
    const handleChatOpen = (data) => {
        setSelectedChat(data);
        setIsChatOpened(true);
    }

    const returnChatMessages = () => {
        if (user?.tokens?.access && chatRooms?.length && isMember) {
            return chatRooms?.map((elt, index) =>
                <ChatCard
                    {...elt}
                    key={index}
                    setSelectedChat={handleChatOpen}
                    setRefetch={setRefetch}
                />
            )
        } else {
            return (
                <div className="flex justify-center items-center w-full h-full flex-col">
                    <img src={NoChatRooms} alt="No Chat rooms" width={90} height={20}/>
                    <p className="mt-3 font-bold">
                        {t("forum.no")} {t('forum.chats')}
                    </p>
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
                            >+ {t('forum.newChat')}
                            </button>
                        </div>
                    }
                    <div className="h-full">
                        <div className="chat-sect h-full">
                            <>{returnChatMessages()}</>
                        </div>
                    </div>
                </div>
                <SuggestionsSection
                    suggestedForums={suggestedForums}
                    userTokens={user?.tokens}
                    id={forumId}
                    isMember={isMember}
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
