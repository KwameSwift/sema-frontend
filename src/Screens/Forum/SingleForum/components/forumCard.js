import React, {useEffect, useState} from "react";
import {BsCheckCircleFill} from "react-icons/bs";
import {formatDate} from "../../../../utils/helpers";
import Avatar from "../../../../Assets/images/no-profile-img.webp";
import {tagColors} from "../../../../utils/data";
import {BiSolidChat} from "react-icons/bi";
import "../style.scss";
import {GoDotFill} from "react-icons/go";

function AdminForumCard(props) {
    const [, setShowChoices] = useState(false);
    const modalType = props.is_approved ? "Unapprove" : "Approve";

    let dropItems = [{id: "view", name: "View", route: `/admin/forums/${props.id}`}, {
        id: "status", name: modalType, modalType: props.is_approved ? "unapproveForum" : "approveForum",
    },];

    if (props.is_owner) {
        const addedItems = [];
        addedItems.push({
            id: "edit", name: "Edit", route: `/admin/forums/edit/${props.id}`,
        });
        if (props.is_public) {
            addedItems.push({
                id: "manage", name: "Manage", route: `/admin/forums/manage/${props.id}`,
            });
        }
        dropItems = [...dropItems, ...addedItems];
    }

    if (!props.is_declined && !props.owner) {
        dropItems.push({
            id: "decline", name: "Decline forum", modalType: "declineForum",
        });
    }
    useEffect(() => {
        if (!props.snapshot_location) {
            setShowChoices(true);
        }
    }, [props.snapshot_location]);

    return (<div className="forum-card p-4">
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <img
                    src={props.author__profile_image ? props.author__profile_image : Avatar}
                    alt=""
                    className="w-[40px] h-[40px] rounded-full"
                />
                <span className="flex flex-col ml-3">
            <span className="author flex justify-between items-center">
              <span>
                {props.author__first_name} {props.author__last_name}
              </span>
                {props?.author__is_verified && (<span>
                  <BsCheckCircleFill stroke="#000" className="ml-1"/>
                </span>)}
            </span>

            <span className="text-[13px]">{formatDate(props?.created_on)}</span>
          </span>
            </div>
            <div className="flex items-center forum-type">
                <GoDotFill fill="#3e6d9c"/>
                <span>{props?.is_public ? "Public" : "Private"}</span>
            </div>
        </div>
        <div className="mt-4">
            <h3 className="font-bold mb-3 text-[20px] title">{props.topic}</h3>
            <p className="mt-3 mb-2 forum-desc">{props.description}</p>
            <div className="forum-tags">
                {props?.tags?.map((elt, index) => (<span key={index} style={{backgroundColor: tagColors[elt]}}>
              {elt}
            </span>))}
            </div>
        </div>
        <hr className="mt-3"/>
        <div className="flex justify-between items-center">
            <div className="flex mt-3 items-center justify-between">
                {props.is_approved && (<span className="text-[#e14d2a] text-[14px] cursor-default">
                  <BiSolidChat/> {props?.chat_rooms?.length}
                </span>
                )}
            </div>
            <div className="flex mt-3 items-center justify-between status">
                <p>{props.is_public
                    ? <span>Joined</span>
                    : <span><u>Join now</u></span>}
                </p>
            </div>
        </div>
    </div>);
}

export default AdminForumCard;
