import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
// import { useSelector } from 'react-redux';
import { FaRegCommentAlt } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import Avatar from "../../Assets/images/no-profile-img.webp";
import "./style.scss";

function PollCard() {
  // const user = useSelector((store) => store.user);
  const [showChoices, setShowChoices] = useState(false);
  return (
    <div className="poll-card h-full p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={Avatar} className="w-[30px] h-[30px] rounded-full" />
          <span className="flex flex-col ml-3">
            <span>John Doe</span>
            <span className="text-[13px]">12th January, 2022</span>
          </span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-bold text-[20px]">
          What five Marvel characters do you choose to ensure your safety?
        </h3>
        <p className="mt-4 poll-desc">
          The entire DC Universe is out to assassinate you. What five Marvel
          characters do you choose to ensure your safety and why? The entire DC
          Universe? OK, I’m going to need some heavy hitters here.
        </p>
      </div>
      {showChoices && <div className="flex flex-col my-4">
        <div className="flex justify-between mb-3 items-center">
          <div className="flex items-center">
            <span className="text-[16px] border rounded-full w-[40px] h-[40px] flex items-center justify-center">
              A
            </span>
            <span className="items-center flex ml-3">Choice 1</span>
          </div>
          <div className="flex items-center">
            <span className="text-[16px] border rounded-full w-[40px] h-[40px] flex items-center justify-center">
              A
            </span>
            <span className="items-center flex ml-3">Choice 1</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-[16px] border rounded-full w-[40px] h-[40px] flex items-center justify-center">
              A
            </span>
            <span className="items-center flex ml-3">Choice 1</span>
          </div>
          <div className="flex items-center">
            <span className="text-[16px] border rounded-full w-[40px] h-[40px] flex items-center justify-center">
              A
            </span>
            <span className="items-center flex ml-3">Choice 1</span>
          </div>
        </div>
      </div>}
      <h3
        className="mt-3 font-bold cursor-pointer"
        onClick={() => setShowChoices((prev) => !prev)}
      >
        {showChoices ? "Hide Choices" : "View Choices" }
      </h3>
      <hr className="mt-3" />
      <div className="flex mt-3 items-center justify-between">
        <div className="flex justify-between items-center">
          <div className="mt-3 flex blog-stats">
            <div className="icon-wrapper flex flex-col">
              <div className="icon">
                {/* {user?.liked_blogs?.includes(props.id)
                ? <AiFillHeart onClick={likeBlog} size={22} fill="#3e6d9c" />
                : <AiOutlineHeart onClick={likeBlog} size={22} />} */}
                <AiOutlineHeart size={22} />
              </div>
              <span className="mt-1 text-center text-[13px]">0</span>
            </div>
            <div className="icon-wrapper flex flex-col">
              <div className="icon ml-3">
                <FaRegCommentAlt size={16} />
              </div>
              <span className="mt-1 text-center text-[13px]">0</span>
            </div>
            <div className="icon-wrapper flex flex-col">
              <div className="icon ml-3">
                <RiShareForwardLine size={22} />
              </div>
              <span className="mt-1 text-center text-[13px]">0</span>
            </div>
          </div>
        </div>
        <div>
          <span>4 Votes</span>
        </div>
      </div>
    </div>
  );
}

export default PollCard;
