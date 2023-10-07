import React, {useEffect, useState} from "react";
import {BsCheckCircleFill, BsThreeDotsVertical} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import {formatDate} from "../../../../../utils/helpers";
import {FaTimes} from "react-icons/fa";
import Avatar from "../../../../../Assets/images/no-profile-img.webp";
import {tagColors} from "../../../../../utils/data";
import {BiSolidChat} from "react-icons/bi";
import "./style.scss";
import {useDispatch} from "react-redux";
import {setForum} from "../../../../../Redux/slices/forumSlice";
import {useTranslation} from "react-i18next";

function AdminForumCard(props) {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [, setShowChoices] = useState(false);
    const modalType = props.is_approved ? "Unapprove" : "Approve";

    const dispatch = useDispatch();

    let dropItems = [
        {id: "view", name: t('admin.view'), route: `/forums/${props.id}`},
        {
            id: "status",
            name: t(modalType.getTranslationKey()),
            modalType: props.is_approved ? "unapproveForum" : "approveForum",
        },
    ];

    if (props.is_owner) {
        const addedItems = [];
        addedItems.push({
            id: "edit",
            name: t('admin.edit'),
            route: `/admin/forums/edit/${props.id}`,
        });
        addedItems.push({
            id: "manage",
            name: t('admin.manage'),
            route: `/admin/forums/manage/${props.id}`,
        });
        dropItems = [...dropItems, ...addedItems];
    }

    if (!props.is_declined && !props.owner) {
        dropItems.push({
            id: "decline",
            name: t('admin.declineForum'),
            modalType: "declineForum",
        });
    }
    const handleDropClick = (item) => {
        if (item.route) {
            dispatch(setForum({id: props.id, topic: props.topic, description: props?.description}))
            navigate(item.route);
        } else if (item.func) {
            item.func();
        } else {
            props.setSelectedID(props.id);
            props.setModalType(item.modalType);
            props.setModalOpen(true);
        }
    };

    useEffect(() => {
        if (!props.snapshot_location) {
            setShowChoices(true);
        }
    }, [props.snapshot_location]);

    return (
        <div className="forum-card p-4">
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
            <span className="author flex justify-between items-center">
              <span>
                {props.author__first_name} {props.author__last_name}
              </span>
                {props?.author__is_verified && (
                    <span>
                  <BsCheckCircleFill stroke="#000" className="ml-1"/>
                </span>
                )}
            </span>

            <span className="text-[13px]">{formatDate(props?.created_on)}</span>
          </span>
                </div>
                <div className="flex justify-between items-center">
                    {props?.is_declined && (
                        <FaTimes fill="#e14d2a" className="cursor-default"/>
                    )}
                    <Dropdown>
                        <Dropdown.Toggle className="border-0">
                            <BsThreeDotsVertical fill="#000" size={20}/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {dropItems.map((elt) => (
                                <Dropdown.Item
                                    key={elt.id}
                                    onClick={() => handleDropClick(elt)}
                                >
                                    {elt.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="font-bold mb-3 text-[20px] title">{props.topic}</h3>
                <p className="mt-3 mb-2 forum-desc">{props.description}</p>
                <div className="forum-tags">
                    {props?.tags?.map((elt, index) => (
                        <span key={index} style={{backgroundColor: tagColors[elt]}}>
              {elt}
            </span>
                    ))}
                </div>
            </div>
            <hr className="mt-3"/>
            <div className="flex justify-between items-center">
                <div className="flex mt-3 items-center justify-between">
                    <div className="flex flex-col">
                        {props?.is_approved ? (
                            <>
                <span className="text-[13px]">
                  {t('admin.approved')}: {formatDate(props.approved_on)}
                </span>
                                <span className="text-[13px]">
                  {t('admin.by')}: {props.approved_by__first_name}{" "}
                                    {props.approved_by__last_name}
                </span>
                            </>
                        ) : (
                            <span className="text-[13px]">{t('admin.notApproved')}</span>
                        )}
                    </div>
                </div>
                <div>
                    {props.is_approved && (
                        <span className="text-[#e14d2a] text-[14px] cursor-default">
              <BiSolidChat/> {props?.total_comments}
            </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminForumCard;
