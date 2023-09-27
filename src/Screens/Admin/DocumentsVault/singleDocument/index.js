import React from 'react';
import {formatDate, imageExtensions, returnFileFormat} from "../../../../utils/helpers";
import {BsCheckCircleFill, BsTrash} from "react-icons/bs";

const DocumentCard = (document) => {
    const {
        document_id,
        file_name,
        description,
        file_url,
        file_type,
        owner__first_name,
        owner__last_name,
        owner__is_verified,
        owner__organization,
        created_on,
        handleModalOpen,
        isCreator
    } = document;
    return (
        <>
            <div className="bg-white rounded-md shadow-md p-4 mb-4 w-full flex flex-col justify-between">
                <div>
                    {!isCreator && <div className="flex justify-between">
                        <div className="mr-2">
                            <h2 className="text-[13px] font-bold mb-2">{file_name}</h2>
                            <p className="text-gray-600 text-[13px] mb-2">{description}</p>
                        </div>
                        <div>
                            <BsTrash fill="#e14d2a" className="cursor-pointer" size={13}
                                     onClick={() => handleModalOpen(document_id)}/>
                        </div>
                    </div>}
                    <div className="relative w-full h-48 mb-2 overflow-hidden">
                        <img src={
                            imageExtensions.includes(file_type.slice(1))
                                ? file_url : returnFileFormat(file_type)
                        } alt={file_name} className="absolute top-0 left-0 w-full h-full object-contain"/>
                    </div>
                    {isCreator
                        ? (
                            <>
                                <h2 className="text-[13px] font-bold mb-2">{file_name}</h2>
                                <p className="text-gray-600 text-[13px] mb-2">{description}</p>
                            </>
                        )
                        :
                        <>
                            <p className="text-gray-600 mb-2 flex items-center">
                                <span className="text-[13px]">Owner:</span>{' '}
                                <span
                                    className="text-[13px] mx-1 text-gray-500">{owner__first_name} {owner__last_name}{' '}</span>
                                {owner__is_verified && <BsCheckCircleFill size={13} fill="#3e6d9c"/>}
                            </p>
                            <p className="text-gray-600">
                                <span className="text-[13px]">Organization:</span>
                                <span className="text-[13px] mx-1 text-gray-500">{owner__organization}</span>
                            </p>
                        </>}
                </div>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-blue">
                        <a href={file_url} className="text-[12px] underline" target="_blank" rel="noreferrer">Link</a>
                    </p>
                    <span className="text-[12px] text-gray-400">{formatDate(created_on, false)}</span>
                </div>
            </div>
        </>
    );
};

export default DocumentCard;
