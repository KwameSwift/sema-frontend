import React from "react";
import {formatDate} from "../../../../utils/helpers";
import "../style.scss";


function ForumPollCard(props) {
    const pollInProgress = () => {
        return (
            <div className="flex flex-col my-2">
                <div className="flex flex-wrap mb-3">
                    {(props?.choices || props?.stats?.choices)?.map((elt) => (
                        <span
                            key={elt.id}
                            className="text-[13px] mb-2 border rounded-full w-full h-[40px] flex items-center justify-center"
                        >
              {elt.choice}
            </span>
                    ))}
                </div>
            </div>
        )
    }

    const getPollState = () => {
        return pollInProgress();
    }

    return (
        <div className="forum-poll poll-card p-4">
            <div className="flex justify-between items-center">
                <div className="flex w-full mb-2 justify-between items-center">
                    <div className="flex items-center">
                        <p className="font-bold text-[14px]">{props.question}</p>
                    </div>
                </div>
            </div>
            <>{getPollState()}</>
            <p className="text-right text-[12px]">{formatDate(props.created_on)}</p>
        </div>
    );
}

export default ForumPollCard;
