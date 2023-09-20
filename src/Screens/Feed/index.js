import React, {useEffect, useRef, useState} from 'react'
import Navbar from '../../Components/Common/Navbar';
import {axiosClient, axiosClientWithHeaders} from '../../libs/axiosClient';
import Poll from "../../Components/Poll";
import FeedBlogPost from "./components/feedBlogPost";
import {useSelector} from "react-redux";
import "./style.scss";
import Pagination from "../../Components/Common/Pagination";
import Footer from "../../Components/Common/Footer";

function BlogsPage() {
    const [feed, setFeed] = useState([]);
    const [category, setCategory] = useState("All");
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [refetch, setRefetch] = useState(false);
    const user = useSelector((store) => store.user);

    const elementRef = useRef(null);

    const getAllFeed = async (page = 1) => {
        try {
            const resp = await axiosClient.get(`/utilities/get-feed/${page}/`);
            setFeed(resp.data.data);
            setTotalPages(resp.data.total_pages);
        } catch (err) {
            console.log(err);
        }
    };

    const getAllBlogs = async (page = 1) => {
        try {
            const resp = await axiosClient.get(`/blog/all-published-blogs/${page}/`);
            setFeed(resp.data.data);
            setTotalPages(resp.data.total_pages);
        } catch (err) {
            console.log(err);
        }
    };

    const getApprovedPolls = async () => {
        try {
            if (user?.tokens?.access) {
                const resp = await axiosClientWithHeaders.get(
                    "/users/approved-polls/"
                );
                setFeed(resp.data.data);
            } else {
                const resp = await axiosClient.get("/polls/all-approved-polls/");
                setFeed(resp.data.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (category === "All") {
            getAllFeed(currentPage);
        } else if (category === "Blogs") {
            getAllBlogs(currentPage);
        } else {
            getApprovedPolls();
        }
    }, [category]);

    useEffect(() => {
        getAllFeed();
    }, [refetch]);

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Navbar/>
            <div className='feeds mt-3'>
                <div className="flex justify-between feed-container">
                    <aside>
                        <div className="pt-10 sidebar-menu">
                            <ul>
                                <li>Menu</li>
                                <li className={category === "All" && "selected"}
                                    onClick={() => setCategory("All")}>All
                                </li>
                                <li className={category === "Blogs" && "selected"}
                                    onClick={() => setCategory("Blogs")}>Blogs
                                </li>
                                <li className={category === "Polls" && "selected"}
                                    onClick={() => setCategory("Polls")}>Polls
                                </li>
                            </ul>
                        </div>
                    </aside>
                    <main>
                        <div className='flex pt-8 items-center justify-center flex-wrap' ref={elementRef}>
                            {feed.map((elt) =>
                                Object.keys(elt).includes("choices")
                                    ? <Poll
                                        {...elt}
                                        key={elt.id}
                                        access={user?.tokens?.access}
                                        refetch={setRefetch}
                                    />
                                    : <FeedBlogPost {...elt} key={elt.id} refetch={setRefetch}/>
                            )}
                        </div>
                    </main>
                </div>
            </div>
            <Pagination
                getData={getAllFeed}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
            />
            <Footer/>
        </div>
    );
}

export default BlogsPage;
