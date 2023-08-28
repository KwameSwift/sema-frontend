import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {axiosClientWithHeaders} from "../../../../../libs/axiosClient";
import CustomTable from "../../../../../Components/Common/CustomTable";
import Layout from "../../../../../Components/Dashboard/Layout";
import {formatDate} from "../../../../../utils/helpers";
import {BsArrowLeft} from "react-icons/bs";
import {useNavigate} from "react-router";
import "./style.scss";


export default function AdminManageForumPage() {
    const {id} = useParams();
    const [forum, setForum] = useState({});

    const navigate = useNavigate();

    const getSingleForum = async () => {
        try {
            const resp = await axiosClientWithHeaders(`/super-admin/single-poll/${id}/`);
            const respData = resp.data.data;
            setForum(respData);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (id) {
          getSingleForum();
        }
    }, [id])


    return (
        <Layout>
            <div className="p-8 mt-3 flex flex-row blog-header">
                <div className="mr-3 flex items-start justify-center cursor-pointer">
                    <BsArrowLeft fill="#fff" size={28} onClick={() => navigate(-1)}/>
                </div>
                <div>
                    <h1>{forum?.question}</h1>
                    <p className="text-white mt-3">
                      {formatDate(forum?.start_date)} - {formatDate(forum?.end_date)}
                    </p>
                </div>
            </div>
            <h1 className="mt-3">Result</h1>
            <div>
                <h1 className="mt-5 mb-3">Comments</h1>
                <CustomTable
                    totalPages={1}
                    data={forum?.poll_votes || []}
                    headers={["Name", "Choice", "Comment"]}
                    idType={"user_key"}
                    currentPage={1}
                    isEditable={false}
                    isPaginated={false}
                    headerValues={["voter__first_name", "poll_choice__choice", "comments"]}
                />
            </div>
        </Layout>
    )
}
