import React, { useState } from "react";
import Layout from "../../../Components/Dashboard/Layout";
import { BsCloudUpload } from "react-icons/bs";

import "./style.scss";
import { useNavigate } from "react-router";
import { axiosClientWithHeaders } from "../../../libs/axiosClient";
import { toast } from "react-toastify";

function AddBlogPage() {
  const [state, setState] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await axiosClientWithHeaders.post('/blog/create-blog/', {
        ...state
      });

      toast.success("Blog Added successfully");
      await new Promise((r) => setTimeout(r, 2000));
      navigate('/admin/blogs');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Layout>
      <div className="admin-add-blog">
        <div className="p-5 mt-5 flex justify-between blog-header">
          <h1>Add Blog</h1>
        </div>
        <form>
          <div className="mt-5 mb-8">
            <label>Cover Image</label>
            <div className="mt-5 flex rounded-lg justify-center items-center h-[200px] w-[380px] p-4 bg-gray-200">
              <input type="file" className="hidden" />
              <BsCloudUpload size={70} />
            </div>
          </div>
          <div>
            <label className="text-[18px]">Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Add Title"
              className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
            />
          </div>
          <div className="mt-8">
            <label className="text-[18px]">Description</label>
            <textarea
              onChange={handleChange}
              name="description"
              rows={3}
              className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
            ></textarea>
          </div>
          <div className="mt-8">
            <label className="text-[18px]">Blog Content</label>
            <textarea
              onChange={handleChange}
              name="content"
              rows={5}
              className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#3e6d9c]"
            ></textarea>
          </div>
          <div className="mt-5 flex justify-end">
            <div>
              <button type="button" className="border rounded px-3 py-2">Cancel</button>
              <button type="button" className="ml-2 px-3 py-2 rounded-md text-[#fff] bg-[#001253]" onClick={handleSave}>
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
