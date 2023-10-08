import React, {useEffect, useState} from "react";
import {BsThreeDotsVertical} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import "./style.scss";
import {FaTimes} from "react-icons/fa";
import {useTranslation} from "react-i18next";

function CreatorPollCard(props) {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [showChoices, setShowChoices] = useState(false);

    let dropItems = [
        {id: "edit", name: t('admin.edit'), route: `/creator/polls/edit/${props.id}`},
        {id: "view", name: t('admin.view'), route: `/creator/polls/${props.id}`},
        {id: "delete", name: t('modal.delete')},
    ];

    const handleDropClick = (item) => {
        if (item.route) {
            navigate(item.route);
        } else {
            props.setSelectedID(props.id);
            props.setModalType("deletePoll");
            props.setModalOpen(true);
        }
    };

    const getToggleText = (status) => {
        const text = props.is_ended ? "result" : "choices";
        return status + ' ' + text;
    }

    const pollInProgress = () => {
        return (
            <div className="flex flex-col my-2">
                <div className="flex flex-wrap mb-3">
                    {(props?.choices || props?.stats?.choices)?.map((elt) => (
                        <span
                            key={elt.id}
                            className="text-[16px] mb-2 border rounded-full w-full h-[40px] flex items-center justify-center"
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

    useEffect(() => {
        if (!props.snapshot_location) {
            setShowChoices(true);
        }
    }, [props.snapshot_location]);

    return (
        <div className="poll-card p-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
          <span
              className={`text-[14px] ${props.is_ended ? "text-[#e14d2a]" : "text-[green]"}`}
          >
            {props.is_ended ? t('feed.ended') : t('feed.inProgress')}
          </span>
                </div>
                <div className="flex justify-between items-center">
                    {props?.is_declined && <FaTimes fill="#e14d2a"/>}
                    <Dropdown>
                        <Dropdown.Toggle className="border-0">
                            <BsThreeDotsVertical fill="#000" size={20}/>
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
            <div className="mt-4">
                <h3 className="font-bold text-[20px]">{props.question}</h3>
                {props.file_location && (
                    <a href={props.file_location}
                       className="underline text-[#001253] mt-4 poll-desc"
                    >{props.file_location}</a>
                )}
            </div>
            {props.snapshot_location && (
                <div className="document-img flex justify-center items-center">
                    <img src={props?.snapshot_location} alt="" className="w-[100%] h-[250px]"/>
                </div>
            )}
            <>{showChoices && getPollState()}</>
            <h3 className="font-bold cursor-pointer">
                {showChoices
                    ? (
                        <span onClick={() => setShowChoices((prev) => !prev)}>
                            {t(getToggleText("Hide").getTranslationKey())}
                         </span>
                    ) : (
                        <span onClick={() => setShowChoices((prev) => !prev)}>
                                {t(getToggleText("View").getTranslationKey())}
                            </span>
                    )
                }
            </h3>
        </div>
    );
}

export default CreatorPollCard;
