import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import Layout from "../../../../../Components/Dashboard/Layout";
import {axiosClientWithHeaders} from "../../../../../libs/axiosClient";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {BsArrowLeft, BsTrash} from "react-icons/bs";
import {forumTags} from "../../../../../utils/data";
import {isDocumentImage, isRequiredFieldsPassed,} from "../../../../../utils/helpers";
import makeAnimated from "react-select/animated";
import Select from "react-select";

import "./style.scss";
import CustomRadioInput from "../../../../../Components/Common/CustomRadioButton";

const animatedComponents = makeAnimated();

function AdminAddForumPage() {
    const {t} = useTranslation();
    const [state, setState] = useState({
        is_public: "True",
    });
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [tags, setTags] = useState([]);
    // const [file, setFile] = useState([]);
    const [coverImageType, setCoverImageType] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [coverImageFile, setCoverImgFile] = useState(null);

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
        const payload = {...state, "tags[]": JSON.stringify(state.tags)};
        delete payload["tags"];
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
            toast.success("Forum added successfully");
            await new Promise((r) => setTimeout(r, 2000));
            navigate("/admin/forums");
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const handleSetImage = (e) => {
        const file = e.target.files[0];
        setCoverImgFile(file);
        setCoverImageType(isDocumentImage(file.name));
        setCoverImage(URL.createObjectURL(file));
    };
    const clearFile = () => {
        fileRef.current.value = null;
        setCoverImageType("");
        setCoverImage(null);
    };

    useEffect(() => {
        const requiredFields = ["topic", "description", "tags"];
        setDisabled(!isRequiredFieldsPassed(state, requiredFields, "gt"));
    }, [state]);

    useEffect(() => {
        setState({
            ...state,
            tags: tags.map((elt) => elt.value),
        });
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
                    <div className={`mt-5 mb-8 ${!coverImageType && "hidden"}`}>
                        <img src={coverImage} className="w-[500px] h-[350px]" alt=""/>
                    </div>
                    <div
                        className={`flex flex-col cursor-pointer ${
                            coverImageType && "hidden"
                        } mt-5 mb-8`}
                    >
                        <label className="text-[18px] font-bold mb-5">{t('admin.headerImage')}</label>
                        <input type="file" ref={fileRef} onChange={handleSetImage}/>
                    </div>
                    {coverImageType && (
                        <div className="flex mb-8 items-center h-[40px]">
                            <button
                                type="button"
                                onClick={() => fileRef.current.click()}
                                className="ml-2 px-3 py-2 rounded-md text-[#fff] bg-[#001253]"
                            >
                                {t('admin.changeCoverImage')}
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
                            {t('admin.topic')}<span className="text-[#e14d2a]">*</span>
                        </label>
                        <input
                            type="text"
                            name="topic"
                            onChange={handleChange}
                            placeholder={t('admin.enterTopic')}
                            className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                        />
                    </div>
                    <div className="mt-3">
                        <label className="text-[18px] font-bold">
                            {t('editBlogs.description')}<span className="text-[#e14d2a]">*</span>
                        </label>
                        <textarea
                            name="description"
                            rows={3}
                            onChange={handleChange}
                            placeholder={t('admin.enterDescription')}
                            className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
                        ></textarea>
                    </div>
                    <div className="mt-3">
                        <label className="text-[18px] mb-2 font-bold">
                            {t('admin.tags')}<span className="text-[#e14d2a]">*</span>
                        </label>
                        <Select
                            closeMenuOnSelect={false}
                            className="grayed"
                            // isOptionDisabled={() => tags.length > 0 && tags.length === 5}
                            components={animatedComponents}
                            isMulti
                            options={forumTags.map((elt) => {
                                return {label: elt, value: elt};
                            })}
                            isClearable={true}
                            placeholder={t('admin.writeHere')}
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
                    <div className="mt-3">
                        <label className="text-[18px] mb-2 font-bold">
                            {t('admin.accessLevel')}<span className="text-[#e14d2a]">*</span>
                        </label>
                        <div>
                            <CustomRadioInput
                                optionKey={t('home.public')}
                                onChange={handleChange}
                                name={"is_public"}
                                value={"True"}
                                val={"pub1"}
                                defaultChecked={true}
                            />
                            <CustomRadioInput
                                optionKey={t('home.private')}
                                onChange={handleChange}
                                name={"is_public"}
                                value={"False"}
                                val={"pub2"}
                            />
                        </div>
                    </div>
                    <div className="mt-8 mb-3 flex items-center justify-center">
                        <button
                            type="button"
                            className="ml-2 px-3 py-2 rounded-md text-[#fff] bg-[#001253]"
                            onClick={handleSave}
                            disabled={disabled || loading}
                        >
                            {loading ? `${t('modal.loading')}...` : t('modal.save')}
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AdminAddForumPage;
