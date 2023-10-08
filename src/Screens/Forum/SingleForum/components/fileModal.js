import React, {useEffect, useState} from 'react';
import {LiaTimesSolid} from "react-icons/lia";
import {getTransString} from "../../../../utils/helpers";
import {useTranslation} from "react-i18next";
import {axiosClientForm} from "../../../../libs/axiosClient";
import {toast} from "react-toastify";
// import {isDocumentImage} from "../../../../utils/helpers";
// import PDFFile from "../../../../Assets/images/pdf_image.png";
// import DocFile from "../../../../Assets/images/docx_image.png";
// import OtherFile from "../../../../Assets/images/other_image.png";
// import {axiosClientForm} from "../../../../libs/axiosClient";

function FileUploadModal(props) {

    const {t} = useTranslation();
    const [isDisabled, setIsDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);

    const uploadFiles = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("description", description);
        for (let i = 0; i < files?.length; i++) {
            formData.append("files[]", files[i]);
        }
        try {
            await axiosClientForm.post(`/forum/upload-forum-files/${props.forumId}/`, formData);
            setLoading(false);
            toast.success("Files uploaded successfully");
            props.setIsOpen(false);
            props.refetch(prev => !prev);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    }


    useEffect(() => {
        setIsDisabled(!files?.length);
    }, [description, files]);

    return (
        <>{
            props?.isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

                    <div
                        className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content p-4">
                            <div className="flex justify-between">
                                <h3 className="font-bold">{t('admin.uploadFiles')}</h3>
                                <LiaTimesSolid size={20} className="cursor-pointer"
                                               onClick={() => props?.setIsOpen(false)}/>
                            </div>
                            <div className="flex flex-col pb-3 mb-3 overflow-x-auto mt-3">
                                <div className="form-field">
                                    <label className="mt-3 mb-2">{t('editBlogs.description')}</label>
                                    <textarea
                                        rows={3}
                                        name="description"
                                        placeholder={t('admin.enterDescription')}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="form-field">
                                    <label className="mt-3 mb-3">{t('forum.files')}</label>
                                    <input type="file" onChange={handleFileChange} multiple/>
                                </div>
                            </div>
                            <div className="flex mt-8 justify-end items-center">
                                <button
                                    className="text-[14px] border rounded px-3 py-2"
                                    onClick={() => props.setIsOpen(false)}
                                >
                                    {t("modal.cancel")}
                                </button>
                                <button
                                    className="text-[14px] ml-2 text-white px-3 py-2 rounded bg-[#001253]"
                                    onClick={uploadFiles}
                                    disabled={isDisabled}
                                >
                                    {loading
                                        ? `${t(getTransString("Loading"))}...`
                                        : t('admin.upload')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }</>
    )
}

export default FileUploadModal;
