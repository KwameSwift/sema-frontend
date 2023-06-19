import React, { useEffect, useRef, useState } from "react";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router";
import Layout from "../../../Components/Dashboard/Layout";
// import BlogCards from "./components/blogCards";
import EmptyImg from "../../../Assets/images/Empty-icon.jpg";
import { axiosClientWithHeaders } from "../../../libs/axiosClient";
// import { useSelector } from "react-redux";
import Modal from "../../../Components/Modal";
// import CardImg2 from "../../../Assets/images/test-blog/tour-main.webp";
// import CardImg3 from "../../../Assets/images/test-blog/dragon.webp";

import "./style.scss";
// import { isDocumentImage } from "../../../utils/helpers";
import ContentCreatorBlogCard from "../../../Components/ContentCreator/BlogPost";
import { BsPlus, BsSearch } from "react-icons/bs";
import { toast } from "react-toastify";

function BlogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState("");
  const [selectedId, setSelectedId] = useState(0);
  const [refetch, setRefetch] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [blogType, setBlogType] = useState(0);
  const [loading, setLoading] = useState(false);

  const firstRunRef = useRef(true);

  const navigate = useNavigate();

  const getAllBlogs = async (type = blogType, prev = true) => {
    try {
      const resp = await axiosClientWithHeaders.get(
        `/super-admin/all-blog-posts/${type}/${currentPage}/`
      );
      const data = resp.data;
      if (firstRunRef) {
        setTotalPages(data.total_pages);
        setTotalBlogs(data.total_data);
        firstRunRef.current = false;
      }
      if (prev) {
        setBlogs([...blogs, ...data.data]);
      } else {
        console.log(data.data);
        setBlogs(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBlog = async () => {
    setLoading(true);
    try {
      await axiosClientWithHeaders.delete(`/blog/delete-blog-post/${selectedId}/`);
      setLoading(false);
      toast.success("Blog deleted successfully");
      await new Promise((r) => setTimeout(r, 2000));
      setModalOpen(false);
      getAllBlogs(blogType, false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }

  const filterBlogs = (e) => {
    setBlogType(e.target.value);
    getAllBlogs(e.target.value, false);
  }

  const handleModalOpen = (type, state, id) => {
    setSelectedId(id);
    setModalState(type);
    setModalOpen(state);
  }

  useEffect(() => {
    getAllBlogs(blogType, true);
  }, [refetch, currentPage]);

  return (
    <>
      <Layout>
        <div className="admin-blog-page mx-5">
          <div className="p-8 mt-5 flex flex-col blog-header">
            <h1>Blogs</h1>
            <p className="text-[#fff]">Total blogs ({totalBlogs})</p>
          </div>
          <div className="flex justify-between mt-3 items-center">
            <div className="flex w-[80%]">
              <div className="border rounded-lg items-center w-[60%] flex mt-5">
                <BsSearch size={22} className="ml-3" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="outline-none p-4 h-[40px] w-[100%]"
                />
              </div>
              <div className="ml-10 flex flex-col">
                <label>Blog Type</label>
                <select
                  className="border rounded-lg p-1 w-[200px] h-[40px]"
                  onChange={filterBlogs}
                >
                  <option value={0}>All</option>
                  <option value={1}>Approved</option>
                  <option value={2}>Unapproved</option>
                </select>
              </div>
            </div>
            <div className="mt-5 mr-3">
              <button
                  className="text-[#fff] flex items-center rounded-md bg-[#001253] px-3 py-2"
                  onClick={() => navigate("/admin/blogs/add")}
                >
                <BsPlus size={25}/>Blogs
              </button>
            </div>
          </div>
          <div className="creator-blogs mt-10">
            {blogs?.map((elt, index) => (
              <>
                <ContentCreatorBlogCard
                  id={elt.id}
                  img={elt.cover_image
                      ? `${process.env.REACT_APP_BACKEND_DOMAIN}${elt.cover_image}`
                      : EmptyImg
                  }
                  title={elt.title}
                  description={elt.content}
                  author={elt.author__first_name + " " + elt.author__last_name}
                  posted_on={elt.created_on}
                  key={index}
                  status="Approve"
                  setModalOpen={handleModalOpen}
                />
              </>
            ))}
          </div>
          {totalPages !== currentPage
          && <div className="flex justify-center mb-3">
            <button
              className="see-more-btn"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              See More...
            </button>
          </div>}
        </div>
      </Layout>
      
      <Modal 
        data={selectedId}
        type={modalState} 
        isOpen={modalOpen} 
        setIsOpen={setModalOpen} 
        setRefetch={setRefetch}
        callbackAction={deleteBlog}
        parentBtnLoading={loading}
      />
    </>
  );
}

export default BlogsPage;
