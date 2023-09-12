import React from 'react';
import {LiaTimesSolid} from "react-icons/lia";
import {MdOutlineEmojiEmotions} from "react-icons/md";
import {BsSend} from "react-icons/bs";
import {isDocumentImage} from "../../../../utils/helpers";
import PDFFile from "../../../../Assets/images/pdf_image.png";
import DocFile from "../../../../Assets/images/docx_image.png";
import OtherFile from "../../../../Assets/images/other_image.png";

function AttachmentModal(props) {
    // const [message, setMessage] = useState("");

    // const sendFormMessage = async () => {
    //     try {
    //         await axiosClientForm.post(`/chats/send-message/${props.item.id}/`, {
    //             message
    //         });
    //         setMessage("");
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    const returnFileFormat = (previewFile, index) => {
        const file = props?.files[index]?.name
        if (isDocumentImage(file)) {
            return <img src={previewFile} alt="" key={index} className="w-[120px] h-[120px]"/>
        } else if (file.split(".").pop() === "pdf") {
            return <img src={PDFFile} alt="" key={index} className="w-[120px] h-[120px]"/>
        } else if (file.split(".").pop() === "docx") {
            return <img src={DocFile} alt="" key={index} className="w-[120px] h-[120px]"/>
        } else {
            return <img src={OtherFile} alt="" key={index} className="w-[120px] h-[120px]"/>
        }
    }

    return (
        <>{
            props?.isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

                    <div
                        className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content p-4">
                            <div className="flex justify-between">
                                <h3 className="font-bold">Send Files</h3>
                                <LiaTimesSolid size={20} className="cursor-pointer"
                                               onClick={() => props?.setIsOpen(false)}/>
                            </div>
                            <div className="attachment-modal pb-3 mb-3 overflow-x-auto mt-3 files-wrapper">
                                {props?.previewFiles?.map((elt, index) =>
                                    returnFileFormat(elt, index)
                                )}
                            </div>
                            <div className="chat-footer">
                                <div className="flex w-[95%] justify-start items-center">
                                    <MdOutlineEmojiEmotions
                                        size={22}
                                        className="cursor-pointer mr-1"
                                        // onClick={() => props?.setToggleEmoji(prev => !prev)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Send message"
                                        value={props?.message}
                                        onChange={(e) => props?.setMessage(e.target.value)}
                                    />
                                </div>
                                <BsSend
                                    size={22}
                                    className="cursor-pointer"
                                    onClick={props?.sendMessage}
                                    fill={props?.message.length && "#001253"}
                                    disabled={props?.message?.trim() === ""}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }</>
    )
}

export default AttachmentModal;
