import React, {useEffect, useRef, useState} from 'react'
import Navbar from '../../Components/Common/Navbar';
import {axiosClient} from '../../libs/axiosClient';
import Poll from "../../Components/Poll";
import FeedBlogPost from "./components/feedBlogPost";
import {useSelector} from "react-redux";
import "./style.scss";

function BlogsPage() {
    const [feed, setFeed] = useState([]);
    const [category, setCategory] = useState("All");
    const user = useSelector((store) => store.user);
    const [refetch, setRefetch] = useState(false);

    const elementRef = useRef(null);

    // const scrollToElement = () => {
    //     if (elementRef.current) {
    //         elementRef.current.scrollIntoView({behavior: 'smooth'});
    //     }
    // };

    useEffect(() => {
        const getAllFeed = async () => {
            try {
                const resp = await axiosClient.get("/utilities/get-feed/1/");
                setFeed(resp.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        getAllFeed();
    }, [refetch]);

    return (
        <div>
            <Navbar/>
            <div className='feeds mt-3'>
                {/*<FeedBanners scroll={scrollToElement}/>*/}
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
                        <div className='flex pt-8 items-center justify-center flex-col' ref={elementRef}>
                            {feed.map((elt) =>
                                Object.keys(elt).includes("choices")
                                    ? <Poll
                                        {...elt}
                                        key={elt.id}
                                        access={user?.tokens?.access}
                                        refetch={setRefetch}
                                    />
                                    : <FeedBlogPost {...elt} key={elt.id}/>
                            )}
                        </div>
                    </main>
                    <aside>
                        <div className="pt-12">
                            <ul>
                                <li>Menu</li>
                            </ul>
                        </div>
                    </aside>
                </div>

                {/*<div className="feeds-content pb-3 pt-8 px-4 w-full flex bg-gray-200" ref={elementRef}>*/}
                {/*    <div className="feeds-sidebar flex relative top-0 left-0 bottom-0">*/}
                {/*        <ul className="bg-white w-full">*/}
                {/*            <li>Blogs</li>*/}
                {/*            <li>Polls</li>*/}
                {/*        </ul>*/}
                {/*    </div>*/}
                {/*    <div className="bg-white content">*/}
                {/*        <h1>hy</h1>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

export default BlogsPage;