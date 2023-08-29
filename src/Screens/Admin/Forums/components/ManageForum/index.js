import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {axiosClientWithHeaders} from "../../../../../libs/axiosClient";
import CustomTable from "../../../../../Components/Common/CustomTable";
import Layout from "../../../../../Components/Dashboard/Layout";
import {BsArrowLeft} from "react-icons/bs";
import {useNavigate} from "react-router";
import "./style.scss";
import {useSelector} from "react-redux";


export default function AdminManageForumPage() {
    const {id} = useParams();
    const [forumRequests, setForumRequests] = useState([]);
    const [totalForums, setTotalForums] = useState(0);
    const selectedForum = useSelector((store) => store.forum);

    const navigate = useNavigate();

    const getSingleForum = async () => {
        try {
            const resp = await axiosClientWithHeaders(`/users/get-forum-join-requests/${id}/1/`);
            const respData = resp.data;
            setForumRequests(respData.data);
            setTotalForums(respData.total_data);
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
            <div className="mx-2 manage-forum">
                <div className="p-8 mt-3 flex flex-row blog-header">
                    <div className="mr-3 flex items-start justify-center cursor-pointer">
                        <BsArrowLeft fill="#fff" size={28} onClick={() => navigate(-1)}/>
                    </div>
                    <div>
                        <h1>Forum Join Requests</h1>
                        <p className="text-white mt-3">
                            {totalForums} Requests
                        </p>
                    </div>
                </div>
                <h1 className="mt-6 title">{selectedForum?.topic}</h1>
                <p className="description">{selectedForum?.description}</p>
                <div className="mt-8">
                    <CustomTable
                        totalPages={1}
                        data={forumRequests}
                        headers={["Name", "Email", "Actions"]}
                        idType={"user_key"}
                        currentPage={1}
                        isEditable={false}
                        isPaginated={true}
                        headerValues={["member__first_name", "member__email"]}
                    />
                </div>
            </div>
        </Layout>
    )
}
