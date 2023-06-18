import React, { useState } from 'react';
import { convertToSnakeCase } from '../../../utils/helpers';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function CustomTable({ totalPages, data, currentPage, setCurrentPage, headers, onPageChange }) {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(-1);
  const navigate = useNavigate();
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getTableItem = (key) => {
    const dataItems = {
      "country": "country__name",
    }

    return Object.keys(dataItems).includes(key) ? dataItems[key] : key;
  }

  const assignRoles = () => {
    // Code for assigning roles
  }

  const dropItems = [
    { id: "profile", name: "Profile", route: "/profile" },
    { id: "logout", name: "Logout", type: "func", func: assignRoles },
  ];

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(prevIndex => (prevIndex === index ? -1 : index));
  }

  return (
    <div className="w-full">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            {headers.map((elt, index) => (
              <th className="py-2 px-2 border-b text-left" key={index}>
                {elt}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={item.id}>
              {headers.map((header, colIndex) => (
                <td className="py-2 px-4 border-b" key={colIndex}>
                  {item[getTableItem(convertToSnakeCase(header))]}
                </td>
              ))}
              <td className="py-2 px-4 border-b">
                <BsThreeDotsVertical
                  className="cursor-pointer"
                  onClick={() => toggleDropdown(rowIndex)}
                />
                {openDropdownIndex === rowIndex && (
                  <div className="absolute right-0 top-[45px] h-[100px] mt-2 py-2 w-48 bg-white rounded-md shadow-md z-20">
                    {dropItems.map((elt) => (
                      <button
                        onClick={
                          elt?.type
                            ? () => elt.func()
                            : () => navigate(`${elt.route}`)
                        }
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                        key={elt.id}
                      >
                        {elt.name}
                      </button>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          className="bg-[#001253] hover:bg-[#001253] text-white font-bold py-2 px-4 rounded-l"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="flex">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              className={`mx-1 py-2 px-4 rounded ${
                currentPage === index + 1
                  ? 'bg-[#001253] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              key={index}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          className="bg-[#001253] hover:bg-[#001253] text-white font-bold py-2 px-4 rounded-r"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CustomTable;
