import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Common/Navbar';
import { axiosClient } from '../../libs/axiosClient';
import FeedBlogPost from './components/feedBlogPost';
import "./style.scss";

function BlogsPage() {
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
    <div>
      <Navbar />
      <div className='feeds bg-gray-200'>
        <div className='flex items-center justify-center flex-col'>
          {blogs.map((elt) =>
            <FeedBlogPost {...elt} key={elt.id} />
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogsPage;