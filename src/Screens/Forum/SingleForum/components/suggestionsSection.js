import {GoDot} from "react-icons/go";
import React from "react";
import {toast} from "react-toastify";
import {axiosClientWithHeaders} from "../../../../libs/axiosClient";


function SuggestionsSection({suggestedForums, userTokens, id, setRefetch}) {
    const leaveOrJoinForum = async (isMember, forumId = id) => {
        if (!userTokens.access) {
            toast.error("Please login to be able to join this forum.");
        } else {
            try {
                if (isMember) {
                    await axiosClientWithHeaders.post(`/forum/leave-forum/${forumId}/`);
                    toast.success("You have left this forum");
                    setRefetch(prev => !prev);
                } else {
                    await axiosClientWithHeaders.post(`/forum/join-forum/${forumId}/`);
                    toast.success("You have joined this forum");
                    setRefetch(prev => !prev);
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
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
                           onClick={() => leaveOrJoinForum(elt?.id, false)}>Join</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SuggestionsSection;
