import React, { useEffect, useState } from 'react'
import { axiosClientWithHeaders } from '../../../libs/axiosClient';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';
import Navbar from '../../../Components/Common/Navbar';
import Avatar from "../../../Assets/images/person-img.png";
import { BsChat, BsHeartFill } from 'react-icons/bs';
import { getImageUrl } from '../../../utils/helpers';

// import { useParams } from 'react-router-dom';

function PreviewBlogDataPage() { 
  const [blog, setBlog] = useState({});
  const [bgImg, setBgImg] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getBlog = async () => {
      try {
        const resp = await axiosClientWithHeaders.get(`/blog/single-blog-post/${id}/`);
        setBlog(resp.data.data);
        setBgImg(resp.data.data.cover_image);
      } catch (err) {
        console.log(err);
      }
    }

    getBlog();
  }, [id])
  
  return ( 
    <>
      <Navbar />
      <div className='mt-8 pb-8'>
        <div className='head-details mx-20 pb-3 border-gray-200'>
          <h1 className='text-[35px] font-bold text-center'>{blog.title}</h1>
          <p className='mt-2 text-center'>{blog.description}</p>
        </div>
        <div className='author-details mt-5 flex justify-center'>
          <div>
            <img src={Avatar} className='w-[50px] h-[50px]'/>
          </div>
          <div className='flex items-center ml-3'>
            <span className='text-gray-400'>{blog.author__first_name} {blog.author__last_name}</span> 
          </div>
          <div className='flex ml-3 items-center'>
            <span className="hyphen"></span>
          </div>
          <div className='flex ml-3 items-center'>
            <div className='flex items-center'> 
              <BsHeartFill fill="#ccc" />
              <span className='ml-2 text-[#ccc]'>0</span>
            </div>
            <div className='flex ml-3 items-center'>
              <BsChat fill="#ccc" />
              <span className='ml-2 text-[#ccc]'>0</span>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center max-h-[500px]">
          <img src={getImageUrl(bgImg)}></img>
        </div>
        <div className='mt-8 mx-[5%]'>
          <ReactQuill
            theme="snow"
            value={blog?.content}
            readOnly={true}
            modules={{ toolbar: false }}
          />
        </div>
      </div>
    </>
  );
}

export default PreviewBlogDataPage;