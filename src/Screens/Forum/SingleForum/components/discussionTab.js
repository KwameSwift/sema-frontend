import React, {useState} from "react";
import NoDiscussion from "../../../../Assets/images/no-discussion.png";
import SuggestionsSection from "./suggestionsSection";
import DiscussionItem from "./discussionItem";
import {MdOutlineEmojiEmotions} from "react-icons/md";
import {BsSend} from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import {axiosClientWithHeaders} from "../../../../libs/axiosClient";

function DiscussionTab({suggestedForums, discussions, user, forumId, setRefetch}) {
    const [toggleEmoji, setToggleEmoji] = useState(false);
    const [message, setMessage] = useState("");

    const handleEmojiClick = (item) => {
        setMessage(prev => prev + item.emoji);
    }

    const sendMessage = async () => {
        try {
            await axiosClientWithHeaders.post(`/forum/comment-on-forum/${forumId}/`, {
                comment: message
            });
            setMessage("");
            setRefetch();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="forum-chats-page flex justify-between h-full">
            {discussions?.length && user?.tokens?.access
                ? (
                    <div className="flex flex-col w-full">
                        <div
                            className="sticky rounded p-3 flex bg-white mt-3 justify-between items-center mx-[13%] max-w-[800px]">
                            <div className="flex w-[95%] justify-start items-center">
                                <MdOutlineEmojiEmotions
                                    size={22}
                                    className="cursor-pointer mr-1"
                                    onClick={() => setToggleEmoji(prev => !prev)}
                                />
                                <input
                                    type="text"
                                    placeholder="Send message"
                                    value={message}
                                    className="w-full h-[30px] border-0 outline-0"
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
                        <div className="w-full px-[13%] py-4">
                            {discussions.map((discussion) => (
                                <DiscussionItem refetch={setRefetch} user={user} key={discussion.id}
                                                discussion={discussion}/>
                            ))}
                        </div>
                        {toggleEmoji && (
                            <div className="discussion-emoji">
                                <EmojiPicker onEmojiClick={handleEmojiClick}/>
                            </div>
                        )}
                    </div>
                )
                : (
                    <div className="flex justify-center items-center w-full flex-col">
                        <img src={NoDiscussion} alt="No Chat rooms" width={120} height={120}/>
                        <p className="mt-3 font-bold">No Discussions</p>
                    </div>
                )
            }
            <SuggestionsSection
                suggestedForums={suggestedForums}
                userTokens={user?.tokens}
                id={forumId}
                setRefetch={setRefetch}
            />
        </div>
    )
}

export default DiscussionTab;
