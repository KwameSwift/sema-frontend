import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {BsThreeDotsVertical} from "react-icons/bs";
import {calculateTime} from "../../../utils/helpers";
import {useTranslation} from "react-i18next";

function ContentCreatorBlogCard({
                                    id,
                                    status,
                                    img,
                                    title,
                                    description,
                                    is_approved,
                                    posted_on,
                                    setModalOpen,
                                    approved_and_published_by__first_name,
                                    approved_and_published_by__last_name
                                }) {
    const navigate = useNavigate();
    const location = useLocation();
    const {t} = useTranslation();

    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef(null);


    const deactivatePost = () => {
        setModalOpen(status.toLowerCase(), true, id);
    };

    const deletePost = () => {
        setModalOpen("delete", true, id);
    };

    const getUserType = () => {
        return location.pathname.split("/")[1];
    };

    const accountLinks = [
        {id: "approve", name: status, type: "func", func: deactivatePost},
        {id: "delete", name: t('modal.delete'), type: "func", func: deletePost},
    ];

    const blogList = [
        {
            id: "edit",
            name: t('admin.edit'),
            type: "func",
            func: () => navigate(`/${getUserType()}/blogs/edit/${id}`),
        },
        {id: "delete", name: t('modal.delete'), type: "func", func: deletePost},
    ];

    const dropTypes = {
        "/creator/blogs": blogList,
    };

    const getDropList = () => {
        return Object.keys(dropTypes).includes(location.pathname)
            ? dropTypes[location.pathname]
            : accountLinks;
    };

    const handleDropDownToggle = () => {
        setOpenDropdown((prev) => !prev);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="bg-[#fff] blog-card">
            <div className="blog-card-wrapper flex flex-col justify-between h-full">
                <div>
                    <div>{img && <img src={img} className="w-[100%] h-[200px]" alt=""/>}</div>
                    <div className="z-10 relative flex justify-between p-4 w-full pr-0">
                        <div className="flex flex-col">
                            <div>
                                <p className="font-bold text-[20px]">{title}</p>
                            </div>
                            <div>
                                <p className="text-[15px] blog-desc">{description}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div
                                className="cursor-pointer p-2 h-[35px] rounded text-[#fff]"
                                onClick={handleDropDownToggle}
                            >
                                <BsThreeDotsVertical fill="#000"/>
                                {openDropdown && (
                                    <div
                                        ref={dropdownRef}
                                        className="absolute z-20 right-0 top-[75px] h-[100px] mt-8 py-2 w-48 bg-white rounded-md shadow-lg"
                                    >
                                        {getDropList().map((elt) => (
                                            <button
                                                onClick={
                                                    elt?.type
                                                        ? () => elt.func()
                                                        : () => navigate(`${elt.route}`)
                                                }
                                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                key={elt.id}
                                            >
                                                {elt.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 px-4">
                        {is_approved ? (
                            <>
                                <span className="font-bold">{t('admin.approvedBy')}: </span>
                                <p className="text-[15px]">
                  <span>
                    {approved_and_published_by__first_name}{" "}
                      {approved_and_published_by__last_name}
                  </span>
                                </p>
                            </>
                        ) : (
                            <span className="font-bold">{t('admin.notApproved')}</span>
                        )}
                    </div>
                </div>
                <div className="flex justify-end">
          <span className="flex text-[14px] p-3 text-[gray] justify-end items-end">
            {calculateTime(posted_on)}
          </span>
                </div>
            </div>
        </div>
    );
}

export default ContentCreatorBlogCard;
