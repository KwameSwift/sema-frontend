import React, {useState} from "react";
import FileUploadModal from "./fileModal";
import PDFFile from "../../../../Assets/images/pdf_image.png";
import DocFile from "../../../../Assets/images/docx_image.png";
import OtherFile from "../../../../Assets/images/other_image.png";
import SuggestionsSection from "./suggestionsSection";
import NoFiles from "../../../../Assets/images/no-files.png";

function FileTab({files, forumId, refetch, suggestedForums, user, setRefetch}) {
    const [isOpen, setIsOpen] = useState(false);

    const returnFileFormat = (fileType) => {
        if (fileType === ".pdf") {
            return PDFFile;
        } else if (fileType === ".docx" || fileType === ".doc") {
            return DocFile;
        } else {
            return OtherFile;
        }
    }

    return (
        <div className="forum-chats-page flex justify-between h-full">
            <div className="mr-3 w-full">
                {/*<div className="flex justify-end ">*/}
                {/*    <button*/}
                {/*        className="bg-[#FC8A2B] rounded-1 py-1 px-2 text-[14px] text-[#fff]"*/}
                {/*        onClick={() => setIsOpen(true)}*/}
                {/*    >*/}
                {/*        + New File*/}
                {/*    </button>*/}
                {/*</div>*/}
                <div className="h-full">
                    {files?.length && user?.tokens?.access
                        ? (
                            <div className="flex flex-wrap">
                                <div className="container mx-auto p-6">
                                    <div
                                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                                        {files?.map((elt, index) =>
                                            <div key={index}
                                                 className="bg-white rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 cursor-pointer">
                                                <img src={returnFileFormat(elt.file_type)} alt=""
                                                     className="w-full h-32 object-contain mt-3"/>
                                                <div className="p-3">
                                                    <p className="text-[12px] font-semibold whitespace-normal">{elt.file_name?.truncate(15)}</p>
                                                    <p className="text-gray-600 text-[11px] whitespace-normal">{elt.description}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center h-full w-full flex-col">
                                <img src={NoFiles} alt="No Chat rooms" width={90} height={20}/>
                                <p className="mt-3 font-bold">No Files</p>
                            </div>
                        )}
                </div>
                <FileUploadModal isOpen={isOpen} setIsOpen={setIsOpen} forumId={forumId} refetch={refetch}/>
            </div>
            <SuggestionsSection
                suggestedForums={suggestedForums}
                userTokens={user?.tokens}
                id={forumId}
                setRefetch={setRefetch}
            />
        </div>
    )
}

export default FileTab;
