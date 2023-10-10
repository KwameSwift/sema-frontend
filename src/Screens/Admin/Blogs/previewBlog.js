import React, {useEffect, useState} from 'react'
import {axiosClient, axiosClientWithHeaders} from '../../../libs/axiosClient';
import ReactQuill from 'react-quill';
import {useParams} from 'react-router-dom';
import Avatar from "../../../Assets/images/person-img.png";
import {BsChat, BsHeartFill} from 'react-icons/bs';
import {getImageUrl} from '../../../utils/helpers';
import Layout from '../../../Components/Dashboard/Layout';
import BlogPost from '../../Feed/SingleFeed/components/blogPost';
import {useSelector} from 'react-redux';
import {useTranslation} from "react-i18next";
import {toast} from 'react-toastify';
import "./style.scss";

// import { useParams } from 'react-router-dom';

function PreviewBlogDataPage() {
    const [blog, setBlog] = useState({});
    const [bgImg, setBgImg] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [comment, setComment] = useState("");
    const {id} = useParams();
    const {t} = useTranslation();

    const user = useSelector((store) => store.user);

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
                getBlog();
            } catch (e) {
                console.error(e);
            }
        }
    };

    const getBlog = async () => {
        try {
            const resp = await axiosClientWithHeaders.get(`/blog/single-blog-post/${id}/`);
            setBlog(resp.data.data);
            setBgImg(resp.data.data.cover_image);
        } catch (err) {
            console.log(err);
        }
    }

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
        getBlog();
    }, [id])

    return (
        <Layout>
            <div className='single-blog mt-8 pb-8 admin-preview mx-4'>
                <div className='head-details mx-20 pb-3 border-gray-200'>
                    <h1 className='text-[35px] font-bold text-center'>{blog.title}</h1>
                    <p className='mt-2 text-center'>{blog.description}</p>
                </div>
                <div className='author-details mt-5 flex justify-center'>
                    <div>
                        <img src={Avatar} className='w-[50px] h-[50px]' alt=""/>
                    </div>
                    <div className='flex items-center ml-3'>
                        <span className='text-gray-400'>{blog.author__first_name} {blog.author__last_name}</span>
                    </div>
                    <div className='flex ml-3 items-center'>
                        <span className="hyphen"></span>
                    </div>
                    <div className='flex ml-3 items-center'>
                        <div className='flex items-center'>
                            <BsHeartFill fill="#ccc"/>
                            <span className='ml-2 text-[#ccc]'>0</span>
                        </div>
                        <div className='flex ml-3 items-center'>
                            <BsChat fill="#ccc"/>
                            <span className='ml-2 text-[#ccc]'>0</span>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-center max-h-[500px]">
                    <img src={getImageUrl(bgImg)} alt=""/>
                </div>
                <div className='mt-8 mx-[5%]'>
                    <ReactQuill
                        theme="snow"
                        value={blog?.content}
                        readOnly={true}
                        modules={{toolbar: false}}
                    />
                </div>
                <div className="other-blogs-sect mt-20">
                    <div className="comment-sect">
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
                      {/* {calculateTime(props.created_on)} */}2 days ago
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
                <div className="mt-10">
                    <div className="comment-sect">
                        <div className="element">
                            <div className="left-bar"></div>
                            <div className="text">{t('feed.leaveComment')}</div>
                            <div className="right-bar"></div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-8">
                        <label className="text-[16px]">{t('feed.comment').titleWord()}</label>
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
        </Layout>
    );
}

export default PreviewBlogDataPage;
