import React, {useEffect, useState} from 'react'
import LeftSidebar from "../LeftSidebar";
import "./style.scss";
import {useDispatch, useSelector} from 'react-redux';
import {axiosClientWithHeaders} from '../../../libs/axiosClient';
import {setUserInfo} from '../../../Redux/slices/userSlice';
import {useNavigate} from 'react-router-dom';
import {BsArrowLeft} from "react-icons/bs";
import TopSection from "../../Dashboard/TopSection";


function ContentCreatorLayout({header, subChild, children, contentType}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);


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
        if (!user?.tokens?.access && !user.user.is_admin) {
            navigate("/");
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
            <LeftSidebar isOpen={true} user={user}/>
            <div className='creator-content h-[100vh] overflow-auto w-full bg-gray-200'>
                <TopSection
                    isOpen={isSidebarOpen}
                    setIsOpen={setIsSidebarOpen}
                />
                <div className='salutation mt-3 flex justify-between'>
                    <div className="flex">
                        <div className="mr-3 flex items-start justify-center cursor-pointer">
                            <BsArrowLeft fill={"#001253"} size={28} onClick={() => navigate(-1)}/>
                        </div>
                        <div>
                            <h1>{header}</h1>
                            <p className='mt-3'>{subChild}</p>
                        </div>
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
