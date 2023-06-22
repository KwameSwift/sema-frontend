import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
// import PersonImg from "../../../Assets/images/person-img.png";
import { FaRegCommentAlt } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { calculateTime } from "../../../utils/helpers";

import "./style.scss";

function BlogPost(props) {
  const navigate = useNavigate();
  const testImageRetrieve = (data) => {
    return data?.cover_image === "null" || data?.cover_image === null;
  }
  return (
    <div className="blog-post cursor-pointer" onClick={() => navigate(`blog/${props.id}`)}>
      <div className="bg-[#fff] p-4 inner-blog">
        <div className="profile-section flex">
          {props.author_profile_image?.document_location
           && <img src={`${process.env.REACT_APP_BACKEND_DOMAIN}${props.author_profile_image?.document_location}`} width={50} height={50} /> }
          <span className="ml-2 flex flex-col">
            <span className="font-bold flex items-center">
              {props.author__first_name} {props.author__last_name}
              {props.author__is_verified && <BsCheckCircleFill className="ml-1" fill="#3e6d9c" />}
            </span>
            <span className="text-[13px] text-[#7d7c7c]">
              {props.author__organization}
            </span>
          </span>
        </div>
        <div className="mt-5">
          <h3 className="font-bold text-[16px]">{props.title}</h3>
          <p className="mb-5 blog-desc">{props.preview_text}</p>
          {!testImageRetrieve(props) && (
            <img
              src={`${process.env.REACT_APP_BACKEND_DOMAIN}${
                props?.cover_image
              }`}
              alt=""
              className="post-img"
            />
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="mt-3 flex blog-stats">
            <div className="icon-wrapper flex flex-col">
              <div className="icon">
                <AiOutlineHeart size={22} />
              </div>
              <span className="mt-1 text-center text-[13px]">{props.total_likes}</span>
            </div>
            <div className="icon-wrapper flex flex-col">
              <div className="icon ml-3">
                <FaRegCommentAlt size={16} />
              </div>
              <span className="mt-1 text-center text-[13px]">
                {props.total_comments}
              </span>
            </div>
            <div className="icon-wrapper flex flex-col">
              <div className="icon ml-3">
                <RiShareForwardLine size={22} />
              </div>
              <span className="mt-1 text-center text-[13px]">{props.total_shares}</span>
            </div>
          </div>
          <span className="text-[13px] text-[#7d7c7c]">
            {calculateTime(props.created_on)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
