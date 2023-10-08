import React from "react";
import {BsThreeDotsVertical} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import "./style.scss";
import {FaTimes} from "react-icons/fa";
import {tagColors} from "../../../../../utils/data";
import {useTranslation} from "react-i18next";

function CreatorForumCard(props) {
    const navigate = useNavigate();
    const {t} = useTranslation();

    let dropItems = [
        {id: "edit", name: t('admin.edit'), route: `/creator/forums/edit/${props.id}`},
        {id: "view", name: t('admin.view'), route: `/forums/${props.id}`},
        {id: "manage", name: t('admin.manage'), route: `/creator/forums/manage/${props.id}`},
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

    return (
        <div className="poll-card p-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
          <span
              className={`text-[14px] ${props.is_ended ? "text-[#e14d2a]" : "text-[green]"}`}
          >
            {props.is_approved ? t('admin.approved') : t('admin.notApproved')}
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
                <h3 className="font-bold text-[20px]">{props.topic}</h3>
                <p className="mt-3 mb-2 forum-desc">{props.description}</p>
                <div className="forum-tags">
                    {props?.tags?.map((elt, index) =>
                        <span key={index} style={{backgroundColor: tagColors[elt]}}>{elt}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreatorForumCard;
