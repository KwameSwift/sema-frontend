import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {isRequiredFieldsPassed} from "../../../../../utils/helpers";
import Layout from "../../../../../Components/Dashboard/Layout";
import {axiosClientWithHeaders} from "../../../../../libs/axiosClient";
import {BsArrowLeft, BsTrash} from "react-icons/bs";
import Select from "react-select";
import {forumTags} from "../../../../../utils/data";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();


function AdminEditForumPage() {
    const {t} = useTranslation();
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [coverImageFile, setCoverImgFile] = useState(null);
    const fileRef = useRef(null);
    const [coverImage, setCoverImage] = useState(null);
    const [tags, setTags] = useState([]);


    const navigate = useNavigate();
    const {id} = useParams();
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        setLoading(true);
        const payload = {...state, "tags[]": JSON.stringify(state.tags)}
        delete payload["tags"]
        // Create a new FormData object
        const formData = new FormData();
        for (let [key, value] of Object.entries(payload)) {
            formData.append(key, value);
        }
        if (coverImageFile) {
            formData.append("file", coverImageFile);
        }
        try {
            await axiosClientWithHeaders.post("/forum/create-forum/", formData);
            setLoading(false);
            toast.success("Forum Added successfully");
            await new Promise((r) => setTimeout(r, 2000));
            navigate("/admin/forums");
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const getSingleForum = async (id) => {
        try {
            const resp = await axiosClientWithHeaders.get(
                `/forum/get-forum/${id}/`
            );
            console.log(resp.data.data);
            const {tags, topic, description} = {...resp.data.data}
            setState({...state, tags, topic, description});
            setTags(tags.map((elt) => {
                return {label: elt, value: elt}
            }));
        } catch (err) {
            console.error(err);
        }
    };

    const handleSetImage = (e) => {
        const file = e.target.files[0];
        setCoverImgFile(file);
    };

    useEffect(() => {
        const requiredFields = ["topic", "description", "tags"];
        setDisabled(
            !isRequiredFieldsPassed(state, requiredFields, "gt")
        );
    }, [state]);

    useEffect(() => {
        setState({
            ...state,
            tags: tags.map((elt) => elt.value)
        })
    }, [tags]);


    useEffect(() => {
        if (id) {
            getSingleForum(id);
        }
    }, [id]);

    return (
        <Layout>
            <div className="mx-3">
                <div className="p-8 mt-3 flex flex-row blog-header">
                    <div className="mr-3 flex items-start justify-center cursor-pointer">
                        <BsArrowLeft fill="#fff" size={28} onClick={() => navigate(-1)}/>
                    </div>
                    <div>
                        <h1>{t("admin.addForums")}</h1>
                    </div>
                </div>
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
                        Topic<span className="text-[#e14d2a]">*</span>
                    </label>
                    <input
                        type="text"
                        name="topic"
                        onChange={handleChange}
                        value={state.topic}
                        placeholder="Enter topic"
                        className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                    />
                </div>
                <div className="mt-3">
                    <label className="text-[18px] font-bold">
                        Description<span className="text-[#e14d2a]">*</span>
                    </label>
                    <textarea
                        name="description"
                        rows={3}
                        value={state.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                        className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                    ></textarea>
                </div>
                <div className="mt-3">
                    <label className="text-[18px] mb-2 font-bold">
                        Tags<span className="text-[#e14d2a]">*</span>
                    </label>
                    <Select
                        closeMenuOnSelect={false}
                        className="grayed"
                        // isOptionDisabled={() => tags.length > 0 && tags.length === 5}
                        components={animatedComponents}
                        isMulti
                        options={forumTags.map((elt) => {
                            return {label: elt, value: elt}
                        })}
                        isClearable={true}
                        placeholder="Start typing..."
                        name="state"
                        value={tags}
                        onChange={(e) => setTags(e)}
                    />
                </div>
                {/*<div*/}
                {/*    className="flex flex-col cursor-pointer mt-3 mb-8"*/}
                {/*>*/}
                {/*    <label className="text-[18px] font-bold mb-2">*/}
                {/*        Documents*/}
                {/*    </label>*/}
                {/*    <input type="file" ref={fileRef} onChange={handleSetImage} multiple/>*/}
                {/*</div>*/}
                <div className="mt-8 flex items-center justify-center">
                    <button
                        type="button"
                        className="ml-2 px-3 py-2 rounded-md text-[#fff] bg-[#001253]"
                        onClick={handleSave}
                        disabled={disabled || loading}
                    >
                        {loading ? "Loading..." : "Save"}
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default AdminEditForumPage;
