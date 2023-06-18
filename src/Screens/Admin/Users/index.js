import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Layout from "../../../Components/Dashboard/Layout";
import CustomTable from "../../../Components/Common/CustomTable";
import { axiosClientWithHeaders } from "../../../libs/axiosClient";

import "./style.scss";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [userType, setUserType] = useState("All");

  const headers = ["First Name", "Last Name", "Country", "Account Type", ""];

  const getAllUsers = async (page = 1, accountType = userType) => {
    try {
      const resp = await axiosClientWithHeaders.post(
        `/super-admin/all-users/${page}/`,
        {
          account_type: accountType,
        }
      );
      setTotalPages(resp.data.total_pages);
      setUsers(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filterUsers = (e) => {
    setUserType(e.target.value);
    getAllUsers(1, e.target.value);
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout>
      <div className=" mx-5 users-page">
        <div className="p-5 mt-5 flex justify-between blog-header">
          <h1>Users</h1>
        </div>
        <div className="flex mt-3 items-center">
          <div className="border rounded-lg items-center w-[60%] flex mt-5">
            <BsSearch size={22} className="ml-3" />
            <input
              type="text"
              placeholder="Search..."
              className="outline-none p-4 h-[40px] w-[100%]"
            />
          </div>
          <div className="ml-10 flex flex-col">
            <label>User Type</label>
            <select
              onChange={filterUsers}
              className="border rounded-lg p-1 w-[200px] h-[40px]"
            >
              <option value="All">All</option>
              <option value="Content Creator">Content Creator</option>
              <option value="Guest">Guest</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>
        </div>
        <div className="mt-10">
          <CustomTable
            totalPages={totalPages}
            data={users}
            headers={headers}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onPageChange={getAllUsers}
          />
        </div>
      </div>
    </Layout>
  );
}

export default UsersPage;
