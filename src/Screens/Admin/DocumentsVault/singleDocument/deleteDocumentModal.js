import {IoCloseOutline} from "react-icons/io5";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {axiosClientWithHeaders} from "../../../../libs/axiosClient";
import {toast} from "react-toastify";
import {getTransString} from "../../../../utils/helpers";

function DeleteDocumentModal({documentId, isOpen, setIsOpen, refetch}) {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);

    const toggleModal = () => {
        setIsOpen(false);
    }

    const deleteChatRoom = async () => {
        setLoading(true);
        try {
            await axiosClientWithHeaders.delete(`/document-vault/delete-vault-document/${documentId}/`);
            toast.success(t('alerts.documentDeleted'));
            toggleModal();
            refetch(prev => !prev);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }
    return (
        <div>
            {isOpen && (
                <div className="modal fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                        <div
                            className={`bg-white max-w-[500px] rounded-lg p-6`}
                        >
                            <div className="flex justify-between">
                                <h2 className="text-xl font-bold mb-4">
                                    Delete document
                                </h2>
                                <span className="close-btn" onClick={toggleModal}>
                  <IoCloseOutline size={20} fill="#eee"/>
                </span>
                            </div>

                            <p>Are you sure you want to delete this document?</p>
                            <div className="flex mt-8 justify-end items-center">
                                <button
                                    className="text-[14px] border rounded px-3 py-2"
                                    onClick={toggleModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="text-[14px] ml-2 text-white px-3 py-2 rounded"
                                    style={{backgroundColor: "#e14d2a"}}
                                    onClick={deleteChatRoom}
                                >
                                    {loading
                                        ? `${t(getTransString("Loading"))}...`
                                        : t(getTransString("Delete"))}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DeleteDocumentModal;
