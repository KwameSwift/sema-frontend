import React, {useState} from "react";
import VirtualMeetingFormModal from "../../../../../Forum/SingleForum/components/virtualMeetingForm";
import NoMeetings from "../../../../../../Assets/images/no-meetings.png";
import {axiosClientWithHeaders} from "../../../../../../libs/axiosClient";
import VirtualMeetingAttendeesModal from "../../../../../Forum/SingleForum/components/virtualMeetingAttendeesModal";
import {BsPersonFill} from "react-icons/bs";

function AdminVirtualMeetingsTab({virtualMeetings, forumId, refetch, user}) {
    const [isOpen, setIsOpen] = useState(false);
    const [openAttendeesModal, setOpenAttendeesModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [attendees, setAttendees] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [, setTotalAttendees] = useState(0);

    const getMeetingAttendees = async (id) => {
        try {
            const resp = await axiosClientWithHeaders.get(
                `forum/get-meeting-attendants/${id}/${currentPage}/`
            );
            setTotalPages(resp.data.total_pages);
            setTotalAttendees(resp.data.total_data);
            setAttendees(resp.data.data);
        } catch (err) {
            console.error(err);
        }
    }

    const handleAttendeesModal = async (id) => {
        await getMeetingAttendees(id);
        setOpenAttendeesModal(true);
    }

    return (
        <>
            <div className="forum-chats-page flex justify-between h-full">
                <div className="mr-3 w-full">
                    <div className="flex justify-end">
                        <button
                            className="bg-[#FC8A2B] rounded-1 py-1 px-2 text-[14px] text-[#fff]"
                            onClick={() => setIsOpen(true)}
                        >
                            + New Meeting
                        </button>
                    </div>
                    <div className="h-full">
                        {virtualMeetings?.length && user?.tokens?.access
                            ? (
                                <div className="flex flex-wrap">
                                    <div className="container mx-auto p-6">
                                        <div
                                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                                            {virtualMeetings?.map((elt, index) =>
                                                <div key={index}>
                                                    <div
                                                        className="max-w-md bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform transform hover:scale-105 flex flex-col justify-between">
                                                        <div className="px-6 pt-4">
                                                            <h2 className="text-[14px] font-semibold mb-2">{elt.meeting_agenda}</h2>
                                                            <p className="text-gray-600 text-[13px] mb-4">
                                                                Scheduled Start
                                                                Time: {new Date(elt.scheduled_start_time).toLocaleString()}
                                                            </p>
                                                            <p className="text-gray-600 text-[13px] mb-4">
                                                                Scheduled End
                                                                Time: {new Date(elt.scheduled_end_time).toLocaleString()}
                                                            </p>
                                                            <p className="text-gray-600 text-[13px]">
                                                                Attendees
                                                            </p>
                                                            <div className="flex mb-3">
                                                                <p className={`text-[13px] text-[#0000FF]
                                                                cursor-pointer underline`
                                                                }
                                                                   onClick={() => handleAttendeesModal(elt.id)}>View</p>
                                                            </div>
                                                            <p className="text-blue text-[12px] underline">{elt?.meeting_url}</p>
                                                        </div>
                                                        <div className="flex justify-end p-3">
                                                            <BsPersonFill/>
                                                            <span className="text-[12px]">{elt.total_attendees}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-center items-center min-h-[60vh] w-full flex-col">
                                    <img src={NoMeetings} alt="No virtual meetings" width={90} height={20}/>
                                    <p className="mt-3 font-bold">No virtual meetings</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <VirtualMeetingFormModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                forumId={forumId}
                refetch={refetch}
            />
            <VirtualMeetingAttendeesModal
                forumId={forumId}
                attendees={attendees}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                getMeetingAttendees={getMeetingAttendees}
                isOpen={openAttendeesModal}
                setIsOpen={setOpenAttendeesModal}
            />
        </>
    )
}

export default AdminVirtualMeetingsTab;
