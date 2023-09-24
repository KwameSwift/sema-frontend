import React, {useEffect, useState} from "react";
import NoChatRooms from "../../../../Assets/images/no-chats.png";
import SuggestionsSection from "./suggestionsSection";
import {axiosClientWithHeaders} from "../../../../libs/axiosClient";
import Pagination from "../../../../Components/Common/Pagination";
import ForumPollCard from "./pollCard";

function PollsTab({user, forumId, suggestedForums}) {
    const [polls, setPolls] = useState([]);
    const [refetch, setRefetch] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const returnPolls = () => {
        if (user?.tokens?.access && polls?.length) {
            return polls?.map((elt, index) =>
                <ForumPollCard {...elt} key={index} setRefetch={setRefetch}/>
            )
        } else {
            return (
                <div className="flex justify-center items-center w-full flex-col">
                    <img src={NoChatRooms} alt="No Chat rooms" width={90} height={20}/>
                    <p className="mt-3 font-bold">No Polls</p>
                </div>
            )
        }
    }

    const getPolls = async () => {
        try {
            const resp = await axiosClientWithHeaders.get(
                `/forum/get-all-forum-polls/${forumId}/${currentPage}/`
            );
            const respData = resp.data;
            setPolls(respData.data);
            setTotalPages(respData.total_pages);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getPolls();
    }, [refetch]);

    return (
        <>
            <div className="forum-chats-page flex justify-between h-full">
                <div className="mr-6 w-full">
                    <div className="h-full flex justify-center">
                        <div className="chat-sect">
                            <>{returnPolls()}</>
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
            <div>
                <Pagination
                    getData={getPolls}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
            </div>
        </>
    )
}

export default PollsTab;
