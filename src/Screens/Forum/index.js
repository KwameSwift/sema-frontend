import React, {useEffect, useRef, useState} from 'react'
import Navbar from '../../Components/Common/Navbar';
import {axiosClient, axiosClientWithHeaders} from '../../libs/axiosClient';
// import {useSelector} from "react-redux";
import ForumCard from "./SingleForum/components/forumCard";
import {useSelector} from "react-redux";
import "./style.scss";

function ForumsPage() {
    const [forums, setForums] = useState([]);
    const [category, setCategory] = useState("All");
    const user = useSelector((store) => store.user.tokens);
    const [refetch,] = useState(false);

    const elementRef = useRef(null);

    // const scrollToElement = () => {
    //     if (elementRef.current) {
    //         elementRef.current.scrollIntoView({behavior: 'smooth'});
    //     }
    // };

    useEffect(() => {
        const getAllForums = async () => {
            try {
                let resp = null;
                if (user.access) {
                    resp = await axiosClientWithHeaders.get(`/forum/get-all-forums/1/`);
                } else {
                    resp = await axiosClient.get(`/forum/get-all-forums/1/`);
                }
                setForums(resp.data.data);
            } catch (err) {
                console.log(err);
            }
        };

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
                                <li className={category === "All" && "selected"}
                                    onClick={() => setCategory("All")}>All
                                </li>
                                <li className={category === "Public" && "selected"}
                                    onClick={() => setCategory("Public")}>Public
                                </li>
                                <li className={category === "Private" && "selected"}
                                    onClick={() => setCategory("Private")}>Private
                                </li>
                            </ul>
                        </div>
                    </aside>
                    <main>
                        <div className='flex flex-wrap justify-center pt-8' ref={elementRef}>
                            {forums.map((elt, index) =>
                                <ForumCard {...elt} key={index}/>
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

export default ForumsPage;
