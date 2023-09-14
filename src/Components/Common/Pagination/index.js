import React from 'react';
import {BsChevronLeft, BsChevronRight} from "react-icons/bs";

function Pagination({getData, currentPage, setCurrentPage, totalPages}) {

    const handlePageChange = (page) => {
        setCurrentPage(page);
        if (page >= 1 && page <= totalPages) {
            getData(page);
        }
    };

    return (
        <div className="flex mb-3 justify-center mt-4">
            <button
                className=" text-[#001253] font-bold py-2 px-4 rounded-l"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <BsChevronLeft className="page-nav"/>
            </button>
            <div className="flex items-center">
                {Array.from({length: totalPages}, (_, index) => (
                    <button
                        className={`page-nav-num text-[12px] rounded ${
                            currentPage === index + 1
                                ? "bg-[#001253] text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <button
                className="text-[#001253] font-bold py-2 px-4 rounded-r"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <BsChevronRight className="page-nav" size={12}/>
            </button>
        </div>
    );
}

export default Pagination;
