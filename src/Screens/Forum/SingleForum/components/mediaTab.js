import React, {useState} from "react";
import FileUploadModal from "./fileModal";
import NoMedia from "../../../../Assets/images/no-media.png";
import SuggestionsSection from "./suggestionsSection";

function MediaTab({files, forumId, refetch, user, suggestedForums, setRefetch}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="forum-chats-page flex justify-between h-full">
                <div className="mr-3 w-full">
                    {/*<div className="flex justify-end">*/}
                    {/*    <button*/}
                    {/*        className="bg-[#FC8A2B] rounded-1 py-1 px-2 text-[14px] text-[#fff]"*/}
                    {/*        onClick={() => setIsOpen(true)}*/}
                    {/*    >*/}
                    {/*        + New File*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                    <div className="h-full">
                        {files?.length || user?.tokens?.access
                            ? (
                                <div className="flex flex-wrap">
                                    <div className="container p-6">
                                        <div
                                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                            {files?.map((elt, index) =>
                                                <div key={index}
                                                     className="bg-white rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 cursor-pointer">
                                                    <img src={elt.file_url} alt=""
                                                         className="w-full h-32 object-contain mt-3"/>
                                                    <div className="p-3">
                                                        <p className="text-[12px] font-semibold whitespace-normal">{elt.file_name}</p>
                                                        <p className="text-gray-600 text-[11px] whitespace-normal">{elt.description}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-center items-center h-full w-full flex-col">
                                    <img src={NoMedia} alt="No Chat rooms" width={90} height={20}/>
                                    <p className="mt-3 font-bold">No Media</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <SuggestionsSection
                    suggestedForums={suggestedForums}
                    userTokens={user?.tokens}
                    id={forumId}
                    setRefetch={setRefetch}
                />
            </div>
            <FileUploadModal isOpen={isOpen} setIsOpen={setIsOpen} forumId={forumId} refetch={refetch}/>
        </>
    )
}

export default MediaTab;
