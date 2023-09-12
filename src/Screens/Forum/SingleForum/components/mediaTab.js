import React from "react";
import ImageOverlay from "./imageOverlay";

function MediaTab({files}) {
    return (
        <div>
            <div className="flex justify-end">
                <button className="bg-[#FC8A2B] rounded-1 py-1 px-2 text-[14px] text-[#fff]">+ New File</button>
            </div>
            <div>
                <div className="flex flex-wrap">
                    {files?.map((elt, index) =>
                        <ImageOverlay image={elt.file_url} key={index}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MediaTab;
