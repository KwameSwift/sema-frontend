import React, {useState} from "react";
import {AiOutlineLike, AiTwotoneLike} from "react-icons/ai";
import {formatDate, formatMessageTime, getTransString} from "../../../../utils/helpers";
import {axiosClientWithHeaders} from "../../../../libs/axiosClient";
import {useDispatch} from "react-redux";
import {setLikedDiscussions} from "../../../../Redux/slices/userSlice";
import {BsTrash} from "react-icons/bs";
import {useTranslation} from "react-i18next";
import {IoCloseOutline} from "react-icons/io5";

const DiscussionItem = ({discussion, user, refetch}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {t} = useTranslation();

    const likeComment = async () => {
        try {
            const resp = await axiosClientWithHeaders.put(`/forum/like-forum-comment/${discussion.id}/`);
            dispatch(setLikedDiscussions(resp.data.liked_comments));
            refetch();
        } catch (err) {
            console.log(err);
        }
    }

    const deleteComment = async () => {
        setLoading(true);
        try {
            await axiosClientWithHeaders.delete(`/forum/delete-forum-comment/${discussion.id}/`);
            setLoading(false);
            refetch();
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    }

    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow mb-4 max-w-[800px]">
                <div className="flex items-center">
                    <img
                        src={discussion.commentor__profile_image}
                        alt="Profile"
                        className="h-10 w-10 rounded-full mr-4"
                    />
                    <div className="flex justify-between w-full items-center">
                        <div>
                            <div className="text-[14px] font-semibold">
                                {discussion.commentor__first_name} {discussion.commentor__last_name}
                            </div>
                            {discussion.is_forum_admin && (
                                <div className="text-[13px] text-gray-500">Forum Admin</div>
                            )}
                        </div>
                        {discussion.is_forum_admin &&
                            <div><BsTrash fill="#e14d2a" className="cursor-pointer" onClick={toggleModal}/></div>}
                    </div>
                </div>
                <p className="mt-2 text-[13px]">{discussion.comment}</p>
                <div className="flex mt-4 justify-between items-center">
                    <div className="text-gray-500 text-sm flex">
                        {
                            user?.liked_discussions?.includes(discussion.id)
                                ? <AiTwotoneLike fill="#3e6d9c" size={16} className="mr-1 cursor-pointer"
                                                 onClick={likeComment}/>
                                : <AiOutlineLike size={16} className="mr-1 cursor-pointer" onClick={likeComment}/>
                        }{discussion.total_likes}
                    </div>
                    <div className="text-gray-500 text-[12px]">
                        {formatDate(discussion.created_on)}, {formatMessageTime(discussion.created_on, false)}
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                        <div
                            className={`bg-white max-w-[500px] rounded-lg p-6`}
                        >
                            <div className="flex justify-between">
                                <h2 className="text-xl font-bold mb-4">
                                    Delete discussion comment
                                </h2>
                                <span className="close-btn" onClick={toggleModal}>
                  <IoCloseOutline size={20} fill="#eee"/>
                </span>
                            </div>

                            <p>Are you sure you want to delete this comment?</p>
                            <div className="flex mt-8 justify-end items-center">
                                <button
                                    className="text-[14px] border rounded px-3 py-2"
                                    onClick={toggleModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="text-[14px] ml-2 text-white px-3 py-2 rounded"
                                    style={{backgroundColor: "#e14d2a"}}
                                    onClick={deleteComment}
                                >
                                    {loading
                                        ? `${t(getTransString("Loading"))}...`
                                        : t(getTransString("Delete"))}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DiscussionItem;
