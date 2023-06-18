import React, { useEffect, useRef, useState } from "react";
import ContentCreatorLayout from "../../../Components/ContentCreator/Layout";
import { isDocumentImage } from "../../../utils/helpers";
import EmptyImg from "../../../Assets/images/Empty-icon.jpg";
import { axiosClientWithHeaders } from "../../../libs/axiosClient";
import ContentCreatorBlogCard from "../../../Components/ContentCreator/BlogPost";

import "./style.scss";

function CreatorBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [, setModalState] = useState("");
  const [, setSelectedId] = useState(0);
  const [, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const firstRunRef = useRef(true);

  const handleModalOpen = (type, state, id) => {
    setSelectedId(id);
    setModalState(type);
    setModalOpen(state);
  };

  useEffect(() => {

    const getUserBlogs = async () => {
      try {
        const resp = await axiosClientWithHeaders.get(
          `/users/my-blog-posts/${currentPage}/`
        );
        const data = resp.data;
        if (firstRunRef) {
          setTotalPages(data.total_pages);
          setTotalBlogs(data.total_data);
          firstRunRef.current = false;
        }
        setBlogs([...blogs, ...data.data]);
      } catch (error) {
        console.log(error);
      }
    };

    getUserBlogs();
  }, [currentPage]);

  return (
    <ContentCreatorLayout
      header="Blogs"
      subChild={`Total Count (${totalBlogs})`}
      contentType="isBlog"
    >
      <div className="creator-blogs mt-10">
        {blogs.map((elt, index) => (
          <>
            <ContentCreatorBlogCard
              id={elt.id}
              img={
                Object.keys(isDocumentImage(elt.documents)).length > 0
                  ? isDocumentImage(elt.documents)?.document_location
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
