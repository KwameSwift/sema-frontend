import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import {BsPlus, BsSearch} from "react-icons/bs";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {debounce} from "lodash";
import Layout from "../../../Components/Dashboard/Layout";
// import EmptyImg from "../../../Assets/images/Empty-icon.jpg";
import {axiosClientWithHeaders} from "../../../libs/axiosClient";
import Modal from "../../../Components/Modal";
// import AdminCreatorBlogCard from "../../../Components/Admin/BlogPost";
import AdminForumCard from "./components/AdminForumCard";
import {getTransString} from "../../../utils/helpers";
import "./style.scss";
import NoBlog from "../../../Assets/images/no-blog.png";

function AdminForumsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [forums, setForums] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalState, setModalState] = useState("");
    const [selectedId, setSelectedID] = useState(0);
    const [refetch, setRefetch] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [totalForums, setTotalForums] = useState(0);
    const [forumType, setForumType] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [declineComment, setDeclineComment] = useState({});

    const firstRunRef = useRef(true);
    const {t} = useTranslation();

    const navigate = useNavigate();

    const getAllForums = async (type = forumType, prev = true) => {
        try {
            const resp = await axiosClientWithHeaders.get(
                `/super-admin/get-all-forums/${type}/${currentPage}/`
            );
            const data = resp.data;
            if (firstRunRef) {
                setTotalPages(data.total_pages);
                setTotalForums(data.total_data);
                firstRunRef.current = false;
            }
            if (prev) {
                setForums([...forums, ...data.data]);
            } else {
                setForums(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const declinePoll = async () => {
        try {
            await axiosClientWithHeaders.put(
                `/super-admin/decline-forum/${selectedId}/`,
                {
                    comments: declineComment.comments,
                }
            );
            toast.success("Forum declined");
            await new Promise((r) => setTimeout(r, 2000));
            setModalOpen(false);
            setRefetch((prev) => !prev);
        } catch (err) {
            console.error(err);
        }
    };

    const filterBlogs = (e) => {
        setForumType(e.target.value);
        getAllForums(e.target.value, false);
    };

    const searchForums = async (term) => {
        try {
            const resp = await axiosClientWithHeaders.post(
                "/forum/search-forums/1/",
                {
                    search_query: term,
                }
            );
            setForums(resp.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const updatePollApproval = async (approvalType, approvalId) => {
        setLoading(true);
        try {
            await axiosClientWithHeaders.put(
                `/super-admin/approve-disapprove-forum/${approvalId}/${selectedId}/`
            );
            setRefetch((prev) => !prev);
            setLoading(false);
            toast.success(`Forum ${approvalType} successfully`);
            await new Promise((r) => setTimeout(r, 2000));
            setModalOpen(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const getCallbackAction = async (type, data) => {
        if (type === "declinePoll") {
            await declinePoll(data);
        } else if (type === "approveForum") {
            await updatePollApproval("approved", 1);
        } else {
            await updatePollApproval("disapproved", 0);
        }
    };

    const handleSetData = (data) => {
        if (modalState === "declinePoll") {
            setDeclineComment({comments: data});
        }
    };

    const debouncedSearch = debounce((term) => {
        // Perform your search logic here
        searchForums(term);
    }, 300); // Adjust the debounce delay as per your requirements

    useEffect(() => {
        if (searchQuery.length) {
            debouncedSearch(searchQuery);
        }
    }, [searchQuery]);

    useEffect(() => {
        getAllForums(forumType, true);
    }, [currentPage]);

    useEffect(() => {
        getAllForums(forumType, false);
    }, [refetch]);

    return (
        <>
            <Layout>
                <div className="admin-blog-page mx-3">
                    <div className="p-8 mt-5 flex flex-col blog-header">
                        <h1>{t("admin.forums")}</h1>
                        <p className="text-[#fff]">
                            {t("admin.totalForums")} ({totalForums})
                        </p>
                    </div>
                    <div className="flex justify-between mt-3 items-center">
                        <div className="flex items-center w-[80%]">
                            <div className="border rounded-lg items-center w-[60%] flex mt-5">
                                <BsSearch size={22} className="ml-3"/>
                                <input
                                    type="text"
                                    placeholder={`${t(getTransString("Search"))}...`}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="outline-none p-4 h-[40px] w-[90%]"
                                />
                            </div>
                            <div className="ml-10 mt-4 flex flex-col">
                                <label>{t("admin.forumType")}</label>
                                <select
                                    className="border mt-2 rounded-lg p-1 w-[200px] h-[40px]"
                                    onChange={filterBlogs}
                                >
                                    <option value={0}>{t("admin.all")}</option>
                                    <option value={1}>{t("admin.approved")}</option>
                                    <option value={2}>{t("admin.unApproved")}</option>
                                    <option value={3}>{t('admin.declined')}</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-5 mr-3">
                            <button
                                className="text-[#fff] flex items-center rounded-md bg-[#001253] px-3 py-2"
                                onClick={() => navigate("/admin/forums/add")}
                            >
                                <BsPlus size={25}/>
                                {t("admin.forums")}
                            </button>
                        </div>
                    </div>
                    {forums?.length
                        ? (
                            <div className="creator-blogs mt-10">
                                {forums?.map((elt, index) => (
                                    <>
                                        <AdminForumCard
                                            {...elt}
                                            key={index}
                                            setModalOpen={setModalOpen}
                                            setSelectedID={setSelectedID}
                                            setModalType={setModalState}
                                        />
                                    </>
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center items-center min-h-[58vh]">
                                <img src={NoBlog} alt="no-blog" className="w-[200px] h-[200px]"/>
                            </div>
                        )
                    }
                    {totalPages !== currentPage && (
                        <div className="flex justify-center mb-3">
                            <button
                                className="see-more-btn"
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                            >
                                {t("home.seeMore")}
                            </button>
                        </div>
                    )}
                </div>
            </Layout>

            <Modal
                data={selectedId}
                setData={handleSetData}
                type={modalState}
                isOpen={modalOpen}
                setIsOpen={setModalOpen}
                setRefetch={setRefetch}
                setInputData={declineComment}
                callbackAction={(data) => getCallbackAction(modalState, data)}
                parentBtnLoading={loading}
            />
        </>
    );
}

export default AdminForumsPage;
