import React from "react";
import {BsThreeDotsVertical} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import Avatar from "../../../../../Assets/images/no-profile-img.webp";
import "./style.scss";
import {formatDate} from "../../../../../utils/helpers";

function AdminPollCard(props) {
    console.log(props);
    const navigate = useNavigate();
    const modalType = props.is_approved ? "Unapprove" : "Approve";
    let dropItems = [
        {id: "status", name: modalType},
    ];

    if (props.is_owner) {
        dropItems = [
            ...dropItems,
            {id: "edit", name: "Edit", route: `/admin/polls/edit/${props.id}`},
            // {id: "view", name: "View", route: `/creator/polls/${props.id}`}
        ]
    }
    const handleDropClick = (item) => {
        if (item.route) {
            navigate(item.route);
        } else {
            props.setSelectedID(props.id);
            props.setModalType(props.is_approved ? "unapprovePoll" : "approvePoll");
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
            <span>
              {props.author__first_name} {props.author__last_name}
            </span>
            <span className="text-[13px]">{formatDate(props.created_on)}</span>
          </span>
                </div>
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
