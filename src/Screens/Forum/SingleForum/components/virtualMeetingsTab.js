import React, {useState} from "react";
import VirtualMeetingFormModal from "./virtualMeetingForm";
import SuggestionsSection from "./suggestionsSection";
import NoMeetings from "../../../../Assets/images/no-meetings.png";
import RegisterMeetingFormModal from "./registerMeetingModal";
import {BsPersonFill} from "react-icons/bs";

function VirtualMeetingsTab({virtualMeetings, forumId, refetch, suggestedForums, user, isMember}) {
    const [isOpen, setIsOpen] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const [meetingId, setMeetingId] = useState(null);

    const handleRegisterModal = (id) => {
        setMeetingId(id);
        setRegisterModal(true);
    }


    return (
        <>
            <div className="forum-chats-page flex justify-between h-full">
                <div className="mr-3 w-full">
                    <div className="h-full">
                        {virtualMeetings?.length && user?.tokens?.access && isMember
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
                                                            <p className="text-gray-600 text-[13px] mb-1">
                                                                Meeting Link
                                                            </p>
                                                            <a href={elt?.meeting_url}
                                                               className="mt-2 mb-3 text-[12px] text-[#0000FF] underline">
                                                                {elt?.meeting_url}
                                                            </a>

                                                            {!elt?.is_registered && <button
                                                                onClick={() => handleRegisterModal(elt.id)}
                                                                className="text-blue-500 underline text-[13px]"
                                                            >
                                                                Register
                                                            </button>
                                                            }
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
                                <div className="flex justify-center items-center h-full w-full flex-col">
                                    <img src={NoMeetings} alt="No Chat rooms" width={90} height={20}/>
                                    <p className="mt-3 font-bold">No virtual meetings</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <SuggestionsSection
                    suggestedForums={suggestedForums}
                    userTokens={user?.tokens}
                    id={forumId}
                    isMember={isMember}
                    setRefetch={refetch}
                />
            </div>
            <VirtualMeetingFormModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                forumId={forumId}
                refetch={refetch}
                setMeetingId={setMeetingId}
            />
            <RegisterMeetingFormModal
                isOpen={registerModal}
                setIsOpen={setRegisterModal}
                meetingId={meetingId}
                refetch={refetch}
            />
        </>
    )
}

export default VirtualMeetingsTab;
