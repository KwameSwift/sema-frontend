import React from "react";
import {BsThreeDotsVertical} from "react-icons/bs";
import {Dropdown} from "react-bootstrap";
import {formatDate} from "../../../../../../utils/helpers";
import "../style.scss";
import {useTranslation} from "react-i18next";


function AdminForumPollCard(props) {
    const {t} = useTranslation();

    let dropItems = [
        {id: "delete", name: t("modal.delete")},
    ];

    const handleDropClick = () => {
        props.setSelectedID(props.id);
        props.setModalOpen(true);
    };

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
                    <Dropdown>
                        <Dropdown.Toggle className="border-0">
                            <BsThreeDotsVertical fill="#000" size={15}/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {dropItems.map((elt) => (
                                <Dropdown.Item key={elt.id} onClick={() => handleDropClick(elt)}>
                                    {elt.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <>{getPollState()}</>
            <p className="text-right text-[12px]">{formatDate(props.created_on)}</p>
        </div>
    );
}

export default AdminForumPollCard;
