import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { resetUserData } from '../../Redux/slices/userSlice';
import Navbar from "../../Components/Common/Navbar";
import BlogPost from "../../Components/Blog/Post";
import { axiosClient } from "../../libs/axiosClient";
// import Poll from "../../Components/Poll";
// import UnderConstructionPage from "../../Components/PageUnderConstruction";
import "./style.scss";

function HomePage() {
  const [blogs, setBlogs] = useState([]);
  
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
  }, []);

  return (
    <div className="h-full">
      <Navbar />
      <div className="bg-gray-200 pb-8 h-full">
        <div className="banner-img h-[500px]">
          <div className="overlay flex">
            <div className="flex flex-col mx-[20%] justify-center items-center">
              <h1 className="text-[#fff] text-[2.5em] typing-animation">
                Exploring the Wonders of Nature.
              </h1>
              <p className="mt-6 text-[#dfdcdc] text-center">
                In this captivating blog, we delve into the breathtaking beauty of
                nature&apos;s landscapes and wildlife. Join us as we embark on
                thrilling adventures, witness awe-inspiring sights, and learn
                fascinating facts about the natural world.{" "}
              </p>
              <p className="mt-5 text-[15px] text-[#f8f8f8]">John Doe - 3 days ago. </p>
            </div>
          </div>
        </div>
        <div className="recent-articles flex flex-col justify-center mt-20">
          <div className="flex flex-col justify-center align-items">
            <h1 className="text-[40px] text-center">Recent Blogs</h1>
            <p className="text-center">Most Recent Posts</p>
          </div>
          <div className="blogs mt-8 px-8">
            {blogs.slice(0,3).map((elt, index) => 
              <BlogPost { ...elt } key={index} />
            )}
          </div>
          <div className="mt-8 flex justify-center items-center">
            <button className="py-2 px-4 see-more-btn">See More</button>
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
