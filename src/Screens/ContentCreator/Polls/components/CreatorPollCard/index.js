import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import Avatar from "../../../../../Assets/images/no-profile-img.webp";
import { formatDate } from "../../../../../utils/helpers";
import "./style.scss";

function CreatorPollCard(props) {
  const navigate = useNavigate();
  const dropItems = [
    { id: "edit", name: "Edit", route: `/creator/polls/edit/${props.id}` },
    { id: "delete", name: "Delete" },
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
          <img
            src={
              props.author_profile_image ? props.author_profile_image : Avatar
            }
            className="w-[30px] h-[30px] rounded-full"
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
            <BsThreeDotsVertical fill="#000" size={20} />
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
        <hr className="mt-3" />
        <div className="flex justify-between items-center">
          <div className="flex mt-3 items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[13px]">Approved: {formatDate(props.approved_on)}</span>
              <span className="text-[13px]">By: {props.approved_by__first_name} {props.approved_by__last_name}</span>
            </div>
          </div>
          <div>
            {props.is_ended 
            ? <span className="text-[#e14d2a] text-[14px] cursor-default">Closed</span>
            : <span className="text-gray-200 text-[14px] cursor-default">Inprogress</span>
            }
          </div>
        </div>
      </>
      }
    </div>
  );
}

export default CreatorPollCard;
