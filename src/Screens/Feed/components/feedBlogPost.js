import React from "react";
import {BsCheckCircleFill} from "react-icons/bs";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
// import PersonImg from "../../../Assets/images/person-img.png";
import {FaRegCommentAlt} from "react-icons/fa";
import {RiShareForwardLine} from "react-icons/ri";
import {useNavigate} from "react-router-dom";
import {calculateTime, shareBlog} from "../../../utils/helpers";
import {axiosClientWithHeaders} from "../../../libs/axiosClient";
import Avatar from "../../../Assets/images/no-profile-img.webp";


import "./style.scss";
import {useDispatch, useSelector} from "react-redux";
import {setLikedBlogs} from "../../../Redux/slices/userSlice";

function FeedBlogPost(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const testImageRetrieve = (data) => {
        return data?.cover_image === "null" || data?.cover_image === null;
    };

    const likeBlog = async (e) => {
        e.stopPropagation();
        try {
            const resp = await axiosClientWithHeaders.put(`/blog/like-blog-post/${props.id}/`);
            dispatch(setLikedBlogs(resp.data.liked_blogs));
            props.refetch(prev => !prev);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div
            className="feed-blog-post my-5 cursor-pointer"
            onClick={() => navigate(`/blog/${props.id}`)}
        >
            <div className="bg-[#fff] w-full p-4 inner-blog">
                <div className="profile-section flex">
                    <img
                        src={props.author__profile_image || Avatar}
                        className="rounded-full" width={50} height={50} alt=""/>
                    <span className="ml-2 flex flex-col">
            <span className="font-bold flex items-center">
              {props.author__first_name} {props.author__last_name}
                {props.author__is_verified && (
                    <BsCheckCircleFill className="ml-1" fill="#3e6d9c"/>
                )}
            </span>
            <span className="text-[13px] text-[#7d7c7c]">
              {props.author__organization}
            </span>
          </span>
                </div>
                <div className="mt-5">
                    <h3 className="font-bold text-[16px]">{props.title}</h3>
                    <p className="mb-5 blog-desc">{props.preview_text}</p>
                    <div className="flex justify-center items-center">

                        {!testImageRetrieve(props) && (
                            <img
                                src={props?.cover_image}
                                alt=""
                                className="post-img"
                            />
                        )}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="mt-3 flex blog-stats">
                        <div className="icon-wrapper flex flex-col">
                            <div className="icon">
                                {user?.liked_blogs?.includes(props.id)
                                    ? <AiFillHeart onClick={likeBlog} size={22} fill="#3e6d9c"/>
                                    : <AiOutlineHeart onClick={likeBlog} size={22}/>}
                            </div>
                            <span className="mt-1 text-center text-[13px]">
                {props.total_likes}
              </span>
                        </div>
                        <div className="icon-wrapper items-center flex flex-col">
                            <div className="icon ml-3">
                                <FaRegCommentAlt size={16}/>
                            </div>
                            <span className="mt-1 text-center text-[13px]">
                {props.total_comments}
              </span>
                        </div>
                        <div className="icon-wrapper flex flex-col">
                            <div className="icon ml-3">
                                <RiShareForwardLine onClick={(e) => shareBlog(e, props)} size={22}/>
                            </div>
                            <span className="mt-1 text-center text-[13px]">
                {props.total_shares}
              </span>
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

export default FeedBlogPost;
