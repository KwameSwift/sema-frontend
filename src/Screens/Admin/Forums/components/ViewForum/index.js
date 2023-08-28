import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosClientWithHeaders } from "../../../../../libs/axiosClient";
import Layout from "../../../../../Components/Dashboard/Layout";
// import { BsArrowLeft } from "react-icons/bs";
// import { useNavigate } from "react-router";
import "./style.scss";

export default function AdminViewForumPage() {
  const { id } = useParams();
  const [forum, setForum] = useState({});

  //   const navigate = useNavigate();

  const getSingleForum = async () => {
    try {
      const resp = await axiosClientWithHeaders(`/forum/get-forum/${id}/`);
      const respData = resp.data.data;
      setForum(respData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      getSingleForum();
    }
  }, [id]);

  return (
    <Layout>
      <div>
        <h1>{forum?.topic}</h1>
      </div>
    </Layout>
  );
}
