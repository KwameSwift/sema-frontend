import React from "react";
import { calculateTime } from "../../../../utils/helpers";
import { FaTimesCircle } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

function BlogCards({ id, img, title, description, author, posted_on, status, onClick }) {

  const navigate = useNavigate();

  const deactivatePost = () => {

  }

  const deletePost = () => {

  }

  const accountLinks = [
    { id: "deactivate", name: "Deactivate",  type: "func", func: deactivatePost },
    { id: "approve", name: "Approve",  type: "func", func: deactivatePost },
    { id: "unApprove", name: "UnApprove",  type: "func", func: deactivatePost },
    { id: "delete", name: "Delete", type: "func", func: deletePost },
  ];  

  return (
    <div className="blog-card pb-3 pr-3">
      <div>{img && <img src={img} width={300} height={300} />}</div>
      <div className="bg-[#fff] flex justify-between p-4 w-full pr-0">
        <div className="flex flex-col">
          <div>
            <p className="font-bold text-[20px]">{title}</p>
          </div>
          <div>
            <p className="text-[15px]">{description}</p>
          </div>
        </div>
        <div 
          className="cursor-pointer p-2 h-[35px] rounded text-[#fff]"
          onClick={() => onClick(id)}
          style={{ backgroundColor: status === "Approve" ? "#001253" : "#e14d2a"}}
        >
          {status === "Approve" ? <TiTick size={20} /> : <FaTimesCircle size={18} />   }
        </div>
      </div>
      <div className="relative right-0 mt-8 py-2 w-48 bg-white rounded-md shadow-lg">
          {accountLinks.map((elt) => (
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
  );
}

export default BlogCards;
