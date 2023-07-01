import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { resetUserData } from '../../Redux/slices/userSlice';
import Navbar from "../../Components/Common/Navbar";
import BlogPost from "../../Components/Blog/Post";
import { axiosClient } from "../../libs/axiosClient";
// import Poll from "../../Components/Poll";
// import UnderConstructionPage from "../../Components/PageUnderConstruction";
import HomeBanners from "./components/bannerSection";
import "./style.scss";

function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const { t } = useTranslation();

  const navigate = useNavigate();

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

  return (
    <div className="h-full">
      <Navbar />
      <div className="bg-gray-200 pb-8 h-full">
        <HomeBanners />
        <div className="recent-articles flex flex-col justify-center mt-20">
          <div className="flex flex-col justify-center align-items">
            <h1 className="text-[40px] text-center">{t("home.recentBlogs")}</h1>
            <p className="text-center">{t("home.mostRecentBlogs")}</p>
          </div>
          <div className="blogs mt-8 px-8">
            {blogs.slice(0, 3).map((elt, index) => (
              <BlogPost setRefetch={setRefetch} {...elt} key={index} />
            ))}
          </div>
          <div className="mt-8 flex justify-center items-center">
            <button
              className="py-2 px-4 see-more-btn"
              onClick={() => navigate("/blogs")}
            >
              {t("home.seeMore")}
            </button>
          </div>
        </div>
        {/* <div className="flex justify-start bg-[#fff] mt-20">
          <div className="recent-articles w-[80%] flex flex-col justify-center">
            <div className="flex flex-col justify-center align-items">
              <h1 className="text-[35px] mt-3 mx-8 text-left">Trending Polls</h1>
            </div>
            <div className="blogs mt-8 px-8">
              <Poll />
              <Poll />
            </div>
            <div className="mt-8 flex justify-center items-center">
              <button className="py-2 px-4 see-more-btn">See More</button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default HomePage;
