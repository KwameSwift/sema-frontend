import React, {useEffect, useRef, useState} from 'react'
import Navbar from '../../Components/Common/Navbar';
import {axiosClient, axiosClientWithHeaders} from '../../libs/axiosClient';
// import {useSelector} from "react-redux";
import ForumCard from "./SingleForum/components/forumCard";
import {useSelector} from "react-redux";
import Pagination from "../../Components/Common/Pagination";
import {getTransString} from "../../utils/helpers";
import {BsFillArrowUpCircleFill, BsSearch} from "react-icons/bs";
import {useTranslation} from "react-i18next";
import "./style.scss";

function ForumsPage() {
    const [forums, setForums] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [forumType, setForumType] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const user = useSelector((store) => store.user.tokens);
    const [refetch,] = useState(false);

    const elementRef = useRef(null);
    const {t} = useTranslation();

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    const getAllForums = async () => {
        try {
            let resp = null;
            if (user.access) {
                resp = await axiosClientWithHeaders.get(`/forum/get-all-forums/${forumType}/${currentPage}/`);
            } else {
                resp = await axiosClient.get(`/forum/get-all-forums/${forumType}/${currentPage}/`);
            }
            setForums(resp.data.data);
            setTotalPages(resp.data.total_pages);
        } catch (err) {
            console.log(err);
        }
    };

    const searchForums = async () => {
        try {
            let resp = null;
            if (user.access) {
                resp = await axiosClientWithHeaders.post(`/forum/search-forums/${currentPage}/`, {
                    search_query: searchQuery
                });
            } else {
                resp = await axiosClient.post(`/forum/search-forums/${currentPage}/`, {
                    search_query: searchQuery
                });
            }
            setForums(resp.data.data);
            setTotalPages(resp.data.total_pages);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (searchQuery?.trim()?.length > 0) {
            searchForums();
        }
    }, [searchQuery]);

    useEffect(() => {
        getAllForums();
    }, [refetch, currentPage, forumType]);

    return (
        <div>
            <Navbar/>
            <div className='forums mt-3'>
                {/*<FeedBanners scroll={scrollToElement}/>*/}
                <div className="flex justify-between feed-container">
                    <aside>
                        <div className="pt-10 sidebar-menu">
                            <ul>
                                <li>Menu</li>
                                <li className={forumType === 1 && "selected"}
                                    onClick={() => setForumType(1)}>All
                                </li>
                                <li className={forumType === 2 && "selected"}
                                    onClick={() => setForumType(2)}>Public
                                </li>
                                <li className={forumType === 3 && "selected"}
                                    onClick={() => setForumType(3)}>Private
                                </li>
                            </ul>
                        </div>
                    </aside>
                    <main>
                        <div className="mx-10 border rounded-lg items-center w-full flex mt-5">
                            <BsSearch size={22} className="ml-3"/>
                            <input
                                type="text"
                                placeholder={`${t(getTransString("Search"))}...`}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="outline-none p-4 h-[40px] w-[90%]"
                            />
                        </div>
                        <div className='flex flex-wrap justify-center pt-8'>
                            {forums.map((elt, index) =>
                                <ForumCard {...elt} key={index}/>
                            )}
                        </div>
                        <Pagination
                            getData={getAllForums}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                            ref={elementRef}
                        />
                    </main>
                </div>
            </div>
            <BsFillArrowUpCircleFill
                size={40}
                fill="#001253"
                className="fixed right-10 bottom-10 cursor-pointer"
                onClick={scrollToTop}
            />
        </div>
    );
}

export default ForumsPage;
