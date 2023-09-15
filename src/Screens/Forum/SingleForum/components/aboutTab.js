import React from "react";
import SuggestionsSection from "./suggestionsSection";

function AboutTab({about, suggestedForums, user, forumId, setRefetch}) {
    return (
        <div className="forum-chats-page flex justify-between h-full">
            <div className="bg-white rounded-lg p-4 w-full mr-3">
                <p className="text-[14px]">{about}</p>
            </div>
            <SuggestionsSection
                suggestedForums={suggestedForums}
                userTokens={user?.tokens}
                id={forumId}
                setRefetch={setRefetch}
            />
        </div>
    )
}

export default AboutTab;
