import React from "react";
import {BsPersonCircle, BsThreeDotsVertical} from "react-icons/bs";
import {Dropdown} from "react-bootstrap";
import {useTranslation} from "react-i18next";

function ChatCard({setSelectedChat, setDeleteChat, setEditChat, ...props}) {
    const {t} = useTranslation();

    let dropItems = [
        {id: "edit", name: t('admin.edit')},
        {id: "delete", name: t('modal.delete')},
    ];

    const handleDropClick = (key) => {
        setSelectedChat(props.id);
        setEditChat(key === "edit");
        setDeleteChat(key === "delete");
    };

    return (
        <div className="admin-sect chat-card bg-white pt-3 pb-2 p-3 flex flex-col justify-between cursor-pointer"
             onClick={() => setSelectedChat(props)}>
            <div className="flex justify-between">
                <h3>{props.room_name}</h3>
                <Dropdown>
                    <Dropdown.Toggle className="border-0">
                        <BsThreeDotsVertical fill="#000" size={20}/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {dropItems.map((elt) => (
                            <Dropdown.Item
                                key={elt.id}
                                onClick={() => handleDropClick(elt.id)}
                            >
                                {elt.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="flex flex-row members-stats items-end justify-end h-full">
                <div className="flex justify-start">
                    <BsPersonCircle/>
                    <p className="text-[14px] ml-1">{props.total_members}</p>
                </div>
            </div>
        </div>
    )
}

export default ChatCard;
