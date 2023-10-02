import React, {useEffect, useState} from "react";
import Navbar from "../../Components/Common/Navbar";
import Footer from "../../Components/Common/Footer";
import {axiosClientWithHeaders} from "../../libs/axiosClient";
import DocumentItem from "./SingleDocumentItem";
import Pagination from "../../Components/Common/Pagination";


function DocumentsVaultPage() {
    const [documents, setDocuments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [, setTotalDocuments] = useState(0);

    const getAllDocuments = async () => {
        try {
            const resp = await axiosClientWithHeaders.get(
                `/document-vault/get-all-vault-documents/${currentPage}/`
            );
            setDocuments(resp.data.data);
            setTotalPages(resp.data.total_pages);
            setTotalDocuments(resp.data.total_data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllDocuments();
    }, []);
    return (
        <div className="h-[100vh] flex flex-col justify-between">
            <div>
                <Navbar/>
                <div className="mt-5 flex flex-col justify-center items-center">
                    <div className="mx-2">
                        <div className="flex flex-wrap w-full">
                            {documents.map((item) => (
                                <div key={item.document_id}
                                     className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/5 px-4 mb-4">
                                    <DocumentItem item={item}/>
                                </div>
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                            getData={getAllDocuments}
                        />
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default DocumentsVaultPage;
