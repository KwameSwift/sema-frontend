import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { useNavigate } from "react-router";
import Layout from "../../../Components/Dashboard/Layout";
import BlogCards from "./components/blogCards";
import EmptyImg from "../../../Assets/images/Empty-icon.jpg";
import { axiosClientWithHeaders } from "../../../libs/axiosClient";
// import { useSelector } from "react-redux";
import Modal from "../../../Components/Modal";
// import CardImg2 from "../../../Assets/images/test-blog/tour-main.webp";
// import CardImg3 from "../../../Assets/images/test-blog/dragon.webp";

import "./style.scss";
import { isDocumentImage } from "../../../utils/helpers";

function BlogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [approvedBlogs, setApprovedBlogs] = useState([]);
  const [unApprovedBlogs, setUnApprovedBlogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState("");
  const [selectedId, setSelectedId] = useState(0);
  const [refetch, setRefetch] = useState(false);
  // const cardsPerPage = 5;

  // const navigate = useNavigate();
  // const user = useSelector((store) => store.user);

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

  const handleModalOpen = (type, state, id) => {
    setSelectedId(id);
    setModalState(type);
    setModalOpen(state);
  }

  useEffect(() => {
    const getApprovedBlogs = async () => {
      try {
        const resp = await axiosClientWithHeaders.get(
          "/super-admin/all-blog-posts/1/1/"
        );
        const data = resp.data.data;
        setApprovedBlogs(data);
      } catch (err) {
        console.log(err);
      }
    };

    const getUnApprovedBlogs = async () => {
      try {
        const resp = await axiosClientWithHeaders.get(
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
  }, [refetch]);

  return (
    <>
      <Layout>
        <div className="admin-blog-page mx-5">
          <div className="p-8 mt-5 flex justify-between blog-header">
            <h1>Blogs</h1>
          </div>
          <div className="mt-8">
            <h3 className="font-bold text-[23px] ml-3">
              Unapproved Blogs ({unApprovedBlogs.length}){" "}
            </h3>
            <div className="blog-content mt-5">
              {unApprovedBlogs.map((elt, index) => (
                <BlogCards
                  id={elt.id}
                  img={Object.keys(isDocumentImage(elt.documents)).length > 0 
                    ?  isDocumentImage(elt.documents)?.document_location 
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
                  img={Object.keys(isDocumentImage(elt.documents)).length > 0 
                    ?  `${process.env.REACT_APP_BACKEND_DOMAIN}${isDocumentImage(elt.documents)?.document_location}`
                    : EmptyImg
                  }
                  title={elt.title}
                  author={elt.author__first_name + " " + elt.author__last_name}
                  description={elt.content}
                  posted_on={elt.created_on}
                  key={index}
                  onClick={handleModalApprovalClick}
                  status="Disapprove"
                  setModalOpen={handleModalOpen}
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
      </Layout>
      
      <Modal 
        data={selectedId}
        type={modalState} 
        isOpen={modalOpen} 
        setIsOpen={setModalOpen} 
        setRefetch={setRefetch}
      />
    </>
  );
}

export default BlogsPage;
