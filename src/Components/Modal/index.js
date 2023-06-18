import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

import "./style.scss";
import { axiosClientWithHeaders } from "../../libs/axiosClient";
import { toast } from "react-toastify";

const Modal = ({ type, isOpen, setIsOpen, data, setRefetch }) => {
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [loading, setLoading] = useState(false);

  const modalStates = {
    delete: {
      name: "Delete",
      buttonText: "Delete",
      buttonBgFill: "#e14d2a",
      text: "Are you sure you want to delete this blog?",
    },
    approve: {
      name: "Approve Blog",
      buttonText: "Approve",
      buttonBgFill: "#001253",
      text: "Are you sure you want to approve this blog?",
    },
    unapprove: {
      name: "Disapprove Blog",
      buttonText: "Disapprove",
      buttonBgFill: "#e14d2a",
      text: "Are you sure you want to disapprove this blog?",
    },
  };

  const updateBlogStatus = async () => {
    setLoading(true);
    try {
      await axiosClientWithHeaders.put("/super-admin/approve-blog-posts/", {
        blog_post_id: data
      });
      setRefetch(prev => !prev);
      setLoading(false);
      toast.success("Blog approved successfully");
      await new Promise((r) => setTimeout(r, 2000));
      toggleModal();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  // const handleAction = () => {

  // }

  return (
    <div>
      {isOpen && (
        <div className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="bg-white max-w-[500px] rounded-lg p-4">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-4">
                  {modalStates[type]?.name}
                </h2>
                <span className="close-btn" onClick={toggleModal}>
                  <IoCloseOutline size={20} fill="#eee" />
                </span>
              </div>

              <p className="text-[14px]">{modalStates[type]?.text}</p>
              <div className="flex mt-8 justify-end items-center">
                <button className="text-[14px] px-2 py-2  border rounded px-3 py-2" onClick={toggleModal}>
                  Cancel
                </button>
                <button
                  className="text-[14px] ml-2 text-white px-2 py-2 rounded"
                  style={{ backgroundColor: modalStates[type]?.buttonBgFill }}
                  onClick={updateBlogStatus}
                >
                  {loading ? "Loading..." : modalStates[type]?.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
