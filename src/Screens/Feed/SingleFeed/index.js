import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosClient, axiosClientWithHeaders } from "../../../libs/axiosClient";
import Navbar from "../../../Components/Common/Navbar";
import Avatar from "../../../Assets/images/person-img.png";
import { BsChat, BsHeartFill } from "react-icons/bs";
import { getImageUrl } from "../../../utils/helpers";
import ReactQuill from "react-quill";
import BlogPost from "./components/blogPost";

import "./style.scss";

function SinglePost() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [bgImg, setBgImg] = useState("");

  const [blogs, setBlogs] = useState([]);

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

      getSingleBlog();
    }
  }, [id]);

  return (
    <div className="h-full">
      <Navbar />
      <div className="single-blog mt-8 pb-8">
        <div className="head-details mx-20 pb-3 border-gray-200">
          <h1 className="text-[35px] font-bold text-center">{blog.title}</h1>
          <p className="mt-2 text-center">{blog.description}</p>
        </div>
        <div className="author-details mt-5 flex justify-center">
          <div>
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
              <span className="ml-2 text-[#ccc]">0</span>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <img
            src={getImageUrl(bgImg)}
            className="blog-image max-h-[250px]"
            alt="blog-image"
            title="blog-image"
          ></img>
        </div>
        <div className="mt-8 mx-[5%]">
          <ReactQuill
            theme="snow"
            value={blog?.content}
            readOnly={true}
            modules={{ toolbar: false }}
          />
        </div>
        <div className="other-blogs-sect mt-20">
          <div className="comment-sect">
            <div className="element">
              <div className="left-bar"></div>
              <div className="text">Other Blogs</div>
              <div className="right-bar"></div>
            </div>
          </div>
          <div className="other-blogs mt-8 px-8">
            {blogs.filter((elt) => elt.id !== blog.id).slice(0, 3).map((elt, index) => (
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
            <div className="flex items-center">
              <img
                src={Avatar}
                className="w-[60px] h-[60px]"
                alt="avatar"
                title="avatar"
              />
              <div className="ml-2">
                <div>
                  <p className="text-[15px]">Author</p>
                  <span className="text-[13px] text-[#7d7c7c]">
                    {/* {calculateTime(props.created_on)} */}2 days ago
                  </span>
                </div>
              </div>
            </div>
            <div className="ml-[65px]">
              <div>
                <p>
                  Duis autem vel eum iriure dolor in hendrerit in vulputate
                  velit esse molestie consequat, vel illum dolore eu feugiat
                  nulla facilisis at vero eros et accumsan et iusto odio
                  dignissim qui blandit praesent luptatum zzril delenit augue
                  duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit
                  amet, consectetuer adipiscing elit
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-center">
              <img
                src={Avatar}
                className="w-[60px] h-[60px]"
                alt="avatar"
                title="avatar"
              />
              <div className="ml-2">
                <div>
                  <p className="text-[15px]">Author</p>
                  <span className="text-[13px] text-[#7d7c7c]">
                    {/* {calculateTime(props.created_on)} */}2 days ago
                  </span>
                </div>
              </div>
            </div>
            <div className="ml-[65px]">
              <div>
                <p>
                  Duis autem vel eum iriure dolor in hendrerit in vulputate
                  velit esse molestie consequat, vel illum dolore eu feugiat
                  nulla facilisis at vero eros et accumsan et iusto odio
                  dignissim qui blandit praesent luptatum zzril delenit augue
                  duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit
                  amet, consectetuer adipiscing elit
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-center">
              <img
                src={Avatar}
                className="w-[60px] h-[60px]"
                alt="avatar"
                title="avatar"
              />
              <div className="ml-2">
                <div>
                  <p className="text-[15px]">Author</p>
                  <span className="text-[13px] text-[#7d7c7c]">
                    {/* {calculateTime(props.created_on)} */}2 days ago
                  </span>
                </div>
              </div>
            </div>
            <div className="ml-[65px]">
              <div>
                <p>
                  Duis autem vel eum iriure dolor in hendrerit in vulputate
                  velit esse molestie consequat, vel illum dolore eu feugiat
                  nulla facilisis at vero eros et accumsan et iusto odio
                  dignissim qui blandit praesent luptatum zzril delenit augue
                  duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit
                  amet, consectetuer adipiscing elit
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="comment-sect">
            <div className="element">
              <div className="left-bar"></div>
              <div className="text">{blog.total_comments} Comments</div>
              <div className="right-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
