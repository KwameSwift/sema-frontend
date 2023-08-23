import React, {useEffect, useRef, useState} from "react";
import {axiosClientWithHeaders} from "../../../../../libs/axiosClient";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {BsTrash} from "react-icons/bs";
import {forumTags} from "../../../../../utils/data";
import {isDocumentImage, isRequiredFieldsPassed} from "../../../../../utils/helpers";
import makeAnimated from 'react-select/animated';
import ContentCreatorLayout from "../../../../../Components/ContentCreator/Layout";
import Select from "react-select";
import "./style.scss";

const animatedComponents = makeAnimated();

function CreatorAddForumPage() {
    // const {t} = useTranslation();
    const [state, setState] = useState({});
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
            toast.success("Forum added successfully");
            await new Promise((r) => setTimeout(r, 2000));
            navigate("/creator/forums");
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
        <ContentCreatorLayout header="Add Forum">
            <div>
                <div className="p-4">
                    <div className={`mt-5 mb-8 ${!coverImageType && "hidden"}`}>
                        <img src={coverImage} className="w-[500px] h-[350px]" alt=""/>
                    </div>
                    <div
                        className={`flex flex-col cursor-pointer ${
                            coverImageType && "hidden"
                        } mt-5 mb-8`}
                    >
                        <label className="text-[18px] font-bold mb-5">
                            Header Image
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
            </div>
        </ContentCreatorLayout>
    );
}

export default CreatorAddForumPage;
