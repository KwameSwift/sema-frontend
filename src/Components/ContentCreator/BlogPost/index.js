import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { calculateTime } from "../../../utils/helpers";

function ContentCreatorBlogCard({
  id,
  status,
  img,
  title,
  description,
  author,
  posted_on,
  setModalOpen,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [openDropdown, setOpenDropdown] = useState(false);

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
    { id: "approve", name: status, type: "func", func: deactivatePost },
    { id: "delete", name: "Delete", type: "func", func: deletePost },
  ];

  const blogList = [
    {
      id: "edit",
      name: "Edit",
      type: "func",
      func: () => navigate(`/${getUserType()}/blogs/edit/${id}`),
    },
    { id: "delete", name: "Delete", type: "func", func: deletePost },
  ];

  const dropTypes = {
    "/creator/blogs": blogList,
  };

  const getDropList = () => {
    return Object.keys(dropTypes).includes(location.pathname)
      ? dropTypes[location.pathname]
      : accountLinks;
  };

  return (
    <div className="blog-card">
      <div className="blog-card-wrapper">
        <div>{img && <img src={img} className="w-[100%] h-[200px]" />}</div>
        <div className="bg-[#fff] pb-3 pr-2">
          <div className="h-full z-10 relative flex justify-between p-4 w-full pr-0">
            <div className="flex flex-col">
              <div>
                <p className="font-bold text-[20px]">{title}</p>
              </div>
              <div>
                <p className="text-[15px] blog-desc">{description}</p>
              </div>
            </div>
            <div
              className="cursor-pointer p-2 h-[35px] rounded text-[#fff]"
              onClick={() => setOpenDropdown((prev) => !prev)}
            >
              <BsThreeDotsVertical fill="#000" />
              {openDropdown && (
                <div className="absolute z-20 right-0 top-[10px] h-[100px] mt-8 py-2 w-48 bg-white rounded-md shadow-lg">
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
          <div className="relative px-4 bottom-0">
            <span className="font-bold">Author: </span>
            <p className="text-[15px]">
              <span>{author}</span>
            </p>
          </div>
          <span className="flex text-[14px] text-[gray] justify-end items-end">
            {calculateTime(posted_on)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ContentCreatorBlogCard;
