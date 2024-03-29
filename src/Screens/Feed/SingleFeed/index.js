import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import ReactQuill from "react-quill";
import {BsChat, BsCheckCircleFill, BsHeartFill} from "react-icons/bs";
import {axiosClient, axiosClientWithHeaders} from "../../../libs/axiosClient";
import Navbar from "../../../Components/Common/Navbar";
import Avatar from "../../../Assets/images/no-profile-img.webp";
import {calculateTime} from "../../../utils/helpers";
import BlogPost from "./components/blogPost";

import "./style.scss";
import {useTranslation} from "react-i18next";

function SinglePost() {
    const {id} = useParams();
    const [blog, setBlog] = useState({});
    const [bgImg, setBgImg] = useState("");
    const [comment, setComment] = useState("");
    const [blogs, setBlogs] = useState([]);

    const user = useSelector((store) => store.user);
    const {t} = useTranslation();

    const getSingleBlog = async () => {
        try {
            const resp = await axiosClientWithHeaders.get(
                `/blog/single-blog-post/${id}/`
            );
            console.log(resp.data.data);
            setBlog(resp.data.data);
            setBgImg(resp.data.data.cover_image);
        } catch (err) {
            console.error(err);
        }
    };

    const addComment = async () => {
        if (!user?.tokens?.access) {
            toast.error(t('alerts.pleaseLoginToAddComment'))
        } else {
            try {
                setComment("");
                await axiosClientWithHeaders.post("/blog/comment-on-blog-post/", {
                    comment,
                    blog_post_id: id,
                });
                toast.success(t('alerts.commentAdded'));
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
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        getAllBlogs();
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        if (id) {
            getSingleBlog();
        }
    }, [id]);

    return (
        <div className="h-full">
            <Navbar/>
            <div className="single-blog mt-8 pb-8">
                <div className="head-details mx-[10%] pb-3 border-gray-200">
                    <h1 className="text-[35px] font-bold text-center">{blog.title}</h1>
                    <p className="mt-2 text-center">{blog.description}</p>
                </div>
                <div className="author-details mx-[10%] mt-5 flex justify-center">
                    <div className="min-w-[50px]">
                        <img
                            src={
                                blog?.author__profile_image?.length
                                    ? blog?.author__profile_image
                                    : Avatar
                            }
                            alt=""
                            className="rounded-full w-[50px] h-[50px]"
                        />
                    </div>
                    <div className="flex items-center ml-3">
            <span className="text-gray-400 flex items-center">
              {blog.author__first_name} {blog.author__last_name}
                {blog.author__is_verified && <BsCheckCircleFill className="ml-1" fill="#3e6d9c"/>}
            </span>
                    </div>
                    <div className="flex ml-3 items-center">
                        <span className="hyphen"></span>
                    </div>
                    <div className="flex ml-3 items-center">
                        <div className="flex items-center">
                            <BsHeartFill fill="#ccc"/>
                            <span className="ml-2 text-[#ccc]">{blog.total_likes}</span>
                        </div>
                        <div className="flex ml-3 items-center">
                            <BsChat fill="#ccc"/>
                            <span className="ml-2 text-[#ccc]">{blog.total_comments}</span>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-center">
                    <img
                        src={bgImg}
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
                        modules={{toolbar: false}}
                    />
                </div>
                {blog?.links?.length > 0 && (
                    <div className="mx-[10%]">
                        <p>Links</p>
                        <ul>
                            {blog?.links?.map((elt) => (
                                <li className="text-[blue] underline cursor-pointer" key={elt}>
                                    {elt}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="other-blogs-sect mt-20">
                    <div className="mx-[10%] comment-sect">
                        <div className="element">
                            <div className="left-bar"></div>
                            <div className="text">{t('feed.otherBlogs')}</div>
                            <div className="right-bar"></div>
                        </div>
                    </div>
                    <div className="other-blogs mt-8 px-8">
                        {blogs
                            .filter((elt) => elt.id !== blog.id)
                            .slice(0, 3)
                            .map((elt, index) => (
                                <BlogPost {...elt} key={index}/>
                            ))}
                    </div>
                </div>
                <div className="comments">
                    <div className="comment-sect">
                        <div className="element">
                            <div className="left-bar"></div>
                            <div className="text">{blog.total_comments} {t('feed.comments')}</div>
                            <div className="right-bar"></div>
                        </div>
                    </div>
                    <div className="mt-8">
                        {blog?.comments?.map((elt) => (
                            <>
                                <div className="flex items-center">
                                    <img
                                        src={
                                            elt?.commentor__profile_image
                                                ? elt?.commentor__profile_image
                                                : Avatar
                                        }
                                        alt=""
                                        className="rounded-full w-[50px] h-[50px]"
                                    />
                                    <div className="ml-4">
                                        <div>
                                            <p className="text-[15px] flex items-center">
                                                {elt.commentor__first_name} {elt.commentor__last_name}
                                                {elt.commentor__is_verified &&
                                                    <BsCheckCircleFill className="ml-1" fill="#3e6d9c"/>}
                                            </p>
                                            <span className="text-[13px] text-[#7d7c7c]">
                        {calculateTime(elt.created_on)}
                      </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-[65px] mb-8">
                                    <div>
                                        <p>{elt.comment}</p>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
                <div className="mt-10 flex px-[10%] flex-col">
                    <div className="comment-sect">
                        <div className="element">
                            <div className="left-bar"></div>
                            <div className="text">{t('feed.leaveComment')}</div>
                            <div className="right-bar"></div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-8">
                        <label className="text-[16px]">{t('feed.comment')}</label>
                        <textarea
                            value={comment}
                            placeholder={t('feed.leaveComment')}
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
                            {t('feed.send')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SinglePost;
