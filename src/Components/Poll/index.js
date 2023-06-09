import React, {useState} from "react";
import {RiShareForwardLine} from "react-icons/ri";
import {ClipLoader} from "react-spinners";
import {LuVote} from "react-icons/lu";
import {toast} from "react-toastify";
import Avatar from "../../Assets/images/no-profile-img.webp";
import {formatDate} from "../../utils/helpers";
import {axiosClientWithHeaders} from "../../libs/axiosClient";
import "./style.scss";


const endedPollResult = (data) => {
    return (
        <div className="flex flex-col my-4">
            <div className="flex flex-wrap mb-3">
                {data?.map((elt) => (
                    <span
                        key={elt?.choice_id}
                        className="relative text-[16px] text-white mb-2 border rounded-full w-full h-[40px] flex items-center justify-around"
                    >
                        <span className="text-[#000] z-20">{elt?.choice}</span>
                        <span className="text-[#000] z-20">{elt.vote_percentage}%</span>
                        <span className="poll-progress z-10 bg-gray-200 absolute bottom-0 left-0 top-0 ri"
                              style={{width: `${elt.vote_percentage}%`, borderRadius: "20px"}}></span>
                    </span>

                ))}
            </div>
        </div>
    )
}

function PollCard(props) {
    const [showChoices, setShowChoices] = useState(false);
    const [selectedId, setSelectedID] = useState(props?.voter_choice || 0);
    const [loading, setLoading] = useState(false);


    const progress = () => {
        return <ClipLoader size={15} color={loading ? "#fff" : ""}/>;
    };

    const handleSelection = async (id) => {
        if (!props.access) {
            toast.error("Register or login to vote on this poll");
            return;
        }
        setSelectedID(id);
        setLoading(true);
        try {
            await axiosClientWithHeaders.post("/polls/vote-on-poll/", {
                poll_id: props.id,
                choice_id: id,
            });
            setLoading(false);
            props.refetch((prev) => !prev);
        } catch (err) {
            setLoading(false);
        }
    };

    const getToggleText = (status) => {
        const text = props.is_ended ? "result" : "choices";
        return status + ' ' + text;
    }

    const pollInProgress = () => {
        return (
            <div className="flex flex-col my-4">
                <div className="flex flex-wrap mb-3">
                    {(props?.choices || props?.stats?.choices)?.map((elt) => (
                        <span
                            key={elt.id}
                            onClick={() => handleSelection(elt.id)}
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
        if ((showChoices && props.is_ended) || (showChoices && props.voter_choice)) {
            return endedPollResult(props?.choices || props?.stats?.choices);
        } else if (showChoices) {
            return pollInProgress();
        }
    }


    return (
        <div>
            <div className="poll-card p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img
                            src={
                                props.author_profile_image
                                    ? props?.author_profile_image
                                    : Avatar
                            }
                            alt=""
                            className="w-[30px] h-[30px] rounded-full"
                        />
                        <span className="flex flex-col ml-3">
              <span>
                {props.author__first_name} {props.author__last_name}
              </span>
              <span className="text-[13px]">
                {formatDate(props.approved_on)}
              </span>
            </span>
                    </div>
                    {props?.voter_choice && (
                        <div>
                            <LuVote/>
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    <h3 className="font-bold text-[16px]">{props.question}</h3>
                    {props.file_location && <a href={props.file_location}
                                               className="underline text-[#001253] mt-4 poll-desc">{props.file_location}</a>}
                </div>
                <>{getPollState()}</>
                <h3
                    className="mt-3 font-bold cursor-pointer"
                    onClick={() => setShowChoices((prev) => !prev)}
                >
                    {showChoices ? getToggleText("Hide") : getToggleText("View")}
                </h3>
                <hr className="mt-3"/>
                <p
                    className={`mt-2 text-[13px] ${
                        props.is_ended ? "text-[#e14d2a]" : "text-gray-400"
                    }`}
                >
                    {props?.is_ended ? "Poll ended" : "Poll in progress"}
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex justify-between items-center">
                        <div className="mt-3 flex blog-stats">
                            <div className="icon-wrapper flex justify-start items-center">
                                <div className="icon ml-3">
                                    <RiShareForwardLine size={22}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span>{props.total_votes} Votes</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PollCard;
