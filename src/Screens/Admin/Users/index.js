import React, {useEffect, useState} from "react";
import {BsPlus, BsSearch} from "react-icons/bs";
import {toast} from "react-toastify";
import Layout from "../../../Components/Dashboard/Layout";
import CustomTable from "../../../Components/Common/CustomTable";
import {axiosClient, axiosClientWithHeaders} from "../../../libs/axiosClient";
import Modal from "../../../Components/Modal";

import "./style.scss";
import {debounce} from "lodash";
import RightSidebarModal from "../../../Components/Common/RightSidebarModal";
import {useTranslation} from "react-i18next";

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedId, setSelectedId] = useState("");
    const [userType, setUserType] = useState("All");
    const [modalOpen, setModalOpen] = useState(false);
    const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [addAdminData, setAddAdminData] = useState({});
    const [modalState, setModalState] = useState("");
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState({});
    const [isSidebarOpen, setIsOpenSidebar] = useState(false);
    const [userVerifyBtnLoading, setUserVerifyBtnLoading] = useState(false);
    const [refetchSingleUser, setRefetchSingleUser] = useState(false);
    const {t} = useTranslation();

    const headers = ["Name", "Email", "Country", "Role", "Account Type", ""];

    const openRoleAssignModal = async (userKey) => {
        getAllUserRoles();
        setSelectedId(userKey);
        setModalState("assignRole");
        setModalOpen(true);
    }

    const getAllUserRoles = async () => {
        try {
            const resp = await axiosClientWithHeaders.get(
                `/utilities/dropdowns/1/`
            );
            const data = resp.data.data;
            setRoles(data);
        } catch (err) {
            console.log(err);
        }
    };

    const assignRole = async (id) => {
        setLoading(true);
        try {
            await axiosClientWithHeaders.post("/super-admin/assign-user-role/", {
                user_key: selectedId,
                role_id: id
            });
            setLoading(false);
            toast.success(t('alerts.roleAssigned'));
            getAllUsers();
            await new Promise((r) => setTimeout(r, 2000));
            setModalOpen(false);
        } catch (err) {
            setLoading(false);
            console.error(err);
        }
    }

    const deleteUser = async (userKey) => {
        setLoading(true);
        try {
            await axiosClientWithHeaders.delete(`/super-admin/delete-single-user/${userKey}/`);
            setLoading(false);
            toast.success(t('alerts.userDeleted'));
            getAllUsers();
            await new Promise((r) => setTimeout(r, 2000));
            setModalOpen(false);
        } catch (err) {
            setLoading(false);
            console.error(err);
        }
    }

    const verifyUser = async (userKey, viewing = false) => {
        if (viewing) {
            setUserVerifyBtnLoading(true);
        }
        try {
            await axiosClientWithHeaders.put("/super-admin/verify-users/", {
                user_key: userKey,
            });
            if (viewing) {
                setUserVerifyBtnLoading(false);
                viewUser(userKey, true);
            }
            toast.success(t('alerts.userStatusUpdated'));
            setModalOpen(false);
            getAllUsers(currentPage);
        } catch (err) {
            console.error(err);
            if (viewing) {
                setUserVerifyBtnLoading(false);
            }
        }
    }

    const viewUser = async (id, opened = false) => {
        try {
            const resp = await axiosClientWithHeaders.get(`/super-admin/get-single-user/${id}/`);
            setSelectedUser(resp.data.data);
        } catch (err) {
            console.error(err);
        }
        if (!opened) {
            setIsOpenSidebar(true);
        }
    }

    console.log(selectedUser);

    const dropItems = [
        {id: "verify", name: t('admin.verify'), type: "func", func: verifyUser},
        {id: "assignRole", name: t('admin.assignRole'), type: "func", func: openRoleAssignModal},
        {id: "view", name: t('admin.view'), type: "func", func: viewUser},
        {id: "delete", name: t('modal.delete'), type: "func", func: deleteUser},
    ];

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

    const addAdmin = async () => {
        setLoading(true);
        try {
            await axiosClientWithHeaders.post("/super-admin/add-users/", addAdminData);
            setLoading(false);
            toast.success(t('alerts.userAdded'));
            await new Promise((r) => setTimeout(r, 2000));
            setAddAdminModalOpen(false);
        } catch (err) {
            setLoading(false);
            console.error(err);
        }
    }

    const handleModalOpen = () => {
        getCountries();
        getAllUserRoles();
        setModalState("addAdmin");
        setAddAdminModalOpen(true);
    }

    const handleAdminDataSet = (e) => {
        setAddAdminData({
            ...addAdminData,
            [e.target.name]: e.target.value
        });
    }

    const getCountries = async () => {
        try {
            const response = await axiosClient.get("utilities/dropdowns/2/");
            const data = response.data.data;
            setModalData(data);
        } catch (err) {
            console.log(err);
        }
    };

    const searchUsers = async (term) => {
        try {
            const resp = await axiosClientWithHeaders.post("/super-admin/search-users/1/", {
                search_query: term
            });
            setUsers(resp.data.data);
        } catch (err) {
            console.error(err);
        }
    }

    const debouncedSearch = debounce((term) => {
        // Perform your search logic here
        searchUsers(term);
    }, 300); // Adjust the debounce delay as per your requirements

    useEffect(() => {
        if (refetchSingleUser) {
            viewUser(selectedUser);
            setRefetchSingleUser(false);
        }
    }, [refetchSingleUser])

    useEffect(() => {
        debouncedSearch(searchQuery);
    }, [searchQuery])

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <>
            <Layout>
                <div className="mx-5 users-page">
                    <div className="p-5 mt-5 flex justify-between blog-header">
                        <h1>{t('admin.leftSidebar.users').titleWord()}</h1>
                    </div>
                    <div className="flex justify-between mt-3 items-center">
                        <div className="flex w-[80%]">
                            <div className="border rounded-lg items-center w-[60%] flex mt-5">
                                <BsSearch size={22} className="ml-3"/>
                                <input
                                    type="text"
                                    placeholder={t('admin.search')}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="outline-none p-4 h-[40px] w-[90%]"
                                />
                            </div>
                            <div className="ml-10 mt-4 flex flex-col">
                                <label>{t('admin.userType')}</label>
                                <select
                                    onChange={filterUsers}
                                    className="border mt-2 rounded-lg p-1 w-[200px] h-[40px]"
                                >
                                    <option value="All">{t('admin.all')}</option>
                                    <option value="Content Creator">{t('auth.contentCreator')}</option>
                                    <option value="Guest">{t('auth.guest')}</option>
                                    <option value="Super Admin">{t('admin.superAdmin')}</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-5 mr-3">
                            <button
                                className="text-[#fff] flex items-center rounded-md bg-[#001253] px-3 py-2"
                                onClick={handleModalOpen}
                            >
                                <BsPlus size={25}/>{t('admin.leftSidebar.users').titleWord()}
                            </button>
                        </div>
                    </div>
                    <div className="mt-10">
                        <CustomTable
                            totalPages={totalPages}
                            data={users}
                            headers={headers}
                            idType={"user_key"}
                            dropItems={dropItems}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            onPageChange={getAllUsers}
                        />
                    </div>
                    <RightSidebarModal
                        isOpen={isSidebarOpen}
                        setIsOpen={setIsOpenSidebar}
                        refetch={setRefetchSingleUser}
                        loading={userVerifyBtnLoading}
                        verifyUser={() => verifyUser(selectedUser.user_key, true)}
                        userData={selectedUser}
                    />

                </div>
            </Layout>
            <Modal
                data={selectedId}
                type={modalState}
                isOpen={modalOpen}
                initialData={roles}
                setIsOpen={setModalOpen}
                setRefetch={getAllUsers}
                callbackAction={assignRole}
                parentBtnLoading={loading}
            />
            <Modal
                type={modalState}
                isOpen={addAdminModalOpen}
                initialData={modalData}
                setIsOpen={setAddAdminModalOpen}
                setData={handleAdminDataSet}
                setRefetch={getAllUsers}
                callbackAction={addAdmin}
                parentBtnLoading={loading}
                extraData={{roles}}
            />
        </>
    );
}

export default UsersPage;
