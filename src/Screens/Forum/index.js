import React, {useEffect, useRef, useState} from 'react'
import Navbar from '../../Components/Common/Navbar';
import {axiosClient, axiosClientWithHeaders} from '../../libs/axiosClient';
// import {useSelector} from "react-redux";
import ForumCard from "./SingleForum/components/forumCard";
import {useSelector} from "react-redux";
import "./style.scss";
import Pagination from "../../Components/Common/Pagination";
import {BsFillArrowUpCircleFill} from "react-icons/bs";

function ForumsPage() {
    const [forums, setForums] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [forumType, setForumType] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const user = useSelector((store) => store.user.tokens);
    const [refetch,] = useState(false);

    const elementRef = useRef(null);

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

    useEffect(() => {
        getAllForums();
    }, [refetch]);

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
