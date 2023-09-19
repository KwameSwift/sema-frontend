import React, {useEffect, useState} from "react";
import {axiosClientWithHeaders} from "../../../../../../libs/axiosClient";
import {Pagination} from "react-bootstrap";
import {toast} from "react-toastify";

function AdminForumRefactorTab({forumId}) {
    const [forumRequests, setForumRequests] = useState([]);

    const getForumRequests = async () => {
        try {
            const resp = await axiosClientWithHeaders.get(`/users/get-forum-join-requests/${forumId}/1/`);
            const respData = resp.data;
            setForumRequests(respData.data);
        } catch (err) {
            console.log(err);
        }
    }

    const approveRequest = async (id) => {
        try {
            await axiosClientWithHeaders.post(`users/approve-forum-request/${id}/`);
            toast.success("Forum request approved successfully");
            getForumRequests();
        } catch (err) {
            console.log(err);
        }
    }

    const declineRequest = async (id) => {
        try {
            await axiosClientWithHeaders.post(`users/decline-forum-request/${id}/`);
            toast.success("Forum request approved successfully");
            getForumRequests();
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getForumRequests();
    }, []);

    return (
        <div className="mt-8">
            <div className="w-full">
                <table className="relative min-w-full bg-white border border-gray-300">
                    <thead>
                    <tr>
                        {["Name", "Email", "Actions"].map((elt, index) => (
                            <th className="py-2 px-2 border-b text-left" key={index}>
                                {elt}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {forumRequests?.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="py-2 px-4 border-b">
                                {item.member__first_name + " " + item.member__last_name}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {item.member__email}
                            </td>
                            <td className="flex py-2 px-4 border-b">
                                <button
                                    className="text-[13px] text-white mr-1 bg-[#e14d2a] p-1"
                                    onClick={() => declineRequest(item.id)}
                                >Disprove
                                </button>
                                <button className="text-[13px] text-white bg-[#001253] p-1"
                                        onClick={() => approveRequest(item.id)}>Approve
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination/>
            </div>

        </div>
    )
}

export default AdminForumRefactorTab;
