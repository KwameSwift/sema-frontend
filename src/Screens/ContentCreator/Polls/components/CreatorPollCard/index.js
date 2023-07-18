import React from "react";
import {BsThreeDotsVertical} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import "./style.scss";

function CreatorPollCard(props) {
    const navigate = useNavigate();
    const dropItems = [
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
            {props.is_ended ? "Closed" : "Inprogress"}
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
        </div>
    );
}

export default CreatorPollCard;
