import React from "react";
import {BsCheckCircleFill, BsThreeDotsVertical} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import Avatar from "../../../../../Assets/images/no-profile-img.webp";
import "./style.scss";
import {formatDate} from "../../../../../utils/helpers";
import {FaTimes} from "react-icons/fa";

function AdminPollCard(props) {
    const navigate = useNavigate();
    const modalType = props.is_approved ? "Unapprove" : "Approve";

    let dropItems = [
        {id: "view", name: "View", route: `/admin/polls/${props.id}`},
        {id: "status", name: modalType, modalType: props.is_approved ? "unapprovePoll" : "approvePoll"},
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
                <h3 className="font-bold text-[20px]">{props.question}</h3>
                <p className="mt-4 poll-desc">{props.description}</p>
            </div>
            {props.is_approved &&
                <>
                    <hr className="mt-3"/>
                    <div className="flex justify-between items-center">
                        <div className="flex mt-3 items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[13px]">Approved: {formatDate(props.approved_on)}</span>
                                <span
                                    className="text-[13px]">By: {props.approved_by__first_name} {props.approved_by__last_name}</span>
                            </div>
                        </div>
                        <div>
                            {props.is_ended
                                ? <span className="text-[#e14d2a] text-[14px] cursor-default">Closed</span>
                                : <span className="text-[green] text-[14px] cursor-default">In progress</span>
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default AdminPollCard;
