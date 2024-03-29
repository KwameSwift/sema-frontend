import React, {useEffect, useRef, useState} from "react";
import {BsFillTrashFill, BsLink45Deg, BsPlusCircle, BsTrash,} from "react-icons/bs";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {axiosClientForm, axiosClientWithHeaders,} from "../../../libs/axiosClient";
import Layout from "../../../Components/Dashboard/Layout";
import AdminAccordionItem from "../../../Components/Admin/Accordion";
import CustomEditor from "../../../Components/Common/CustomEditor";

import "./style.scss";

function EditAdminBlogPage() {
    const [state, setState] = useState({});
    const [links, setLinks] = useState({});
    const [linkItems, setLinkItems] = useState([]);
    const [isOwned, setIsOwned] = useState(true);
    const [references, setReferences] = useState({});
    const [referenceItems, setReferenceItems] = useState([]);
    const [censoredContent, setCensoredContent] = useState("");

    const [files, setFiles] = useState([]);
    const [fileItems, setFileItems] = useState([]);
    const [existingFiles, setExistingFiles] = useState([]);
    const [, setDeletedFiles] = useState([]);

    const [, setBlog] = useState({});
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);

    const [coverImageFile, setCoverImgFile] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const fileRef = useRef(null);

    const {id} = useParams();

    const navigate = useNavigate();

    const handleSetImage = (e) => {
        const file = e.target.files[0];
        setCoverImgFile(file);
        setCoverImage(URL.createObjectURL(file));
    };

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

    const removeItems = (id, items, itemsSet, setItems) => {
        delete items[id];
        const linkSplit = id.split("-");
        const linkIndex = Number(linkSplit[linkSplit.length - 1]);
        const newLinkItems = [...itemsSet];
        newLinkItems.splice(linkIndex, 1);
        setItems(newLinkItems);
    };

    const linkItem = (count = null, defaultValue = "") => {
        const itemCount = count === null ? linkItems.length : count;

        return (
            <div className="flex items-center mb-3">
                <input
                    type="text"
                    name={`link-${itemCount}`}
                    value={links[`link-${itemCount}`]}
                    defaultValue={defaultValue}
                    className="admin-link-input border border-gray-700 mr-3 p-2 w-[60%]"
                    placeholder="Enter link address"
                    onChange={handleLinkChange}
                />
                <BsFillTrashFill
                    onClick={() =>
                        removeItems(`link-${itemCount}`, links, linkItems, setLinkItems)
                    }
                    className="cursor-pointer"
                    fill="#e14d2a"
                    size={25}
                />
            </div>
        );
    };

    const referenceItem = (count = null, defaultValue = "") => {
        const itemCount = count === null ? referenceItems.length : count;
        return (
            <div className="flex items-center mb-3">
                <input
                    type="text"
                    name={`reference-${itemCount}`}
                    className="admin-link-input border border-gray-700 mr-3 p-2 w-[60%]"
                    value={references[`reference-${itemCount}`]}
                    defaultValue={defaultValue}
                    placeholder="Enter reference address"
                    onChange={handleReferenceChange}
                />
                <BsFillTrashFill
                    onClick={() =>
                        removeItems(
                            `reference-${itemCount}`,
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
                    className="admin-link-input border border-gray-700 mr-3 p-2 w-[60%]"
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

    const handleLinkAddition = () => {
        setLinkItems([...linkItems, linkItem()]);
    };

    const handleSetContent = (value) => {
        setState({...state, content: value});
    };

    const handleReferenceAddition = () => {
        setReferenceItems([...referenceItems, referenceItem()]);
    };

    const handleFileAddition = () => {
        setFileItems([...fileItems, fileItem()]);
    };

    const handleSave = async () => {
        setLoading(true);
        if (!isOwned && Object.values(references).length === 0) {
            toast.error(t('alerts.atLeastReferenceRequired'));
        }

        if (!state.title) {
            toast.error(t('alerts.blogTitleEmpty'));
            return;
        }

        if (!state.content) {
            toast.error(t('alerts.blogContentEmpty'));
            return;
        }

        const reference = Object.values(references);
        const linkVals = Object.values(links);

        // Create a new FormData object
        const formData = new FormData();
        for (let [key, value] of Object.entries(state)) {
            formData.append(key, value);
        }

        linkVals.forEach((link) => {
            formData.append("links[]", link);
        });

        if (reference.length) {
            formData.append("reference", reference);
        }

        files.forEach((file, index) => {
            formData.append("files[]", file, `file${index}`);
        });

        if (coverImageFile) {
            formData.append("cover_image", coverImageFile);
        }

        formData.append("blog_post_id", id);

        try {
            await axiosClientForm.put("/blog/update-blog-post/", formData);
            setLoading(false);
            toast.success(t('alerts.blogUpdated'));
            await new Promise((r) => setTimeout(r, 2000));
            navigate("/admin/blogs");
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    const removeExistingItems = (id) => {
        const filesExisted = [...existingFiles];
        setExistingFiles(filesExisted.filter((elt) => elt.id !== id));
        const file = existingFiles.find((elt) => elt.id === id);
        setDeletedFiles([...existingFiles, file]);
    };

    useEffect(() => {
        if (id) {
            const getBlog = async () => {
                try {
                    const resp = await axiosClientWithHeaders.get(
                        `/blog/single-blog-post/${id}/`
                    );
                    const data = resp.data.data;
                    setState({
                        title: data.title,
                        content: data.content,
                        description: data.description,
                    });
                    setCensoredContent(data.censored_content);
                    if (data.cover_image !== null && data.cover_image !== "null") {
                        setCoverImage(data.cover_image);
                    }
                    setBlog(resp.data.data);
                    const splittedReference = data?.reference?.split(",") || [];
                    if (data.reference !== null && splittedReference.length) {
                        setIsOwned(false);
                        const prevReferences = splittedReference.reduce(
                            (prev, curr, index) => {
                                prev[`reference-${index}`] = curr;
                                return prev;
                            },
                            {}
                        );
                        setReferences(prevReferences);
                        const prevReferenceItems = splittedReference.reduce(
                            (prev, curr, index) => {
                                prev.push(referenceItem(index, curr));
                                return prev;
                            },
                            []
                        );
                        setReferenceItems(prevReferenceItems);
                    }
                    setExistingFiles(data?.documents);
                    if (data?.links) {
                        const splittedLinks = data?.links || [];
                        const prevLinks = splittedLinks.reduce((prev, curr, index) => {
                            prev[`link-${index}`] = curr;
                            return prev;
                        }, {});
                        setLinks(prevLinks);
                        const prevLinkItems = splittedLinks.reduce((prev, curr, index) => {
                            prev.push(linkItem(index, curr));
                            return prev;
                        }, []);
                        setLinkItems(prevLinkItems);
                    }
                } catch (err) {
                    console.log(err);
                }
            };
            getBlog();
        }
    }, [id]);

    return (
        <Layout header="Update Blog">
            <div className="admin-add-blog">
                <form>
                    <div className={`mt-5 mb-8 ${!coverImage && "hidden"}`}>
                        <img src={coverImage} className="w-[500px] h-[350px]" alt=""/>
                    </div>
                    <div
                        className={`cursor-pointer flex flex-col ${
                            coverImage && "hidden"
                        } mt-5 mb-8`}
                    >
                        <label className="text-[18px] font-bold">
                            {t("editBlogs.coverImage")} / {t("editBlogs.document")}
                        </label>
                        <input
                            type="file"
                            ref={fileRef}
                            className="mt-5"
                            onChange={handleSetImage}
                        />
                    </div>
                    {coverImage && (
                        <div className="flex mb-8 items-center h-[40px]">
                            <button
                                type="button"
                                onClick={() => fileRef.current.click()}
                                className="ml-2 px-3 py-2 rounded-md text-[#fff] bg-[#001253]"
                            >
                                {t("editBlogs.changeCoverImage")}
                            </button>
                            <span className="ml-3">
                <BsTrash
                    className="cursor-pointer"
                    onClick={() => setCoverImage(null)}
                    fill="#e14d2a"
                    size={25}
                />
              </span>
                        </div>
                    )}
                    <div>
                        <label className="text-[18px] font-bold">
                            {t("editBlogs.title")}<span className="text-[#e14d2a]">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            onChange={handleChange}
                            value={state.title}
                            placeholder={t("editBlogs.addTitle")}
                            className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                        />
                    </div>
                    <div className="mt-8">
                        <label className="text-[18px] font-bold">{t("editBlogs.description")}</label>
                        <textarea
                            onChange={handleChange}
                            placeholder={t("admin.enterDescription")}
                            name="description"
                            value={state.description}
                            rows={2}
                            className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                        ></textarea>
                    </div>
                    <div className="mt-8">
                        <label className="text-[18px] font-bold">
                            {t('admin.blogContent')}<span className="text-[#e14d2a]">*</span>
                        </label>
                        <CustomEditor
                            className="mt-5"
                            placeholder={t("admin.writeHere")}
                            setData={handleSetContent}
                            data={state.content}
                        />
                    </div>
                    <div className="mt-8">
                        <label className="text-[18px] font-bold">{t('admin.censoredContent')}</label>
                        <textarea
                            onChange={handleChange}
                            placeholder={t("admin.addBlogDescription")}
                            name="description"
                            value={censoredContent}
                            disabled
                            rows={10}
                            className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                        ></textarea>
                    </div>
                    <div className="flex mt-8 items-center">
                        <p className="text-[18px] font-bold">
                            {t("admin.areYouTheAuthorOfTheBlog")}
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
                            <label className="text-[18px] font-bold">
                                {t('admin.references')}
                            </label>
                            <div className="mt-3">{referenceItems}</div>
                            <button
                                type="button"
                                onClick={handleReferenceAddition}
                                className="text-left mt-3 min-w-[200px] bg-[#fff] w-[150px] flex items-center p-2 rounded-lg"
                            >
                                <BsPlusCircle fill="#001253" className="mr-1" size={20}/>
                                <span className="text-['#001253']">
                                    {t('admin.addReferenceLinks')}
                                </span>
                            </button>
                        </div>
                    )}
                    <div className="">
                        <AdminAccordionItem
                            cBg="#fff"
                            bg="#e5e7eb"
                            title={t("admin.links")}
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
                                <span className="text-[#000] mt-1">
                                    {t('admin.add')} {t('admin.link')}
                                </span>
                            </button>
                        </AdminAccordionItem>
                        <AdminAccordionItem
                            cBg="#fff"
                            bg="#e5e7eb"
                            title={t('admin.otherFiles')}
                            className="text-[18px] font-bold"
                            pClassName="mt-5"
                        >
                            <div>
                                {existingFiles.map((elt) => (
                                    <ul className="flex items-center" key={elt.id}>
                                        <BsLink45Deg className="mr-2"/>
                                        {elt.document_location}
                                        <BsTrash
                                            onClick={() => removeExistingItems(elt.id)}
                                            className="ml-2 cursor-pointer"
                                            fill="red"
                                        />
                                    </ul>
                                ))}
                            </div>
                            <div className="mt-3">{fileItems}</div>
                            <button
                                type="button"
                                onClick={handleFileAddition}
                                className="text-left mt-3 bg-[#fff] w-[150px] flex items-center p-2 rounded-lg"
                            >
                                <BsPlusCircle fill="#001253" className="mr-1" size={20}/>
                                <span className="text-['#001253']">
                                    {t('admin.add')} {t('forum.files')}
                                </span>
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
                                {t('modal.cancel')}
                            </button>
                            <button
                                type="button"
                                className="ml-2 px-3 py-2 rounded-md text-[#fff] bg-[#001253]"
                                onClick={handleSave}
                                disabled={loading}
                            >
                                {loading ? t('admin.saving') : t('modal.save')}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default EditAdminBlogPage;
