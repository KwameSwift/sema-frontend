import React from 'react';
import {LiaTimesSolid} from "react-icons/lia";
import {Pagination} from "react-bootstrap";

const MemberList = ({members}) => {
    return (
        <div className="bg-white shadow-md rounded my-4">
            <table className="min-w-full">
                <thead>
                <tr>
                    <th className="border-b px-4 py-2">Name</th>
                    <th className="border-b px-4 py-2">Email</th>
                    <th className="border-b px-4 py-2">Mobile Number</th>
                    <th className="border-b px-4 py-2">Country</th>
                </tr>
                </thead>
                <tbody>
                {members.map((member) => (
                    <tr key={member.id}>
                        <td className="border-b px-4 py-2">
                            {member.first_name} {member.last_name}
                        </td>
                        <td className="border-b px-4 py-2">{member.email}</td>
                        <td className="border-b px-4 py-2">{member.mobile_number}</td>
                        <td className="border-b px-4 py-2">{member.country__name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};


function VirtualMeetingAttendeesModal(props) {
    return (
        <>{
            props?.isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

                    <div
                        className="modal-container bg-white w-12/12 mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content p-4">
                            <div className="flex justify-between">
                                <h3 className="font-bold">Meeting Attendees</h3>
                                <LiaTimesSolid size={20} className="cursor-pointer"
                                               onClick={() => props?.setIsOpen(false)}/>
                            </div>
                            <div>
                                <div>
                                    <MemberList members={props.attendees}/>
                                </div>
                                <Pagination
                                    getData={props.getMeetingAttendees}
                                    currentPage={props.currentPage}
                                    setCurrentPage={props.setCurrentPage}
                                    totalPages={props.totalPages}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }</>
    )
}

export default VirtualMeetingAttendeesModal;
