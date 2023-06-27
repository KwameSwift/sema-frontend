import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import { BsChat, BsHeartFill } from "react-icons/bs";
import { axiosClient, axiosClientWithHeaders } from "../../../libs/axiosClient";
import Navbar from "../../../Components/Common/Navbar";
import Avatar from "../../../Assets/images/person-img.png";
import { calculateTime, getImageUrl } from "../../../utils/helpers";
import BlogPost from "./components/blogPost";

import "./style.scss";

function SinglePost() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [bgImg, setBgImg] = useState("");
  const [comment, setComment] = useState("");
  const [blogs, setBlogs] = useState([]);

  const user = useSelector((store) => store.user);

  const getSingleBlog = async () => {
    try {
      const resp = await axiosClientWithHeaders.get(
        `/blog/single-blog-post/${id}/`
      );
      setBlog(resp.data.data);
      setBgImg(resp.data.data.cover_image);
    } catch (err) {
      console.error(err);
    }
  };

  const addComment = async () => {
    if (!user?.tokens?.access) {
      toast.error("Please login to add a comment")
    } else {
      try {
        setComment("");
        await axiosClientWithHeaders.post("/blog/comment-on-blog-post/", {
          comment,
          blog_post_id: id,
        });
        toast.success("Comment added successfully");
        getSingleBlog();
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const resp = await axiosClient.get("/blog/all-published-blogs/1/");
        setBlogs(resp.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllBlogs();
  }, []);

  useEffect(() => {
    if (id) {
      getSingleBlog();
    }
  }, [id]);

  return (
    <div className="h-full">
      <Navbar />
      <div className="single-blog mt-8 pb-8">
        <div className="head-details mx-[10%] pb-3 border-gray-200">
          <h1 className="text-[35px] font-bold text-center">{blog.title}</h1>
          <p className="mt-2 text-center">{blog.description}</p>
        </div>
        <div className="author-details mx-[10%] mt-5 flex justify-center">
          <div className="min-w-[50px]">
            <img src={Avatar} className="w-[50px] h-[50px]" />
          </div>
          <div className="flex items-center ml-3">
            <span className="text-gray-400">
              {blog.author__first_name} {blog.author__last_name}
            </span>
          </div>
          <div className="flex ml-3 items-center">
            <span className="hyphen"></span>
          </div>
          <div className="flex ml-3 items-center">
            <div className="flex items-center">
              <BsHeartFill fill="#ccc" />
              <span className="ml-2 text-[#ccc]">0</span>
            </div>
            <div className="flex ml-3 items-center">
              <BsChat fill="#ccc" />
              <span className="ml-2 text-[#ccc]">{blog.total_comments}</span>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <img
            src={getImageUrl(bgImg)}
            className="blog-image max-h-[500px] w-[500px]"
            alt="blog-image"
            title="blog-image"
          ></img>
        </div>
        <div className="mt-8 mx-[7%]">
          <ReactQuill
            theme="snow"
            value={blog?.content}
            readOnly={true}
            modules={{ toolbar: false }}
          />
        </div>
        {blog?.links?.length > 0
        && 
        <div className="mx-[10%]">
          <p>Links</p>
          <ul>
            {blog?.links?.map((elt) => 
              <li className="text-[blue] underline cursor-pointer" key={elt}>{elt}</li>
            )}
          </ul>
        </div>}
        <div className="other-blogs-sect mt-20">
          <div className="mx-[10%] comment-sect">
            <div className="element">
              <div className="left-bar"></div>
              <div className="text">Other Blogs</div>
              <div className="right-bar"></div>
            </div>
          </div>
          <div className="other-blogs mt-8 px-8">
            {blogs
              .filter((elt) => elt.id !== blog.id)
              .slice(0, 3)
              .map((elt, index) => (
                <BlogPost {...elt} key={index} />
              ))}
          </div>
        </div>
        <div className="comments">
          <div className="comment-sect">
            <div className="element">
              <div className="left-bar"></div>
              <div className="text">{blog.total_comments} Comments</div>
              <div className="right-bar"></div>
            </div>
          </div>
          <div className="mt-8">
            {blog?.comments?.map((elt) =>
            <>
              <div className="flex items-center ">
                <img
                  src={Avatar}
                  className="w-[60px] h-[60px]"
                  alt="avatar"
                  title="avatar"
                />
                <div className="ml-2">
                  <div>
                    <p className="text-[15px]">{elt.commentor__first_name} {elt.commentor__last_name}</p>
                    <span className="text-[13px] text-[#7d7c7c]">
                      {calculateTime(elt.created_on)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="ml-[65px] mb-8">
                <div>
                  <p>
                    {elt.comment}
                  </p>
                </div>
              </div>
            </>
            )}

          </div>
        </div>
        <div className="mt-10 flex px-[10%] flex-col">
          <div className="comment-sect">
            <div className="element">
              <div className="left-bar"></div>
              <div className="text">Leave a comment</div>
              <div className="right-bar"></div>
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <label className="text-[16px]">Comment</label>
            <textarea
              value={comment}
              placeholder="Leave a comment"
              onChange={(e) => setComment(e.target.value)}
              className="mt-3 leave-comment border border-gray-700"
              rows={4}
            ></textarea>
          </div>
          <div className="flex mt-3 justify-end">
            <button
              onClick={addComment}
              type="button"
              className="bg-[#e14d2a] text-[#fff] py-1 px-3"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
