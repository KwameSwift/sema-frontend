import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { axiosClientWithHeaders } from '../../../libs/axiosClient';
import Navbar from '../../../Components/Common/Navbar';

function SinglePost() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    if (id) {
      const getSingleBlog = async () => {
        try {
          const resp = await axiosClientWithHeaders.get(`/blog/single-blog-post/${id}/`);
          setBlog(resp.data.data);
        } catch (err) {
          console.error(err);
        }
      }
  
      getSingleBlog();
    }
  }, [id])

  return ( 
    <div className='h-full'>
      <Navbar />
      <div className='mt-8 px-5'>
        <div>
          <h1 className='text-center text-[3rem]'>{blog.title}</h1>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default SinglePost;