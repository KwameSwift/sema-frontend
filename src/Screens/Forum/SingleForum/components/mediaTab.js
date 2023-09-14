import React, {useState} from "react";
import FileUploadModal from "./fileModal";

function MediaTab({files, forumId, refetch}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div className="flex justify-end">
                <button
                    className="bg-[#FC8A2B] rounded-1 py-1 px-2 text-[14px] text-[#fff]"
                    onClick={() => setIsOpen(true)}
                >
                    + New File
                </button>
            </div>
            <div>
                <div className="flex flex-wrap">
                    <div className="container mx-auto p-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                            {files?.map((elt, index) =>
                                <div key={index}
                                     className="bg-white rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 cursor-pointer">
                                    <img src={elt.file_url} alt="" className="w-full h-32 object-contain mt-3"/>
                                    <div className="p-3">
                                        <p className="text-[12px] font-semibold whitespace-normal">{elt.file_name}</p>
                                        <p className="text-gray-600 text-[11px] whitespace-normal">{elt.description}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <FileUploadModal isOpen={isOpen} setIsOpen={setIsOpen} forumId={forumId} refetch={refetch}/>
            </div>
        </div>
    )
}

export default MediaTab;
