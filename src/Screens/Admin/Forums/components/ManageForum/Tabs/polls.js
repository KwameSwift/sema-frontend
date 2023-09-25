import React, {useEffect, useState} from "react";
import NoPolls from "../../../../../../Assets/images/no-polls.png";
import AddPollModal from "./addPoll";
import {axiosClientWithHeaders} from "../../../../../../libs/axiosClient";
import Pagination from "../../../../../../Components/Common/Pagination";
import AdminForumPollCard from "./pollCard";
import Modal from "../../../../../../Components/Modal";
import {toast} from "react-toastify";

function AdminPollTab({forumId, user}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [polls, setPolls] = useState([]);
    const [selectedId, setSelectedId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [refetch, setRefetch] = useState(false);

    const getPolls = async () => {
        try {
            const resp = await axiosClientWithHeaders.get(
                `/forum/get-all-forum-polls/${forumId}/${currentPage}/`
            );
            console.log(resp.data);
            const respData = resp.data;
            setPolls(respData.data);
            setTotalPages(respData.total_pages);
        } catch (err) {
            console.error(err);
        }
    }

    const handlePollDelete = async () => {
        setLoading(true);
        try {
            await axiosClientWithHeaders.delete("forum/delete-forum-poll/" + selectedId + "/");
            toast.success("Poll deleted");
            setIsDeleteOpen(false);
            setRefetch(prev => !prev);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getPolls();
    }, [refetch, currentPage]);

    return (
        <>
            <div className="forum-chats-page flex justify-between h-full">
                <div className="mr-3 w-full">
                    <div className="flex justify-end">
                        <button
                            className="bg-[#FC8A2B] rounded-1 py-1 px-2 text-[14px] text-[#fff]"
                            onClick={() => setIsOpen(true)}
                        >
                            + New Poll
                        </button>
                    </div>
                    <div className="h-full">
                        {polls?.length && user?.tokens?.access
                            ? (
                                <div className="flex flex-wrap">
                                    <div className="container p-6">
                                        <div
                                            className="flex flex-wrap">
                                            {polls?.map((elt, index) =>
                                                <AdminForumPollCard
                                                    setModalOpen={setIsDeleteOpen}
                                                    setSelectedID={setSelectedId}
                                                    {...elt}
                                                    key={index}
                                                />
                                            )}
                                        </div>
                                        {polls?.length > 0 && <Pagination
                                            getData={getPolls}
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                            totalPages={totalPages}
                                        />}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-center items-center h-full min-h-[60vh] w-full flex-col">
                                    <img src={NoPolls} alt="No Polls" width={90} height={20}/>
                                    <p className="mt-3 font-bold">No Polls</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <AddPollModal isOpen={isOpen} setIsOpen={setIsOpen} forumId={forumId} refetch={setRefetch}/>
            <Modal
                data={selectedId}
                type={"deletePoll"}
                isOpen={isDeleteOpen}
                setIsOpen={setIsDeleteOpen}
                callbackAction={handlePollDelete}
                parentBtnLoading={loading}
            />
        </>
    )
}

export default AdminPollTab;
