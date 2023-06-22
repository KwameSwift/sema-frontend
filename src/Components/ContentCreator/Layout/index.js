import React, { useEffect } from 'react'
import LeftSidebar from "../LeftSidebar";
import "./style.scss";
import { useDispatch, useSelector } from 'react-redux';
import { axiosClientWithHeaders } from '../../../libs/axiosClient';
import { setUserInfo } from '../../../Redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function ContentCreatorLayout({ header, subChild, children, contentType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  const addBlog = () => {
    return (
      <p onClick={() => navigate("/creator/blogs/add")}>Add Blog</p>
    )
  }

  const contentTypes = {
    "isBlog": addBlog(),
  }

  useEffect(() => {
    if (!user?.tokens?.access) {
      toast.error("Unauthorized to access this page");
      navigate("/login");
    }
  }, [user])

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const resp = await axiosClientWithHeaders.get("/users/my-profile/");
        dispatch(setUserInfo(resp.data.data));
      } catch (err) {
        console.log(err);
      }
    }

    getUserInfo();
  }, [])

  return ( 
    <div className="flex h-full justify-start">
      <LeftSidebar isOpen={true} user={user.user} />
      <div className='creator-content h-[100vh] overflow-auto w-full bg-gray-200'>
        <div className='salutation flex justify-between'>
          <div>
            <h1>{header}</h1>
            <p className='mt-3'>{subChild}</p>
          </div>
          {contentType 
          &&
          <div className='add-blog-btn'>
            {contentTypes[contentType]}
          </div>
          }
        </div>
        <>{children}</>
      </div>
    </div>
  );
}

export default ContentCreatorLayout;