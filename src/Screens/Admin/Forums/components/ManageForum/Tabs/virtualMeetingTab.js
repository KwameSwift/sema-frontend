import React, {useState} from "react";
import VirtualMeetingFormModal from "../../../../../Forum/SingleForum/components/virtualMeetingForm";
import NoMeetings from "../../../../../../Assets/images/no-meetings.png";
import RegisterMeetingFormModal from "../../../../../Forum/SingleForum/components/registerMeetingModal";

function AdminVirtualMeetingsTab({virtualMeetings, forumId, refetch, user}) {
    const [isOpen, setIsOpen] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
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
                        {virtualMeetings?.length || user?.tokens?.access
                            ? (
                                <div className="flex flex-wrap">
                                    <div className="container mx-auto p-6">
                                        <div
                                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                                            {virtualMeetings?.map((elt, index) =>
                                                <div key={index}>
                                                    <div
                                                        className="max-w-md bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
                                                        <div className="px-6 py-4">
                                                            <h2 className="text-[14px] font-semibold mb-2">{elt.meeting_agenda}</h2>
                                                            <p className="text-gray-600 text-[13px] mb-4">
                                                                Scheduled Start
                                                                Time: {new Date(elt.scheduled_start_time).toLocaleString()}
                                                            </p>
                                                            <p className="text-gray-600 text-[13px] mb-4">
                                                                Scheduled End
                                                                Time: {new Date(elt.scheduled_end_time).toLocaleString()}
                                                            </p>
                                                            <button
                                                                onClick={() => setRegisterModal(true)}
                                                                className="text-blue-500 underline text-[13px]"
                                                            >
                                                                Register
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-center items-center h-full w-full flex-col">
                                    <img src={NoMeetings} alt="No Chat rooms" width={90} height={20}/>
                                    <p className="mt-3 font-bold">No Media</p>
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
            <RegisterMeetingFormModal
                isOpen={registerModal}
                setIsOpen={setRegisterModal}
                forumId={forumId}
                refetch={refetch}
            />
        </>
    )
}

export default AdminVirtualMeetingsTab;