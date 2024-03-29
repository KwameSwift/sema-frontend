import React, {useEffect, useState} from "react";
import {BsCheckCircleFill, BsThreeDotsVertical} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import Avatar from "../../../../../Assets/images/no-profile-img.webp";
import "./style.scss";
import {formatDate} from "../../../../../utils/helpers";
import {FaTimes} from "react-icons/fa";
import {useTranslation} from "react-i18next";


function AdminPollCard(props) {
    const navigate = useNavigate();
    const [showChoices, setShowChoices] = useState(false);
    const modalType = props.is_approved ? "Unapprove" : "Approve";

    const {t} = useTranslation();

    let dropItems = [
        {id: "view", name: t('admin.view'), route: `/admin/polls/${props.id}`},
        {
            id: "status",
            name: t(modalType.getTranslationKey()),
            modalType: props.is_approved ? "unapprovePoll" : "approvePoll"
        },
    ];

    if (props.is_owner) {
        dropItems = [
            ...dropItems,
            {id: "edit", name: "Edit", route: `/admin/polls/edit/${props.id}`},
        ]
    }

    if (!props.is_declined && !props.owner) {
        dropItems.push({id: "decline", name: "Decline poll", modalType: "declinePoll"});
    }
    const handleDropClick = (item) => {
        if (item.route) {
            navigate(item.route);
        } else if (item.func) {
            item.func();
        } else {
            props.setSelectedID(props.id);
            props.setModalType(item.modalType);
            props.setModalOpen(true);
        }
    };

    const getToggleText = (status) => {
        return status + ' ' + "choices";
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
                    <img
                        src={
                            props.author__profile_image ? props.author__profile_image : Avatar
                        }
                        alt=""
                        className="w-[40px] h-[40px] rounded-full"
                    />
                    <span className="flex flex-col ml-3">
                        <span className="flex justify-between items-center">
                            <span>
              {props.author__first_name} {props.author__last_name}
            </span>
                            {props?.author__is_verified && (
                                <span>
                              <BsCheckCircleFill stroke="#000" className="ml-1"/>
                            </span>)}
                        </span>

            <span className="text-[13px]">{formatDate(props.created_on)}</span>
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
                <h3 className="font-bold mb-3 text-[20px]">{props.question}</h3>
                {props.file_location && (
                    <a href={props.file_location}
                       className="underline text-[#001253] mt-4 poll-desc"
                    >{props.file_location}</a>
                )}
            </div>
            {props.snapshot_location && (
                <div className="document-img my-2 flex justify-center items-center">
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

            {props.is_approved &&
                <>
                    <hr className="mt-3"/>
                    <div className="flex justify-between items-center">
                        <div className="flex mt-3 items-center justify-between">
                            <div className="flex flex-col">
                                <span
                                    className="text-[13px]">{t('admin.approved')}: {formatDate(props.approved_on)}</span>
                                <span
                                    className="text-[13px]">{t('admin.by')}: {props.approved_by__first_name} {props.approved_by__last_name}</span>
                            </div>
                        </div>
                        <div>
                            {props.is_ended
                                ? <span className="text-[#e14d2a] text-[14px] cursor-default">{t('feed.ended')}</span>
                                :
                                <span className="text-[green] text-[14px] cursor-default">{t('feed.inProgress')}</span>
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default AdminPollCard;
