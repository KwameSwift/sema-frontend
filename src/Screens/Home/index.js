import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { resetUserData } from '../../Redux/slices/userSlice';
import Navbar from "../../Components/Common/Navbar";
import BlogPost from "../../Components/Blog/Post";
import {axiosClient, axiosClientWithHeaders} from "../../libs/axiosClient";
import Poll from "../../Components/Poll";
// import UnderConstructionPage from "../../Components/PageUnderConstruction";
import HomeBanners from "./components/bannerSection";
import NoData from "../../Assets/images/no-data.png";
import NoBlog from "../../Assets/images/no-blog.png";
import "./style.scss";
import {useSelector} from "react-redux";
import ForumCard from "../Forum/SingleForum/components/forumCard";
import {BsFillArrowUpCircleFill} from "react-icons/bs";
import Footer from "../../Components/Common/Footer";

function HomePage() {
    const [blogs, setBlogs] = useState([]);
    const [forums, setForums] = useState([]);
    const [refetch, setRefetch] = useState(false);
    const [polls, setPolls] = useState([]);
    const [refetchPolls, setRefetchPolls] = useState(false);
    const user = useSelector((store) => store.user);
    const {t} = useTranslation();

    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const getApprovedPolls = async () => {
            try {
                if (user?.tokens?.access) {
                    const resp = await axiosClientWithHeaders.get(
                        "/users/approved-polls/1/"
                    );
                    setPolls(resp.data.data);
                } else {
                    const resp = await axiosClient.get("/polls/all-approved-polls/1/");
                    setPolls(resp.data.data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        getApprovedPolls();
    }, [refetchPolls]);

    useEffect(() => {
        const getAllBlogs = async () => {
            try {
                const resp = await axiosClient.get("/blog/all-published-blogs/1/");
                setBlogs(resp.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        getAllBlogs();
    }, [refetch]);

    useEffect(() => {
        const getAllForums = async () => {
            try {
                let resp = null;
                if (user.tokens.access) {
                    resp = await axiosClientWithHeaders.get('/forum/get-all-forums/1/1/');
                } else {
                    resp = await axiosClient.get('/forum/get-all-forums/1/1/');
                }
                setForums(resp.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        getAllForums();
    }, [refetch]);


    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Navbar/>
            <div className="bg-gray-200 pb-8 h-full">
                <HomeBanners/>
                <div className="recent-articles flex flex-col justify-center mt-20">
                    <div className="flex flex-col justify-center align-items">
                        <h1 className="text-[40px] text-center">{t("home.recentBlogs")}</h1>
                        <p className="text-center">{t("home.mostRecentBlogs")}</p>
                    </div>
                    {blogs.length ? (
                        <div>
                            <div className="blogs mt-8 px-8">
                                {blogs.slice(0, 3).map((elt, index) => (
                                    <BlogPost setRefetch={setRefetch} {...elt} key={index}/>
                                ))}
                            </div>
                            {blogs.length > 0 && blogs.length > 3 && (
                                <div className="mt-8 flex justify-center items-center">
                                    <button
                                        className="py-2 px-4 see-more-btn"
                                        onClick={() => navigate("/feed")}
                                    >
                                        {t("home.seeMore")}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center">
                            <img src={NoBlog} alt="" className="w-[200px] h-[200px]"/>
                        </div>
                    )}
                </div>
                <div className="flex justify-start bg-[#fff] mt-20">
                    <div className="recent-articles w-[100%] flex flex-col justify-center">
                        <div className="flex flex-col justify-center align-items">
                            <h1 className="text-[35px] mt-3 mx-8 text-left">
                                {t("home.trendingPolls")}
                            </h1>
                        </div>
                        {polls.length ? (
                            <div className="blogs h-full mt-8">
                                {polls.slice(0, 3).map((elt) => (
                                    <Poll
                                        {...elt}
                                        key={elt.id}
                                        access={user?.tokens?.access}
                                        refetch={setRefetchPolls}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center items-center p-12">
                                <img src={NoData} className="w-[100px] h-[100px]" alt=""/>
                            </div>
                        )}
                        {polls.length > 0 && polls.length > 3 && (
                            <div className="mt-8 mb-3 flex justify-center items-center">
                                <button className="py-2 px-4 see-more-btn" onClick={() => navigate('/feed')}>
                                    {t("home.seeMore")}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="recent-articles flex flex-col justify-center mt-20">
                    <div className="flex flex-col justify-center align-items">
                        <h1 className="text-[40px] text-center">{t('admin.forums')}</h1>
                        <p className="text-center">{t('home.recentForums')}</p>
                    </div>
                    {forums.length ? (
                        <div>
                            <div className="blogs mt-8 px-8">
                                {forums.slice(0, 3).map((elt, index) => (
                                    <ForumCard {...elt} key={index} isHome={true}/>
                                ))}
                            </div>
                            {forums.length > 0 && forums.length > 3 && (
                                <div className="mt-8 flex justify-center items-center">
                                    <button
                                        className="py-2 px-4 see-more-btn"
                                        onClick={() => navigate("/forums")}
                                    >
                                        {t("home.seeMore")}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center">
                            <img src={NoBlog} alt="" className="w-[200px] h-[200px]"/>
                        </div>
                    )}
                </div>
            </div>
            <BsFillArrowUpCircleFill
                size={40}
                fill="#001253"
                className="fixed right-10 bottom-10 cursor-pointer"
                onClick={scrollToTop}
            />
            <Footer/>
        </div>
    );
}

export default HomePage;
