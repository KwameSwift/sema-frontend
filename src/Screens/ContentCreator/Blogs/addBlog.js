import React, { useRef, useState } from "react";
import { BsFillTrashFill, BsPlusCircle, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router";
import { axiosClientForm } from "../../../libs/axiosClient";
import ContentCreatorLayout from "../../../Components/ContentCreator/Layout";
import AccordionItem from "../../../Components/Common/Accordion";
import { toast } from "react-toastify";

import "./style.scss";
import CustomEditor from "../../../Components/Common/CustomEditor";

function AddCreatorBlogPage() {
  const [state, setState] = useState({});
  const [links, setLinks] = useState({});
  const [linkItems, setLinkItems] = useState([]);
  const [isOwned, setIsOwned] = useState(true);
  const [references, setReferences] = useState({});
  const [referenceItems, setReferenceItems] = useState([]);

  const [files, setFiles] = useState([]);
  const [fileItems, setFileItems] = useState([]);

  const [loading, setLoading] = useState(false);

  const [coverImageFile, setCoverImgFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const fileRef = useRef(null);

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

  const linkItem = () => {
    return (
      <div className="flex items-center mb-3">
        <input
          type="text"
          name={`link-${linkItems.length}`}
          className="link-input mr-3"
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
          className="link-input mr-3"
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
    setState({ ...state, content: value });
  };

  const handleLinkAddition = () => {
    setLinkItems([...linkItems, linkItem()]);
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
      toast.error("At least one reference link is required");
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

    files.forEach((file, index) => {
      formData.append("files", file, `file${index}`);
    });

    linkVals.forEach((file) => {
      formData.append("links[]", file);
    });

    if (coverImageFile) {
      formData.append("cover_image", coverImageFile);
    }

    try {
      await axiosClientForm.post("/blog/create-blog/", formData);

      toast.success("Blog Added successfully");
      await new Promise((r) => setTimeout(r, 2000));
      navigate("/creator/blogs");
    } catch (err) {
      console.log(err);
    }
  };

  const clearFile = () => {
    fileRef.current.value = null;
    setCoverImage(null);
  };

  return (
    <ContentCreatorLayout header="New Blog">
      <div className="creator admin-add-blog">
        <form>
          <div className={`mt-5 mb-8 ${!coverImage && "hidden"}`}>
            <img src={coverImage} className="w-[500px] h-[350px]" />
          </div>
          <div
            className={`flex flex-col cursor-pointer ${
              coverImage && "hidden"
            } mt-5 mb-8`}
          >
            <label className="text-[18px] font-bold mb-5">
              Cover Image / Document
            </label>
            <input type="file" ref={fileRef} onChange={handleSetImage} />
          </div>
          {coverImage && (
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
            <label className="text-[18px] font-bold">
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
                <BsPlusCircle fill="#001253" className="mr-1" size={20} />
                <span className="text-['#001253']">Add reference link</span>
              </button>
            </div>
          )}
          <AccordionItem
            cBg="rgb(229 231 235)"
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
              <BsPlusCircle fill="#001253" className="mr-1" size={20} />
              <span className="text-['#001253']">Add Link</span>
            </button>
          </AccordionItem>
          <div className="mt-8">
            <AccordionItem
              cBg="rgb(229 231 235)"
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
                <BsPlusCircle fill="#001253" className="mr-1" size={20} />
                <span className="text-['#001253']">Add Files</span>
              </button>
            </AccordionItem>
          </div>
          <div className="mt-5 flex justify-end">
            <div>
              <button
                type="button bg-[#fff]"
                onClick={() => navigate("/creator/blogs")}
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
    </ContentCreatorLayout>
  );
}

export default AddCreatorBlogPage;
