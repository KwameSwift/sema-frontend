import React from "react";
import ChatCard from "./chatCard";

function ChatsTab({chat_rooms}) {
    return (
        <div className="forum-chats-page flex justify-between">
            <div className="mr-6 w-full">
                <div className="flex justify-end items-start mb-2">
                    <button className="add-chat-btn">+ New Chat</button>
                </div>
                <div className="chat-sect">
                    {chat_rooms?.map((elt, index) =>
                        <ChatCard {...elt} key={index}/>
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
    )
}

export default ChatsTab;
