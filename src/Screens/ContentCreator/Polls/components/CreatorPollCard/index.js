import React from "react";
import {BsThreeDotsVertical} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import "./style.scss";
import {FaTimes} from "react-icons/fa";

function CreatorPollCard(props) {
    const navigate = useNavigate();

    let dropItems = [
        {id: "edit", name: "Edit", route: `/creator/polls/edit/${props.id}`},
        {id: "view", name: "View", route: `/creator/polls/${props.id}`},
        {id: "delete", name: "Delete"},
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
    return (
        <div className="poll-card p-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
          <span
              className={`text-[14px] ${props.is_ended ? "text-[#e14d2a]" : "text-[green]"}`}
          >
            {props.is_ended ? "Closed" : "In progress"}
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
        </div>
    );
}

export default CreatorPollCard;
