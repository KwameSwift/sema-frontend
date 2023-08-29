import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import {BsPlus, BsSearch} from "react-icons/bs";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {debounce} from "lodash";
// import EmptyImg from "../../../Assets/images/Empty-icon.jpg";
import {axiosClientWithHeaders} from "../../../libs/axiosClient";
import Modal from "../../../Components/Modal";
// import AdminCreatorBlogCard from "../../../Components/Admin/BlogPost";
import {getTransString} from "../../../utils/helpers";
import CreatorForumCard from "./components/CreatorForumCard";
import ContentCreatorLayout from "../../../Components/ContentCreator/Layout";

import "./style.scss";

function CreatorForumsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [forums, setForums] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalState, setModalState] = useState("");
    const [selectedId, setSelectedID] = useState(0);
    const [refetch, setRefetch] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [totalForums, setTotalForums] = useState(0);
    const [pollType, setPollType] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const firstRunRef = useRef(true);
    const {t} = useTranslation();

    const navigate = useNavigate();

    const getAllForums = async (type = pollType, prev = true) => {
        try {
            const resp = await axiosClientWithHeaders.get(
                `/users/my-forums/${type}/${currentPage}/`
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

    const deleteForum = async () => {
        setLoading(true);
        try {
            await axiosClientWithHeaders.delete(
                `/forum/delete-forum/${selectedId}/`
            );
            setLoading(false);
            toast.success("Forum deleted successfully");
            await new Promise((r) => setTimeout(r, 2000));
            setModalOpen(false);
            getAllForums(pollType, false);
        } catch (err) {
            setLoading(false);
            console.error(err);
        }
    };

    const filterBlogs = (e) => {
        setPollType(e.target.value);
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

    const debouncedSearch = debounce((term) => {
        // Perform your search logic here
        searchForums(term);
    }, 300); // Adjust the debounce delay as per your requirements

    useEffect(() => {
        if (searchQuery.length) {
            debouncedSearch(searchQuery);
        } else {
            getAllForums(pollType, false);
        }
    }, [searchQuery, refetch]);

    useEffect(() => {
        getAllForums(pollType, true);
    }, [currentPage]);


    return (
        <>
            <ContentCreatorLayout
                header="Forums"
                subChild={`Total Count (${totalForums})`}
            >
                <div className="admin-blog-page creator-polls mx-3">
                    <div className="flex justify-between mt-3 items-center">
                        <div className="flex items-center w-[80%]">
                            <div className="border bg-[#fff] rounded-lg items-center w-[60%] flex mt-5">
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
                                    <option value={3}>Declined</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-5 mr-3">
                            <button
                                className="text-[#fff] flex items-center rounded-md bg-[#001253] px-3 py-2"
                                onClick={() => navigate("/creator/forums/add")}
                            >
                                <BsPlus size={25}/>
                                {t("admin.forums")}
                            </button>
                        </div>
                    </div>
                    <div className="creator-blogs mt-10">
                        {forums?.map((elt, index) => (
                            <>
                                <CreatorForumCard
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
            </ContentCreatorLayout>

            <Modal
                data={selectedId}
                type={modalState}
                isOpen={modalOpen}
                setIsOpen={setModalOpen}
                setRefetch={setRefetch}
                callbackAction={deleteForum}
                parentBtnLoading={loading}
            />
        </>
    );
}

export default CreatorForumsPage;
