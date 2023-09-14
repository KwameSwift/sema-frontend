import React, {useState} from "react";
import VirtualMeetingFormModal from "./virtualMeetingForm";

function VirtualMeetingsTab({virtualMeetings, forumId, refetch}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div className="flex justify-end">
                <button
                    className="bg-[#FC8A2B] rounded-1 py-1 px-2 text-[14px] text-[#fff]"
                    onClick={() => setIsOpen(true)}
                >
                    + New Meeting
                </button>
            </div>
            <div className="flex flex-wrap">
                <div className="container mx-auto p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {virtualMeetings?.map((elt, index) =>
                            <div key={index}>
                                <div
                                    className="max-w-md bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
                                    <div className="px-6 py-4">
                                        <h2 className="text-[14px] font-semibold mb-2">{elt.meeting_agenda}</h2>
                                        <p className="text-gray-600 text-[13px] mb-4">
                                            Scheduled Start Time: {new Date(elt.scheduled_start_time).toLocaleString()}
                                        </p>
                                        <p className="text-gray-600 text-[13px] mb-4">
                                            Scheduled End Time: {new Date(elt.scheduled_end_time).toLocaleString()}
                                        </p>
                                        <a
                                            href={elt.meeting_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 underline text-[13px]"
                                        >
                                            Join Meeting
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <VirtualMeetingFormModal isOpen={isOpen} setIsOpen={setIsOpen} forumId={forumId} refetch={refetch}/>
        </div>
    )
}

export default VirtualMeetingsTab;
