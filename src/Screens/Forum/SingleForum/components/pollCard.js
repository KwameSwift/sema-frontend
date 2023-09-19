import React, {useEffect, useState} from "react";
import {formatDate} from "../../../../utils/helpers";
import "../style.scss";
import {ClipLoader} from "react-spinners";
import {axiosClientWithHeaders} from "../../../../libs/axiosClient";
import {GoDotFill} from "react-icons/go";
import {LuVote} from "react-icons/lu";

const endedPollResult = (data, choice) => {
    return (
        <div className="flex flex-col my-2">
            <div className="flex flex-wrap mb-3">
                {data?.map((elt) => (
                    <span
                        key={elt?.choice_id}
                        className={`relative text-[16px] text-white mb-2 border rounded-full w-full h-[40px] flex 
                        items-center justify-around ${(choice === elt?.id) && "bg-gray-200 text-[#fff]"}`}
                    >
                        <span className="text-[#000] z-20">{elt?.choice}</span>
                        <span className="text-[#000] z-20">{elt?.votes}%</span>
                        <span className="poll-progress z-10 bg-gray-200 absolute bottom-0 left-0 top-0 ri"
                              style={{width: `${elt.vote_percentage}%`, borderRadius: "20px"}}></span>
                    </span>

                ))}
            </div>
        </div>
    )
}


function ForumPollCard(props) {
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(false);

    // const cancelSelection = () => {
    //     setSelectedID("");
    // }

    const progress = () => {
        return <ClipLoader size={15} color={loading ? "#fff" : ""}/>;
    };

    const votePoll = async (id) => {
        setSelectedId(id);
        setLoading(true);
        try {
            await axiosClientWithHeaders.post("/forum/vote-on-forum-poll/", {
                forum_poll_id: props.id,
                choice_id: id,
            });
            setLoading(false);
            props.setRefetch((prev) => !prev);
        } catch (err) {
            setLoading(false);
        }
    }

    const pollInProgress = () => {
        return (
            <div className="flex flex-col my-2">
                <div className="flex flex-wrap mb-3">
                    {(props?.choices || props?.stats?.choices)?.map((elt) => (
                        <span
                            key={elt.id}
                            onClick={() => votePoll(elt.id)}
                            className={`text-[16px] mb-2 border rounded-full w-full h-[40px] flex items-center ${
                                (selectedId === elt?.id) &&
                                "bg-[#001253] text-[#fff]"
                            } ${
                                loading && selectedId === elt?.id
                                    ? "justify-around"
                                    : "justify-center"
                            }`}
                        >
                            {elt.choice}
                            {loading && selectedId === elt?.id && progress()}
                        </span>

                    ))}
                </div>
            </div>
        )
    }


    const getPollState = () => {
        if ((props.is_ended) || (props.voter_choice)) {
            return endedPollResult(props?.choices || props?.stats?.choices, props?.voter_choice);
        }
        return pollInProgress();
    }

    useEffect(() => {
        if (props?.voter_choice) {
            console.log(props?.voter_choice)
            setSelectedId(props?.voter_choice);
        }
    }, [props.voter_choice])

    return (
        <div className="forum-poll poll-card p-4">
            <div className="flex justify-between items-center">
                <div className="flex w-full mb-2 justify-between items-center">
                    <div className="flex w-full items-center  justify-between">
                        <p className="font-bold text-[14px]">{props.question}</p>
                        <div className="flex items-center forum-type">
                            <GoDotFill fill="#3e6d9c"/>
                            <span className="text-[12px]">{!props?.is_ended ? "In progress" : "Ended"}</span>
                        </div>
                    </div>
                </div>
            </div>
            <>{getPollState()}</>
            <div className="flex items-center justify-between">
                <p className="flex items-center">
                    <LuVote/>
                    <span className="text-[12px]">{props?.total_votes}</span>
                </p>
                <p className="text-right text-[12px]">{formatDate(props.created_on)}</p>
            </div>
        </div>
    );
}

export default ForumPollCard;
