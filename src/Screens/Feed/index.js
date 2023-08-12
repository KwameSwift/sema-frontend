import React, {useEffect, useRef, useState} from 'react'
import Navbar from '../../Components/Common/Navbar';
import {axiosClient} from '../../libs/axiosClient';
import FeedBlogPost from './components/feedBlogPost';
import Poll from "../../Components/Poll";
import {useSelector} from "react-redux";
import "./style.scss";

function BlogsPage() {
    const [feed, setFeed] = useState([]);
    const user = useSelector((store) => store.user);
    const [refetch, setRefetch] = useState(false);

    const elementRef = useRef(null);

    // const scrollToElement = () => {
    //     console.log('hydbmndbm')
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
            <div className='feeds'>
                {/*<FeedBanners scroll={scrollToElement}/>*/}
                <div className="bg-gray-200 p-8 text-center">
                    <h1>Forums Page</h1>
                </div>
                <div className='flex mt-8 items-center justify-center flex-col' ref={elementRef}>
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
            </div>
        </div>
    );
}

export default BlogsPage;