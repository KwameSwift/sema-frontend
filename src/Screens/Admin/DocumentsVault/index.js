import React, {useEffect, useState} from "react";
// import {useNavigate} from "react-router";
// import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
// import {debounce} from "lodash";
import Layout from "../../../Components/Dashboard/Layout";
// import EmptyImg from "../../../Assets/images/Empty-icon.jpg";
// import {axiosClientWithHeaders} from "../../../libs/axiosClient";
// import AdminCreatorBlogCard from "../../../Components/Admin/BlogPost";
import {axiosClientWithHeaders} from "../../../libs/axiosClient";
import {BsPlus} from "react-icons/bs";
import DocumentCard from "./singleDocument";
import NoBlog from "../../../Assets/images/no-blog.png";
import DocumentUploadModal from "./singleDocument/documentUploadModal";
import "./style.scss";
import DeleteDocumentModal from "./singleDocument/deleteDocumentModal";
import ContentCreatorLayout from "../../../Components/ContentCreator/Layout";


function AdminDocumentsVault({isCreator = false}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [documents, setDocuments] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentId, setCurrentId] = useState(0);
    // const [modalState, setModalState] = useState("");
    // const [selectedId, setSelectedID] = useState(0);
    const [refetch, setRefetch] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [totalDocuments, setTotalDocuments] = useState(0);
    // const [forumType, setForumType] = useState(0);
    // const [loading, setLoading] = useState(false);
    // const [searchQuery, setSearchQuery] = useState("");
    // const [declineComment, setDeclineComment] = useState({});

    // const firstRunRef = useRef(true);
    const {t} = useTranslation();
    const adminGetUrl = "/super-admin/get-vault-documents/";
    const creatorGetUrl = "/users/get-my-vault-documents/";

    const getAllDocuments = async () => {
        const url = isCreator ? creatorGetUrl : adminGetUrl;
        try {
            const resp = await axiosClientWithHeaders.get(
                `${url}/${currentPage}/`
            );
            const data = resp.data;
            setTotalPages(data.total_pages);
            setTotalDocuments(data.total_data);
            setDocuments(data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleModalOpen = (id) => {
        setIsDeleteModalOpen(true);
        setCurrentId(id);
    }

    const PageContent = () => {
        return (
            <div className="admin-blog-page mx-3">
                {!isCreator && <div className="p-8 mt-5 flex flex-col blog-header">
                    <h1>{t("admin.documentsVault")}</h1>
                    <p className="text-[#fff]">
                        {t("admin.totalDocumentsVault")} ({totalDocuments})
                    </p>
                </div>}
                <div className="flex justify-end mt-3 items-center">
                    <div className="mt-5 mr-3">
                        <button
                            className="text-[#fff] flex items-center rounded-md bg-[#001253] px-3 py-2"
                            onClick={() => setModalOpen(true)}
                        >
                            <BsPlus size={25}/>
                            {t("admin.documentsVault")}
                        </button>
                    </div>
                </div>
                {documents?.length
                    ? (
                        <div className="flex flex-wrap">
                            <div className="container p-6">
                                <div
                                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                    {documents?.map((elt, index) => (
                                        <>
                                            <DocumentCard
                                                {...elt}
                                                key={index}
                                                isCreator={isCreator}
                                                handleModalOpen={handleModalOpen}
                                            />
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center min-h-[58vh]">
                            <img src={NoBlog} alt="no-blog" className="w-[200px] h-[200px]"/>
                        </div>
                    )
                }
                {totalPages !== currentPage && (
                    <div className="flex justify-center mb-3">
                        <button
                            className="see-more-btn"
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                        >
                            {t("home.seeMore")}
                        </button>
                    </div>
                )}
            </div>

        )
    }
    useEffect(() => {
        getAllDocuments();
    }, [refetch]);

    return (
        <>
            {!isCreator
                ? (
                    <Layout>
                        <PageContent></PageContent>
                    </Layout>
                ) : (
                    <ContentCreatorLayout
                        header={t("admin.documentsVault")}
                        subChild={<>{t("admin.totalDocumentsVault")} ({totalDocuments})</>}
                    >
                        <PageContent></PageContent>
                    </ContentCreatorLayout>
                )
            }

            <DocumentUploadModal
                isOpen={modalOpen}
                setIsOpen={setModalOpen}
                refetch={setRefetch}
            />

            <DeleteDocumentModal
                refetch={setRefetch}
                documentId={currentId}
                isOpen={isDeleteModalOpen}
                setIsOpen={setIsDeleteModalOpen}
            />
        </>
    );
}

export default AdminDocumentsVault;
