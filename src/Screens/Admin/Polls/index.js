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
import {getTransString} from "../../../utils/helpers";

import "./style.scss";
import AdminPollCard from "./components/AdminPollCard";

function AdminPollsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [polls, setPolls] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalState, setModalState] = useState("");
    const [selectedId, setSelectedID] = useState(0);
    const [refetch, setRefetch] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [totalPolls, setTotalPolls] = useState(0);
    const [pollType, setPollType] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [declineComment, setDeclineComment] = useState({});

    const firstRunRef = useRef(true);
    const {t} = useTranslation();

    const navigate = useNavigate();

    const getAllPolls = async (type = pollType, prev = true) => {
        try {
            const resp = await axiosClientWithHeaders.get(
                `/super-admin/get-all-polls/${type}/${currentPage}/`
            );
            const data = resp.data;
            if (firstRunRef) {
                setTotalPages(data.total_pages);
                setTotalPolls(data.total_data);
                firstRunRef.current = false;
            }
            if (prev) {
                setPolls([...polls, ...data.data]);
            } else {
                setPolls(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const declinePoll = async () => {
        try {
            await axiosClientWithHeaders.put(`/super-admin/decline-poll/${selectedId}/`, {
                comments: declineComment.comments
            });
            toast.success("Poll declined");
            await new Promise((r) => setTimeout(r, 2000));
            setModalOpen(false);
            setRefetch(prev => !prev);
        } catch (err) {
            console.error(err);
        }
    }

    // const deletePoll = async () => {
    //   setLoading(true);
    //   try {
    //     await axiosClientWithHeaders.delete(
    //       `/blog/delete-blog-post/${selectedId}/`
    //     );
    //     setLoading(false);
    //     toast.success("Blog deleted successfully");
    //     await new Promise((r) => setTimeout(r, 2000));
    //     setModalOpen(false);
    //     getAllPolls(pollType, false);
    //   } catch (err) {
    //     setLoading(false);
    //     console.error(err);
    //   }
    // };

    const filterBlogs = (e) => {
        setPollType(e.target.value);
        getAllPolls(e.target.value, false);
    };

    const searchPolls = async (term) => {
        console.log(term.length)
        try {
            const resp = await axiosClientWithHeaders.post(
                "/polls/search-polls/1/",
                {
                    search_query: term,
                }
            );
            setPolls(resp.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const updatePollApproval = async (approvalType) => {
        setLoading(true);
        try {
            await axiosClientWithHeaders.put(
                `/super-admin/approve-poll/${selectedId}/`
            );
            setRefetch((prev) => !prev);
            setLoading(false);
            toast.success(`Poll ${approvalType} successfully`);
            await new Promise((r) => setTimeout(r, 2000));
            setModalOpen(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const getCallbackAction = (type, data) => {
        const actions = {
            "declinePoll": declinePoll(data),
        }
        return Object.keys(actions).includes(type) ? actions[type] : updatePollApproval(data)
    }

    const handleSetData = (data) => {
        if (modalState === "declinePoll") {
            setDeclineComment({comments: data});
        }
    }

    const debouncedSearch = debounce((term) => {
        // Perform your search logic here
        searchPolls(term);
    }, 300); // Adjust the debounce delay as per your requirements

    useEffect(() => {
        if (searchQuery.length) {
            debouncedSearch(searchQuery);
        }
    }, [searchQuery]);

    useEffect(() => {
        getAllPolls(pollType, true);
    }, [currentPage]);

    useEffect(() => {
        getAllPolls(pollType, false);
    }, [refetch]);

    return (
        <>
            <Layout>
                <div className="admin-blog-page mx-3">
                    <div className="p-8 mt-5 flex flex-col blog-header">
                        <h1>{t("admin.polls")}</h1>
                        <p className="text-[#fff]">
                            {t("admin.totalPolls")} ({totalPolls})
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
                                <label>{t("admin.pollType")}</label>
                                <select
                                    className="border mt-2 rounded-lg p-1 w-[200px] h-[40px]"
                                    onChange={filterBlogs}
                                >
                                    <option value={0}>{t("admin.all")}</option>
                                    <option value={1}>{t("admin.approved")}</option>
                                    <option value={2}>{t("admin.unApproved")}</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-5 mr-3">
                            <button
                                className="text-[#fff] flex items-center rounded-md bg-[#001253] px-3 py-2"
                                onClick={() => navigate("/admin/polls/add")}
                            >
                                <BsPlus size={25}/>
                                {t("admin.polls")}
                            </button>
                        </div>
                    </div>
                    <div className="creator-blogs mt-10">
                        {polls?.map((elt, index) => (
                            <>
                                <AdminPollCard
                                    setModalOpen={setModalOpen}
                                    setSelectedID={setSelectedID}
                                    setModalType={setModalState}
                                    {...elt}
                                    key={index}
                                />
                            </>
                        ))}
                    </div>
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

export default AdminPollsPage;
