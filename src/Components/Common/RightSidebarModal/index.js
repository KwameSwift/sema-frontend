import React, {useEffect, useState} from 'react';
import "./style.scss";
import {BsCheckCircleFill, BsX} from "react-icons/bs";
import Avatar from "../../../Assets/images/person-img.png";
import {axiosClientWithHeaders} from "../../../libs/axiosClient";
import {toast} from "react-toastify";

const RightSidebarModal = ({isOpen, setIsOpen, userData, refetch}) => {
    const [user, setUser] = useState({});
    const verifyUser = async () => {
        try {
            await axiosClientWithHeaders.put("/super-admin/verify-users/", {
                user_key: user?.user_key,
            });
            refetch();
            toast.success("User status updated");
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (userData) {
            setUser(userData);
        }
    }, [user])

    return (
        <div className="flex">
            {/* Modal sidebar */}
            {isOpen && <div className="fixed inset-0 bg-black opacity-50 screen-overlay"></div>}
            <div>
                <div
                    className={`fixed right-sidebar overflow-auto inset-y-0 right-0 bg-white text-white pt-4 px-4 transform ${
                        isOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out`}
                    id="sidebar"
                >

                    <div className="flex justify-end">
                    <span className="close-btn bg-gray-200 cursor-pointer"
                          onClick={() => setIsOpen(false)}><BsX fill="#000"/></span>
                    </div>
                    <div
                        className="w-full py-2 mt-4 px-4 flex flex-col items-center justify-start">
                        <div className="profile-pic-cover">
                            <img src={user?.profile_image ? user?.profile_image : Avatar}
                                 className="rounded-full w-[150px] h-[150px]" alt=""/>
                        </div>
                        <h2 className="ml-2 mt-3 font-bold flex text-black items-center text-[17px]">
                    <span>
                        {user?.first_name} {user?.last_name}
                    </span>
                            {user?.is_verified && (
                                <span>
                              <BsCheckCircleFill stroke="#000" className="ml-1"/>
                            </span>
                            )}
                        </h2>
                        <p className="text-[#000] text-[15px]">{user?.email}</p>
                    </div>
                    <div className="mt-3 user-details">
                        <div className="mb-3">
                            <h3>Organization</h3>
                            <span>{user?.organization}</span>
                        </div>
                        <div className="mb-3">
                            <h3>Country</h3>
                            <span>{user?.country__name}</span>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="mb-3">
                                <h3>Mobile Number</h3>
                                <span>{user?.mobile_number || "N/A"}</span>
                            </div>
                            <div className="mb-3 mx-5">
                                <h3>Role</h3>
                                <span>{user?.role__name}</span>
                            </div>
                        </div>

                        <div className="mb-3">
                            <h3>Links</h3>
                            {user?.links?.split(", ").map((elt) =>
                                <div key={elt} className="mt-2">
                                    <a href={elt} className="text-[blue] underline">{elt}</a>
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <h3 className="mb-3">Bio</h3>
                            <textarea rows={6} placeholder={user?.bio || "N/A"} disabled
                                      className="border p-2 w-full text-[#000]"></textarea>
                        </div>
                    </div>
                    <div className="relative bottom-0 left-0 mb-3">
                        <button type="button" onClick={verifyUser}
                                className="text-white px-3 py-1 rounded bg-[#001253]">
                            {user?.is_verified ? "Unverify" : "Verify"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSidebarModal;
