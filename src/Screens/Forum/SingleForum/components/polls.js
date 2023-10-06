import React, {useEffect, useState} from "react";
import NoPolls from "../../../../Assets/images/no-polls.png";
import SuggestionsSection from "./suggestionsSection";
import {axiosClientWithHeaders} from "../../../../libs/axiosClient";
import Pagination from "../../../../Components/Common/Pagination";
import ForumPollCard from "./pollCard";
import {useTranslation} from "react-i18next";

function PollsTab({user, forumId, suggestedForums, isMember}) {
    const [polls, setPolls] = useState([]);
    const [refetch, setRefetch] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const {t} = useTranslation();


    const returnPolls = () => {
        if (user?.tokens?.access && polls?.length && isMember) {
            return polls?.map((elt, index) =>
                <ForumPollCard {...elt} key={index} setRefetch={setRefetch}/>
            )
        } else {
            return (
                <div className="flex justify-center items-center w-full flex-col">
                    <img src={NoPolls} alt="No Chat rooms" width={90} height={20}/>
                    <p className="mt-3 font-bold">
                        {t("forum.no")} {t('admin.polls')}
                    </p>
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
                    isMember={isMember}
                    setRefetch={setRefetch}
                />
            </div>
            {user?.tokens?.access && polls?.length && isMember && <div>
                <Pagination
                    getData={getPolls}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
            </div>}
        </>
    )
}

export default PollsTab;
