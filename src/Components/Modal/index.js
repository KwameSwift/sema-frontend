import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { axiosClientWithHeaders } from "../../libs/axiosClient";
import CustomRadioInput from "../Common/CustomRadioButton";
import { getTransString } from "../../utils/helpers";

import "./style.scss";

const Modal = ({
  type,
  isOpen,
  setIsOpen,
  data,
  setRefetch,
  callbackAction,
  setData,
  className,
  initialData,
  extraData,
  parentBtnLoading,
}) => {
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [roleSelected, setRoleSelected] = useState(0);
  const [extraModalData, setExtraModalData] = useState({});

  const { t } = useTranslation();

  const handleSetData = (type, data, parentId) => {
    setData(type, data, parentId);
  };

  const modalStates = {
    delete: {
      name: "Delete",
      buttonText: "Delete",
      buttonBgFill: "#e14d2a",
      func: callbackAction,
      externalFunc: true,
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
    approvePoll: {
      name: "Approve Poll",
      buttonText: "Approve",
      buttonBgFill: "#001253",
      text: "Are you sure you want to approve this poll?",
      func: () => callbackAction("approved"),
      externalFunc: true,
    },
    unapprovePoll: {
      name: "Disapprove Poll",
      buttonText: "Disapprove",
      buttonBgFill: "#e14d2a",
      text: "Are you sure you want to disapprove this poll?",
      func: () => callbackAction("disapproved"),
      externalFunc: true,
    },
    deletePoll: {
      name: "Delete Poll",
      buttonText: "Delete",
      buttonBgFill: "#e14d2a",
      text: "Are you sure you want to delete this poll?",
      func: callbackAction,
      externalFunc: true,
    },
    addAdmin: {
      name: "Add User",
      buttonText: "Save",
      buttonBgFill: "#001253",
      content: (
        <div className="mt-5 add-admin-form">
          <div className="flex flex-col">
            <label>
              First Name<span className="text-[#e14d2a]">*</span>
            </label>
            <input
              type="text"
              name="first_name"
              className="border mt-3 h-[40px]"
              placeholder="Enter first name"
              onChange={setData}
              id="first_name"
            />
          </div>
          <div className="flex flex-col">
            <label>
              Last Name<span className="text-[#e14d2a]">*</span>
            </label>
            <input
              type="text"
              name="last_name"
              className="border mt-3 h-[40px]"
              placeholder="Enter last name"
              onChange={setData}
              id="last_name"
            />
          </div>
          <div className="flex flex-col">
            <label>
              Email<span className="text-[#e14d2a]">*</span>
            </label>
            <input
              type="email"
              name="email"
              className="border mt-3 h-[40px]"
              placeholder="Enter email address"
              id="email"
              onChange={setData}
            />
          </div>
          <div className="flex flex-col">
            <label>
              Mobile Number<span className="text-[#e14d2a]">*</span>
            </label>
            <input
              type="text"
              name="mobile_number"
              className="border mt-3 h-[40px]"
              placeholder="Enter mobile number"
              id="mobile_number"
              onChange={setData}
            />
          </div>
          <div className="flex max-w-[215px] flex-col">
            <label>
              Country<span className="text-[#e14d2a]">*</span>
            </label>
            <select
              onChange={setData}
              className="border mt-3 h-[40px]"
              name="country_id"
            >
              <option>Select country</option>
              {modalData?.map((elt) => (
                <option value={elt.id} key={elt.id}>
                  {elt.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label>
              Organization<span className="text-[#e14d2a]">*</span>
            </label>
            <input
              type="text"
              name="organization"
              className="border mt-3 h-[40px]"
              placeholder="Enter organization name"
              id="organization"
              onChange={setData}
            />
          </div>
          <div className="flex max-w-[220px] flex-col">
            <label>
              Role<span className="text-[#e14d2a]">*</span>
            </label>
            <select
              onChange={setData}
              className="border mt-3 h-[40px]"
              name="role_id"
            >
              <option>Select role</option>
              {extraModalData?.roles?.map((elt) => (
                <option value={elt.id} key={elt.id}>
                  {elt.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex max-w-[215px] flex-col">
            <label>
              Account type<span className="text-[#e14d2a]">*</span>
            </label>
            <select
              onChange={setData}
              className="border mt-3 h-[40px]"
              name="account_type"
            >
              <option>Select account type</option>
              <option value="Content Creator">Content Creator</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>
        </div>
      ),
      func: callbackAction,
      externalFunc: true,
    },
    assignRole: {
      name: "Assign Roles",
      buttonText: "Assign Role",
      buttonBgFill: "#001253",
      content: (
        <div className="mt-5 flex flex-col">
          <p className="font-bold">Select a user role for the selected user.</p>
          <label className="mt-4">Role</label>
          <select
            onChange={(e) => setRoleSelected(e.target.value)}
            className="mt-3 border h-[50px]"
          >
            <option>Select user role</option>
            {modalData?.map((elt) => (
              <option key={elt.id} value={elt.id}>
                {elt.name}
              </option>
            ))}
          </select>
        </div>
      ),
      func: callbackAction,
      externalFunc: true,
      text: "Are you sure you want to disapprove this blog?",
    },
    addRole: {
      name: "Add Role",
      buttonText: "Add Role",
      buttonBgFill: "#001253",
      content: (
        <div className="mt-5 flex flex-col">
          <p className="font-bold">Add a new user role.</p>
          <div className="flex flex-col">
            <label className="mt-4 font-bold">Name</label>
            <input
              type="text"
              className="placeholder:px-3 px-3 rounded mt-2 border h-[50px] w-[80%]"
              placeholder="Enter a title"
              onChange={(e) => handleSetData("name", e.target.value)}
            />
          </div>
          <div className="mt-5">
            <p className="mb-3 font-bold">Access Levels</p>
            <div className="access-levels-wrapper mb-3">
              {modalData?.map((elt) => (
                <div key={elt.id} className="flex">
                  <span className="w-[35%]">{elt.name}</span>
                  <div className="flex">
                    <span className="mr-4">
                      <CustomRadioInput
                        onChange={(e) =>
                          handleSetData("moduleData", e.target.value, elt.id)
                        }
                        optionKey="No Access"
                        defaultChecked={true}
                        name={elt.id}
                        value={0}
                        val={`${elt.id}-0`}
                      />
                    </span>
                    <span className="mr-4">
                      <CustomRadioInput
                        optionKey="Read"
                        onChange={(e) =>
                          handleSetData("moduleData", e.target.value, elt.id)
                        }
                        name={elt.id}
                        value={1}
                        val={`${elt.id}-1`}
                      />
                    </span>
                    <span className="mr-4">
                      <CustomRadioInput
                        optionKey="Edit"
                        onChange={(e) =>
                          handleSetData("moduleData", e.target.value, elt.id)
                        }
                        name={elt.id}
                        value={2}
                        val={`${elt.id}-2`}
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      func: callbackAction,
      externalFunc: true,
      text: "Are you sure you want to disapprove this blog?",
    },
  };

  const updateBlogStatus = async (approvalType) => {
    setLoading(true);
    try {
      await axiosClientWithHeaders.put("/super-admin/approve-blog-posts/", {
        blog_post_id: data,
      });
      setRefetch((prev) => !prev);
      setLoading(false);
      toast.success(`Blog ${approvalType} successfully`);
      await new Promise((r) => setTimeout(r, 2000));
      toggleModal();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setExtraModalData(extraData);
  }, [extraData]);

  useEffect(() => {
    setModalData(initialData);
  }, [initialData]);

  useEffect(() => {
    setLoading(parentBtnLoading);
  }, [parentBtnLoading]);

  return (
    <div>
      {isOpen && (
        <div className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div
              className={`bg-white max-w-[500px] ${className} rounded-lg p-6`}
            >
              <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-4">
                  {t(getTransString(modalStates[type]?.name))}
                </h2>
                <span className="close-btn" onClick={toggleModal}>
                  <IoCloseOutline size={20} fill="#eee" />
                </span>
              </div>

              {modalStates[type]?.content ? (
                <>{modalStates[type]?.content}</>
              ) : (
                <p className="text-[14px]">
                  {t(getTransString(modalStates[type]?.text))}
                </p>
              )}
              <div className="flex mt-8 justify-end items-center">
                <button
                  className="text-[14px] border rounded px-3 py-2"
                  onClick={toggleModal}
                >
                  {t("modal.cancel")}
                </button>
                <button
                  className="text-[14px] ml-2 text-white px-3 py-2 rounded"
                  style={{ backgroundColor: modalStates[type]?.buttonBgFill }}
                  onClick={
                    modalStates[type]?.externalFunc
                      ? () => modalStates[type]?.func(roleSelected)
                      : () => updateBlogStatus(`${modalStates[type]?.buttonText.toLowerCase()}d`)
                  }
                >
                  {loading
                    ? `${t(getTransString("Loading"))}...`
                    : t(getTransString(modalStates[type]?.buttonText))}
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
