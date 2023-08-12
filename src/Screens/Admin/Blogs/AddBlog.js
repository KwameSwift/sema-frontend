import React, {useRef, useState} from "react";
import Layout from "../../../Components/Dashboard/Layout";
import {BsFillTrashFill, BsPlusCircle, BsTrash} from "react-icons/bs";
import {useNavigate} from "react-router";
import {axiosClientForm} from "../../../libs/axiosClient";
import {toast} from "react-toastify";
import AdminAccordionItem from "../../../Components/Admin/Accordion";
import CustomEditor from "../../../Components/Common/CustomEditor";
import {isDocumentImage} from "../../../utils/helpers";

import "./style.scss";

function AddBlogPage() {
    const [state, setState] = useState({});
    const [coverImage, setCoverImage] = useState(null);
    const [coverImageFile, setCoverImgFile] = useState(null);
    const [references, setReferences] = useState({});
    const [referenceItems, setReferenceItems] = useState([]);
    const [links, setLinks] = useState({});
    const [linkItems, setLinkItems] = useState([]);
    const [isOwned, setIsOwned] = useState(true);
    const [fileItems, setFileItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [coverImageType, setCoverImageType] = useState("");
    const fileRef = useRef(null);

    const [files, setFiles] = useState([]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleLinkChange = (e) => {
        setLinks({
            ...links,
            [e.target.name]: e.target.value,
        });
    };

    const removeItems = (id, items, itemsSet, setItems) => {
        delete items[id];
        const linkSplit = id.split("-");
        const linkIndex = Number(linkSplit[linkSplit.length - 1]);
        const newLinkItems = [...itemsSet];
        newLinkItems.splice(linkIndex, 1);
        setItems(newLinkItems);
    };

    const handleSave = async () => {
        setLoading(true);
        if (!isOwned && Object.values(references).length === 0) {
            toast.error("At least one reference link is required");
            return;
        }

        if (!state.title) {
            toast.error("Blog title is empty");
            return;
        }

        if (!state.content) {
            toast.error("Blog content is empty");
            return;
        }

        const reference = Object.values(references);
        const linkVals = Object.values(links);

        // Create a new FormData object
        const formData = new FormData();
        for (let [key, value] of Object.entries(state)) {
            formData.append(key, value);
        }

        if (reference.length) {
            formData.append("reference", reference);
        }

        linkVals.forEach((link) => {
            formData.append("links[]", link);
        });

        files.forEach((file) => {
            formData.append("files[]", file);
        });

        if (coverImageFile) {
            formData.append("cover_image", coverImageFile);
        }

        try {
            await axiosClientForm.post("/blog/create-blog/", formData);
            setLoading(false);
            toast.success("Blog Added successfully");
            await new Promise((r) => setTimeout(r, 2000));
            navigate("/admin/blogs");
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const handleReferenceChange = (e) => {
        setReferences({
            ...references,
            [e.target.name]: e.target.value,
        });
    };

    const handleSetFiles = (e) => {
        const addFiles = [];
        for (const file of e.target.files) {
            addFiles.push(file);
        }
        setFiles(addFiles);
    };

    const linkItem = () => {
        return (
            <div className="flex items-center mb-3">
                <input
                    type="text"
                    name={`link-${linkItems.length}`}
                    className="admin-link-input mr-3 border border-gray-700 p-2 w-[60%]"
                    placeholder="Enter link address"
                    onChange={handleLinkChange}
                />
                <BsFillTrashFill
                    onClick={() =>
                        removeItems(
                            `link-${linkItems.length}`,
                            links,
                            linkItems,
                            setLinkItems
                        )
                    }
                    className="cursor-pointer"
                    fill="#e14d2a"
                    size={25}
                />
            </div>
        );
    };

    const referenceItem = () => {
        return (
            <div className="flex items-center mb-3">
                <input
                    type="text"
                    name={`reference-${referenceItems.length}`}
                    className="admin-link-input mr-3 border border-gray-700 p-2 w-[60%]"
                    placeholder="Enter reference address"
                    onChange={handleReferenceChange}
                />
                <BsFillTrashFill
                    onClick={() =>
                        removeItems(
                            `reference-${referenceItems.length}`,
                            references,
                            referenceItems,
                            setReferenceItems
                        )
                    }
                    className="cursor-pointer"
                    fill="#e14d2a"
                    size={25}
                />
            </div>
        );
    };

    const fileItem = () => {
        return (
            <div className="flex items-center mb-3">
                <input
                    type="file"
                    name={`file-${fileItems.length}`}
                    className="link-input mr-3"
                    onChange={handleSetFiles}
                    multiple
                />
                <BsFillTrashFill
                    onClick={() =>
                        removeItems(
                            `reference-${fileItems.length}`,
                            files,
                            fileItems,
                            setFileItems
                        )
                    }
                    className="cursor-pointer"
                    fill="#e14d2a"
                    size={25}
                />
            </div>
        );
    };

    const handleSetContent = (value) => {
        setState({...state, content: value});
    };

    const handleLinkAddition = () => {
        setLinkItems([...linkItems, linkItem()]);
    };

    const handleFileAddition = () => {
        setFileItems([...fileItems, fileItem()]);
    };

    const handleSetImage = (e) => {
        const file = e.target.files[0];
        setCoverImgFile(file);
        setCoverImageType(isDocumentImage(file.name));
        setCoverImage(URL.createObjectURL(file));
    };

    const handleReferenceAddition = () => {
        setReferenceItems([...referenceItems, referenceItem()]);
    };

    const clearFile = () => {
        fileRef.current.value = null;
        setCoverImageType("");
        setCoverImage(null);
    };

    return (
        <Layout>
            <div className="admin-add-blog">
                <form>
                    <div className={`mt-5 mb-8 ${!coverImageType && "hidden"}`}>
                        <img src={coverImage} className="w-[500px] h-[350px]" alt=""/>
                    </div>
                    <div
                        className={`flex flex-col cursor-pointer ${
                            coverImageType && "hidden"
                        } mt-5 mb-8`}
                    >
                        <label className="text-[18px] font-bold mb-5">
                            Cover Image / Document
                        </label>
                        <input type="file" ref={fileRef} onChange={handleSetImage}/>
                    </div>
                    {coverImageType && (
                        <div className="flex mb-8 items-center h-[40px]">
                            <button
                                type="button"
                                onClick={() => fileRef.current.click()}
                                className="ml-2 px-3 py-2 rounded-md text-[#fff] bg-[#001253]"
                            >
                                Change cover image
                            </button>
                            <span className="ml-3">
                <BsTrash
                    className="cursor-pointer"
                    onClick={clearFile}
                    fill="#e14d2a"
                    size={25}
                />
              </span>
                        </div>
                    )}
                    <div>
                        <label className="text-[18px] font-bold">
                            Title<span className="text-[#e14d2a]">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            onChange={handleChange}
                            placeholder="Add Title"
                            className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                        />
                    </div>
                    <div className="mt-8">
                        <label className="text-[18px] font-bold">Description</label>
                        <textarea
                            onChange={handleChange}
                            placeholder="Add blog description..."
                            name="description"
                            rows={2}
                            className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                        ></textarea>
                    </div>
                    <div className="mt-8">
                        <label className="text-[18px] mb-5 font-bold">
                            Blog Content<span className="text-[#e14d2a]">*</span>
                        </label>
                        <CustomEditor
                            className="mt-5"
                            placeholder="Write here..."
                            setData={handleSetContent}
                            data={state.content}
                        />
                    </div>
                    <div className="flex mt-8 items-center">
                        <p className="text-[18px] font-bold">
                            Are you the author of this blog?
                        </p>
                        <div className="toggle ml-3">
                            <input
                                type="checkbox"
                                checked={isOwned}
                                id="toggleSwitch"
                                onChange={() => setIsOwned(!isOwned)}
                                className="toggle-checkbox"
                            />
                            <label htmlFor="toggleSwitch" className="toggle-label"></label>
                        </div>
                    </div>
                    {!isOwned && (
                        <div className="reference_links flex flex-col justify-start mt-8">
                            <label className="text-[18px] font-bold">References</label>
                            <div className="mt-3">{referenceItems}</div>
                            <button
                                type="button"
                                onClick={handleReferenceAddition}
                                className="text-left mt-3 min-w-[200px] bg-[#fff] w-[150px] flex items-center p-2 rounded-lg"
                            >
                                <BsPlusCircle fill="#001253" className="mr-1" size={20}/>
                                <span className="text-['#001253']">Add reference link</span>
                            </button>
                        </div>
                    )}
                    <div className="">
                        <AdminAccordionItem
                            cBg="#fff"
                            bg="#e5e7eb"
                            title="Links"
                            className="text-[18px] font-bold"
                            pClassName="mt-5"
                        >
                            <div className="mt-3">{linkItems}</div>
                            <button
                                type="button"
                                onClick={handleLinkAddition}
                                className="text-left mt-3 bg-[#fff] w-[150px] flex items-center p-2 rounded-lg"
                            >
                                <BsPlusCircle fill="#000" className="mr-1" size={20}/>
                                <span className="text-[#000] mt-1">Add Link</span>
                            </button>
                        </AdminAccordionItem>
                        <AdminAccordionItem
                            cBg="#fff"
                            bg="#e5e7eb"
                            title="Other Files"
                            className="text-[18px] font-bold"
                            pClassName="mt-5"
                        >
                            <div className="mt-3">{fileItems}</div>
                            <button
                                type="button"
                                onClick={handleFileAddition}
                                className="text-left mt-3 bg-[#fff] w-[150px] flex items-center p-2 rounded-lg"
                            >
                                <BsPlusCircle fill="#001253" className="mr-1" size={20}/>
                                <span className="text-['#001253']">Add Files</span>
                            </button>
                        </AdminAccordionItem>
                    </div>
                    <div className="mt-5 flex justify-end">
                        <div>
                            <button
                                type="button"
                                onClick={() => navigate("/admin/blogs")}
                                className="border rounded px-3 py-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="ml-2 px-3 py-2 rounded-md text-[#fff] bg-[#001253]"
                                onClick={handleSave}
                                disabled={loading}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default AddBlogPage;
