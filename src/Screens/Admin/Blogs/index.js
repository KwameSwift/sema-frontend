import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Layout from "../../../Components/Dashboard/Layout";
import BlogCards from "./components/blogCards";
import CardImg1 from "../../../Assets/images/test-blog/Pula-Croatia.webp";
// import CardImg2 from "../../../Assets/images/test-blog/tour-main.webp";
// import CardImg3 from "../../../Assets/images/test-blog/dragon.webp";

import "./style.scss";
import { useNavigate } from "react-router";
import { axiosClientWithHeaders } from "../../../libs/axiosClient";
import { useSelector } from "react-redux";
import Modal from "../../../Components/Modal";

function BlogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [approvedBlogs, setApprovedBlogs] = useState([]);
  const [unApprovedBlogs, setUnApprovedBlogs] = useState([]);
  // const cardsPerPage = 5;

  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  // const data = [
  //   {
  //     img: CardImg1,
  //     title: "Main Title",
  //     description: "This is a description",
  //   },
  //   {
  //     img: CardImg2,
  //     title: "Main Title",
  //     description: "This is a description",
  //   },
  //   {
  //     img: CardImg3,
  //     title: "Main Title",
  //     description: "This is a description",
  //   },
  //   {
  //     img: CardImg2,
  //     title: "Main Title",
  //     description: "This is a description",
  //   },
  //   {
  //     img: CardImg1,
  //     title: "Main Title",
  //     description: "This is a description",
  //   },
  // ];

  // Calculate the index range of blog cards to display based on the current page
  // const startIndex = (currentPage - 1) * cardsPerPage;
  // const endIndex = startIndex + cardsPerPage;

  // Slice the data array to get the cards for the current page
  // const visibleCards = data.slice(startIndex, endIndex);

  // Function to handle next page
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Function to handle previous page
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleModalApprovalClick = (id) => {
    console.log(id);
  }

  useEffect(() => {
    const getApprovedBlogs = async () => {
      try {
        const resp = await axiosClientWithHeaders(user.tokens.access).get(
          "/super-admin/all-blog-posts/1/1/"
        );
        const data = resp.data.data;
        console.log(data);
        setApprovedBlogs(data);
      } catch (err) {
        console.log(err);
      }
    };

    const getUnApprovedBlogs = async () => {
      try {
        const resp = await axiosClientWithHeaders(user.tokens.access).get(
          "/super-admin/all-blog-posts/0/1/"
        );
        const data = resp.data.data;
        setUnApprovedBlogs(data);
      } catch (err) {
        console.log(err);
      }
    };

    getApprovedBlogs();
    getUnApprovedBlogs();
  }, []);

  return (
    <Layout>
      <div className="admin-blog-page mx-5">
        {/* Your existing code */}
        <div className="p-8 mt-5 flex justify-between blog-header">
          <h1>Blogs</h1>
          <button
            className="text-[#fff] add-blog-btn"
            onClick={() => navigate("/admin/blogs/add")}
          >
            Add Blog
          </button>
        </div>
        <div className="mt-8">
          <h3 className="font-bold text-[23px] ml-3">
            UnApproved Blogs ({unApprovedBlogs.length}){" "}
          </h3>
          <div className="blog-content mt-5">
            {unApprovedBlogs.map((elt, index) => (
              <BlogCards
                id={elt.id}
                img={CardImg1}
                title={elt.title}
                description={elt.content}
                author={elt.author__first_name + " " + elt.author__last_name}
                posted_on={elt.created_on}
                key={index}
                onClick={handleModalApprovalClick}
                status="Unapprove"
              />
            ))}
          </div>

          {/* Pagination buttons */}
          <div className="flex justify-center mt-4">
            <button
              className="btn-pagination"
              disabled={currentPage === 1}
              onClick={handlePrevPage}
            >
              <IoIosArrowBack className="pagination-icon" />
            </button>
            <button
              className="btn-pagination"
              // disabled={endIndex >= data.length}
              onClick={handleNextPage}
            >
              <IoIosArrowForward className="pagination-icon" />
            </button>
          </div>
        </div>
        <div className="mt-8 mb-8">
          <h3 className="font-bold text-[23px] ml-3">
            Approved Blogs ({approvedBlogs.length}){" "}
          </h3>
          <div className="blog-content mt-5">
            {approvedBlogs.map((elt, index) => (
              <BlogCards
                id={elt.id}
                img={CardImg1}
                title={elt.title}
                author={elt.author__first_name + " " + elt.author__last_name}
                description={elt.content}
                posted_on={elt.created_on}
                key={index}
                onClick={handleModalApprovalClick}
                status="Approve"
              />
            ))}
          </div>

          {/* Pagination buttons */}
          <div className="flex justify-center mt-4">
            <button
              className="btn-pagination"
              disabled={currentPage === 1}
              onClick={handlePrevPage}
            >
              <IoIosArrowBack className="pagination-icon" />
            </button>
            <button
              className="btn-pagination"
              // disabled={endIndex >= data.length}
              onClick={handleNextPage}
            >
              <IoIosArrowForward className="pagination-icon" />
            </button>
          </div>
        </div>
      </div>
      <Modal />
    </Layout>
  );
}

export default BlogsPage;
