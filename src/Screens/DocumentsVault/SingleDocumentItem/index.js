// ListItem.js
import React from 'react';
import {formatDate, imageExtensions, returnFileFormat} from "../../../utils/helpers";
import {BsCheckCircleFill} from "react-icons/bs";
import {LiaDownloadSolid} from "react-icons/lia";

const DocumentItem = ({item}) => {
    const {
        file_name,
        description,
        file_url,
        file_type,
        owner__first_name,
        owner__last_name,
        owner__is_verified,
        owner__organization,
        created_on,
    } = item;

    return (
        <div
            className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg p-6 mb-6 flex flex-col justify-between">
            <div>
                <h2 className="text-[13px] font-semibold mb-3">{file_name.truncate(15)}</h2>
                <div className="relative w-full h-48 mb-2 overflow-hidden">
                    <img src={
                        imageExtensions.includes(file_type.slice(1))
                            ? file_url : returnFileFormat(file_type)
                    } alt={file_name}
                         className="mb-4 absolute top-0 left-0 w-full h-full object-contain"/>
                </div>
                <p className="text-gray-700 text-sm mt-3 mb-2">{description}</p>
                <div className="flex items-center">
                <span className="text-gray-700 text-sm mb-2">
                    {owner__first_name} {owner__last_name}
                </span>
                    <span className="text-sm mb-2 ml-1">
                    {owner__is_verified && <BsCheckCircleFill size={13} fill="#3e6d9c"/>}
                </span>
                </div>
                <p className="text-gray-700 text-sm mt-2 mb-2">{owner__organization}</p>
            </div>
            <div className="flex justify-between mt-3">
                <a href={file_url} className="underline text-[12px]">
                    <LiaDownloadSolid size={15}/>
                </a>
                <p className="text-gray-500 text-[12px] text-right">{formatDate(created_on)}</p>
            </div>
        </div>
    );
};

export default DocumentItem;
