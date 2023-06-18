import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import Layout from "../../../Components/Dashboard/Layout";
import { axiosClientWithHeaders } from "../../../libs/axiosClient";

import "./style.scss";

function UserRolesPage() {
  const [userRoles, setUserRoles] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(-1);
  const navigate = useNavigate();

  const headers = ["Name", "View", "Edit", ""];

  const getAllUserRoles = async (page = 1) => {
    try {
      const resp = await axiosClientWithHeaders.get(
        `/super-admin/get-all-user-roles/${page}/`
      );
      setTotalPages(resp.data.total_pages);
      const data = resp.data.data;
      const modData = data.reduce((prev, acc) => {
        const name = Object.keys(acc)[0];
        const moduleData = Object.values(acc)[0];
        const edit = moduleData
          .filter((val) => val.access_level === 2)
          .reduce(
            (prevData, currData) => {
              prevData.push(currData.module__name);
              return prevData;
            },
            []
          );
        const view = moduleData
          .filter((val) => val.access_level === 1)
          .reduce(
            (prevData, currData) => {
              prevData.push(currData.module__name)
              return prevData;
            },
            []
          );
        const payload = { name, edit, view, id: moduleData[0]?.role_id };
        return [ ...prev, payload ];
      }, []);
      setUserRoles(modData);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (page >= 1 && page <= totalPages) {
      getAllUserRoles(page);
    }
  };

  // const assignRoles = () => {};

  const deleteRoles = async (id) => {
    try {
      await axiosClientWithHeaders.delete(`/super-admin/delete-user-role/${id}/`);
      getAllUserRoles();
    } catch (err) {
      console.error(err);
    }
  };

  const dropItems = [
    { id: "edit", name: "Edit", route: "/profile" },
    { id: "delete", name: "Delete", type: "func", func: deleteRoles },
  ];


  const getViewItem = (viewItems) => {
    const viewItemJsx = viewItems?.reduce((acc, item) => {
      acc.push(<div className="bg-[#001253] text-[12px] text-[#fff] p-2">{item}</div>);
      return acc;
    }, []);
    return (
      <div className="table-item-wrapper">
        <>{viewItemJsx}</>
      </div>
    );
  };

  const getEditItem = (editItems) => {
    const editItemJsx = editItems?.reduce((acc, item) => {
      acc.push(<div className="bg-[#e14d2a] text-[12px] text-[#fff] p-2">{item}</div>);
      return acc;
    }, []);
    return (
      <div className="table-item-wrapper">
        <>{editItemJsx}</>
      </div>
    );
  };

  const getCellData = (item, header) => {
    if (header === "name") return item;
    else {
      if (header === "edit") return getEditItem(item);
      else return getViewItem(item);
    }
  }

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(prevIndex => (prevIndex === index ? -1 : index));
  }

  useEffect(() => {
    getAllUserRoles();
  }, []);

  return (
    <Layout>
      <div className=" mx-5 users-roles-page">
        <div className="p-5 mt-5 flex justify-between blog-header">
          <h1>User Roles</h1>
        </div>
        <div className="mt-10">
          <div className="w-full">
            <table className="min-w-full relative bg-white border border-gray-300">
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
              {userRoles.map((item, rowIndex) => (
                <tr key={item.id}>
                  {headers.map((header, index) => (
                    <td className="py-2 px-4 border-b" key={index}>
                      {getCellData(item[header.toLowerCase()], header.toLowerCase())}
                    </td>
                  ))}
                  <td className="py-2 px-4 border-b">
                    <BsThreeDotsVertical
                      className="cursor-pointer"
                      onClick={() => toggleDropdown(rowIndex)}
                    />
                    {openDropdownIndex === rowIndex && (
                      <div className="absolute z-20 right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-md">
                        {dropItems.map((elt) => (
                          <button
                            onClick={
                              elt?.type
                                ? () => elt.func(item.id)
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
                className="bg-[#001253] hover:bg-[#001253] text-white font-bold py-2 px-4 rounded-r"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UserRolesPage;
