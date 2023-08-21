import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import Layout from "../../../../../Components/Dashboard/Layout";
import {axiosClientWithHeaders} from "../../../../../libs/axiosClient";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {BsArrowLeft} from "react-icons/bs";
import {forumTags} from "../../../../../utils/data";
import {isRequiredFieldsPassed} from "../../../../../utils/helpers";
import makeAnimated from 'react-select/animated';
import Select from "react-select";

import "./style.scss";

const animatedComponents = makeAnimated();

function AdminAddForumPage() {
    const {t} = useTranslation();
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [tags, setTags] = useState([]);
    const [files, setFiles] = useState([]);

    const fileRef = useRef(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        setLoading(true);
        const payload = {...state}
        // Create a new FormData object
        const formData = new FormData();
        for (let [key, value] of Object.entries(payload)) {
            formData.append(key, value);
        }
        if (files.length) {
            for (let i = 0; i < files.length; i++) {
                formData.append("files[]", files[i], files[i].name);
            }
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

    const handleSetImage = (e) => {
        setFiles(e.target.files);
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

    return (
        <Layout>
            <div>
                <div className="p-8 mt-3 flex flex-row blog-header">
                    <div className="mr-3 flex items-start justify-center cursor-pointer">
                        <BsArrowLeft fill="#fff" size={28} onClick={() => navigate(-1)}/>
                    </div>
                    <div>
                        <h1>{t("admin.addForums")}</h1>
                    </div>
                </div>
                <div className="p-4">
                    <div>
                        <label className="text-[18px] font-bold">
                            Topic<span className="text-[#e14d2a]">*</span>
                        </label>
                        <input
                            type="text"
                            name="topic"
                            onChange={handleChange}
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
                    <div
                        className="flex flex-col cursor-pointer mt-3 mb-8"
                    >
                        <label className="text-[18px] font-bold mb-2">
                            Documents
                        </label>
                        <input type="file" ref={fileRef} onChange={handleSetImage} multiple/>
                    </div>
                    <div className="mt-3">
                        <label className="text-[18px] font-bold">
                            File description
                        </label>
                        <input
                            type="text"
                            name="file_description"
                            onChange={handleChange}
                            placeholder="Enter file description"
                            className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                        />
                    </div>
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
            </div>
        </Layout>
    );
}

export default AdminAddForumPage;
