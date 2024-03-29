import React, {useState} from "react";
import {BsChevronLeft, BsChevronRight, BsThreeDotsVertical} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import "./style.scss";
import {convertToSnakeCase} from "../../../utils/helpers";
import {useTranslation} from "react-i18next";

function CustomTable({
                         dropItems,
                         totalPages,
                         data,
                         idType,
                         currentPage,
                         setCurrentPage,
                         headers,
                         onPageChange,
                         headerValues,
                         isEditable = true,
                         isPaginated = true
                     }) {
    const [openDropdownIndex, setOpenDropdownIndex] = useState(-1);
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handlePageChange = (page) => {
        setCurrentPage(page);
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const getTableItem = (key) => {
        const dataItems = {
            country: "country__name",
            role: "role__name",
        };

        return Object.keys(dataItems).includes(key) ? dataItems[key] : key;
    };

    const toggleDropdown = (index) => {
        setOpenDropdownIndex((prevIndex) => (prevIndex === index ? -1 : index));
    };

    const handleSubmit = (elt, id, index) => {
        toggleDropdown(index);
        elt.func(id);
    }

    const getDropContent = (item, elt) => {
        if (elt.id === "verify") {
            if (item.is_verified) return t("admin.unverify");
            else return t("admin.verify");
        } else {
            return elt.name
        }
    }

    const getContentItem = (header, item) => {
        const combineNames = {
            "voter__first_name": item["voter__first_name"] + " " + item["voter__last_name"],
            "member__first_name": item["member__first_name"] + " " + item["member__last_name"],
            "Name": item["first_name"] + " " + item["last_name"],
        }
        if (Object.keys(combineNames)?.includes(header)) {
            return combineNames[header];
        } else {
            return item[getTableItem(convertToSnakeCase(header))]
        }
    }

    return (
        <div className="w-full">
            <table className="relative min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
                    {headers.map((elt, index) => (
                        <th className="py-2 px-2 border-b text-left" key={index}>
                            {t(elt.getTranslationKey()).titleWord()}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data?.map((item, rowIndex) => (
                    <tr key={item[idType]}>
                        {(headerValues ? headerValues : headers).map((header, colIndex) => (
                            <td className="py-2 px-4 border-b" key={colIndex}>
                                {getContentItem(header, item)}
                            </td>
                        ))}
                        {isEditable && <td className="py-2 px-4 border-b">
                            <BsThreeDotsVertical
                                className="cursor-pointer"
                                onClick={() => toggleDropdown(rowIndex)}
                            />
                            {openDropdownIndex === rowIndex && (
                                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-md z-20">
                                    {dropItems.map((elt) => (
                                        <button
                                            onClick={
                                                elt?.type
                                                    ? () => handleSubmit(elt, item[idType], rowIndex)
                                                    : () => navigate(`${elt.route}`)
                                            }
                                            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            key={elt.id}
                                        >
                                            {getDropContent(item, elt)}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </td>}
                    </tr>
                ))}
                </tbody>
            </table>
            {isPaginated && <div className="flex justify-center mt-4">
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
                            className={`page-nav-num text-[12px] ${
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
                    className=" text-[#001253] font-bold py-2 px-4 rounded-r"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <BsChevronRight className="page-nav" size={12}/>
                </button>
            </div>}
        </div>
    );
}

export default CustomTable;
