import React, { useEffect, useRef, useState } from "react";
import ContentCreatorLayout from "../../../Components/ContentCreator/Layout";
import EmptyImg from "../../../Assets/images/Empty-icon.jpg";
import { axiosClientWithHeaders } from "../../../libs/axiosClient";
import ContentCreatorBlogCard from "../../../Components/ContentCreator/BlogPost";

import "./style.scss";
import { BsPlus, BsSearch } from "react-icons/bs";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

function CreatorBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [, setModalState] = useState("");
  const [, setSelectedId] = useState(0);
  const [, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [blogType, setBlogType] = useState(0);

  const navigate = useNavigate();

  const firstRunRef = useRef(true);
  const filterBlogs = (e) => {
    setBlogType(e.target.value);
    getAllBlogs(e.target.value, false);
  }

  const getAllBlogs = async (type = blogType, prev = true) => {
    try {
      const resp = await axiosClientWithHeaders.get(
        `/users/my-blog-posts/${type}/${currentPage}/`
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
        setBlogs(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const handleModalOpen = (type, state, id) => {
    setSelectedId(id);
    setModalState(type);
    setModalOpen(state);
  };

  const searchBlogs = async (term) => {
    try {
      const resp = await axiosClientWithHeaders.post("/blog/search-blog-post/", {
        search_query: term
      });
      setBlogs(resp.data.data);
    } catch (err) {
      console.error(err);
    }
  }


  const testImageRetrieve = (data) => {
    return data?.cover_image === "null" || data?.cover_image === null;
  }

  const debouncedSearch = debounce((term) => {
    // Perform your search logic here
    searchBlogs(term);
  }, 300); 

  useEffect(() => {
    getAllBlogs();
  }, [currentPage]);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery])

  return (
    <ContentCreatorLayout
      header="Blogs"
      subChild={`Total Count (${totalBlogs})`}
      contentType="isBlog"
    >
      <div className="flex justify-between mt-3 items-center">
        <div className="flex w-[80%]">
          <div className="border bg-[#fff] rounded-lg items-center w-[60%] flex mt-5">
            <BsSearch size={22} className="ml-3" />
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
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
        {blogs.map((elt, index) => (
          <>
            <ContentCreatorBlogCard
              id={elt.id}
              img={testImageRetrieve(elt)
                ? EmptyImg
                : `${process.env.REACT_APP_BACKEND_DOMAIN}${elt.cover_image}`
              }
              title={elt.title}
              description={elt.description}
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
      && <div className="flex justify-center">
        <button
          className="see-more-btn"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          See More...
        </button>
      </div>}
    </ContentCreatorLayout>
  );
}

export default CreatorBlogs;
