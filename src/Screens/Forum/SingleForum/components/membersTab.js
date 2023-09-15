import React from "react";
import {getInitials, getRandomColor} from "../../../../utils/helpers";
import SuggestionsSection from "./suggestionsSection";

function MembersTab({members, suggestedForums, user, forumId, setRefetch}) {

    return (
        <div className="forum-chats-page flex justify-between h-full">
            <div className="flex flex-wrap mr-3">
                <div className="container mx-auto p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {members?.map((elt, index) =>
                            <div
                                key={index}
                                className="flex items-center bg-white rounded-lg overflow-hidden shadow-md p-3"
                            >
                                <div
                                    className="flex items-center justify-center w-8 h-8 rounded-full text-white font-semibold text-[13px]"
                                    style={{backgroundColor: getRandomColor()}}
                                >
                                    {getInitials(elt.first_name, elt.last_name)}
                                </div>
                                <div className="ml-3">
                                    <h2 className="text-[12px] font-semibold">
                                        {elt.first_name} {elt.last_name}
                                    </h2>
                                </div>
                            </div>
                        )}
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
    )
}

export default MembersTab;
