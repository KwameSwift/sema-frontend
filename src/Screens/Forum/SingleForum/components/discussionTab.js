import React from "react";
import NoDiscussion from "../../../../Assets/images/no-discussion.png";
import SuggestionsSection from "./suggestionsSection";

function DiscussionTab({suggestedForums, discussions, user, forumId, setRefetch}) {
    return (
        <div className="forum-chats-page flex justify-between h-full">
            {discussions
                ? <p>Discussion tab</p>
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
